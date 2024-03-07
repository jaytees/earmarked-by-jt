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
      <main className={robotoCondensed.className}>
        <nav className="container flex flex-row px-1 py-2 sm:px-4 lg:px-8">
          <div className="logo-container">
            <div className="logo-text">
              <div className="logo-top-level-container flex items-center">
                <h5 className="pr-1 text-4xl font-black">EARMARKED</h5>
                <div className="logo-icon">
                  <div className="logo-icon-corner"></div>
                </div>
              </div>
              <p className="text-2xl font-semibold leading-3 tracking-wide text-text-secondary">
                By Jordan Trickett
              </p>
            </div>
          </div>
          <div className="nav-link"></div>
        </nav>
      </main>
    </div>
  )
}

export default Home
