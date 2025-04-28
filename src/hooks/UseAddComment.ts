
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { comment, commentResponse } from "@/types/types"

const addComment = async (data: comment): Promise<commentResponse> => {
    const response = await axios.post<commentResponse>(`http://localhost:3001/comments`, data)
    return response.data
}

const UseAddComment = (): UseMutationResult<commentResponse,AxiosError,comment> => {
    const queryclient=useQueryClient()
    return useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryclient.invalidateQueries({queryKey:['comments'],exact:false})
        }
    })
}
export default UseAddComment