import React, { useState } from "react";

import { ROLES } from "../../../utils/constants";


function ProductsAdd() {
    const [ message, setMessage ] = useState("");
    const [ form, setForm ] = useState(
        {
            "name": "", 
            "price": "", 
            "category": 0,
            "roles": []
        }
    );

    let rolesSelect: JSX.Element[] = [];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}));
    }

    const handleChangeRoles = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const name = event.target.name;
        let value = Array.from(event.target.selectedOptions, option => Number(option.value));
        setForm(values => ({...values, [name]: value}));
    }

    ROLES.forEach((v, i) => {
        rolesSelect.push(<option value={i} key={i}>{v}</option>);
    })

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
            </form>
        </div>
    );
}

export default ProductsAdd;
