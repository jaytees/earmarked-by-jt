import styles from './PlusIcon.module.css'

const PlusIcon: React.FC<{ hoverActive: boolean }> = ({ hoverActive }) => {
  return (
    <div className={`${styles.plusIcon} ${hoverActive ? styles.active : ''}`}>
      <div className={`${styles.plusIcon__y} bg-text`}></div>
      <div className={`${styles.plusIcon__x} bg-text`}></div>
    </div>
  )
}
export default PlusIcon
