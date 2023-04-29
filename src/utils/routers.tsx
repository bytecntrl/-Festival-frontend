import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Login from "../routes/login";
import ProductsAdd from "../routes/products/add/products-add";
import Products from "../routes/products/products";
import Root from "../routes/root";
import Subcategories from "../routes/subcategories/subcategories";
import Users from "../routes/users/users";
import ProductsEdit from "../routes/products/edit/products-edit";


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
                },
                {
                    path: "/subcategories",
                    element: <Subcategories />
                },
                {
                    path: "/products",
                    element: <Products />
                },
                {
                    path: "/products/:productId",
                    element: <ProductsEdit />
                },
                {
                    path: "/products/add",
                    element: <ProductsAdd />
                },
            ]
        }
    ]
);


export default routers;
