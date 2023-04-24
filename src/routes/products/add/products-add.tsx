import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { ProductsAddForm } from "../../../models/products";
import { SubcategoriesResponse, Subcategory } from "../../../models/subcategories";
import useTokenJwt from "../../../stores/token-jwt";
import { ROLES } from "../../../utils/constants";
import { MyFetch } from "../../../utils/my-fetch";
import ProductsAddIngredients from "./products-add-ingredients";
import ProductsAddVariant from "./products-add-variant";


function ProductsAdd() {
    const [ message, setMessage ] = useState("");
    const [ state, setState ] = useState<Subcategory[]>([]);
    const [ form, setForm ] = useState<ProductsAddForm>(
        {
            "name": "", 
            "price": "", 
            "category": "",
            "subcategory": "",
            "roles": [],
            "variants": [],
            "ingredients": []
        }
    );
    const { tokenJwt } = useTokenJwt();

    const navigate = useNavigate();

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setMessage("");

        const option = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokenJwt}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                name: form.name,
                price: +form.price,
                category: form.category,
                subcategory: +form.subcategory,
                roles: form.roles,
                variant: form.variants,
                ingredients: form.ingredients
            })
		};

        const response = await MyFetch("products/", option);

        if (response.error) {
            setMessage(response.message);

            setForm(
                {
                    "name": "", 
                    "price": "", 
                    "category": "",
                    "subcategory": "",
                    "roles": [],
                    "variants": [],
                    "ingredients": []
                }
            )

            return;
        }

        return navigate("/products");
    }

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
            <form onSubmit={handleSubmit} method="POST">
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
                        required
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
                        required
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
                        required
                    >
                        <option disabled value="">Select a Category</option>
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
                        required
                    >
                        <option disabled value="">Select a Subcategory</option>
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
                        required
                    >
                        {rolesSelect}
                    </select>
                </div>

                <ProductsAddVariant form={form} setForm={setForm} />
                <ProductsAddIngredients form={form} setForm={setForm} />

                <div className="mb-3">
			        <button className="btn btn-primary" type="submit">Save</button>
		        </div>
            </form>
        </div>
    );
}

export default ProductsAdd;
