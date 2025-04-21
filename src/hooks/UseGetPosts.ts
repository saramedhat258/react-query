
import axios from 'axios'
import { useQuery, UseQueryResult /* typescript */ } from '@tanstack/react-query' /* دي اللي بعمل بيها الكويري */
import { PostType } from '@/types/types'
import { postStatus } from '@/types/types'

export const fetchPosts = async (selctedStatus: postStatus, paginate: number): Promise<PostType[]> => {                      /*usequery دي الفانكشن اللي بجيب بيها الداتا وبديها ل */
    if (selctedStatus === 'all' ) {
        const posts = await axios.get<PostType[]>(`http://localhost:3001/posts?_page=${paginate}&_per_page=5`)
        return posts.data
    } else {
        const posts = await axios.get<PostType[]>(`http://localhost:3001/posts?status=${selctedStatus}`)
        return posts.data
    }

}

/* custom hook */
const UseGetPosts = (selctedStatus: postStatus,paginate:number): UseQueryResult<PostType[]> => {
    const query = useQuery({
        queryKey: ['posts', { selctedStatus,paginate }],        /* should be unique change it to fetch new end point */
        queryFn: () => fetchPosts(selctedStatus,paginate),
        staleTime: 1000 * 30,
        refetchInterval: 1000 * 60,
    });
    return query
}

export default UseGetPosts