import type { Dispatch, SetStateAction } from 'react'

const PaginationControls: React.FC<{pageNumber: number, setPageNumber: Dispatch<SetStateAction<number>>, numberOfPages: number}> = ({pageNumber, setPageNumber, numberOfPages}): React.ReactElement => {

  const navButtonOnClickHandler = (action: string): void => {
    if (action === 'next' && pageNumber < (numberOfPages - 1)) {
      return setPageNumber(pageNumber + 1)
    }
    if (action === 'previous' && pageNumber > 0) {
      return setPageNumber(pageNumber - 1)
    }
  }

  const numberClickHandler = (selectedPage: string): void => {
    setPageNumber(parseInt(selectedPage) - 1)
  }
  

  return (
    <nav aria-label="page navigation" className='w-min'>
      <ul className="inline-flex -space-x-px text-sm">
        <li key="previous-button">
          <button onClick={() => navButtonOnClickHandler('previous')} disabled={pageNumber === 0} aria-label='previous' className="flex font items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-green hover:font-semibold disabled:bg-gray-200">Previous</button>
        </li>
        {
          Array.from({length: numberOfPages}).map((_, i) => {
            const selected = pageNumber === i ? 'bg-green font-semibold' : ''
            const renderedPageNumber = i + 1
            return (
              <li key={`number-${i}`}>
                <button onClick={() => numberClickHandler(`${renderedPageNumber}`)} className={`${selected} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-green hover:font-semibold`}>{renderedPageNumber}</button>
              </li>
            )
          })
        }
        <li key='next-button'>
          <button onClick={() => navButtonOnClickHandler('next')} disabled={pageNumber === numberOfPages - 1} aria-label='next' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-green hover:font-semibold disabled:bg-gray-200">Next</button>
        </li>
      </ul>
    </nav>
  )
}

export default PaginationControls