import Link from "next/link"
import { BookmarkType } from "@/types/bookmarks"
import styles from './Card.module.css'

const Card: React.FC<{bookmark: BookmarkType}> = ({bookmark}): React.ReactElement => {
  return (
    <article
      className={`${styles.card} relative flex flex-col p-3 w-full bg-stone-100 rounded-xl sm:py-6 sm:rounded-md`}
    >
        <div className={`${styles.card__corner}`}></div>
        <Link href={bookmark.url} target="_blank" className="absolute top-1 right-3">Visit</Link>
        <h3 className="flex-1 text-xl font-bold md:text-4xl">{bookmark.title}</h3>
        <p className="m-0 text-base font-medium text-text-secondary">{bookmark.description}</p>
    </article>
  )
}

export default Card