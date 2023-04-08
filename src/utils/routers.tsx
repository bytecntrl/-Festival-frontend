import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/root";
import Login from "../routes/login";
import Users from "../routes/users/users";


const routers = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/users",
                    element: <Users />
                }
            ]
        }
    ]
);


export default routers;
