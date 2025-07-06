import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDeleteSingleBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { ArrowRight, Trash2 } from "lucide-react";
import type { IBook } from "@/types";
import { Link } from "react-router";
import AddTaskModal from "./AddTaskModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import UpdateBookModal from "./updateBookModal";
import AddBorrowModal from "../borrow/AddBorrowModal";

// import type { IBook } from "@/types";
// import { Trash2 } from "lucide-react";
// import { deleteTask } from "./taskSlice";



export default function TaskCard() {

    const { data, isLoading } = useGetBooksQuery(undefined)
    const [ deleteSingleBook ] = useDeleteSingleBookMutation();

    const books = data ?? [];


    if (isLoading) {
        return <div>Loading...</div>
    }

    // delete book functionality
    const handleDelete = async (id: string) => {
        try{
          const res = await deleteSingleBook(id).unwrap();
          if(res.success){
            toast.success(res.message)
          }
          
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error: any){
            const errorMessage = error?.data?.message || "Something went wrong while deleting.";
            toast.error(errorMessage)
        }
    }



    return (
        <>

            <div className="  container gap-5 mx-auto mt-30">
                <div className=" flex justify-between">
                    <span className=" font-bold text-xl">Books Data</span>
                    <div className="flex gap-3">
                        <Tabs defaultValue="all">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="low">Low</TabsTrigger>
                                <TabsTrigger value="medium">Medium</TabsTrigger>
                                <TabsTrigger value="high">High</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <AddTaskModal />
                        {/* <AddUserModal /> */}
                    </div>
                </div>
            </div>

            <Table className=" mt-15">
                <TableCaption>A list of your recent books.</TableCaption>
                <TableHeader className=" bg-slate-800">
                    <TableRow>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead className="text-right">Available</TableHead>
                        <TableHead className="text-right">Copies</TableHead>
                        <TableHead className="text-right">ISBN</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        books?.data?.map((book: IBook) =>
                            <TableRow key={book._id} className=" font-semibold">
                                <TableCell className="font-semibold">{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell className={cn("font-semibold", {
                                    "text-blue-500": book.genre === "SCIENCE",
                                    "text-cyan-500": book.genre === "FICTION",
                                    "text-fuchsia-600": book.genre === "FANTASY",
                                    "text-violet-700": book.genre === "BIOGRAPHY",
                                    "text-yellow-700": book.genre === "NON_FICTION",
                                    "text-emerald-500": book.genre === "HISTORY",
                                })}>{book.genre}</TableCell>
                                <TableCell className={cn("text-right", book.available === true ? "text-green-500 font-semibold" : "text-red-500 font-bold")}>{String(book?.available)}</TableCell>
                                <TableCell className="text-right">{book?.copies}</TableCell>
                                <TableCell className="text-right">{book?.isbn}</TableCell>
                                <TableCell className="text-right flex justify-between ml-10">
                                    <AddBorrowModal book={book.copies} />
                                    <Link to={`/singlebook/${book._id}`}>
                                        <Button className=" cursor-pointer shadow-blue-500 " variant={"secondary"}>View book <ArrowRight className="  text-blue-500 cursor-pointer" /></Button>
                                    </Link>
                                    <UpdateBookModal id={book._id} />
                                    <Trash2 onClick={()=> handleDelete(book._id)} className="text-red-500 cursor-pointer" />
                                </TableCell>
                                {/* <TableCell className="text-right text-red-500"><Trash2 /></TableCell> */}
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>

        </>
    )
}
