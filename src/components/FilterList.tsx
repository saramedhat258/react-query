import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { postStatus} from "@/types/types"

interface propsType {
    selctedStatus: postStatus;
    setSelectedStatus: (value: postStatus) => void
}

function FilterList({ selctedStatus, setSelectedStatus }: propsType) {
    

    return (
        <>
            <Select value={selctedStatus} onValueChange={(value)=>setSelectedStatus(value as postStatus)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter By Status" />
                </SelectTrigger>
                <SelectContent >
                    <SelectGroup  >
                        <SelectItem value="all">all</SelectItem>
                        <SelectItem value="published">published</SelectItem>
                        <SelectItem value="draft">draft</SelectItem>
                        <SelectItem value="block">block</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default FilterList