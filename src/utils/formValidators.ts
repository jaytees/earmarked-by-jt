export interface LinkMetaInt {
  url: string
  icon: string | null | undefined
}

export interface LinkValidationInt {
  url: string
  icon?: string | null | undefined
  error?: string
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

class ValidateForm {
  isProtocolPresent = (url: string): boolean =>
    url.indexOf('http://') !== -1 && url.indexOf('https://') !== -1

  isValidUrl = function (url: string): boolean {
    try {
      new URL(url)
    } catch {
      throw new Error(`Invalid link`)
    }
    return true
  }

  fetchLinkMeta = async (url: string): Promise<LinkMetaInt> => {
    const apiUrl = `https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}&api_key=${process.env.NEXT_PUBLIC_JSON_LINK_API_KEY}`

    return fetch(apiUrl)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.error) {
          throw new Error(`Link doesn't exist`)
        }
        return {
          url: data?.url || url,
          icon: data?.favicon || null,
        }
      })
      .catch(() => {
        throw new Error(`Link doesn't exist`)
      })
  }

  validateLink = async (url: string): Promise<LinkValidationInt> => {
    let checkedUrl = url
    if (!this.isProtocolPresent(url)) {
      checkedUrl = `https://${url}`
    }
    try {
      this.isValidUrl(checkedUrl)
      const res = await this.fetchLinkMeta(checkedUrl)
      return res
    } catch (error) {
      return { error: getErrorMessage(error), url: checkedUrl }
    }
  }
}

const validateForm = new ValidateForm()
export default validateForm
