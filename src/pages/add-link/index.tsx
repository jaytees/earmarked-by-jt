import { NextPage } from "next"
import { useState } from "react"
import AddLink from "./AddLink"

export interface BookmarkFormDataInt {
  url: string
  title: string
  description: string
}

const AddLinkContainer: NextPage = (): React.ReactElement => {
  const [formData, setFormData] = useState<BookmarkFormDataInt>({
    url: '',
    title: '',
    description: '',
  })
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = event.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }
  
  return (
    <AddLink
      formData={formData}
      handleChange={handleChange}
    />
  )
}
export default AddLinkContainer