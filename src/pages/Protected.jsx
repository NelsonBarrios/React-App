import React, { useEffect} from "react";
import { useHistory } from 'react-router-dom';

function Protected(props){
    //Wall only for loggued in users.
    let Cmp = props.Cmp;
    const history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('user-info')){
            history.push('/');
        }
    }, []);
    return (
        <div>
            <Cmp />
        </div>
    )
}
export default Protected;