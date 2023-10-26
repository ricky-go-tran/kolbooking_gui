import Toast from "./toast_component/Toast"
import { useContext } from "react"
import { ToastContext } from "../../../contexts/ToastContext"

export const ToastPanel = () => {
  const { state: toast_state } = useContext(ToastContext)
  return (
    <>
      {toast_state.length !== 0 && (
        <div className="justify-center items-end flex flex-col overflow-x-hidden overflow-y-auto fixed max-w-7xl w-1/2 max-h-xl outline-none focus:outline-none bottom-4 right-4 z-50">
          {toast_state.map((toast) => {
            return <Toast toast={toast} key={toast.id} />
          })}
        </div>
      )}
    </>
  )
}

export default ToastPanel
