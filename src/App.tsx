import { Outlet } from "react-router"
import Footer from "./pages/footer.js";
import Navbar from "./navbar/navbar.js";

export default function App() {
  // const tasks = useAppSelector(selectTask)
  // const disPatch = useAppDispatch()
  // const {data, isLoading} = useGetBooksQuery(undefined, {
  // pollingInterval: 1000, ===>> /// pollingInterval is call useGetTasksQuery on after 1 sec. it's working in see your score.
  // refetchOnFocus: true, ===>> When you edit anything this page,then the page will reload.
  // refetchOnMountOrArgChange: true, ===>> When you go from one page to another, the page will reload.
  // refetchOnReconnect: true ===>> If the internet goes down, it will auto reload when it comes back up.
  // });

  return (
    <>
      <Navbar />
      <div className="container mx-auto mb-20"><Outlet /></div>
      <Footer />
    </>
  )
}
