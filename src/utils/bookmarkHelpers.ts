import { BookmarkType } from '@/types/bookmarks'

interface EditBookmarkParams {
  bookmarkIndex: number
  bookmarkData: BookmarkType
}

interface FetchBookmarkInt {
  bookmark: BookmarkType
  bookmarkIndex: number
}

class BookmarkHelpers {
  loadBookmarks = (): BookmarkType[] => {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]')
  }

  addBookmark = (bookmarkData: BookmarkType): BookmarkType[] => {
    const currentBookmarks = this.loadBookmarks()
    return [...currentBookmarks, bookmarkData]
  }

  editBookmark = ({
    bookmarkIndex,
    bookmarkData,
  }: EditBookmarkParams): BookmarkType[] => {
    const bookmarksArray = this.loadBookmarks()
    return [
      ...bookmarksArray.slice(0, bookmarkIndex),
      { ...bookmarkData },
      ...bookmarksArray.slice(bookmarkIndex + 1),
    ]
  }

  deleteBookmark = (id: string): BookmarkType[] => {
    const bookmarksArray = this.loadBookmarks()
    return bookmarksArray.filter(bookmark => bookmark.id !== id)
  }

  fetchBookmark = (id: string): FetchBookmarkInt | undefined => {
    const bookmarksArray = this.loadBookmarks()
    const index = bookmarksArray.findIndex((bookmark) => bookmark.id === id)
    return { bookmark: bookmarksArray[index], bookmarkIndex: index }

  }
}

const bookmarkHelpers = new BookmarkHelpers()
export default bookmarkHelpers
