import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { getProxy } from "../../utils/PathUtil"
import { AuthContext } from "../../contexts/AuthContext"
import { fetchDataToEvent, fetchDataToGoogleEvent } from "../../utils/FetchData"
import { EventType } from "../../global_variable/global_serializer"
import CreateTaskModal from "../../components/kol/modal/CreateTaskModal"
import UpdateTaskModal from "../../components/kol/modal/UpdateTaskModal"
import { GoogleCalendarIcon } from "../../icons"
import { useGoogleLogin } from "@react-oauth/google"
import UpdateEventGoogleCalendar from "../../components/kol/modal/UpdateEventGoogleCalendar"
import { ToastContext } from "../../contexts/ToastContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { HandleResponseError } from "../../utils/ErrorHandleUtil"
import { generalError } from "../../utils/ToastUtil"

const Schedule = () => {
  const localizer = momentLocalizer(moment)
  const [tab, setTab] = useState("default")
  const [created, setCreated] = useState<number>(-1)
  const [events, setEvents] = useState<EventType[]>([])
  const { state: auth_state } = useContext(AuthContext)
  const [edited, setEdited] = useState<number | string>(-1)
  const [integrate, setIntegrate] = useState<boolean>(false)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  const config = {
    headers: {
      Authorization: auth_state.auth_token,
    },
  }

  const googleIntegrate = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: (err) => console.log(err),
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
    onNonOAuthError: (nonError) => console.log(nonError),
    ux_mode: "redirect",
    redirect_uri: "https://kolbooking-gui.vercel.app/redirect",
  })

  const handleEventDoubleClick = (event: EventType) => {
    if (tab === "default") {
      setEdited(Number(event.id))
    } else {
      setEdited(event.id)
    }
  }
  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kol/google_calendar/check_integrate"), config)
      .then((res) => {
        console.log(res)
        setIntegrate(true)
      })
      .catch((error) => {
        setIntegrate(false)
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

  useEffect(() => {
    if (tab === "default") {
      axios
        .get(getProxy("/api/v1/kol/tasks"), config)
        .then((res) => {
          setEvents(fetchDataToEvent(res))
        })
        .catch((error) => {
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    } else {
      axios
        .get(getProxy("/api/v1/kol/google_calendar"), config)
        .then((res) => {
          setEvents(fetchDataToGoogleEvent(res))
        })
        .catch((error) => {
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    }
  }, [edited, created, tab])

  const setSync = () => {
    if (integrate === false) {
      generalError({
        message: "Not connected to google account",
        toast_dispatch: toast_dispatch,
      })
    } else {
      setTab("sync")
    }
  }

  return (
    <>
      <div className="my-5">
        <div className="mt-12 mb-10 flex flex-col lg:flex-row justify-between">
          {created !== -1 && (
            <CreateTaskModal integrate={integrate} onClose={setCreated} />
          )}
          {edited !== -1 && tab === "default" && (
            <UpdateTaskModal task_id={edited} onClose={setEdited} />
          )}
          {edited !== -1 && tab === "sync" && (
            <UpdateEventGoogleCalendar task_id={edited} onClose={setEdited} />
          )}
          <ul className="w-1/2 max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs">
            <li>
              <div
                className={`flex justify-center py-2 cursor-pointer ${
                  tab === "default"
                    ? "bg-white rounded-lg shadow text-indigo-900"
                    : ""
                }`}
                onClick={() => setTab("default")}
              >
                Default
              </div>
            </li>
            <li>
              <div
                className={`flex justify-center py-2 cursor-pointer ${
                  tab === "sync"
                    ? "bg-white rounded-lg shadow text-indigo-900"
                    : ""
                }`}
                onClick={() => setSync()}
              >
                Sync
              </div>
            </li>
          </ul>
          <ul className="flex mt-5 lg:mt-0">
            {integrate === false && (
              <li className="mx-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center space-x-2 py-1 px-6 border border-transparent text-sm font-medium rounded text-gray-500 hover:text-gray-600 bg-white hover:bg-gray-50 shadow-sm transition-colors"
                  onClick={() => {
                    googleIntegrate()
                  }}
                >
                  <span className="w-5 h-5">
                    <GoogleCalendarIcon />
                  </span>
                  <div>Sync Google Calendar</div>
                </button>
              </li>
            )}
            <li className="mx-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-2 py-1 px-6 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 bg-blue-200 hover:bg-blue-300 transition-colors"
                onClick={() => {
                  setCreated(1)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>Create Task</div>
              </button>
            </li>
          </ul>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          defaultView="week"
          onDoubleClickEvent={handleEventDoubleClick}
        />
      </div>
    </>
  )
}

export default Schedule
