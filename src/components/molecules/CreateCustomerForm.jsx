import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCustomerForm() {
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        const customerData = {
            'Clave cliente': formData.get('Clave'),
            'Nombre Contacto': formData.get('Nombre'),
            'Correo': formData.get('Correo'),
            'Teléfono Contacto': formData.get('Teléfono')
        };

        try {
            await axios.post('http://localhost:5000/api/customers', customerData);
            // Redirigir al usuario a la página de búsqueda después de crear el cliente
            navigate('/search');
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            // Puedes mostrar un mensaje de error al usuario si la creación del cliente falla
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="clave">Clave cliente:</label>
                <input type="number" id="clave" name="Clave" required />
            </div>
            <div>
                <label htmlFor="nombre">Nombre Contacto:</label>
                <input type="text" id="nombre" name="Nombre" required />
            </div>
            <div>
                <label htmlFor="correo">Correo:</label>
                <input type="email" id="correo" name="Correo" required />
            </div>
            <div>
                <label htmlFor="telefono">Teléfono Contacto:</label>
                <input type="tel" id="telefono" name="Teléfono" required />
            </div>
            <button type="submit">Crear Cliente</button>
        </form>
    );
}

export default CreateCustomerForm;
