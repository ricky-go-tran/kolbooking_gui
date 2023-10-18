import { Badge } from "@windmill/react-ui"
import { FollowIcon } from "../../../icons"
import { Notification as NotificationType } from "../../../global_variable/global_type"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { generalWarning } from "../../../utils/ToastUtil"
import { ToastContext } from "../../../contexts/ToastContext"

const Notification = ({ notification }: { notification: NotificationType }) => {
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const [data, setData] = useState<NotificationType>({
    id: "",
    title: "",
    description: "",
    is_read: false,
    type_notice: "",
    sender_id: "",
    receiver_id: "",
  })

  useEffect(() => {
    setData({
      id: notification.id,
      title: notification.title,
      description: notification.description,
      is_read: notification.is_read,
      type_notice: notification.type_notice,
      sender_id: notification.sender_id,
      receiver_id: notification.receiver_id,
    })
  }, [])
  const read = () => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    if (data.is_read === false) {
      axios
        .post(getProxy(`/api/v1/notifications/${data.id}/read`), {}, config)
        .then(() => {
          setData({ ...data, is_read: true })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      generalWarning({
        message: "Already marked",
        toast_dispatch: toast_dispatch,
      })
    }
  }

  return (
    <div className="shadow-lg rounded-lg bg-white mx-auto m-3 p-4 notification-box">
      <div className="text-sm relative font-semibold pb-2 w-full flex justify-between items-start">
        <div className="w-3/5 overflow-hidden ">{notification.title}</div>
        <div className="w-1/5">
          {data.is_read === false && (
            <Badge type="warning" className="ml-3">
              Unread
            </Badge>
          )}
          {data.is_read === true && (
            <Badge type="primary" className="ml-3">
              Read
            </Badge>
          )}
        </div>
        <span
          className="w-1/5 cursor-pointer float-right text-gray-400 text-xs flex justify-center items-center"
          onClick={() => {
            read()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          Mark
        </span>
      </div>
      <div className="text-sm text-gray-600  tracking-tight ">
        {data.description}
      </div>
    </div>
  )
}
export default Notification
