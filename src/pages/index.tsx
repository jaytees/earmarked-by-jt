import { NextPage } from 'next'
import Image from 'next/image'
import { useState, type Dispatch, type SetStateAction, useEffect } from 'react'
import { BookmarkType } from "@/types/bookmarks"
import Head from 'next/head'
import Card from '@/components/Card'
import nothingToSeeHere from '../../public/nothing-to-see-here.gif'
import AddLinkButton from '@/components/AddLinkButton'

const BookmarksGrid: React.FC<{ bookmarks: BookmarkType[], setBookmarks: Dispatch<SetStateAction<BookmarkType[]>>}> = ({bookmarks, setBookmarks}): React.ReactElement => {
  return (
    <section className="grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        bookmarks.map((bookmark, i) => {
          return (
            <Card key={`${bookmark.id}-${i}`} bookmark={bookmark} setBookmarks={setBookmarks} bookmarkIndex={i} />
            )
          })
      }
    </section>
  )
}

const HomeEmptyState = () => {
  return (
    <section className="flex flex-col items-center py-8 bg-stone-100 rounded-xl">
      <Image
        src={nothingToSeeHere}
        alt='empty state'
      />
      <h1 className="mt-8 mb-4 text-xl font-semibold">Get started by adding some links</h1>
      <AddLinkButton variant='outline'/>
    </section>
  )
}

interface ChangePageParams {
  bookmarksArray: BookmarkType[];
  pageNumber: number;
  numberOfResults?: number
}

const getPageData = ({
  bookmarksArray = [],
  pageNumber,
  numberOfResults = 20,
}:ChangePageParams): BookmarkType[] => {
  debugger
  const startIndex = pageNumber * numberOfResults;
  const endIndex = (pageNumber + 1) * numberOfResults;
  return bookmarksArray.slice(startIndex, endIndex);
};

const Pagination: React.FC = ({pageNumber, setPageNumber, numberOfPages}: {pageNumber: number, setPageNumber: React.SetStateAction, numberOfPages: number}): React.ReactElement => {
  const navButtonOnClickHandler = (e) => {
    debugger
    if (e.target.ariaLabel === 'next' && pageNumber < numberOfPages) {
      return setPageNumber(pageNumber + 1)
    }
    if (e.target.ariaLabel === 'previous' && pageNumber > 0) {
      return setPageNumber(pageNumber - 1)
    }
  }

  const numberClickHandler = (e) => {
    setPageNumber(parseInt(e.target.innerHTML) - 1)
  }

  return (
    <nav aria-label="page navigation" className='w-min'>
      <ul className="inline-flex -space-x-px text-sm">
        <li key="previous-button">
          <button onClick={navButtonOnClickHandler} disabled={pageNumber === 0} aria-label='previous' className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
        </li>
        {
          Array.from({length: numberOfPages}).map((_, i) => {
            return (
              <li key={`number-${i}`}>
                <button onClick={numberClickHandler} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{i + 1}</button>
              </li>
            )
          })
        }
        <li key='next-button'>
          <button onClick={navButtonOnClickHandler} disabled={pageNumber === numberOfPages} aria-label='next' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">Next</button>
        </li>
      </ul>
    </nav>
  )
}


const Home: NextPage<{ bookmarks: BookmarkType[], setBookmarks: Dispatch<SetStateAction<BookmarkType[]>>, isLoadingBookmarks: boolean}> = ({bookmarks, setBookmarks, isLoadingBookmarks}): React.ReactElement => {
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [pageData, setPageData] = useState<BookmarkType[]>([])
  const [resultsPerPage, setResultsPerPage] = useState<number>(20)
  const [numberOfPages, setNumberOfPages] = useState<number>(0)

  useEffect(() => {
    const nextPageData = getPageData({bookmarksArray: bookmarks, pageNumber})
    setPageData(nextPageData)
  }, [pageNumber, isLoadingBookmarks])

  useEffect(() => {
    setNumberOfPages(Math.ceil(bookmarks.length / resultsPerPage))
  }, [bookmarks])

  return (
    <>
      <Head>
        <title>EARMARKED By Jordan Tricket</title>
      </Head>
      <section className='main-margin'>
        {
          pageData ?
          <BookmarksGrid bookmarks={pageData} setBookmarks={setBookmarks}/>
          :
          <HomeEmptyState/>
        }
        <div className="my-4">
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />
        </div>
      </section>
    </>
  )
}

export default Home
