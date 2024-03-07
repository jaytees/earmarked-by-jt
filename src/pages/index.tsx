import { NextPage } from 'next'
import Head from 'next/head'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
  weight: 'variable',
  style: ['normal', 'italic'],
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const Home: NextPage = (): React.ReactElement => {
  return (
    <div>
      <Head>
        <title>EARMARKED By Jordan Tricket</title>
      </Head>
      <main className={robotoCondensed.className}></main>
    </div>
  )
}

export default Home
