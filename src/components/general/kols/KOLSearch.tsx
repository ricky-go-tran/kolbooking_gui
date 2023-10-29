import { useContext, useState } from "react"
import { SearchKolHomepageContext } from "../../../contexts/SearchKolHomepageContext"

const KOLSearch = ({
  setFilter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [tempSearch, setTempSearch] = useState("")
  const { setKolSearch } = useContext(SearchKolHomepageContext)

  return (
    <div className="w-full bg-gray-100 flex justify-center items-center">
      <div className="w-full mx-auto bg-indigo-500 rounded-lg p-14">
        <h1 className="text-center font-bold text-white text-xl lg:text-3xl">
          Find the perfect KOLs
        </h1>
        <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
          <input
            className="outline-none text-base text-gray-600 border-0 flex-grow  px-2 rounded-md"
            type="text"
            placeholder="Search name kol"
            onChange={(e) => {
              setTempSearch(e.target.value)
            }}
            value={tempSearch}
          />
          <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto">
            <button
              className="bg-gray-200 w-24  border border-gray-200 text-base rounded-lg px-4 py-2 font-thin"
              onClick={() => {
                setFilter(true)
              }}
            >
              Filter
            </button>
            <button
              className="bg-blue-400 text-white text-base rounded-lg px-4 py-2 font-thin"
              onClick={() => {
                setKolSearch(tempSearch)
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KOLSearch
