import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

const IS_SERVER = typeof window === 'undefined'

export function useLocalStorage<T>(key: string, defaultValue: T, setIsLoading: Dispatch<SetStateAction<boolean>>): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState(defaultValue)

  const readValue = (): T => {
    if (IS_SERVER) {
      return defaultValue
    }
    try {
      return JSON.parse(localStorage.getItem(key) || String(defaultValue))
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return defaultValue
    }
  }

  const setValue: Dispatch<SetStateAction<T>> = value => {
    if (IS_SERVER) {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      )
    }
    try {
      localStorage.setItem(key, JSON.stringify(value))
      setStoredValue(value)
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setStoredValue(readValue())
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [storedValue, setValue]
}

export default useLocalStorage
