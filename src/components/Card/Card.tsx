import Link from "next/link"
import { BookmarkType } from "@/types/bookmarks"
import styles from './Card.module.css'
import DeleteIcon from "./DeleteIcon"

const Card: React.FC<{bookmark: BookmarkType, handleDelete: React.MouseEventHandler, handleChange: React.ChangeEventHandler, handleSubmit: React.FormEventHandler}> = ({bookmark, handleDelete, handleChange, handleSubmit}): React.ReactElement => {
  return (
    <article
      className={`${styles.card} relative flex flex-col p-5 w-full bg-stone-100 rounded-xl sm:py-6 sm:rounded-md`}
    >
        <div className={`${styles.card__corner}`}></div>
        <Link href={bookmark.url} target="_blank" className="absolute top-2 right-3 text-sm font-medium text-text-secondary hover:text-text">Visit</Link>
        <div className="flex">
          {
            bookmark.icon ? 
            <img className="w-10 h-10 rounded-full" src={bookmark.icon} alt="Rounded avatar"/> :
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
              <span className="font-medium text-gray-600">{bookmark.title[0]}</span>
            </div>
          }
          <input                           
            type="text"
            id="title"
            name="title" 
            required
            value={bookmark.title} 
            onChange={handleChange}
            onBlur={handleSubmit}
            className="pl-2 flex-1 text-xl font-bold md:text-4xl truncate bg-stone-100 decoration-2 decoration-text-secondary hover:underline hover:underline-offset-2 focus:underline"
          />
        </div>
        <p className="my-2 text-base font-medium text-text-secondary line-clamp-2">{bookmark.description}</p>
        <div className="absolute bottom-2 right-3">
          <DeleteIcon onClickHandler={handleDelete}/>
        </div>
    </article>
  )
}

export default Card