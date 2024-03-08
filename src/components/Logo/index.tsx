import { useRouter } from 'next/router'
import styles from './Logo.module.css'

const Logo: React.FC = () => {
  const router = useRouter()
  const handleClick = (): void => {
    router.push('/')
  }
  return (
    <button className={`${styles.logo}`} onClick={handleClick}>
      <div className={`${styles.logo__title} flex items-center`}>
        <h5 className="pr-1 text-4xl font-black">EARMARKED</h5>
        <div className={`${styles.logo__icon}`}>
          <div className={`${styles.logo__icon__corner}`}></div>
        </div>
      </div>
      <p
        className={`${styles.logo__subtitle} text-2xl font-semibold leading-3 text-text-secondary`}
      >
        By Jordan Trickett
      </p>
    </button>
  )
}
export default Logo
