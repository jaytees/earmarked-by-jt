import { NextPage } from 'next'
import Image from 'next/image'
import { useState, type Dispatch, type SetStateAction, useEffect } from 'react'
import { BookmarkType } from "@/types/bookmarks"
import Head from 'next/head'
import Card from '@/components/Card'
import nothingToSeeHere from '../../public/nothing-to-see-here.gif'
import AddLinkButton from '@/components/AddLinkButton'
import PaginationControls from '@/components/PaginationControls'

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
        priority
      />
      <h1 className="mt-8 mb-4 text-xl font-semibold">Get started by adding some links</h1>
      <AddLinkButton variant='outline'/>
    </section>
  )
}

interface ChangePageParams {
  bookmarksArray: BookmarkType[]
  pageNumber: number
  numberOfResults?: number
}

const getPageData = ({
  bookmarksArray = [],
  pageNumber,
  numberOfResults = 20,
}:ChangePageParams): BookmarkType[] => {
  const startIndex = pageNumber * numberOfResults
  const endIndex = (pageNumber + 1) * numberOfResults
  return bookmarksArray.slice(startIndex, endIndex)
}

const Home: NextPage<{ bookmarks: BookmarkType[], setBookmarks: Dispatch<SetStateAction<BookmarkType[]>>, isLoadingBookmarks: boolean}> = ({bookmarks, setBookmarks, isLoadingBookmarks}): React.ReactElement => {
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [pageData, setPageData] = useState<BookmarkType[]>([])
  const [resultsPerPage, setResultsPerPage] = useState<number>(20)
  const [numberOfPages, setNumberOfPages] = useState<number>(0)

  useEffect(() => {
    const nextPageData = getPageData({bookmarksArray: bookmarks, pageNumber})
    setPageData(nextPageData)
  }, [pageNumber, isLoadingBookmarks, bookmarks])

  useEffect(() => {
    setNumberOfPages(Math.ceil(bookmarks.length / resultsPerPage))
  }, [bookmarks])

  return (
    <>
      <Head>
        <title>EARMARKED By Jordan Tricket</title>
      </Head>
      <section className='main-margin pb-20'>
        {
          !isLoadingBookmarks && !pageData.length ?
          <HomeEmptyState/>
          :
          <BookmarksGrid bookmarks={pageData} setBookmarks={setBookmarks}/>
        }
        <div className="my-4 fixed bottom-0 right-3">
          <PaginationControls pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />
        </div>
      </section>
    </>
  )
}

export default Home
