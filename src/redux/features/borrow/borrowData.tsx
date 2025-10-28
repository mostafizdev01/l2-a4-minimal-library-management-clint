
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowQuery } from "@/redux/api/baseApi"

interface BorrowProps {
    totalQuantity: number,
    dueDate: string,
    book: {
        title: string,
        isbn: string,
    }
}

export default function BorrowData() {
    const { data } = useGetBorrowQuery(undefined)

    const borrows = data ?? [];
   
    return (
        <>
            <Table className=" mt-15 w-7xl mx-auto">
                <TableCaption></TableCaption>
                <TableHeader className=" bg-slate-800">
                    <TableRow>
                        <TableHead className="">TotalQuantity</TableHead>
                        <TableHead className="text-left">Title</TableHead>
                        <TableHead className="text-left">Isbn</TableHead>
                        <TableHead className="text-right">DueDate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        borrows?.data?.map((borrow: BorrowProps, index: number) =>
                            <TableRow key={index} className=" font-semibold">
                                <TableCell className="font-semibold">{borrow?.totalQuantity}</TableCell>
                                <TableCell>{borrow?.book?.title}</TableCell>
                                <TableCell>{borrow?.book?.isbn}</TableCell>
                                <TableCell className=" text-right">{new Date(borrow.dueDate).toLocaleDateString()}</TableCell>
                                {/* <TableCell className="text-right text-red-500"><Trash2 /></TableCell> */}
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )
}
