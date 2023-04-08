import React, { useState } from "react";

import { User, UserResponse } from "../../models/users";
import useTokenJwt from "../../stores/token-jwt";
import { MyFetch } from "../../utils/my-fetch";
import UsersTable from "./users-table";
import UserAdd from "./user-add";


function Users() {
    const [ page, setPage ] = useState(1);
    const [ pageNum, setPageNum ] = useState(1);
    const [ state, setState ] = useState<User[]>([]);
    const [ message, setMessage ] = useState("");
    const { tokenJwt } = useTokenJwt();

    const getData = () => {
        const option = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenJwt}`
            }
        };

        MyFetch(`users/?page=${page}`, option).then(
            (r: UserResponse) => {
                if (r.error) {
                    setMessage(r.message);
                    return;
                }

                setState(r.users)
                setPageNum(r.page);
            }
        );
    }

    let pages: JSX.Element[] = [];

    for (let x of Array.from(Array(pageNum).keys())) {
        pages.push(
            <button
                key={x.toString()}
                type="button"
                className={"btn btn-primary" + (x+1==page ? " active" : "")}
                onClick={() => {
                    setPage(x+1);
                    getData();
                }}>{x+1}
            </button>
        );
    }

    return (
        <div className="container mt-4">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
            <UsersTable 
                data={state}
                tokenJwt={tokenJwt}
                setMessage={setMessage}
                getData={getData}
                setPage={setPage}
            />
            <div className="d-flex justify-content-end">
                <div className="btn-group" role="group">
                    {pages}
                </div>
            </div>
            <UserAdd 
                tokenJwt={tokenJwt}
                setMessage={setMessage}
                getData={getData}
            />
        </div>
    );
}


export default Users;
