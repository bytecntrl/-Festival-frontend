import React from "react";

import { ProductsAddForm } from "../../../models/products";


interface ProductsAddVariantProps {
    form: ProductsAddForm
    setForm: React.Dispatch<React.SetStateAction<ProductsAddForm>>
}


function ProductsAddVariant(props: ProductsAddVariantProps) {
    const addVariant = () => {
        props.setForm((value) => ({
            ...value, 
            variants: [...props.form.variants, {"name": "", "price": 0}]
        }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const name = event.target.name;
        const value = event.target.value;

        let tmp = props.form.variants;

        switch (name) {
            case "name":
                tmp[i].name = value;
                break;
            
            case "price":
                tmp[i].price = +value;
                break;
        }

        props.setForm(values => ({...values, variants: tmp}));
    }

    const deleteVariant = (i: number) => {
        let tmp = props.form.variants;

        tmp.splice(i, 1);

        props.setForm(values => ({...values, variants: tmp}));
    }

    let variants: JSX.Element[] = [];

    props.form.variants.forEach((v, i) => {
        variants.push(
            <div className="row mb-2" key={i}>
					<div className="col-auto">
						<label htmlFor="NameVariantField" className="visually-hidden">Name</label>
						<input
							type="text"
							className="form-control"
							id="NameVariantField"
							placeholder="Enter name of variant"
                            name="name"
                            value={v.name}
                            onChange={(e) => handleChange(e, i)}
						/>
					</div>
					<div className="col-auto">
						<label htmlFor="PriceVariantField" className="visually-hidden">Price</label>
						<input
							type="number"
							min="0.00"
							step="0.05"
							className="form-control"
							id="PriceVariantField"
							placeholder="Enter price of variant"
                            name="price"
                            value={v.price}
                            onChange={(e) => handleChange(e, i)}
						/>
					</div>
					<div className="col-auto">
						<button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={() => deleteVariant(i)}
                        >
                            <i className="bi bi-trash" />
                        </button>
					</div>
				</div>
        );
    })

    return (
        <div className="mb-3">
			<p className="form-label"><strong>Variants:</strong></p>
            {variants}
            <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={addVariant}
            >
                Add variant
            </button>
        </div>
    );
}


export default ProductsAddVariant;
