import Banner from "../../../assets/images/banner-job.jpg";

const KOLSearch = () => {
  return (
    <div className="w-full  bg-blue-400 rounded-lg p-14" >
      <form>
        <h1 className="text-center font-bold text-white text-4xl">Find the perfect KOLs</h1>
        <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 mt-5 justify-between ">
          <input className="text-base text-gray-400 flex-grow outline-none px-2 border-0" type="text" placeholder="Search name kol" />
          <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
            <button className="bg-blue-400 text-white text-base rounded-lg px-4 py-2 font-thin">Search</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default KOLSearch;
