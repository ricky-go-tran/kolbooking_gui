import { Badge } from "@windmill/react-ui"
import { FollowIcon } from "../../../icons"
import { Notification as NotificationType } from "../../../global_variable/global_type"

const Notification = ({ notification }: { notification: NotificationType }) => {
  return (
    <div className="shadow-lg rounded-lg bg-white mx-auto m-3 p-4 notification-box">
      <div className="text-sm font-semibold pb-2">
        {notification.title}
        {notification.is_read === false && (
          <Badge type="warning" className="ml-3">
            Unread
          </Badge>
        )}
        {notification.is_read === true && (
          <Badge type="primary" className="ml-3">
            Read
          </Badge>
        )}
        <span className="float-right text-gray-400 text-xs flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
          Mark
        </span>
      </div>
      <div className="text-sm text-gray-600  tracking-tight ">
        {notification.description}
      </div>
    </div>
  )
}
export default Notification
