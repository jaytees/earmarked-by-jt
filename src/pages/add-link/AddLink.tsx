import Head from "next/head"
import { BookmarkFormDataInt, FormErrorsInt } from "."

const labelErrorClasses = 'text-red-600'
const baseInputClasses = 'block w-full rounded-lg text-sm  p-2.5'
const defaultInputClasses = 'border-gray-300 bg-white text-gray-900 focus:border-gray-600 focus:outline-2 focus:ring-2 focus:ring-gray-600 disabled:bg-gray-50'
const inputErrorClasses =
  'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500'

const AddLink: React.FC<{
  formData: BookmarkFormDataInt
  formErrors: FormErrorsInt
  handleChange: React.ChangeEventHandler
  handleSubmit: React.FormEventHandler
  hasValidationErrors: boolean
  submitting: boolean
}> = ({formData, formErrors, handleChange, handleSubmit, hasValidationErrors,
  submitting,}): React.ReactElement => {
  const isDisabled = !formData.title || !formData.url || hasValidationErrors || submitting

  return (
    <>
      <Head>
        <title>Add link - EARMARKED By Jordan Trickett</title>
      </Head>
      <section className="flex flex-col items-center py-8 bg-stone-100 rounded-xl main-margin">
        <h1 className="mb-8 text-6xl font-black">ADD A LINK</h1>
        <form className="flex w-6/12 flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-6 grid w-full gap-6">
            <div>
              <label
                htmlFor="url"
                className={`mb-2 block text-lg font-medium ${formErrors.url ? labelErrorClasses : ''}`}
              >
                Website address*
              </label>
              <input
                type="text"
                id="url"
                name="url"
                className={`${baseInputClasses} ${formErrors.url ? inputErrorClasses : defaultInputClasses}`}
                placeholder="Please enter the websites address"
                value={formData.url}
                onChange={handleChange}
                required
                disabled={submitting}
              />
              <p className={`${labelErrorClasses} mt-1 h-1 text-sm`}>{formErrors.url}</p>
            </div>
            <div>
              <label
                htmlFor="title"
                className={`mb-2 block text-lg font-medium ${formErrors.title ? labelErrorClasses : ''}`}
              >
                Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`${baseInputClasses} ${formErrors.title ? inputErrorClasses : defaultInputClasses}`}
                placeholder="Please enter a title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={submitting}
              />
              <p className={`${labelErrorClasses} mt-1 h-1 text-sm`}>{formErrors.title}</p>
            </div>
            <div>
              <label htmlFor="description" className="mb-2 block text-lg font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className={`${baseInputClasses} ${defaultInputClasses}`}
                placeholder="Please enter a description"
                value={formData.description}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
          </div>
          <button
            type="submit"
            className="my-2 me-2 w-4/12  cursor-pointer rounded-xl border  border-gray-200 bg-text px-5 py-2.5 text-sm font-medium text-white hover:bg-green focus:bg-green focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 disabled:pointer-events-none disabled:bg-text-disabled disabled:text-gray-500"
            disabled={isDisabled}
          >
            Save
          </button>
        </form>
      </section>
    </>
  )
}
export default AddLink