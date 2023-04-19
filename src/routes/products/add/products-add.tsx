import React, { useEffect, useState } from "react";

import { ProductsAddForm } from "../../../models/products";
import { SubcategoriesResponse, Subcategory } from "../../../models/subcategories";
import useTokenJwt from "../../../stores/token-jwt";
import { ROLES } from "../../../utils/constants";
import { MyFetch } from "../../../utils/my-fetch";
import ProductsAddVariant from "./products-add-variant";


function ProductsAdd() {
    const [ message, setMessage ] = useState("");
    const [ state, setState ] = useState<Subcategory[]>([]);
    const [ form, setForm ] = useState<ProductsAddForm>(
        {
            "name": "", 
            "price": "", 
            "category": "foods",
            "subcategory": "-1",
            "roles": [],
            "variants": []
        }
    );
    const { tokenJwt } = useTokenJwt();

    const getData = () => {
        const option = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenJwt}`
            }
        };

        MyFetch(`subcategories/`, option).then(
            (r: SubcategoriesResponse) => {
                if (r.error) {
                    setMessage(r.message);
                    return;
                }

                setState(r.categories);
            }
        );
    }

    useEffect(() => {
        getData();
    }, []);

    let rolesSelect: JSX.Element[] = [];
    let subcategoriesList: JSX.Element[] = [];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}));
    }

    const handleChangeRoles = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const name = event.target.name;
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setForm(values => ({...values, [name]: value}));
    }

    ROLES.forEach((v, i) => {
        rolesSelect.push(<option value={v} key={i}>{v}</option>);
    })

    for (let x of state) {
        subcategoriesList.push(<option value={x.id} key={x.id}>{x.name}</option>);
    };

    return (
        <div className="container mt-4">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
            <form>
                <div className="mb-3">
                    <label htmlFor="NameField" className="form-label"><strong>Name:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        id="NameField"
                        name="name"
                        value={form.name}
                        placeholder="Name of new Product"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="PriceField" className="form-label"><strong>Price:</strong></label>
                    <input
                        type="number"
                        min="0.00"
                        step="0.05"
                        className="form-control"
                        id="PriceField"
                        name="price"
                        value={form.price}
                        placeholder="Price of new Product"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="CategoryField" className="form-label"><strong>Category:</strong></label>
                    <select 
                        className="form-select" 
                        id="CategoryField" 
                        name="category" 
                        value={form.category} 
                        onChange={handleChange}
                    >
                        <option value="foods">foods</option>
                        <option value="drinks">drinks</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="SubcategoryField" className="form-label"><strong>Subcategory:</strong></label>
                    <select 
                        className="form-select" 
                        id="SubcategoryField"
                        name="subcategory"
                        value={form.subcategory}
                        onChange={handleChange}
                    >
                        <option value="-1">Select a Subcategory</option>
                        {subcategoriesList}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="RolesField" className="form-label"><strong>Roles:</strong></label>
                    <select 
                        multiple 
                        className="form-select" 
                        id="RolesField"
                        name="roles"
                        value={form.roles}
                        onChange={handleChangeRoles}
                    >
                        {rolesSelect}
                    </select>
                </div>
                <ProductsAddVariant form={form} setForm={setForm} />
            </form>
        </div>
    );
}

export default ProductsAdd;
