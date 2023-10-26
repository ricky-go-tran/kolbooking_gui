import { Input, Label, Select, Textarea } from "@windmill/react-ui"
import { AddIcon } from "../../../icons"
import { useContext, useState } from "react"
import { ToastContext } from "../../../contexts/ToastContext"
import { checkValid } from "../../../validates/kol/TaskValidate"
import { generalMessage, generalWarning } from "../../../utils/ToastUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"

const CreateTaskModal = ({
  integrate,
  onClose,
}: {
  integrate: boolean
  onClose: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [task, setTask] = useState({
    id: "",
    status: "planning",
    title: "",
    description: "",
    start_time: new Date(),
    end_time: new Date(),
    category: "",
  })
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { state: auth_state } = useContext(AuthContext)

  const submit = () => {
    const param = {
      task: {
        ...task,
      },
    }
    const event_param = {
      event: {
        title: task.title,
        description: task.description,
        start_time: task.start_time,
        end_time: task.end_time,
      },
    }
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    const rq_create_task = axios.post(
      getProxy("/api/v1/kol/tasks"),
      param,
      config
    )

    const rq_create_event = axios.post(
      getProxy("/api/v1/kol/google_calendar"),
      event_param,
      config
    )

    const rq = []
    rq.push(rq_create_task)

    if (integrate === true) {
      rq.push(rq_create_event)
    }

    Promise.all(rq)
      .then((res) => {
        if (integrate) {
          const task_id = res[0].data.data.attributes.id
          const event_id = res[1].data.id
          const param = {
            google_event_id: event_id,
          }
          axios.put(
            getProxy(`/api/v1/kol/tasks/${task_id}/add_google_event_id`),
            param,
            config
          )
        }
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

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 lg:w-1/2 my-3 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none dark:bg-gray-600">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-green-400">
                <AddIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Create Task</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="p-4 rounded-full bg-green-100">
                    <svg className="w-10 h-10 text-green-300 ">
                      <AddIcon />
                    </svg>
                  </div>
                  <h6 className="font-semibold text-base mt-2">Create Task</h6>
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
                      <Select
                        css=""
                        className="mt-1"
                        onChange={(e) => {
                          setTask({ ...task, category: e.target.value })
                        }}
                      >
                        <option value="personal">Personal</option>
                        <option value="web_job">Web Job</option>
                        <option value="facebook_job">Facebook Job</option>
                        <option value="youtube_job">Youtube Job</option>
                        <option value="tiktok_job">Tiktok Job</option>
                        <option value="instagram_job">Instagram Job</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="other">Other</option>
                      </Select>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onClose(-1)}
              >
                Close
              </button>
              <button
                className="bg-green-400 text-white hover:bg-green-500 active:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  beforeSubmit()
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}

export default CreateTaskModal
