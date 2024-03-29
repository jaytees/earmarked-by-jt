import { useToggle } from "@/hooks/useToggle"

const DeleteButton: React.FC<{onClickHandler:  React.MouseEventHandler}> = ({onClickHandler}): React.ReactElement => {
  const [isActive, setIsActive] = useToggle(false)

  if (isActive) {
    return (
      <div className="flex text-sm font-medium text-text-secondary">
        <p className="pr-2">Are you sure?</p>
        <button onClick={onClickHandler} className="pr-2 text-red-600 hover:text-red-400">yes</button>
        <button onClick={() => setIsActive(false)} className="hover:text-text">no</button>
      </div>
    )
  }

  return (
    <button onClick={() => setIsActive(true)}>
      <svg className="cursor-pointer w-5 h-5 text-text-secondary hover:text-text focus:text-text" fill="currentColor" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" 
      >
        <g>
          <path d="m84.941 102.48h-41.883l-2.4297-67.121-7.4648 0.26562 2.6875 74.332h56.297l2.6875-74.332-7.4648-0.26562z"/>
          <path d="m54.668 91.648v-45.301c0-2.0625-1.6719-3.7383-3.7383-3.7383-2.0625 0-3.7344 1.6758-3.7344 3.7383v45.301c0 2.0625 1.6719 3.7383 3.7344 3.7383 2.0664 0 3.7383-1.6758 3.7383-3.7383z"/>
          <path d="m67.738 91.648v-45.301c0-2.0625-1.6758-3.7383-3.7383-3.7383s-3.7383 1.6758-3.7383 3.7383v45.301c0 2.0625 1.6758 3.7383 3.7383 3.7383s3.7383-1.6758 3.7383-3.7383z"/>
          <path d="m80.805 91.648v-45.301c0-2.0625-1.6719-3.7383-3.7344-3.7383-2.0664 0-3.7383 1.6758-3.7383 3.7383v45.301c0 2.0625 1.6719 3.7383 3.7383 3.7383 2.0625 0 3.7344-1.6758 3.7344-3.7383z"/>
          <path d="m80.551 25.602v-2.3828c-0.007812-4.7656-3.875-8.625-8.6406-8.625h-15.82c-4.7656 0-8.6328 3.8594-8.6406 8.625v2.3828h-22.859v7.4766l78.82-0.003906v-7.4727zm-25.602-2.3945c0-0.30859 0.125-0.60156 0.34375-0.82031 0.21875-0.21484 0.51562-0.33594 0.82031-0.33203h15.797c0.30859-0.003907 0.60547 0.11719 0.82422 0.33203 0.21875 0.21875 0.33984 0.51172 0.33984 0.82031v2.3945h-18.148z"/>
        </g>
      </svg>
    </button>
  )
}
export default DeleteButton