import BussinessCard from "../../../components/general/bussiness/BussinessCard"
import BussinessSearch from "../../../components/general/bussiness/BussinessSearch"

const Bussiness = () => {
  return (
    <>
      <BussinessSearch />
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <BussinessCard />
          <BussinessCard />
          <BussinessCard />
          <BussinessCard />
          <BussinessCard />
        </div>
      </div>
    </>
  )
}
export default Bussiness
