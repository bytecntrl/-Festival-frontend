import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Product, ProductsGetById, ProductsEditForm } from "../../../models/products";
import useTokenJwt from "../../../stores/token-jwt";
import { MyFetch } from "../../../utils/my-fetch";
import ProductsEditPrice from "./products-edit-price";


function ProductsEdit() {
    const { productId } = useParams();

    const [ message, setMessage ] = useState("");
    const [ state, setState ] = useState<Product>({
        id: 0,
        name: "",
        price: 0,
        category: "",
        subcategory_id: 0,
        roles: [],
        variant: [],
        ingredient: []
    });
    const [ form, setForm ] = useState<ProductsEditForm>({
        price: "",
        roles: [],
        variants: [],
        ingredients: []
    })

    const { tokenJwt } = useTokenJwt();

    const getData = () => {
        const option = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenJwt}`
            }
        };

        MyFetch(`products/${productId}`, option).then(
            (r: ProductsGetById) => {
                if (r.error) {
                    setMessage(r.message);
                    return;
                }

                setState(r.product);
            } 
        );
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mt-4">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
            <h2>{state.name}</h2>
	        <p className="form-label"><strong>Price: </strong>{state.price}</p>
            <ProductsEditPrice 
                state={state}
                setState={setState} 
                form={form} 
                setForm={setForm} 
                setMessage={setMessage}
                tokenJwt={tokenJwt} 
            />
        </div>
    );
}


export default ProductsEdit;
