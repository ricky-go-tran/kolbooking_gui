import Banner from "../../../assets/images/banner-job.jpg"
import { useContext, useState } from "react"
import { SearchKolHomepageContext } from "../../../contexts/SearchKolHomepageContext"

const KOLSearch = () => {
  const [tempSearch, setTempSearch] = useState("")
  const { setKolSearch } = useContext(SearchKolHomepageContext)

  const Test = (a: any) => {
    console.log(a)
  }

  return (
    <div className="w-full  bg-blue-400 rounded-lg p-14">
      <h1 className="text-center font-bold text-white text-xl lg:text-3xl">
        Find the perfect KOLs
      </h1>
      <div className="lg:flex items-center flex-nowrap bg-white rounded-lg overflow-hidden px-2 py-1 mt-5 justify-between ">
        <input
          className="text-base text-gray-400 flex-grow outline-none px-2 border-0"
          type="text"
          placeholder="Search name kol"
          onChange={(e) => {
            setTempSearch(e.target.value)
          }}
          value={tempSearch}
        />
        <div className="lg:flex hidden items-center px-2 rounded-lg space-x-4 mx-auto ">
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
  )
}

export default KOLSearch
