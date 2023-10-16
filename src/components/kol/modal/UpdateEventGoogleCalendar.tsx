import { Input, Label, Select, Textarea } from "@windmill/react-ui"
import { AddIcon, EditIcon } from "../../../icons"
import { useContext, useEffect, useState } from "react"
import { ToastContext } from "../../../contexts/ToastContext"
import { checkValid } from "../../../validates/kol/TaskValidate"
import { generalMessage, generalWarning } from "../../../utils/ToastUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import {
  fetchDataToEventDetail,
  fetchDataToTask,
} from "../../../utils/FetchData"
import { TaskType } from "../../../global_variable/global_type"
import { formatDateWithInputStringOrDate } from "../../../utils/DateUtil"

const UpdateEventGoogleCalendar = ({
  task_id,
  onClose,
}: {
  task_id: number | string
  onClose: React.Dispatch<React.SetStateAction<string | number>>
}) => {
  const [task, setTask] = useState<TaskType>({
    id: "",
    status: "",
    title: "",
    description: "",
    start_time: new Date(),
    end_time: new Date(),
    category: "",
  })
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const config = {
    headers: {
      Authorization: auth_state.auth_token,
    },
  }

  useEffect(() => {
    axios
      .get(getProxy(`/api/v1/kol/google_calendar/${task_id}`), config)
      .then((res) => {
        console.log(res)
        setTask(fetchDataToEventDetail(res))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const submit = () => {
    const param = {
      event: {
        ...task,
      },
    }

    axios
      .put(getProxy(`/api/v1/kol/google_calendar/${task_id}`), param, config)
      .then(() => {
        generalMessage({
          message: "Successfully update job",
          toast_dispatch: toast_dispatch,
        })
        onClose(-1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const beforeSubmit = () => {
    const valid = checkValid({
      task: task,
    })
    if (valid.status === true) {
      submit()
    } else {
      generalWarning({
        message: valid.message,
        toast_dispatch: toast_dispatch,
      })
    }
  }

  const destroy = () => {
    axios
      .delete(getProxy(`/api/v1/kol/google_calendar/${task_id}`), config)
      .then(() => {
        generalMessage({
          message: "Successfully update job",
          toast_dispatch: toast_dispatch,
        })
        onClose(-1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 lg:w-1/2 my-3 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none dark:bg-gray-600">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-blue-400">
                <EditIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Create Task</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="p-4 rounded-full bg-blue-100">
                    <svg className="w-10 h-10 text-blue-300 ">
                      <EditIcon />
                    </svg>
                  </div>
                  <h6 className="font-semibold text-base mt-2">Edit Task</h6>
                  <div className="w-9/12">
                    <Label className="mt-3">
                      <span>Title</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        type="text"
                        placeholder="Title  Task"
                        required
                        onChange={(event) =>
                          setTask({ ...task, title: event.target.value })
                        }
                        value={task.title}
                      />
                    </Label>
                    <Label className="mt-4">
                      <span>Description</span>
                      <Textarea
                        css=""
                        className="mt-1"
                        rows={3}
                        placeholder="Enter some description about task"
                        style={{ resize: "none" }}
                        onChange={(event) =>
                          setTask({ ...task, description: event.target.value })
                        }
                        value={task.description}
                      />
                    </Label>
                    <Label className="mt-3">
                      <span>Start</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        type="datetime-local"
                        placeholder="Start date"
                        required
                        value={formatDateWithInputStringOrDate(task.start_time)}
                        onChange={(event) =>
                          setTask({
                            ...task,
                            start_time: new Date(event.target.value),
                          })
                        }
                      />
                    </Label>
                    <Label className="mt-3">
                      <span>End</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        type="datetime-local"
                        placeholder="End date"
                        required
                        value={formatDateWithInputStringOrDate(task.end_time)}
                        onChange={(event) =>
                          setTask({
                            ...task,
                            end_time: new Date(event.target.value),
                          })
                        }
                      />
                    </Label>
                    <Label className="mt-3">
                      <span>Category</span>
                      <Input
                        crossOrigin=""
                        css=""
                        type="text"
                        disabled
                        readOnly
                        value="Google Calendar"
                      />
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onClose(-1)}
              >
                Close
              </button>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => destroy()}
              >
                Destroy
              </button>
              <button
                className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  beforeSubmit()
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}

export default UpdateEventGoogleCalendar
