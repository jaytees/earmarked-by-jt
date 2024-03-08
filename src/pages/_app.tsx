import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import {useLocalStorage} from '@/hooks/useLocalStorage'
import AddLinkButton from '@/components/AddLinkButton'
import Logo from '@/components/Logo'
import '@/styles/globals.css'

const robotoCondensed = Roboto_Condensed({
  weight: 'variable',
  style: ['normal', 'italic'],
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [], setIsLoading)
  return (
    <div className={robotoCondensed.className}>
      <nav className="flex flex-row items-center py-2 px-1 sm:px-4 lg:px-8">
        <Logo/>
        <div className="ml-auto">
          <AddLinkButton variant='primary'/>
        </div>
      </nav>
      <main>
        <Component {...pageProps} bookmarks={bookmarks} setBookmarks={setBookmarks} isLoadingBookmarks={isLoading}/>
      </main>
    </div>
  )
}
