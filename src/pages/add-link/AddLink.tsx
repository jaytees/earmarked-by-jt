import Head from "next/head"
import { BookmarkFormDataInt } from "."

const AddLink: React.FC<{
  formData: BookmarkFormDataInt
  handleChange: React.ChangeEventHandler
}> = ({formData, handleChange}): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Add link</title>
      </Head>
      <section className="flex flex-col items-center py-8 bg-stone-100 rounded-xl main-margin">
        <h1 className="mb-8 text-6xl font-black">ADD A LINK</h1>
        <form className="flex flex-col items-center w-6/12">
          <div className="grid gap-6 mb-6 w-full">
            <div>
              <label
                htmlFor="url"
                className="mb-2 block text-lg font-medium"
              >
                Website address*
              </label>
              <input
                type="text"
                id="url"
                name="url"
                className="block w-full rounded-lg border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-gray-600 focus:outline-2 focus:ring-2 focus:ring-gray-600 disabled:bg-gray-50"
                placeholder="Please enter the websites address"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="url"
                className="mb-2 block text-lg font-medium"
              >
                Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="block w-full rounded-lg border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-gray-600 focus:outline-2 focus:ring-2 focus:ring-gray-600 disabled:bg-gray-50"
                placeholder="Please enter the websites address"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <div>
                <label htmlFor="description" className="mb-2 block text-lg font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="block w-full rounded-lg border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-gray-600 focus:outline-2 focus:ring-2 focus:ring-gray-600 disabled:bg-gray-50"
                  placeholder="Please enter a description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}
export default AddLink