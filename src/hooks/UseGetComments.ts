import { commentResponse } from "@/types/types"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import axios from "axios"

const getComments = async (postID: string): Promise<commentResponse[]> => {
    const comments=await axios.get<commentResponse[]>
    (`http://localhost:3001/comments?post_id=${postID}&_sort=id&_order=desc`)
    return comments.data
}

const UseGetComments = (postID:string):UseQueryResult<commentResponse[]> => {
    return useQuery({
        queryKey:['comments',{postID:+postID}],
        queryFn:()=>getComments(postID)
    })
}

export default UseGetComments