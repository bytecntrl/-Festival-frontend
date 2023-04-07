import React, { useState, useEffect } from "react";

import { ROLES } from "../utils/constants";
import { MyFetch } from "../utils/my-fetch";
import useTokenJwt from "../stores/token-jwt";


interface User {
    id: number
    username: string
    role: string
}


interface Response {
    users: User[]
    page: number
}


function Users() {
    const [ page, setPage ] = useState(1);
    const [ pageNum, setPageNum ] = useState(1);
    const [ state, setState ] = useState<User[]>([]);
    const [ message, setMessage ] = useState("");
    const [ form, setForm ] = useState({"username": "", "password": "", "role": 0})
    const { tokenJwt } = useTokenJwt();

    const getData = () => {
        const option = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenJwt}`
            }
        };

        MyFetch(`users/?page=${page}`, option).then(
            (r: Response) => {
                setState(r.users)
                setPageNum(r.page);
            }
        );
    }

    useEffect(() => {
        getData();
    }, [page]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}));
    }

    const handleClick = async () => {
        setMessage("");

        let b = { username: form.username, password: form.password, role: ROLES[form.role] };

        const option = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokenJwt}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(b)
		};

        const response = await MyFetch("auth/", option);

        if (response.error) {
            setMessage(response.message);
            
            return;
        }

        setForm({username: "", password: "", role: 0});
        getData();
    }

    const delUser = async (id: number) => {
        setMessage("");

        const option = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${tokenJwt}`,
				'Content-Type': 'application/json'
			}
		};

        const response = await MyFetch(`users/${id}`, option);

        if (response.error) {
            setMessage(response.message);
            
            return;
        }

        getData();
        setPage(1);
    }

    let users: JSX.Element[] = [];
    let pages: JSX.Element[] = [];
    let rolesSelect: JSX.Element[] = [];

    Array.from(Array(pageNum).keys()).map(
        (k) => {
            pages.push(
                <button
                    key={k.toString()}
                    type="button"
                    className={"btn btn-primary" + (k+1==page ? " active" : "")}
                    onClick={() => {
                        setPage(k+1);
                        getData();
                    }}>{k+1}
                </button>
            );
        }
    );

    ROLES.forEach((v, i) => {
        rolesSelect.push(<option value={i} key={i}>{v}</option>);
    })

    state.map((k) => {
        users.push(
            <tr key={k.id}>
                <th scope="row">{k.id}</th>
                <td>{k.username}</td>
                <td>{k.role}</td>
                <td>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => delUser(k.id)}
                    >
                        <i className="bi bi-trash" />
                    </button>
                </td>
			</tr>
        );
    });

    return (
        <div className="container mt-4">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
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
            <div className="d-flex justify-content-end">
                <div className="btn-group" role="group">
                    {pages}
                </div>
            </div>

            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#AddUserModal"
            >
                Add User
            </button>

            <div
                className="modal fade"
                id="AddUserModal"
                aria-labelledby="AddUserModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddUserModalLabel">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="username-field" className="col-form-label">Username:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="username-field" 
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password-field" className="col-form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password-field"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role-field" className="col-form-label">Role:</label>
                                <select
                                    id="role-field" 
                                    className="form-select" 
                                    name="role"
                                    onChange={handleChange} 
                                    value={form.role}
                                >
                                    {rolesSelect}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Users;
