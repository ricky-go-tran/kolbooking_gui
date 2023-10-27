import KOLSearch from "../../../components/general/kols/KOLSearch"
import KOLs from "../../../components/general/kols/KOLs"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { getProxy } from "../../../utils/PathUtil"
import { SearchKolHomepageContext } from "../../../contexts/SearchKolHomepageContext"
import { Loading } from "../../../components/general/loading/Loading"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import KolFilterModal from "../../../components/general/modal/KolFilterModal"
import { FilterKol } from "../../../global_variable/global_type"

const KOL = () => {
  const [kols, setKols] = useState([])
  const [filter, setFilter] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [pageTable, setPageTable] = useState(1)
  const { kolSearch } = useContext(SearchKolHomepageContext)
  const [loading, setLoading] = useState(false)
  const { setErrorCode } = useContext(ErrorContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const [filterData, setFilterData] = useState<FilterKol>({
    follow: {
      min: 0,
      max: 0,
    },
    like: {
      min: 0,
      max: 0,
    },
    industry: [],
  })
  const [submit, setSubmit] = useState<FilterKol | null>(null)

  useEffect(() => {
    const config: any = {
      params: {
        page: {
          number: pageTable,
          size: 8,
        },
        search: kolSearch,
        filter: filterData,
      },
    }
    axios
      .get(getProxy("/api/v1/kols"), config)
      .then((response) => {
        setKols(response.data.data)
        const meta = response.data.meta
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
        setLoading(true)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [pageTable, kolSearch, submit])

  return (
    <>
      <KOLSearch setFilter={setFilter} />
      {loading === false && <Loading />}
      {loading === true && (
        <KOLs
          kols={kols}
          resultsPerPage={resultsPerPage}
          totalResults={totalResults}
          setPageTable={setPageTable}
        />
      )}
      {filter === true && (
        <KolFilterModal
          filter={filterData}
          onSubmit={setSubmit}
          setFilterKol={setFilterData}
          onClose={setFilter}
        />
      )}
    </>
  )
}

export default KOL
