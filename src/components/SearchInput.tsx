import React, { useState } from 'react'

interface proptype {
    setSelctedQuery: (value: string) => void
}
function SearchInput({ setSelctedQuery }: proptype) {
    const [Query, setQuery] = useState('')
    const querySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelctedQuery(Query);
        
    };
    return (
        <>
            <form action="" onSubmit={querySubmit}>
                <input type="text" placeholder='search' onChange={(e) => setQuery(e.target.value)} className='rounded-md p-1 mb-5 border-2 border-gray-300' />
                <button type="submit" className="hidden">Submit</button>
            </form>
        </>
    )
}

export default SearchInput