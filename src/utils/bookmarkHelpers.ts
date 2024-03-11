import { BookmarkType } from '@/types/bookmarks'

interface EditBookmarkParams {
  bookmarkId: string
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
    bookmarkId,
    bookmarkData,
  }: EditBookmarkParams): BookmarkType[] => {
    debugger
    const bookmarksArray = this.loadBookmarks()
    return bookmarksArray.map((bookmark) => {
      if (bookmark.id === bookmarkId) {
        return {
          ...bookmarkData,
        };
      }
      return bookmark;
    });
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
