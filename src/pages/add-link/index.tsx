import { NextPage } from "next"
import { useState, useEffect } from "react"
import { useToggle } from "@/hooks/useToggle"
import AddLink from "./AddLink"
import validateForm from "@/utils/formValidators"

export interface BookmarkFormDataInt {
  url: string
  title: string
  description: string
}

export interface FormErrorsInt {
  url: string
  title: string
}

const AddLinkContainer: NextPage = (): React.ReactElement => {
  const [formData, setFormData] = useState<BookmarkFormDataInt>({
    url: '',
    title: '',
    description: '',
  })
  const [formErrors, setFormErrors] = useState<FormErrorsInt>({
    url: '',
    title: '',
  })
  const [hasValidationErrors, setHasValidationErrors] = useToggle(false)
  const [submitting, setSubmitting] = useToggle(false)

  useEffect(() => {
    if (!formErrors.title && !formErrors.url) {
      setHasValidationErrors(false)
    }
  }, [formErrors])
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = event.target
    const str = name as keyof FormErrorsInt
    setFormData(prevState => ({ ...prevState, [name]: value }))
    if (formErrors[str]) {
      setFormErrors(prevState => ({ ...prevState, [name]: '' }))
    }
  }

  const validateRequired = async (): Promise<void> => {
    return Object.keys(formData).forEach((key, i): void => {
      if (!key[i]) {
        setFormErrors(prevState => ({ ...prevState, [key[i]]: `Please enter a ${key}` }))
        setHasValidationErrors(true)
      }
    })
  }

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault()
    setSubmitting(true)
    await validateRequired()
    if (hasValidationErrors) return setSubmitting(false)
    const res = await validateForm.validateLink(formData.url)
    if (res.error) {
      setFormErrors(prevState => ({
        ...prevState,
        url: `${res.error}, please double check and re-enter`,
      }))
      setHasValidationErrors(true)
      setSubmitting(false)
      return
    }
    debugger
    setSubmitting(false)
    // save to local storage
    // redirect
  }
  
  return (
    <AddLink
      formData={formData}
      formErrors={formErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      hasValidationErrors={hasValidationErrors}
      submitting={submitting}
    />
  )
}
export default AddLinkContainer