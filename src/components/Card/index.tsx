import { useEffect, useRef, useState } from "react"
import { BookmarkType } from "@/types/bookmarks"
import Card from "./Card"

const CardContainer: React.FC<{bookmark: BookmarkType, bookmarkIndex: number}> = ({bookmark, bookmarkIndex}): React.ReactElement => {
  const [bookmarkData, setBookmarkData] = useState<BookmarkType>({...bookmark})
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = event.target
    setBookmarkData(prevState => ({ ...prevState, [name]: value }))
    debounceSubmit()
  }

  const handleSubmit = () => {
    console.log('submitting')
  }

  const debounceSubmit = () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      handleSubmit()
    }, 3000)
    console.log(timeoutRef.current)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])


  const handleDelete = () => {
    debugger
  }

  return (
    <Card bookmark={bookmarkData} handleDelete={handleDelete} handleChange={handleChange}/>
  )
}
export default CardContainer