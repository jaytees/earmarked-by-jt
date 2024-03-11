import Head from "next/head"
import { NextPage } from "next"
import type { Dispatch, SetStateAction } from 'react'
import { BookmarkType } from "@/types/bookmarks"
import AddLinkForm from "@/components/AddLinkForm"

const AddLink: NextPage<{setBookmarks: Dispatch<SetStateAction<BookmarkType[]>> }> = ({
  setBookmarks,
}): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Add link - EARMARKED By Jordan Trickett</title>
      </Head>
      <section className="flex flex-col items-center py-8 bg-stone-100 rounded-xl main-margin">
        <h1 className="mb-8 text-6xl font-black">ADD A LINK</h1>
        <AddLinkForm setBookmarks={setBookmarks} renderedLocation='default'/>
      </section>
    </>
  )
}
export default AddLink