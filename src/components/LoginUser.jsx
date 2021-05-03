import React, { useState, useEffect } from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';


function LoginUser() {
    //States.
    const [Entradas, setEntradas] = useState([]);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { handleSubmit, formState: { errors } } = useForm();
    const submit = (data,e) => { setEntradas([...Entradas, data]);e.target.reset();};
    
    //Redirect if is loggued.
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history.push('/home');
        };
    },[]);

    //Get API Data.
    async function signUp(){
        let item = {username, password}

        let result = await fetch('http://localhost:3001/user',{ method: 'POST', headers: {"Content-type":"application/json","Accept":"application/json"}, body: JSON.stringify(item)});
        result = await result.json();
        console.warn('result', result)
        localStorage.setItem("user-info", JSON.stringify(result));
        history.push('/home')
  }

    return (
        //Form Group.
        <div className="login-form col-sm-4 offset-sm-4 mt-5">    
            <form action="/examples/actions/confirmation.php" onSubmit={handleSubmit(submit)} className="loginn" method="post">
                <h4 className="modal-title" style={{textAlign: "center"}}>Ingresa</h4>
                <div className="form-group">
                    <input onChange={(e)=> setUserName(e.target.value)} value={username} type="text" className={`form-control ${errors.user ? `is-invalid`: null}`} placeholder="Usuario" required/>
                    {errors.user ? <span className="text-danger">{errors.user.message}</span> : null}
                </div>
                <div className="form-group">
                    <input  onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className={`form-control ${errors.password ? `is-invalid`: null}`} placeholder="Contraseña" required/>
                    {errors.password ? <span className="text-danger">{errors.password.message}</span> : null}
                </div>
                <div className="form-group small clearfix">
                    <label className="form-check-label"><input type="checkbox" required="Debes aceptar cookies"/> Aceptar Cookies</label>
                </div> 
                <button onClick={signUp} type="submit" className="btn btn-primary btn-block btn-lg"> Ingresa</button>           
            </form>
        </div>
    )
}

export default withRouter(LoginUser);