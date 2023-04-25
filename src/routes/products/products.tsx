import React, { useState, useEffect } from "react";

import useTokenJwt from "../../stores/token-jwt";
import { MyFetch } from "../../utils/my-fetch";
import { ProductsGet, Product } from "../../models/products";
import ProductsList from "./products-list";


function Products() {
    const [ message, setMessage ] = useState("");
    const [ state, setState ] = useState<{[name: string]: Product[]}>({});

    const { tokenJwt } = useTokenJwt();

    const getData = () => {
        const option = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenJwt}`
            }
        };

        MyFetch(`products/`, option).then(
            (r: ProductsGet) => {
                if (r.error) {
                    setMessage(r.message);
                    return;
                }

                setState(r.products);
            } 
        );
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mt-4">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
            <ProductsList products={state} />
            <a className="btn btn-primary" href="/products/add" role="button">
                Add product
            </a>
        </div>
    );
}

export default Products;
