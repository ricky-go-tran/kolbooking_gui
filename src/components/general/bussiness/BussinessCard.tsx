import {
  AddIcon,
  CommentOutlineIcon,
  FormsIcon,
  JobOutlineIcon,
} from "../../../icons"

const BussinessCard = () => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
      <a
        href=""
        className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div className="relative pb-48 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt=""
          />
        </div>
        <div className="p-4">
          <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
            Bussiness
          </span>
          <h2 className="mt-2 mb-2  font-bold">
            Purus Ullamcorper Inceptos Nibh
          </h2>
          <p className="text-sm h-24 overflow-y-hidden">
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec
            ullamcorper nulla non metus auctor fringilla. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Donec ullamcorper nulla
          </p>
        </div>
        <div className="p-4 border-t border-b text-xs text-gray-700">
          <span className="flex items-center mb-1">
            <label className="h-7 y-7">
              <JobOutlineIcon />
            </label>
            <span className="ml-3">3 Jobs</span>
          </span>
          <span className="flex items-center mt-2">
            <label className="h-7 y-7">
              <CommentOutlineIcon />
            </label>
            <span className="ml-3">3 Reviews</span>
          </span>
        </div>
      </a>
    </div>
  )
}

export default BussinessCard
