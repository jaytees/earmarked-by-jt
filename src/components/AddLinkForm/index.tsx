import { NextPage } from "next"
import { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { useToggle } from "@/hooks/useToggle"
import AddLink from "./AddLinkForm"
import validateForm from "@/utils/formValidators"
import { BookmarkType } from "@/types/bookmarks"
import bookmarkHelpers from "@/utils/bookmarkHelpers"

export interface BookmarkFormDataInt {
  url: string
  title: string
  description: string
}

export interface FormErrorsInt {
  url: string
  title: string
}

const AddLinkFormContainer: NextPage<{renderedLocation: string, setBookmarks: Dispatch<SetStateAction<BookmarkType[]>> }> = ({
  renderedLocation,
  setBookmarks,
}): React.ReactElement => {
  const router = useRouter()
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
    setSubmitting(false)
    const finalBookmarkdata = {
      ...formData,
      id: uuidv4(),
      url: res.url,
      icon: res.icon,
    }
    const updatedBookmarksArray = bookmarkHelpers.addBookmark(finalBookmarkdata)
    setBookmarks(updatedBookmarksArray)
    setSubmitting(false)
    router.push({
      pathname: '/new-link',
      query: {
        id: finalBookmarkdata.id,
      },
    })
  }
  
  return (
    <AddLink
      renderedLocation={renderedLocation}
      formData={formData}
      formErrors={formErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      hasValidationErrors={hasValidationErrors}
      submitting={submitting}
    />
  )
}
export default AddLinkFormContainer