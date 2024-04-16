import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../assets/css/search.css';
import { useNavigate } from 'react-router-dom';

function ContainerSearch() {
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers/reverse');
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    }
    
    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSearch = async () => {
        try {
            let response;
            if (searchType === 'name') {
                response = await axios.get(`http://localhost:5000/customers/searchByName?name=${searchValue}`);
            } else if (searchType === 'email') {
                response = await axios.get(`http://localhost:5000/customers/searchByEmail?email=${searchValue}`);
            } else if (searchType === 'phone') {
                response = await axios.get(`http://localhost:5000/customers/searchByPhone?phone=${searchValue}`);
            }

            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    const handleCreateCustomer = () => {
        navigate('/create-customer');
    };

    const handleEditCustomer = async (customer) => {
        const { value: formValues } = await Swal.fire({
            title: "Editar Cliente",
            html: `
                <input type="text" id="clave" class="swal2-input" value="${customer['Clave cliente']}" placeholder="Clave/Folio">
                <input type="text" id="name" class="swal2-input" value="${customer['Nombre Contacto']}" placeholder="Nombre">
                <input type="text" id="email" class="swal2-input" value="${customer.Correo}" placeholder="Correo">
                <input type="tel" id="phone" class="swal2-input" value="${customer['Teléfono Contacto']}" placeholder="Teléfono">
            `,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            preConfirm: async () => {
                const newClave = document.getElementById("clave").value;
                const newName = document.getElementById("name").value;
                const newEmail = document.getElementById("email").value;
                const newPhone = document.getElementById("phone").value;

                try {
                    await axios.put(`http://localhost:5000/api/customers/${customer._id}`, {
                        "Clave cliente": newClave,
                        "Nombre Contacto": newName,
                        "Correo": newEmail,
                        "Teléfono Contacto": newPhone
                    });
                    fetchCustomers(); // Actualizar la lista después de editar el cliente
                    Swal.fire("¡Guardado!", "Los datos se han actualizado exitosamente.", "success");
                } catch (error) {
                    Swal.fire("Error", "Ha ocurrido un error al guardar los datos.", "error");
                }
            },
        });
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            await axios.delete(`http://localhost:5000/api/customers/${customerId}`);
            // Después de eliminar el cliente, se puede recargar la lista de clientes para reflejar los cambios
            fetchCustomers();
            Swal.fire('Cliente eliminado', 'El cliente ha sido eliminado correctamente', 'success');
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
            Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
        }
    };

    return (
        <div className='container-search'>
            <div className="search">
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="name">Buscar por nombre</option>
                    <option value="email">Buscar por correo</option>
                    <option value="phone">Buscar por teléfono</option>
                </select>
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={handleCreateCustomer}>Crear nuevo cliente</button>
            </div>

            <div className='box-result'>
                <table>
                    <thead>
                        <tr>
                            <th>Clave/Folio</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map(customer => (
                            <tr key={customer._id}>
                                <td>{customer['Clave cliente']}</td>
                                <td>{customer['Nombre Contacto']}</td>
                                <td>{customer.Correo}</td>
                                <td>{customer['Teléfono Contacto']}</td>
                                <td className='actions'>
                                    <button className='btn-update' onClick={() => handleEditCustomer(customer)}>Editar</button>
                                    <button className='btn-delete' onClick={() => handleDeleteCustomer(customer._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContainerSearch;
