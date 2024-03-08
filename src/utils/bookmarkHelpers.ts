import { BookmarkType } from '@/types/bookmarks'

interface EditBookmarkParams {
  bookmarkIndex: number;
  bookmarkData: BookmarkType
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
    ];
  };

  deleteBookmark = (id: string): BookmarkType[] => {
    const bookmarksArray = this.loadBookmarks()
    return bookmarksArray.filter(bookmark => bookmark.id !== id)
  };
}

const bookmarkHelpers = new BookmarkHelpers()
export default bookmarkHelpers
