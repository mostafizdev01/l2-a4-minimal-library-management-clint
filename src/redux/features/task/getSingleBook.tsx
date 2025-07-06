// import { useGetSingleBookQuery } from "@/redux/api/baseApi"

import { Button } from "@/components/ui/button";
import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router"

export default function GetSingleBook() {

    const { id } = useParams();
    const navigate = useNavigate()

    const { data, isLoading } = useGetSingleBookQuery(id)

    if (isLoading) {
        return <div>Loading...</div>
    }


    return (
        <>
            <div className="max-w-xl mx-auto rounded-xl overflow-hidden shadow-xl mt-30">
                <div className="p-6">
                    <div className=" flex justify-between">
                        <h2 className="font-extrabold text-3xl mb-3 text-cyan-500 leading-tight">{data && data?.data?.title}</h2>
                        <Button onClick={()=> navigate(-1)} className=" cursor-pointer" variant={"outline"}>Back</Button>
                    </div>
                    <p className="text-gray-100 text-lg mb-1"><span className="font-semibold text-cyan-500">Author:</span> {data && data?.data?.author}</p>
                    <p className="text-gray-100 text-lg mb-1"><span className="font-semibold text-cyan-500">Genre:</span> {data && data?.data?.genre}</p>
                    <p className="text-gray-100 text-lg mb-1"><span className="font-semibold text-cyan-500">Available:</span> <span className="text-green-600 font-bold">{String(data && data?.data?.available)}</span></p>
                    <p className="text-gray-100 text-lg mb-1"><span className="font-semibold text-cyan-500">Copies:</span> {data && data?.data?.copies}</p>
                    <p className="text-gray-100 text-lg mb-4"><span className="font-semibold text-cyan-500">ISBN:</span> {data && data?.data?.isbn}</p>

                    <div className="border-t border-blue-200 pt-4 mt-4">
                        <p className="text-gray-100 text-base leading-relaxed">
                            <span className="font-bold text-cyan-500">Description:</span> {data?.data?.description}
                        </p>
                        <div className=" text-end">
                            <Button variant={"custom"}>Borrow</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
