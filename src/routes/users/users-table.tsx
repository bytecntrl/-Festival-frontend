import React, { useEffect } from "react";

import { User } from '../../models/users';
import { MyFetch } from "../../utils/my-fetch";


interface UserTableProps {
    data: User[]
    tokenJwt: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    getData: () => void
    setPage: React.Dispatch<React.SetStateAction<number>>
}


function UsersTable(props: UserTableProps) {
    let users: JSX.Element[] = [];

    useEffect(() => {
        props.getData();
    }, []);

    const delUser = async (id: number) => {
        props.setMessage("");

        const option = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${props.tokenJwt}`,
				'Content-Type': 'application/json'
			}
		};

        const response = await MyFetch(`users/${id}`, option);

        if (response.error) {
            props.setMessage(response.message);
            
            return;
        }

        props.getData();
        props.setPage(1);
    }

    for (let u of props.data) {
        users.push(
            <tr key={u.id}>
                <th scope="row">{u.id}</th>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => delUser(u.id)}
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
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </table>
    );
}

export default UsersTable;