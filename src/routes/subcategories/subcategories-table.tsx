import React from "react";

import { Subcategory } from "../../models/subcategories";
import { MyFetch } from "../../utils/my-fetch";


interface SubcategoriesTableProps {
    data: Subcategory[]
    tokenJwt: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    getData: () => void
}


function SubcategoriesTable(props: SubcategoriesTableProps) {
    let subcategories: JSX.Element[] = [];

    const delCategory = async (id: number) => {
        props.setMessage("");

        const option = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${props.tokenJwt}`,
				'Content-Type': 'application/json'
			}
		};

        const response = await MyFetch(`subcategories/${id}`, option);

        if (response.error) {
            props.setMessage(response.message);
            
            return;
        }

        props.getData();
    }

    for (let u of props.data) {
        subcategories.push(
            <tr key={u.id}>
                <th scope="row">{u.id}</th>
                <td>{u.name}</td>
                <td>{u.order}</td>
                <td>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => delCategory(u.id)}
                    >
                        <i className="bi bi-trash" />
                    </button>
                </td>
			</tr>
        );
    }

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Order</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {subcategories}
            </tbody>
        </table>
    );
}

export default SubcategoriesTable;
