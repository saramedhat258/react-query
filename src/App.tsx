import { useState } from "react"
import FilterList from "./components/FilterList"
import TableData from "./components/TableData"
import { postStatus } from "./types/types"
import SearchInput from "./components/SearchInput"

function App() {
  const [selctedStatus,setSelectedStatus]=useState<postStatus>('all')
  const [selectedQuery,setSelctedQuery]=useState('')
  return (
    <>
    <div className=" flex gap-5 w-3/4 m-auto mt-20">
      <TableData selctedStatus={selctedStatus} selectedQuery={selectedQuery} />
      <div>
        <SearchInput setSelctedQuery={setSelctedQuery} />
        {selectedQuery.length===0&&
        <FilterList selctedStatus={selctedStatus} setSelectedStatus={setSelectedStatus}  />
        }
        
      </div>
      
    </div>
      
    </>
  )
}

export default App
