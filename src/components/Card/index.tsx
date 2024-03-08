import { useState } from "react"
import type { Dispatch, SetStateAction } from 'react'
import { BookmarkType } from "@/types/bookmarks"
import Card from "./Card"
import { useToggle } from "@/hooks/useToggle"
import bookmarkHelpers from "@/utils/bookmarkHelpers"

export interface FormErrorsInt {
  title: string
  description: string
}

const CardContainer: React.FC<{bookmark: BookmarkType, bookmarkIndex: number, setBookmarks: Dispatch<SetStateAction<BookmarkType[]>>}> = ({bookmark, bookmarkIndex, setBookmarks}): React.ReactElement => {
  const [bookmarkData, setBookmarkData] = useState<BookmarkType>({...bookmark})
  const [formErrors, setFormErrors] = useState<FormErrorsInt>({
    title: '',
    description: '',
  })
  const [hasValidationErrors, setHasValidationErrors] = useToggle(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = event.target
    setBookmarkData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('submitting')
    if (!bookmarkData.title) {
      setFormErrors(prevState => ({ ...prevState, title: `Please enter a title` }))
      setHasValidationErrors(true)
    }
    if (!bookmarkData.description) {
      setFormErrors(prevState => ({ ...prevState, description: `Please enter a description` }))
      setHasValidationErrors(true)
    }

    if (hasValidationErrors) {
      return
    }

    const updatedBookmarksArray = bookmarkHelpers.editBookmark({bookmarkIndex, bookmarkData})
    setBookmarks(updatedBookmarksArray)
  }


  const handleDelete = () => {
    debugger
  }

  return (
    <Card bookmark={bookmarkData} handleDelete={handleDelete} handleChange={handleChange} handleSubmit={handleSubmit}/>
  )
}
export default CardContainer