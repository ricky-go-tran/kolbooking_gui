const KOL = () => {
  return (
    <div
      className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <a href="#!">
        <img
          className="rounded-t-lg"
          src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
          alt="" />
      </a>
      <div className="p-6">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Name KOL
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button className="bg-blue-400 hover:bg-blue-300 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          View Details
        </button>
      </div>
    </div>
  )
}
export default KOL
