import { NextPage } from 'next'
import { BookmarkType } from "@/types/bookmarks"
import Head from 'next/head'
import Card from '@/components/Card'


const Home: NextPage<{ bookmarks: BookmarkType[]}> = ({bookmarks}): React.ReactElement => {
  return (
    <>
      <Head>
        <title>EARMARKED By Jordan Tricket</title>
      </Head>
      <section className='main-margin'>
        <div className="grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
             bookmarks && bookmarks.map((bookmark, i) => {
                return (
                  <Card key={bookmark.id} bookmark={bookmark} bookmarkIndex={i} />
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
