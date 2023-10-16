import EmptyPng from "../../../assets/images/empty.png"

export default function Empty() {
  return (
    <div className=" w-9/12 flex flex-col justify-center items-center p-16">
      <img src={EmptyPng} className="w-96 h-72" />
      <h3 className="text-base font-semibold">No results found</h3>
      <p className="text-xs">We couldn't find any item about this filter</p>
    </div>
  )
}
