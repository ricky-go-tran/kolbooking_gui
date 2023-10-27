import { useContext, useEffect, useState } from "react"
import { Input } from "@windmill/react-ui"
import { FilterKol } from "../../../global_variable/global_type"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import "react-quill/dist/quill.snow.css"
import { FunnelIcon } from "@heroicons/react/24/solid"
import SectionTitle from "../../admin/typography/SectionTitle"
import { INDUSTRY_URL } from "../../../global_variable/global_uri_backend"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { ToastContext } from "../../../contexts/ToastContext"

const KolFilterModal = ({
  filter,
  setFilterKol,
  onSubmit,
  onClose,
}: {
  filter: FilterKol
  setFilterKol: React.Dispatch<React.SetStateAction<FilterKol>>
  onSubmit: React.Dispatch<React.SetStateAction<FilterKol | null>>
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [industries, setIndustries] = useState<any[]>([])
  const { setErrorCode } = useContext(ErrorContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)

  useEffect(() => {
    axios
      .get(getProxy(INDUSTRY_URL))
      .then((response) => {
        setIndustries(response.data.data)
        setFilterKol({ ...filter, industry: [] })
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value
    if (event.target.checked) {
      setFilterKol({ ...filter, industry: [...filter.industry, id] })
    } else {
      setFilterKol({
        ...filter,
        industry: filter.industry.filter((item) => item !== id),
      })
    }
  }

  const setMinFollow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const min = Number(event.target.value)
    if (min > filter.follow.max) {
      setFilterKol({
        ...filter,
        follow: {
          max: min,
          min: min,
        },
      })
    } else {
      setFilterKol({
        ...filter,
        follow: {
          ...filter.follow,
          min: min,
        },
      })
    }
  }

  const setMinLike = (event: React.ChangeEvent<HTMLInputElement>) => {
    const min = Number(event.target.value)
    if (min > filter.like.max) {
      setFilterKol({
        ...filter,
        like: {
          max: min,
          min: min,
        },
      })
    } else {
      setFilterKol({
        ...filter,
        like: {
          ...filter.like,
          min: min,
        },
      })
    }
  }

  const submit = () => {
    onSubmit(filter)
    onClose(false)
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-3 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none dark:bg-gray-600">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-blue-500">
                <FunnelIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Filter Kol</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                <div className="flex w-full flex-col justify-center items-start">
                  <SectionTitle>Filter by Follower</SectionTitle>
                  <label className="w-full flex justify-start mb-5">
                    <label className="w-5/12">
                      <h4>Min</h4>
                      <Input
                        css=""
                        crossOrigin=""
                        type="number"
                        min={0}
                        value={filter.follow.min}
                        onChange={(event) => {
                          setMinFollow(event)
                        }}
                      />
                    </label>
                    <label className="w-5/12 ml-10">
                      <h4>Max</h4>
                      <Input
                        css=""
                        crossOrigin=""
                        type="number"
                        min={filter.follow.min}
                        value={filter.follow.max}
                        onChange={(event) => {
                          setFilterKol({
                            ...filter,
                            follow: {
                              ...filter.follow,
                              max: Number(event.target.value),
                            },
                          })
                        }}
                      />
                    </label>
                  </label>
                  <SectionTitle>Filter by Like</SectionTitle>
                  <label className="w-full flex justify-start mb-5">
                    <label className="w-5/12">
                      <h4>Min</h4>
                      <Input
                        css=""
                        crossOrigin=""
                        type="number"
                        min={0}
                        value={filter.like.min}
                        onChange={(event) => {
                          setMinLike(event)
                        }}
                      />
                    </label>
                    <label className="w-5/12 ml-10">
                      <h4>Max</h4>
                      <Input
                        css=""
                        crossOrigin=""
                        type="number"
                        min={filter.like.min}
                        value={filter.like.max}
                        onChange={(event) => {
                          setFilterKol({
                            ...filter,
                            like: {
                              ...filter.like,
                              max: Number(event.target.value),
                            },
                          })
                        }}
                      />
                    </label>
                  </label>
                  <SectionTitle>Filter by Industry</SectionTitle>
                  <ul
                    className="h-auto px-3 pb-3  text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {industries.map((industry) => {
                      return (
                        <li key={industry?.attributes?.id}>
                          <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              id={industry?.attributes?.id}
                              type="checkbox"
                              value={industry?.attributes?.id}
                              onChange={handleCheckboxChange}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={industry?.attributes?.id}
                              className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {industry?.attributes?.name}
                            </label>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  onClose(false)
                }}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  submit()
                }}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}

export default KolFilterModal
