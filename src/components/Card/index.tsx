import { BookmarkType } from "@/types/bookmarks"
import Card from "./Card"

const CardContainer: React.FC<{bookmark: BookmarkType, bookmarkIndex: number}> = ({bookmark, bookmarkIndex}): React.ReactElement => {
  return (
    <Card bookmark={bookmark}/>
  )
}
export default CardContainer