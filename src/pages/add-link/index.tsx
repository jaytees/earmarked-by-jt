import { NextPage } from "next"
import { useState } from "react"
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
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = event.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
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
    await validateRequired()
    if (hasValidationErrors) return
    const res = await validateForm.validateLink(formData.url)
    if (res.error) {
      setFormErrors(prevState => ({
        ...prevState,
        url: `${res.error}, please double check and re-enter`,
      }))
      setHasValidationErrors(true)
      return
    }
    // save to local storage
    // redirect
  }
  
  return (
    <AddLink
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
export default AddLinkContainer