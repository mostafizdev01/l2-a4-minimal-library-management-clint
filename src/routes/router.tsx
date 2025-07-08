import App from "@/App";
import BorrowData from "@/redux/features/borrow/borrowData";
import GetSingleBook from "@/redux/features/task/getSingleBook";
import TaskCard from "@/redux/features/task/taskCard";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <TaskCard />,
                // or ther way routing setup..
                // default routs..
                // {index: true, Component: <App />}
                // way two(2) route...
                // {path: "about", Component: <App />}
            },
            {
                path: "/books",
                element: <TaskCard />,
            },
            {
                path: "/borrow",
                element: <BorrowData />,
            },
            {
                path: "/singlebook/:id",
                element: <GetSingleBook />,
            },
            {
                path: "/portfolio",
                element: <div>Well to portfolio page</div>,
            },
            {
                path: "/contact",
                element: <div>Well to contact page</div>,
            }
        ]
    },
    {
        path: "*",
        element: <div>Route not found!</div>
    }
])