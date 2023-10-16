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

const KOL = () => {
  const [kols, setKols] = useState([])
  const [meta, setMeta] = useState({})
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [pageTable, setPageTable] = useState(1)
  const { kolSearch, setKolSearch } = useContext(SearchKolHomepageContext)
  const [loading, setLoading] = useState(false)
  const { setErrorCode } = useContext(ErrorContext)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)

  useEffect(() => {
    let config: any = {
      params: {
        page: {
          number: pageTable,
          items: 8,
        },
        search: kolSearch,
      },
    }
    axios
      .get(getProxy("/api/v1/kols"), config)
      .then((response) => {
        setKols(response.data.data)
        let meta = response.data.meta
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
        setLoading(true)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [pageTable, kolSearch])

  return (
    <>
      <KOLSearch />
      {loading === false && <Loading />}
      {loading === true && (
        <KOLs
          kols={kols}
          resultsPerPage={resultsPerPage}
          totalResults={totalResults}
          setPageTable={setPageTable}
        />
      )}
    </>
  )
}

export default KOL
