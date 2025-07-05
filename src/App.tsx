import { Outlet } from "react-router"
import Navbar from "./components/ui/navbar/navbar"
import AddTaskModal from "./redux/features/task/AddTaskModal";
import AddUserModal from "./redux/features/user/AddUserModal.js"
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
// import { useGetTasksQuery } from "./redux/api/baseApi.js";
import TaskCard from "./redux/features/task/taskCard.js";
import type { IBook, ITask } from "./types.js";
import { useGetBooksQuery } from "./redux/api/baseApi.js";
import Footer from "./components/ui/pages/footer.js";

export default function App() {
  // const tasks = useAppSelector(selectTask)
  // const disPatch = useAppDispatch()
  const {data, isError, isLoading} = useGetBooksQuery(undefined, {
    // pollingInterval: 1000, ===>> /// pollingInterval is call useGetTasksQuery on after 1 sec. it's working in see your score.
    // refetchOnFocus: true, ===>> When you edit anything this page,then the page will reload.
    // refetchOnMountOrArgChange: true, ===>> When you go from one page to another, the page will reload.
    // refetchOnReconnect: true ===>> If the internet goes down, it will auto reload when it comes back up.
  });

  // console.log(data, isError, isLoading);
  
  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <div className=" grid grid-cols-3 container gap-5 mx-auto mt-30">
        <div className=" col-span-3 flex justify-between">
          <span className=" font-bold text-xl">Books</span>
          <div className="flex gap-3">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="low">Low</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger  value="high">High</TabsTrigger>
              </TabsList>
            </Tabs>
            <AddTaskModal />
            {/* <AddUserModal /> */}
          </div>
        </div>
        {
          !isLoading && data?.data?.map((book: IBook, index: number) => <TaskCard key={index} book={book} />)
        }

      </div>
      <div className="container mx-auto mb-20"><Outlet /></div>
      <Footer />
    </>
  )
}
