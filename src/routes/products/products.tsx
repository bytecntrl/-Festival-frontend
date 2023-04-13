import React, { useState } from "react";


function Products() {
    const [ message, setMessage ] = useState("");

    return (
        <div className="container mt-4">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
            <a className="btn btn-primary" href="/products/add" role="button">
                Add product
            </a>
        </div>
    );
}

export default Products;
