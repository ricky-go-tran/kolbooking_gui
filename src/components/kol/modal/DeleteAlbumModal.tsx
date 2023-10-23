import { SetStateAction, useEffect, useState } from "react"
import { BookMarkIcon, WarningIcon } from "../../../icons"
import { Label, Input, Textarea, Alert } from "@windmill/react-ui"
import { ReportJobGeneralContext } from "../../../contexts/ReportJobGeneralContext"
import { ReportJobType, ReportType } from "../../../global_variable/global_type"
import { useContext } from "react"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { generalMessage, generalWarning } from "../../../utils/ToastUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import { checkValid } from "../../../validates/general/ReportValidate"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import {
  CloudArrowUpIcon,
  PhotoIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid"
import PhotoAlbum from "react-photo-album"

const DeleteAlbumModal = ({
  profile_id,
  onClose,
}: {
  profile_id: string
  onClose: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [album, setAlbum] = useState<File[]>([])
  const [message, setMessage] = useState("")
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const { setErrorCode } = useContext(ErrorContext)
  const [photos, setPhotos] = useState<any[]>([])
  const [removes, setRemoves] = useState<any[]>([])
  const [index, setIndex] = useState(-1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kol/kol_profiles/gallaries"), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        setPhotos(handleUrlAlbum(response.data.data.attributes.gallaries))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleUrlAlbum = (album: object[]) => {
    let rs = album.map((image: any) => {
      return {
        id: image.id,
        src: getProxy(image.src),
        height: image.height,
        width: image.width,
      }
    })
    return rs
  }

  const addToRemoveList = (i: number) => {
    const image = photos.find((item, index) => {
      return index === i
    })
    setPhotos(
      photos.filter((item, index) => {
        return index !== i
      })
    )
    setRemoves([...removes, image])
  }

  const removeToRemoveList = (i: number) => {
    const image = removes.find((item, index) => {
      return index === i
    })
    setRemoves(
      removes.filter((item, index) => {
        return index !== i
      })
    )
    setPhotos([...photos, image])
  }

  const handleChangeProfile = () => {
    setLoading(true)
    const id_remove_list = removes.map((image) => {
      return { id: image.id }
    })

    const param = {
      kol_profile: {
        id_list: id_remove_list,
      },
    }
    axios
      .put(getProxy("/api/v1/kol/kol_profiles/delete_image"), param, {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        setLoading(false)
        onClose(-1)
        generalMessage({
          message: "Successly delete file",
          toast_dispatch: toast_dispatch,
        })
      })
      .catch((error) => {
        setLoading(false)
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 my-3 mx-auto max-w-7xl h-5/6 lg:w-1/2">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none dark:bg-gray-600">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-red-400">
                <TrashIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Delete</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="p-4 rounded-full bg-red-100">
                    <svg className="w-10 h-10 text-red-300 ">
                      <TrashIcon />
                    </svg>
                  </div>
                  <h6 className="font-semibold text-base mt-2">Delete Album</h6>
                  {message !== "" && (
                    <Alert
                      type="danger"
                      className="my-5"
                      onClose={() => {
                        setMessage("")
                      }}
                    >
                      {message}
                    </Alert>
                  )}
                  {removes.length > 0 && (
                    <div className="w-full flex flex-col mt-5">
                      <h3>Remove items</h3>
                      <PhotoAlbum
                        photos={removes}
                        layout="masonry"
                        targetRowHeight={150}
                        onClick={({ index }) => {
                          removeToRemoveList(index)
                        }}
                      />
                    </div>
                  )}
                  <div className="w-full flex flex-col mt-5">
                    <h3>Album</h3>
                    {photos.length > 0 && (
                      <PhotoAlbum
                        photos={photos}
                        layout="masonry"
                        targetRowHeight={150}
                        onClick={({ index }) => {
                          addToRemoveList(index)
                        }}
                      />
                    )}
                    {photos.length === 0 && (
                      <ul
                        id="gallery"
                        className="flex flex-1 flex-wrap -m-1 mt-16"
                      >
                        <li
                          id="empty"
                          className="h-full w-full text-center flex flex-col items-center justify-center"
                        >
                          <img
                            className="mx-auto w-28"
                            src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                            alt="no data"
                          />
                          <span className="text-small text-gray-500">
                            No image
                          </span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  onClose(-1)
                }}
              >
                Close
              </button>
              <button
                className="bg-red-400 text-white hover:bg-red-500 active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  handleChangeProfile()
                }}
                disabled={loading}
              >
                {loading === false && `Delete`}
                {loading === true && (
                  <div className="flex items-center justify-center w-12">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="w-5 h-5 border-4 border-white rounded-full animate-spin"
                    ></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}

export default DeleteAlbumModal
