import React, { useState, useEffect } from 'react';
import { createClientRequest, updateClientRequest } from '../../../api/clients.api';
import { CSSTransition } from 'react-transition-group';
import { FaSpinner } from 'react-icons/fa';

const RegisterClientModal = ({ isOpen, onClose, onRegisterSuccess, client }) => {
  const [formData, setFormData] = useState({
    cedula: '',
    full_name: '',
    phone: '',
    address: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        cedula: client.cedula,
        full_name: client.client_name,
        phone: client.phone,
        address: client.address,
        email: client.email,
      });
    } else {
      setFormData({
        cedula: '',
        full_name: '',
        phone: '',
        address: '',
        email: '',
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (client) {
        await updateClientRequest(client.client_id, formData);
        onRegisterSuccess('Cliente actualizado con éxito.');
      } else {
        await createClientRequest(formData);
        onRegisterSuccess('Cliente registrado con éxito.');
      }
      onClose(); // Cerrar el modal después de registrar
    } catch (error) {
      console.error('Error registrando propietario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-center">{client ? 'Editar Cliente' : 'Registrar Cliente'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Cédula</label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Ingrese la cédula"
                className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Nombre Completo</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Ingrese el nombre completo"
                className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingrese el teléfono"
                className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ingrese la dirección"
                className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese el email"
                className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded flex items-center ${
                  isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'
                } text-white`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Guardando <FaSpinner className="ml-2 animate-spin" />
                  </>
                ) : (
                  <>
                    {client ? 'Actualizar' : 'Guardar'} <i className="ml-2">💾</i>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default RegisterClientModal;
