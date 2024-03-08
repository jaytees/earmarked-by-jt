import { BookmarkType } from '@/types/bookmarks'

class BookmarkHelpers {
  addBookmark = (bookmarkData: BookmarkType): BookmarkType[] => {
    const currentBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    return [...currentBookmarks, bookmarkData]
  }
}

const bookmarkHelpers = new BookmarkHelpers()
export default bookmarkHelpers
