import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/root";
import Login from "../routes/login";


const routers = createBrowserRouter(
    [
        {
            "path": "/",
            "element": <Root />,
            children: [
                {
                    "path": "/login",
                    element: <Login />
                }
            ]
        }
    ]
);


export default routers;
