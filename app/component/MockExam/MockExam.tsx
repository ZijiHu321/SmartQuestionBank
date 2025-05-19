import React from 'react'
import { useState } from 'react'
import SearchItem from './SearchItem'

const MockExam = () => {
    const [search, setSearch] = useState<string>('')
  return (
    <div>
        <header> 
            <h1>Mock Examaminations</h1>
        </header>

        <SearchItem
        search={search}
        setSearch={setSearch}
        />
    </div>



  )
}

export default MockExam