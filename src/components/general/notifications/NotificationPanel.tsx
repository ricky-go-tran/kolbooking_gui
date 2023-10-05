import { useContext, useEffect, useState } from "react"
import { Notification as NotificationType } from "../../../global_variable/global_type"
import { BellIcon } from "../../../icons"
import Notification from "./Notification"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { fetchDataToNotification } from "../../../utils/FetchData"
import { AuthContext } from "../../../contexts/AuthContext"

const NotificationPanel = ({
  onClose,
}: {
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    axios
      .get(getProxy("/api/v1/notifications"), config)
      .then((res) => {
        setNotifications(fetchDataToNotification(res.data.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <div className="absolute w-96 h-64  p-2 mt-2 text-gray-600 bg-gray-50 border border-gray-100 rounded-lg shadow-md min-w-max-content dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700 right-0 z-50 overflow-y-scroll">
        {(notifications === undefined || notifications.length === 0) && (
          <div className="w-full h-full flex flex-col justify-start items-center py-10">
            <h4 className="text-blue-600 font-semibold mb-10">
              Have not new notifications
            </h4>
            <span className="text-blue-600">
              <BellIcon className="w-10 h-10" aria-hidden="true" />
            </span>
          </div>
        )}

        {notifications !== undefined &&
          notifications.length !== 0 &&
          notifications.map((item) => {
            return <Notification key={item.id} notification={item} />
          })}
      </div>
      <div
        className="fixed inset-0 z-10"
        onClick={() => {
          onClose(false)
        }}
      ></div>
    </>
  )
}

export default NotificationPanel
