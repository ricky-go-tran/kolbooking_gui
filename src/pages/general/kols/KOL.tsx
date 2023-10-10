import KOLSearch from "../../../components/general/kols/KOLSearch"
import KOLs from "../../../components/general/kols/KOLs"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { getProxy } from "../../../utils/PathUtil"
import { SearchKolHomepageContext } from "../../../contexts/SearchKolHomepageContext"

const KOL = () => {
  const [kols, setKols] = useState([])
  const [meta, setMeta] = useState({})
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [pageTable, setPageTable] = useState(1)
  const { kolSearch, setKolSearch } = useContext(SearchKolHomepageContext)

  useEffect(() => {
    let config: any = {
      params: {
        page: {
          number: pageTable,
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
      })
      .catch((error) => {
        console.log(error)
      })
  }, [pageTable, kolSearch])

  return (
    <>
      <KOLSearch />
      <KOLs
        kols={kols}
        resultsPerPage={resultsPerPage}
        totalResults={totalResults}
        setPageTable={setPageTable}
      />
    </>
  )
}

export default KOL
