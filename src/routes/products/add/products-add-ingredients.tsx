import React from "react";

import { ProductsAddForm } from "../../../models/products";


interface ProductsAddIngredientsProps {
    form: ProductsAddForm
    setForm: React.Dispatch<React.SetStateAction<ProductsAddForm>>
}


function ProductsAddIngredients(props: ProductsAddIngredientsProps) {
    const addIngredient = () => {
        props.setForm((value) => ({
            ...value, 
            ingredients: [...props.form.ingredients, {"name": "", "price": 0}]
        }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const name = event.target.name;
        const value = event.target.value;

        let tmp = props.form.ingredients;

        switch (name) {
            case "name":
                tmp[i].name = value;
                break;
            
            case "price":
                tmp[i].price = +value;
                break;
        }

        props.setForm(values => ({...values, ingredients: tmp}));
    }

    const deleteIngredients = (i: number) => {
        let tmp = props.form.ingredients;

        tmp.splice(i, 1);

        props.setForm(values => ({...values, ingredients: tmp}));
    }

    let ingredients: JSX.Element[] = [];

    props.form.ingredients.forEach((v, i) => {
        ingredients.push(
            <div className="row mb-2" key={i}>
					<div className="col-auto">
						<label htmlFor="NameIngredientsField" className="visually-hidden">Name</label>
						<input
							type="text"
							className="form-control"
							id="NameIngredientsField"
							placeholder="Enter name of ingredient"
                            name="name"
                            value={v.name}
                            onChange={(e) => handleChange(e, i)}
                            required
						/>
					</div>
					<div className="col-auto">
						<label htmlFor="PriceIngredientsField" className="visually-hidden">Price</label>
						<input
							type="number"
							min="0.00"
							step="0.05"
							className="form-control"
							id="PriceIngredientsField"
							placeholder="Enter price of ingredient"
                            name="price"
                            value={v.price}
                            onChange={(e) => handleChange(e, i)}
                            required
						/>
					</div>
					<div className="col-auto">
						<button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={() => deleteIngredients(i)}
                        >
                            <i className="bi bi-trash" />
                        </button>
					</div>
				</div>
        );
    })

    return (
        <div className="mb-3">
			<p className="form-label"><strong>Ingredients:</strong></p>
            {ingredients}
            <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={addIngredient}
            >
                Add ingredient
            </button>
        </div>
    );
}


export default ProductsAddIngredients;
