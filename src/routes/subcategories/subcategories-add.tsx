import React, { useState } from "react";

import { MyFetch } from "../../utils/my-fetch";


interface SubcategoriesAddProps {
    tokenJwt: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    getData: () => void
}


function SubcategoriesAdd(props: SubcategoriesAddProps) {
    const [ form, setForm ] = useState({"name": "", "order": 0})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}));
    }

    const handleClick = async () => {
        props.setMessage("");

        let b = { name: form.name, order: form.order};

        const option = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${props.tokenJwt}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(b)
		};

        const response = await MyFetch("subcategories/", option);

        if (response.error) {
            props.setMessage(response.message);
            
            return;
        }

        setForm({name: "", order: 0});
        props.getData();
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#AddSubCategoryModal"
            >
                Add Subcategory
            </button>
            
            <div
                className="modal fade"
                id="AddSubCategoryModal"
                aria-labelledby="AddSubCategoryModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddSubCategoryModalLabel">Add Subcaategory</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name-field" className="col-form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name-field"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="order-field" className="col-form-label">Order:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="order-field"
                                    min="0"
                                    name="order"
                                    value={form.order}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                data-bs-dismiss="modal" 
                                onClick={handleClick}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubcategoriesAdd;
