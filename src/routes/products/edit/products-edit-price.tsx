import React from "react";

import { Product, ProductsEditForm } from "../../../models/products";
import { MyFetch } from "../../../utils/my-fetch";


interface ProductsEditPriceProps {
    state: Product
    setState: React.Dispatch<React.SetStateAction<Product>>
    form: ProductsEditForm
    setForm: React.Dispatch<React.SetStateAction<ProductsEditForm>>
    setMessage: React.Dispatch<React.SetStateAction<string>>
    tokenJwt: string
}


function ProductsEditPrice(props: ProductsEditPriceProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        
        props.setForm(values => ({...values, price: value}));
    }

    const handleClick = async () => {
        const option = {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${props.tokenJwt}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                price: +props.form.price
            })
		};

        const resp = await MyFetch(`products/${props.state.id}`, option);

        if (resp.error) {
            props.setMessage(resp.message);
            return;
        }

        props.setState(values => ({...values, price: +props.form.price}));
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#ChangePriceModal"
            >
                Change price
            </button>

            <div
                className="modal fade"
                id="ChangePriceModal"
                aria-labelledby="ChangePriceModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ChangePriceModalLabel">Change price {props.state.name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="price-field" className="col-form-label">Price:</label>
                                    <input
                                        type="number"
                                        min="0.00"
                                        step="0.05"
                                        className="form-control"
                                        id="price-field"
                                        name="price"
                                        value={props.form.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </form>
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


export default ProductsEditPrice;
