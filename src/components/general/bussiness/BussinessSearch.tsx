const BussinessSearch = ({
  search,
  onSearch,
  filter,
  onFilter,
  onSubmit,
}: {
  search: string
  onSearch: React.Dispatch<React.SetStateAction<string>>
  filter: string
  onFilter: React.Dispatch<React.SetStateAction<string>>
  onSubmit: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div className="w-full bg-gray-100 flex justify-center items-center">
      <div className="w-full mx-auto bg-indigo-500 rounded-lg p-14">
        <h1 className="text-center font-bold text-white lg:text-4xl text-base">
          Find the bussiness or personal
        </h1>
        <p className="mx-auto font-normal text-center text-white text-sm my-6 max-w-lg">
          Enter your select bussiness/personal name or choose by type
          Bussiness/Persoal{" "}
        </p>
        <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
          <input
            className="outline-none text-base text-gray-600 border-0 flex-grow  px-2 rounded-md"
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            value={search}
          />
          <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
            <select
              id="Com"
              className="text-base text-gray-600 outline-none border-2 border-gray-100 bg-gray-100 px-4 py-2 rounded-lg"
              onChange={(e) => {
                onFilter(e.target.value)
              }}
            >
              <option value="all" selected>
                All
              </option>
              <option value="bussiness">Bussiness</option>
              <option value="personal">Personal</option>
            </select>
            <button
              className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin"
              onClick={() => {
                onSubmit(search + filter)
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
export default BussinessSearch
