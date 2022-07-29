import React from 'react';
import { useNavigate } from "react-router-dom";


const BasicEdit = () => {
    let navigate = useNavigate();

    function backUrl() {
        navigate(-1)
    }

    return (
        <div>
            <button style={{color:"red"}} onClick={backUrl}>
                gnal het
            </button>
        </div>
    );
};

export default BasicEdit;