
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { PostType } from "@/types/types"
import axios from "axios"

const fetchSearch = async (q: string): Promise<PostType[]> => {
    const search = await axios.get(`http://localhost:3001/posts?q=${q}`)
    return search.data
}
const UseSearch = (q: string): UseQueryResult<PostType[]> => {
    return useQuery({
        queryKey: ["posts","search", {q}],
        queryFn: () => fetchSearch(q),
        staleTime: 1000 * 60 * 5,
        enabled: q.length > 0
    })
}

export default UseSearch