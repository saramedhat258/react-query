import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { PostType } from "@/types/types"
import axios from "axios"

const fetchPost = async (id: string): Promise<PostType> => {
    const response = await axios.get<PostType>(`http://localhost:3001/posts/${id}`)
    return response.data
}

const UseGetPost = (id: string, paramKey: string, paramType: string): UseQueryResult<PostType> => {
    const queryClient = useQueryClient()
    let cachedData: PostType[] | undefined
    if (paramType === 'paginate') {
        cachedData = queryClient.getQueryData(['posts', { paginate: +paramKey, selctedStatus: 'all' }])
        console.log(cachedData)
    } else {
        cachedData = queryClient.getQueryData(['posts', 'search', { q: paramKey }])
    }
    return useQuery({
        queryKey: ['posts', { id: +id }],
        queryFn: () => fetchPost(id),
        initialData: () => {
            if (!cachedData) {
                return undefined
            }
            else {
                const data=cachedData.data.find(e=>e.id===+id)
                console.log(data)
                return data
            }
        }
    })
}
export default UseGetPost