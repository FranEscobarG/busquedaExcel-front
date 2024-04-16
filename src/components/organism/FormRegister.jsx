import {useNavigate, Link} from 'react-router-dom';
import { useRef } from 'react';
import '../../assets/css/FormRegister.css'

function FormRegister() {
    const navigate = useNavigate();

    const form = useRef()
    const endpoint = 'http://localhost:5000/api/users';

    const handlerClick = (e)=>{
        e.preventDefault();
        const newForm = new FormData(form.current)
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: newForm.get('usuario'),
                email: newForm.get('correo'),
                password: newForm.get('contrasenia')
            })
        }
        
        fetch(endpoint, options) 
        .then(response => response.json())
        .then(data => {
            alert(JSON.stringify(data.message));
            navigate("/");
        });
    }

    return ( 
        <div className='box_reg'>
            <div className="form_reg">
                <form ref={form}>
                    <h2>Registro de Usuario</h2>
                    <div className="input_box">
                        <input type="text" required id='usuario' name="usuario"/>
                        <label htmlFor="usuario">Usuario</label>
                        <i></i>
                    </div>

                    <div className="input_box">
                        <input type="text" required id="e-mail" name="correo" />
                        <label htmlFor="e-mail">Correo</label>
                        <i></i>
                    </div>

                    <div className="input_box">
                        <input type="password" required id='password' name='contrasenia'/>
                        <label htmlFor="password">Contraseña</label>
                        <i></i>
                    </div>

                    <input type="button" value='Registrarse' onClick={handlerClick} />
                    <Link className="link" to="/">Inicia Sesión aquí</Link>
                    
                </form>
            </div>
            
        </div>
        
     );
}

export default FormRegister;