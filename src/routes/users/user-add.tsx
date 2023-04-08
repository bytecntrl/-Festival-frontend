import React, { useState } from "react";

import { ROLES } from "../../utils/constants";
import { MyFetch } from "../../utils/my-fetch";


interface UserAddProps {
    tokenJwt: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    getData: () => void
}


function UserAdd(props: UserAddProps) {
    const [ form, setForm ] = useState({"username": "", "password": "", "role": 0})

    let rolesSelect: JSX.Element[] = [];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}));
    }

    const handleClick = async () => {
        props.setMessage("");

        let b = { username: form.username, password: form.password, role: ROLES[form.role] };

        const option = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${props.tokenJwt}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(b)
		};

        const response = await MyFetch("auth/", option);

        if (response.error) {
            props.setMessage(response.message);
            
            return;
        }

        setForm({username: "", password: "", role: 0});
        props.getData();
    }

    ROLES.forEach((v, i) => {
        rolesSelect.push(<option value={i} key={i}>{v}</option>);
    })

    return (
        <>
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
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password-field" className="col-form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password-field"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange} />
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
        </>
    );
}

export default UserAdd;
