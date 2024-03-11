import type { Dispatch, SetStateAction } from "react"
import { BookmarkFormDataInt, FormErrorsInt } from "."
import { useToggle } from "@/hooks/useToggle"

const labelErrorClasses = 'text-red-600'
const baseInputClasses = 'block w-full rounded-lg text-sm  p-2.5'
const defaultInputClasses = 'border-gray-300 bg-white text-gray-900 focus:border-gray-600 focus:outline-2 focus:ring-2 focus:ring-gray-600 disabled:bg-gray-50'
const inputErrorClasses =
  'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500'

const FormButton: React.FC<{renderedLocation: string, isSubmitDisabled: boolean, isNextDisabled: boolean, displayFullForm: boolean, setDisplayFullForm: Dispatch<SetStateAction<boolean>> }> = ({renderedLocation, isSubmitDisabled, isNextDisabled, displayFullForm, setDisplayFullForm}) => {
  if (renderedLocation === 'home' && !displayFullForm) {
    return (
      <button
        className="z-10 mt-2 me-2 w-4/12 justify-self-center cursor-pointer rounded-xl border  border-gray-200 bg-text px-5 py-2.5 text-sm font-medium text-white hover:bg-green focus:bg-green focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 disabled:pointer-events-none disabled:bg-text-disabled disabled:text-gray-500"
        disabled={isNextDisabled}
        onClick={() => setDisplayFullForm(true)}
      >
        Next
      </button>
    )
  }

  return (
    <button
      type="submit"
      className="mt-2 me-2 w-4/12 justify-self-center cursor-pointer rounded-xl border  border-gray-200 bg-text px-5 py-2.5 text-sm font-medium text-white hover:bg-green focus:bg-green focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 disabled:pointer-events-none disabled:bg-text-disabled disabled:text-gray-500"
      disabled={isSubmitDisabled}
    >
      Save
    </button>
  )
}

const AddLinkForm: React.FC<{
  renderedLocation: string,
  formData: BookmarkFormDataInt
  formErrors: FormErrorsInt
  handleChange: React.ChangeEventHandler
  handleSubmit: React.FormEventHandler
  hasValidationErrors: boolean
  submitting: boolean
}> = ({renderedLocation, formData, formErrors, handleChange, handleSubmit, hasValidationErrors,
  submitting,}): React.ReactElement => {
  const [displayFullForm, setDisplayFullForm] = useToggle(false)
  const isNextDisabled = !formData?.url
  const isSubmitDisabled = !formData?.title || !formData?.url || hasValidationErrors || submitting

  return (
    <form className={`flex w-6/12 flex-col items-center ${displayFullForm || renderedLocation !== 'home' ? 'gap-6' : ''}`} onSubmit={handleSubmit}>
      <div className="grid w-full">
        {
          renderedLocation !== 'home' &&
          <label
            htmlFor="url"
            className={`mb-2 block text-lg font-medium ${formErrors?.url ? labelErrorClasses : ''}`}
          >
            {renderedLocation === 'home' ? 'Add a link' : 'Website address*'}
          </label>
        }
        <input
          type="text"
          id="url"
          name="url"
          className={`${baseInputClasses} ${formErrors?.url ? inputErrorClasses : defaultInputClasses}`}
          placeholder="Please enter the websites address"
          value={formData?.url}
          onChange={handleChange}
          required
          disabled={submitting}
        />
        <p className={`${labelErrorClasses} mt-1 h-1 text-sm`}>{formErrors?.url}</p>
      </div>
      <div className={`grid w-full gap-6 transition duration-300 ease-out ${renderedLocation === 'home' && !displayFullForm ? 'h-0 opacity-0' : 'h-full opacity-100'}`}>
        <div>
          <label
            htmlFor="title"
            className={`mb-2 block text-lg font-medium ${formErrors?.title ? labelErrorClasses : ''}`}
          >
            Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`${baseInputClasses} ${formErrors?.title ? inputErrorClasses : defaultInputClasses}`}
            placeholder="Please enter a title"
            value={formData?.title}
            onChange={handleChange}
            required
            disabled={submitting}
          />
          <p className={`${labelErrorClasses} mt-1 h-1 text-sm`}>{formErrors?.title}</p>
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
            value={formData?.description}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
      </div>
      <FormButton renderedLocation={renderedLocation} isSubmitDisabled={isSubmitDisabled} isNextDisabled={isNextDisabled} displayFullForm={displayFullForm} setDisplayFullForm={setDisplayFullForm}/>
    </form>
  )
}
export default AddLinkForm