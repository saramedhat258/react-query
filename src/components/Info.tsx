import { useSearchParams } from "react-router-dom"
import UseGetPost from "@/hooks/UseGetPost"

function Info() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id") as string
    const paramType = searchParams.get("type") as string
    const paramkey = searchParams.get("key") as string

    const { data, isError, error, isLoading } = UseGetPost(id, paramkey, paramType)

    if (isLoading) {
        return <p>loading please wait</p>;
    }

    if (isError) {
        return <div>error: {error.message}</div>;
    }
    return (
        <div className="w-3/4 m-auto my-26">
            <h4 className="text-4xl font-semibold">Title: {data?.title}</h4>
            <p className="text-2xl">Status: {data?.status}</p>
            <p className="text-2xl ">Top Rate: {data?.topRate ? "true" : "false"}</p>
            <p className="text-lg mt-2">Body: {data?.body}</p>
            <hr className="my-5" />
            <h4 className="mb-1">Comments:</h4>
            <p>Comment 1</p>
            <p>Comment 2</p>
        </div>
    )
}

export default Info