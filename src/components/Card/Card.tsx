import Link from "next/link"
import { BookmarkType } from "@/types/bookmarks"
import styles from './Card.module.css'
import DeleteButton from "./DeleteButton"
import { FormErrorsInt } from "."

const Card: React.FC<{bookmark: BookmarkType, formErrors: FormErrorsInt, handleDelete: React.MouseEventHandler, handleChange: React.ChangeEventHandler, handleSubmit: React.FormEventHandler}> = ({bookmark, formErrors, handleDelete, handleChange, handleSubmit}): React.ReactElement => {

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
          <p className={`text-red-600 mt-1 h-1 text-sm`}>{formErrors?.title}</p>
        </div>
        <textarea
        id="description"
        name="description"
        value={bookmark.description}
        onChange={handleChange}
        onBlur={handleSubmit}
        className="my-3 text-xl h-min font-medium text-text-secondary line-clamp-2 bg-stone-100 resize-none hover:bg-stone-50 hover:resize-y"
        />
        <p className={`text-red-600 mt-1 h-1 text-sm`}>{formErrors?.description}</p>
        <div className="absolute bottom-2 right-3">
          <DeleteButton onClickHandler={handleDelete}/>
        </div>
    </article>
  )
}

export default Card