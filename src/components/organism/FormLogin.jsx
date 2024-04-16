import { useRef } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import '../../assets/css/FormLogin.css'

function FormLogin() {
    const navigate = useNavigate();

    const form = useRef()
    const endpoint = 'http://localhost:5000/api/login';
    
    const handlerClick = (e)=>{
        e.preventDefault();
        const loginForm = new FormData(form.current)
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginForm.get('correo'),
                password: loginForm.get('contrasenia')
            })
        }
        
        fetch(endpoint, options) 
        .then(response => response.json())
        .then(data => {
            if(data.status === false){
                alert(JSON.stringify(data.message));
            }
            else{
                navigate("/search");
            }
        });
    }

    return ( 
        <div className="box">
            <div className="form">
                <form ref={form}>
                    <h2>Inicio de Sesión</h2>
                    <div className="input_box">
                        <input type="text" required id="e-mail" name="correo" />
                        <label htmlFor="e-mail">Correo</label>
                        <i></i>
                    </div>
                    
                    <div className="input_box">
                        <input type="password" id='password' name='contrasenia' required/>
                        <label htmlFor="password">Contraseña</label>
                        <i></i>
                    </div>
                    <input type='button' value='Iniciar sesión' onClick={handlerClick}/>
                    <Link className="link" to="/register">Regístrate aquí</Link>
                    
                </form>
            </div> 
        </div>
    );
}

export default FormLogin;