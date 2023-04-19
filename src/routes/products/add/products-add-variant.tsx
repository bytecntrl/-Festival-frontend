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

    return (
        <div className="mb-3">
			<p className="form-label"><strong>Variants:</strong></p>
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
