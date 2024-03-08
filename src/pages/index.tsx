import { NextPage } from 'next'
import type { Dispatch, SetStateAction } from 'react'
import { BookmarkType } from "@/types/bookmarks"
import Head from 'next/head'
import Card from '@/components/Card'


const Home: NextPage<{ bookmarks: BookmarkType[], setBookmarks: Dispatch<SetStateAction<BookmarkType[]>>}> = ({bookmarks, setBookmarks}): React.ReactElement => {
  return (
    <>
      <Head>
        <title>EARMARKED By Jordan Tricket</title>
      </Head>
      <section className='main-margin'>
        <div className="grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
             bookmarks.map((bookmark, i) => {
                return (
                  <Card key={bookmark.id} bookmark={bookmark} setBookmarks={setBookmarks} bookmarkIndex={i} />
                )
              })
            }
        </div>
        <div className=""></div>
      </section>
    </>
  )
}

export default Home
