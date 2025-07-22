import {useRouteError} from "react-router-dom";
import {Error404} from "./Error404";
import React from "react";


interface ErrorProps {

    error?: any
}



const ErrorPage: React.FC<ErrorProps> = ({
                                             error
                                         }) => {

    error = useRouteError();
    console.log(error);

    const errorStatus: { [key: number]: any } = {

        404: <Error404/>,
    };

    return errorStatus[error.status];


};
export default ErrorPage;