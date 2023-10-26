import Empty from "../empty/Empty"
import KOL from "./KOL"
import { Pagination } from "@windmill/react-ui"

const KOLs = ({
  kols,
  totalResults,
  resultsPerPage,
  setPageTable,
}: {
  kols: any[]
  totalResults: number
  resultsPerPage: number
  setPageTable: React.Dispatch<React.SetStateAction<number>>
}) => {
  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  return (
    <>
      {kols.length > 0 && (
        <div className="container mx-auto pt-6">
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
              {kols.map((kol: any) => {
                return <KOL key={kol.id} kol={kol.attributes} />
              })}
            </div>
            <div className="my-5 px-4 py-3 border-t dark:border-gray-700 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800">
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={onPageChangeTable}
                label="Page navigation"
              />
            </div>
          </>
        </div>
      )}
      {kols.length === 0 && (
        <div className="w-full flex flex-col justify-between items-center">
          <Empty />
        </div>
      )}
    </>
  )
}

export default KOLs
