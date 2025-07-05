// import { cn } from "@/lib/utils";
// import { useAppDispatch, useAppSelector } from "@/redux/middlewares/hook";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BookmarkPlus, SquarePen, Trash2 } from "lucide-react";
// import type { IBook } from "@/types";
// import { Trash2 } from "lucide-react";
// import { deleteTask } from "./taskSlice";


export default function TaskCard({ books }) {

    // const { title, description, author, copies, genre } = book;
    console.log(books.data);


    // const disPatch = useAppDispatch()
    // const users = useAppSelector((state) => state.user.users)

    // const assignUser = users.find((user)=> user.id === userId);
    // console.log(assignUser);


    return (
        <>
            <Table className=" mt-20">
                <TableCaption>A list of your recent books.</TableCaption>
                <TableHeader>
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
                        books?.data?.map((book, index) => 
                            <TableRow className=" font-semibold" key={index}>
                                <TableCell className="font-semibold">{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell className={cn("font-semibold", {
                                    "text-blue-500" : book.genre === "SCIENCE",
                                    "text-cyan-500" : book.genre === "FICTION",
                                    "text-fuchsia-600" : book.genre === "FANTASY",
                                    "text-violet-700" : book.genre === "BIOGRAPHY",
                                })}>{book.genre}</TableCell>
                                <TableCell className={cn("text-right", book.available === true ? "text-green-500 font-semibold" : "text-red-500 font-bold")}>{String(book?.available)}</TableCell>
                                <TableCell className="text-right">{book?.copies}</TableCell>
                                <TableCell className="text-right">{book?.isbn}</TableCell>
                                <TableCell className="text-right flex justify-between ml-10"><Button className=" cursor-pointer shadow-lime-500 " variant={"secondary"}>Borrow <BookmarkPlus className="  text-lime-500 cursor-pointer" /></Button><SquarePen className="  text-yellow-500 cursor-pointer" /> <Trash2 className="text-red-500 cursor-pointer" /></TableCell>
                                {/* <TableCell className="text-right text-red-500"><Trash2 /></TableCell> */}
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>

        </>
    )
}
