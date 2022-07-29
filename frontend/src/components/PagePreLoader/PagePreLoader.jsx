import react from 'react'
import {Preloader,Rings,Puff} from "react-preloader-icon";

const PagePreLoader = () => {
    return (
        <>
            <Preloader
            use={Puff}
            size="60"
            strokeWidth={13}
            strokeColor="#007bff"
            duration={2095}
            style={{margin:"10px auto"}}
            />
        </>
    )
}

export default PagePreLoader