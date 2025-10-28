import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDeleteSingleBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { ArrowRight, Trash2 } from "lucide-react";
import type { IBook } from "@/types";
import { Link } from "react-router";
import AddTaskModal from "./AddTaskModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "react-toastify";
import UpdateBookModal from "./updateBookModal";
import AddBorrowModal from "../borrow/AddBorrowModal";
import { PaginationDemo } from "@/components/pagination/Pagination";
import { toast } from "sonner";
import { useState } from "react";

// import type { IBook } from "@/types";
// import { Trash2 } from "lucide-react";
// import { deleteTask } from "./taskSlice";



export default function TaskCard() {
    const [page, setPage] = useState(1)
    const limit = 4;
    const { data, isLoading } = useGetBooksQuery({page, limit})
    const [deleteSingleBook] = useDeleteSingleBookMutation();

    
    const books = data ?? [];
    const totalPage = data?.totalPage || 1;
    
    
    if (isLoading) {
        return <div>Loading...</div>
    }


    const handleDeleteConfirm = (id: string) => {
        toast.info(
            <div className="p-2">
                <p className="text-lg font-semibold text-gray-800 mb-3">
                    🗑️ Are you sure you want to delete this book?
                </p>

                <div className="flex justify-end gap-3 mt-3">
                    <button
                        onClick={async () => {
                            try {
                                const res = await deleteSingleBook(id).unwrap();
                                if (res.success) {
                                    toast.dismiss(); // hide confirm toast
                                    toast.success(res.message, {
                                        position: "top-center",
                                    });
                                }
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            } catch (error: any) {
                                const errorMessage =
                                    error?.data?.message ||
                                    "Something went wrong while deleting.";
                                toast.dismiss();
                                toast.error(errorMessage, {
                                    position: "top-center",
                                });
                            }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                    >
                        Yes, Delete
                    </button>

                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm transition-all duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
                className: "rounded-xl shadow-lg border border-gray-200",
            }
        );
    };

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
                <TableCaption><PaginationDemo
                 currentPage={page}
                 totalPages={totalPage}
                 paginationFunc={setPage} 
                 />
                 
                 </TableCaption>
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
                                    <AddBorrowModal bookData={[book.copies, book._id, new Date(), undefined]} />
                                    <Link to={`/singlebook/${book._id}`}>
                                        <Button className=" cursor-pointer shadow-blue-500 " variant={"secondary"}>View book <ArrowRight className="  text-blue-500 cursor-pointer" /></Button>
                                    </Link>
                                    <UpdateBookModal id={book._id} />
                                    <Trash2 onClick={() => handleDeleteConfirm(book._id)} className="text-red-500 cursor-pointer" />
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
