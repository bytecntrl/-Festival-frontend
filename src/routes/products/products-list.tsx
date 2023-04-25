import React from "react";

import { Product } from "../../models/products";


interface ProductsListProps {
    products: {[name: string]: Product[]}
}


function ProductsList(props: ProductsListProps) {
    let products: JSX.Element[] = [];
    let categories: string[] = [];

    for (let product in props.products) {
        categories.push(product);
    }

    categories.forEach((v, i) => {
        let tmp: JSX.Element[] = [];

        for (let product of props.products[v]) {
            tmp.push(
                <tr key={product.id}>
					<th scope="row">{product.id}</th>
					<td>{product.name}</td>
					<td>{product.price}</td>
					<td>{product.category}</td>
					<td>
						<a 
                            className="btn btn-primary" 
                            href="/products/{product.id}" 
                            role="button"
                        >
                            <i className="bi bi-pen" />
                        </a>
                        <button type="button" className="btn btn-danger">
                            <i className="bi bi-trash" />
                        </button>
					</td>
				</tr>
            );
        }

        if (i === 0) {
            products.push(
                <table key={i} className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tmp}
                    </tbody>
                </table>
            );
        } else {
            products.push(
                <table key={i} className="table table-bordered">
                    <tbody>
                        {tmp}
                    </tbody>
                </table>
            );
        }
    })

    return (
        <div>
            {products}
        </div>
    );
}

export default ProductsList;