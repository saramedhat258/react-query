import { useSearchParams } from "react-router-dom"
import UseGetPost from "@/hooks/UseGetPost"
import React, { useState } from "react"
import UseAddComment from "@/hooks/UseAddComment"
import UseGetComments from "@/hooks/UseGetComments"

function Info() {
    const [searchParams] = useSearchParams()
    const [comment, setComment] = useState('')

    const id = searchParams.get("id") as string
    const paramType = searchParams.get("type") as string
    const paramkey = searchParams.get("key") as string
    const { data, isError, error, isLoading } = UseGetPost(id, paramkey, paramType)

    const addcomment = UseAddComment()
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addcomment.mutate(
            { body: comment, postID: +id },
            {
                onSuccess: () => {
                    setComment('')
                }
            }
        )
    }

    const getComments = UseGetComments(id)

    if (isLoading) {
        return <p>loading please wait</p>;
    }

    if (isError) {
        return <div>error: {error.message}</div>;
    }
    console.log(getComments.data)
    return (
        <div className="w-3/4 m-auto my-26">
            <h4 className="text-4xl font-semibold">Title: {data?.title}</h4>
            <p className="text-2xl">Status: {data?.status}</p>
            <p className="text-2xl ">Top Rate: {data?.topRate ? "true" : "false"}</p>
            <p className="text-lg mt-2">Body: {data?.body}</p>
            <hr className="my-5" />
            <h4 className="mb-1">Comments:</h4>
            <form onSubmit={submitHandler} className="flex gap-5 mb-5" >
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className="border-2 p-3 border-zinc-400 rounded-xl" />
                <button type="submit" disabled={addcomment.isPending} className="border-2 border-black text-black p-2 rounded-xl">Add Comment</button>
            </form>
            <div className="flex flex-col gap-5">
                {getComments.data?.map(e =>
                    e.postID === +id && <p key={e.id}>{e.body}</p>

                )}
            </div>
        </div>
    )
}

export default Info