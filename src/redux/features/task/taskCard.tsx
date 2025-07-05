// import { cn } from "@/lib/utils";
// import { useAppDispatch, useAppSelector } from "@/redux/middlewares/hook";
import type { IBook } from "@/types";
import { Delete, Trash2 } from "lucide-react";
import { deleteTask } from "./taskSlice";

interface IProps {
    book: IBook
}

export default function TaskCard({ book }: IProps) {

    const {id, title, description, author, copies, genre } = book;

    // const disPatch = useAppDispatch()
    // const users = useAppSelector((state) => state.user.users)

    // const assignUser = users.find((user)=> user.id === userId);
    // console.log(assignUser);


    return (
        <>
            <div className="border rounded-2xl p-4 flex  justify-between shadow-sm w-full">
                {/* Left Side */}
                <div className=" flex  items-center gap-2">
                    {/* <div className={cn("size-3 rounded-full", {
                       "bg-green-600" : priority === "high",
                       "bg-yellow-600" : priority === "medium",
                       "bg-red-600" : priority === "low",
                    })}></div> */}
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-gray-100">{title}</div>
                            <p className="text-gray-100 text-base mb-2">
                                <span className="font-semibold">Author:</span> {author}
                            </p>
                            <p className="text-gray-100 text-base mb-2">
                                <span className="font-semibold">Copies Available:</span> {copies}
                            </p>
                            <p className="text-gray-100 text-base mb-2">
                                <span className="font-semibold">Genre:</span> {genre}
                            </p>
                            <p className="text-gray-100 text-base text-justify">
                                <span className="font-semibold">Description:</span> {description}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">#fiction</span>
                            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-800 mr-2 mb-2">#adventure</span>
                            <span className="inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-purple-800 mb-2">#classNameic</span>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="">
                    {/* <input 
                        type="checkbox"
                        className=" cursor-pointer appearance-none w-4 h-4 bg-transparent border border-gray-400 rounded-sm checked:bg-blue-500 checked:border-transparent focus:outline-none"
                    /> */}

                    <button className="text-red-500 hover:text-red-700 cursor-pointer">
                        <Trash2 onClick={() => disPatch(deleteTask(id))} />
                    </button>
                </div>
            </div>

        </>
    )
}
