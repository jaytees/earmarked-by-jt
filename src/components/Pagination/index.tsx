import type { Dispatch, MouseEventHandler, SetStateAction } from 'react'

const Pagination: React.FC = ({pageNumber, setPageNumber, numberOfPages}: {pageNumber: number, setPageNumber: Dispatch<SetStateAction<number>>, numberOfPages: number}): React.ReactElement => {
  const navButtonOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    debugger
    if (e.target.ariaLabel === 'next' && pageNumber < (numberOfPages - 1)) {
      return setPageNumber(pageNumber + 1)
    }
    if (e.target.ariaLabel === 'previous' && pageNumber > 0) {
      return setPageNumber(pageNumber - 1)
    }
  }

  const numberClickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setPageNumber(parseInt(e.target.innerHTML) - 1)
  }
  

  return (
    <nav aria-label="page navigation" className='w-min'>
      <ul className="inline-flex -space-x-px text-sm">
        <li key="previous-button">
          <button onClick={navButtonOnClickHandler} disabled={pageNumber === 0} aria-label='previous' className="flex font items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-green hover:font-semibold disabled:bg-gray-200">Previous</button>
        </li>
        {
          Array.from({length: numberOfPages}).map((_, i) => {
            const selected = pageNumber === i ? 'bg-green font-semibold' : ''
            return (
              <li key={`number-${i}`}>
                <button onClick={numberClickHandler} className={`${selected} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-green hover:font-semibold`}>{i + 1}</button>
              </li>
            )
          })
        }
        <li key='next-button'>
          <button onClick={navButtonOnClickHandler} disabled={pageNumber === numberOfPages - 1} aria-label='next' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-green hover:font-semibold disabled:bg-gray-200">Next</button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination