import { useRouter } from 'next/router'
import PlusIcon from '../PlusIcon'
import { useState } from 'react'

const variantButtonClasses = {
  primary: 'text-text hover:text-gray-600',
  outline: 'text-text bg-white rounded-lg border-2 border-gray-200 hover:bg-green focus:ring-4 focus:ring-gray-100'
}

interface ButtonPropsInt {
  variant: 'primary' | 'outline'
}

const AddLinkButton: React.FC<ButtonPropsInt> = ({variant = 'primary'}) => {
  const router = useRouter()
  const [hoverActive, setHoverActive] = useState(false)
  const onClickNavigate = (): void => {
    router.push('/add-link')
  }
  return (
    <button
      className={`flex items-center py-1 px-5 ${variantButtonClasses[variant]}`}
      onClick={onClickNavigate}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
    >
      <PlusIcon hoverActive={hoverActive} />
      <p className="pl-1 text-2xl font-bold text-inherit">ADD A LINK</p>
    </button>
  )
}
export default AddLinkButton
