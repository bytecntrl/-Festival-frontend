import React, { useEffect, useState } from "react";

import { SubcategoriesResponse, Subcategory } from "../../models/subcategories";
import useTokenJwt from "../../stores/token-jwt";
import { MyFetch } from "../../utils/my-fetch";
import SubcategoriesAdd from "./subcategories-add";
import SubcategoriesTable from "./subcategories-table";


function Subcategories() {
    const [ state, setState ] = useState<Subcategory[]>([]);
    const [ message, setMessage ] = useState("");
    const { tokenJwt } = useTokenJwt();

    const getData = () => {
        const option = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenJwt}`
            }
        };

        MyFetch("subcategories/", option).then(
            (r: SubcategoriesResponse) => {
                if (r.error) {
                    setMessage(r.message);

                    return;
                }

                setState(r.categories);
            }
        );
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mt-4">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
            <SubcategoriesTable 
                data={state}
                tokenJwt={tokenJwt}
                setMessage={setMessage}
                getData={getData}
            />
            <SubcategoriesAdd 
                tokenJwt={tokenJwt}
                setMessage={setMessage}
                getData={getData}
            />
        </div>
    );
}

export default Subcategories;
