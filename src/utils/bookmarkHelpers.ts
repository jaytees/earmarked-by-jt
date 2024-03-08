import { BookmarkType } from '@/types/bookmarks'

interface EditBookmarkParams {
  bookmarkIndex: number;
  bookmarkData: BookmarkType
}

class BookmarkHelpers {
  addBookmark = (bookmarkData: BookmarkType): BookmarkType[] => {
    const currentBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    return [...currentBookmarks, bookmarkData]
  }

  editBookmark = ({
    bookmarkIndex,
    bookmarkData,
  }: EditBookmarkParams): BookmarkType[] => {
    const bookmarksArray = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    return [
      ...bookmarksArray.slice(0, bookmarkIndex),
      { ...bookmarkData },
      ...bookmarksArray.slice(bookmarkIndex + 1),
    ];
  };
}

const bookmarkHelpers = new BookmarkHelpers()
export default bookmarkHelpers
