import { NextPage } from 'next'
import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
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
            <Card key={bookmark.id} bookmark={bookmark} setBookmarks={setBookmarks} bookmarkIndex={i} />
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

const Home: NextPage<{ bookmarks: BookmarkType[], setBookmarks: Dispatch<SetStateAction<BookmarkType[]>>}> = ({bookmarks, setBookmarks}): React.ReactElement => {
  return (
    <>
      <Head>
        <title>EARMARKED By Jordan Tricket</title>
      </Head>
      <section className='main-margin'>
        {
          bookmarks ?
          <BookmarksGrid bookmarks={bookmarks} setBookmarks={setBookmarks}/>
          :
          <HomeEmptyState/>
        }
        <div className=""></div>
      </section>
    </>
  )
}

export default Home
