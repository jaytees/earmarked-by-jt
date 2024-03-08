import { useState, useCallback } from "react"
import type { Dispatch, SetStateAction } from 'react'

export function useToggle(defaultValue?: boolean): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(!!defaultValue)
  return [value, setValue]
}