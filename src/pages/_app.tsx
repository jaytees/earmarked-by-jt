import Logo from '@/components/Logo'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
  weight: 'variable',
  style: ['normal', 'italic'],
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <div className={robotoCondensed.className}>
      <nav className="flex flex-row items-center py-2 px-1 sm:px-4 lg:px-8">
        <Logo/>
        <div className="ml-auto"></div>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
