import App from "@/App";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/about",
                element: <div>Well to About page</div>,
                // or ther way routing setup..
                // default routs..
                // {index: true, Component: <App />}
                // way two(2) route...
                // {path: "about", Component: <App />}
            },
            {
                path: "/service",
                element: <div>Well to service page</div>,
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