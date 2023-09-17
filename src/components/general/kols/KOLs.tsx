import KOL from "./KOL"
import { Pagination } from '@windmill/react-ui'

const KOLs = () => {
  return (
    <div className="container mx-auto">
      <div className="container grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mx-auto pt-6">
        <KOL />
        <KOL />
        <KOL />
        <KOL />
        <KOL />
        <KOL />
        <KOL />
        <KOL />

      </div>
      <div className="my-5 px-4 py-3 border-t dark:border-gray-700 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800">
        <Pagination
          totalResults={120}
          resultsPerPage={10}
          onChange={() => { }}
          label="Page navigation"
        />
      </div>
    </div>
  )
}

export default KOLs;
