"use client"
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import Card from '@/components/Card'
import { BookmarkType } from '@/types/bookmarks'
import bookmarkHelpers from '@/utils/bookmarkHelpers'
import { useToggle } from '@/hooks/useToggle'
import { useRouter } from 'next/router'

const NewLink: NextPage<{setBookmarks: Dispatch<SetStateAction<BookmarkType[]>>}> = ({setBookmarks}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useToggle(true)
  const [bookmarkIndex, setBookmarkIndex] = useState<number | null>(null)
  const [bookmark, setBookmark] = useState<BookmarkType>({
    id: '',
    url: '',
    title: '',
    description: '',
    icon: ''
  })

  useEffect(() => {
    const fetchBookmark = async () => {
      setIsLoading(true)
      let newBookmark
      const id = router.query.id as string
      if (id) {
        newBookmark = bookmarkHelpers.fetchBookmark(id)
      }
      if (newBookmark) {
        setBookmark(newBookmark.bookmark)
        setBookmarkIndex(newBookmark.bookmarkIndex)
      }
      setIsLoading(false)
    }
    if (router.isReady) {
      fetchBookmark()
    }
  }, [router.isReady])

  return (
    <section className="flex flex-col items-center py-8 bg-stone-100 rounded-xl main-margin">
      <div className="">
        <svg className='text-green' fill="currentColor" width="128pt" height="128pt" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="m16 71.543 8.7227 8.7227v12.344c0.007813 5.8867 4.7812 10.66 10.668 10.668h12.34l8.7266 8.7227c4.168 4.1602 10.918 4.1602 15.086 0l8.7266-8.7227h12.34-0.003906c5.8906-0.007813 10.66-4.7812 10.668-10.668v-12.344l8.7266-8.7227c4.1602-4.168 4.1602-10.918 0-15.086l-8.7266-8.7227v-12.344c-0.007813-5.8867-4.7773-10.66-10.668-10.668h-12.336l-8.7266-8.7227c-4.1719-4.1562-10.914-4.1562-15.086 0l-8.7266 8.7227h-12.34c-5.8867 0.007813-10.66 4.7812-10.668 10.668l0.003906 12.344-8.7266 8.7227c-4.1602 4.168-4.1602 10.918 0 15.086zm32.23-11.312c1-1 2.3555-1.5625 3.7695-1.5625s2.7695 0.5625 3.7695 1.5625l4.2305 4.2305 12.23-12.23c2.0898-2.043 5.4336-2.0234 7.5 0.039062 2.0664 2.0664 2.082 5.4102 0.039062 7.5l-16 16c-1 1-2.3555 1.5625-3.7695 1.5625s-2.7695-0.5625-3.7695-1.5625l-8-8c-1-1-1.5625-2.3555-1.5625-3.7695s0.5625-2.7695 1.5625-3.7695z"/>
        </svg>
      </div>
      <h1 className="mt-4 text-xl font-bold">Congratulations!</h1>
      <h1 className="text-lg font-semibold">Your link has been earmarked.</h1>
      <div className="mt-4 border-4 rounded-lg bg-stone-100">
        {
          !isLoading && bookmark ?
          <Card bookmark={bookmark} setBookmarks={setBookmarks}/>
          :
          <p className='text-red-900 text-sm'>Error loading bookmark. Please refresh</p>
        }

      </div>
    </section>
  )
}

export default NewLink
