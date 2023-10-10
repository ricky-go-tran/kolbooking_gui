import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import SectionTitle from "../../components/admin/typography/SectionTitle"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { TaskType } from "../../global_variable/global_type"
import axios, { AxiosResponse } from "axios"
import { getProxy } from "../../utils/PathUtil"
import { AuthContext } from "../../contexts/AuthContext"
import { fetchDataToEvent, fetchDataToTasks } from "../../utils/FetchData"
import {
  EventType,
  TasksSerializerType,
} from "../../global_variable/global_serializer"
import CreateTaskModal from "../../components/kol/modal/CreateTaskModal"
import UpdateTaskModal from "../../components/kol/modal/UpdateTaskModal"

const Schedule = () => {
  const localizer = momentLocalizer(moment)
  const [created, setCreated] = useState<number>(-1)
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [events, setEvents] = useState<EventType[]>([])
  const { state: auth_state } = useContext(AuthContext)
  const clickRef = useRef<number | null | undefined>(null)
  const [edited, setEdited] = useState<number>(-1)

  const config = {
    headers: {
      Authorization: auth_state.auth_token,
    },
  }

  const handleEventDoubleClick = (event: EventType) => {
    setEdited(Number(event.id))
  }
  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kol/tasks"), config)
      .then((res) => {
        setTasks(fetchDataToTasks(res))
        setEvents(fetchDataToEvent(res))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  var current = new Date()

  const myEventsList = [
    {
      id: "1",
      title: "Test1",
      start: new Date(),
      end: new Date(current.getTime() + 10000),
    },
  ]
  return (
    <>
      <div className="my-5">
        <div className="mt-12 mb-10 flex justify-between">
          {created !== -1 && <CreateTaskModal onClose={setCreated} />}
          {edited !== -1 && (
            <UpdateTaskModal task_id={edited} onClose={setEdited} />
          )}
          <h1 className="font-semibold text-2xl text-gray-600">Schedule</h1>
          <ul className="flex">
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
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clip-rule="evenodd"
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
