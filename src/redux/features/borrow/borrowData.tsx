import { useGetBorrowQuery } from "@/redux/api/baseApi"

export default function BorrowData() {
    const {data} = useGetBorrowQuery(undefined)
    console.log("this is borrow data: ",data);
    console.log("this is borrow here")
    
  return (
    <>
    
    </>
  )
}
