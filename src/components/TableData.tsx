import UseGetPosts from "@/hooks/UseGetPosts"
import { Table, TableCell, TableBody, TableCaption, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Switch } from "./ui/switch"
import { Button } from "./ui/button"
import { postStatus, PostType } from "@/types/types"
import UseSearch from "@/hooks/UseSearch"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { fetchPosts } from "@/hooks/UseGetPosts"
interface propType {
    selctedStatus: postStatus;
    selectedQuery: string
}
function TableData({ selctedStatus, selectedQuery }: propType) {

    const [paginate, setPaginate] = useState(1)
    const QuerClient=useQueryClient()
    /* دي حاجات بترجعها الكويري يعني مضرطتش اعمل ستيت اخزن فيها الداتا وبتجبلي كمان الايرور او اللودينج */
    const { isLoading, error, isError, data } = UseGetPosts(selctedStatus, paginate)
    const search = UseSearch(selectedQuery)

    /* prefetch data */
    useEffect(()=>{
        const nextPaginate=paginate+1;
        if(nextPaginate>3)return;
        QuerClient.prefetchQuery({
            queryKey:['posts', { selctedStatus:'all',paginate:nextPaginate }],
            queryFn:()=>fetchPosts('all',nextPaginate)
        })
    },[QuerClient,paginate])

    if (isLoading || search.isLoading) {
        return <div>loading</div>
    }
    if (isError) {
        return <div>error: {error.message}</div>
    }
    if (search.isError) {
        return <div>error: {search.error.message}</div>
    }

    return (
            <>
            <Table>
                <TableCaption>Post table React Query + Shadcn practice</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>title</TableHead>
                        <TableHead>status</TableHead>
                        <TableHead >top-rate</TableHead>
                        <TableHead >Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedQuery.length === 0 && selctedStatus==='all' ?
                        data?.data.map((el:PostType, index:number) => {
                            return (
                                <TableRow key={el.id}>
                                    <TableCell className="font-medium">{++index}</TableCell>
                                    <TableCell><Link to='/info'>{el.title}</Link></TableCell>
                                    <TableCell>{el.status}</TableCell>
                                    <TableCell><Switch checked={el.topRate} /></TableCell>
                                    <TableCell ><Button variant="destructive">delete</Button></TableCell>
                                </TableRow>
                            )
                        })
                        :data?.map((el, index) => {
                            return (
                                <TableRow key={el.id}>
                                    <TableCell className="font-medium">{++index}</TableCell>
                                    <TableCell><Link to='/info'>{el.title}</Link></TableCell>
                                    <TableCell>{el.status}</TableCell>
                                    <TableCell><Switch checked={el.topRate} /></TableCell>
                                    <TableCell ><Button variant="destructive">delete</Button></TableCell>
                                </TableRow>
                            )
                        })
                    }
                    {
                        selectedQuery.length > 0 &&
                        search.data?.map((el, index) => {
                            return (
                                <TableRow key={el.id}>
                                    <TableCell className="font-medium">{++index}</TableCell>
                                    <TableCell>{el.title}</TableCell>
                                    <TableCell>{el.status}</TableCell>
                                    <TableCell><Switch checked={el.topRate} /></TableCell>
                                    <TableCell ><Button variant="destructive">delete</Button></TableCell>
                                </TableRow>
                            )

                        })
                    }
                </TableBody>
                {
                    selectedQuery.length === 0 && selctedStatus === 'all' &&
                    <div className="flex rounded-lg border-gray-100 border-2 bg-gray-100">
                        <button onClick={() => setPaginate(1)} className="bg-gray-100 p-3">1</button>
                        <button onClick={() => setPaginate(2)} className="bg-gray-100 p-3">2</button>
                        <button onClick={() => setPaginate(3)} className="bg-gray-100 p-3">3</button>
                    </div>
                }
            </Table>

        </>
    )
}

export default TableData