import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../context/ClientsContext';
import { FaPlus, FaEllipsisV, FaUser, FaTrash, FaChevronLeft, FaChevronRight, FaEdit } from 'react-icons/fa';
import RegisterClientModal from '../components/ui/clientes/RegisterClientModal';
import ContainerClient from '../components/ui/clientes/ContainerClient';
import ReusableModal from '../components/modals/ReusableModal';
import SuccessMessage from '../components/ui/SuccessMessage';

const ClientsPage = () => {
  const { clients, fetchClients, deleteClient } = useClients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(10);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const messageRef = useRef(null);
  const navigate = useNavigate();
  const dropdownRefs = useRef([]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefs.current) {
        dropdownRefs.current.forEach((ref, index) => {
          if (ref && !ref.contains(event.target)) {
            setIsDropdownOpen((prev) => (prev === index ? null : prev));
          }
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRegisterSuccess = () => {
    fetchClients();
    setMessage('Propietario registrado con éxito.');
    setMessageType('success');
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  };

  const openModal = (client = null) => {
    setClientToEdit(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setClientToEdit(null);
    setIsModalOpen(false);
  };

  const handleDeleteClient = async (id) => {
    try {
      await deleteClient(id);
      fetchClients();
      setMessage('Propietario eliminado exitosamente.');
      setMessageType('error');
      setIsMessageVisible(true);
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error eliminando propietario:', error);
    }
  };

  const toggleDropdown = (index) => {
    setIsDropdownOpen((prev) => (prev === index ? null : index));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleClientsPerPageChange = (event) => {
    setClientsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cedula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const handleViewProfile = (id) => {
    navigate(`/veterinario/clients/${id}`);
  };

  return (
    <ContainerClient className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lista de Propietarios</h1>
        <button
          onClick={() => openModal()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Registrar Propietario
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={paginatePrev}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <select
              value={clientsPerPage}
              onChange={handleClientsPerPageChange}
              className="border border-gray-300 rounded px-2 py-1 mx-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={paginateNext}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={indexOfLastClient >= filteredClients.length}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar por nombre o cédula"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cédula
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Celular
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mascotas
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Creación
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client, index) => (
                <React.Fragment key={client.client_id}>
                  <tr className="hover:bg-gray-100">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleViewProfile(client.client_id)}
                        className="text-blue-500 hover:underline"
                      >
                        {client.client_name}
                      </button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {client.cedula}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {client.phone}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {client.address}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {client.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {client.pets.length > 0 && (
                        <div className="relative" ref={(el) => (dropdownRefs.current[index] = el)}>
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
                          >
                            {client.pets[0].name}
                            {client.pets.length > 1 && <FaEllipsisV className="ml-2" />}
                          </button>
                          {isDropdownOpen === index && client.pets.length > 1 && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                              <ul>
                                {client.pets.slice(1).map((pet) => (
                                  <li
                                    key={pet.id}
                                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                  >
                                    {pet.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {new Date(client.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="relative" ref={(el) => (dropdownRefs.current[index] = el)}>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
                        >
                          <FaEllipsisV />
                        </button>
                        {isDropdownOpen === index && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                            <ul>
                              <li
                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleViewProfile(client.client_id)}
                              >
                                <FaUser className="mr-2" />
                                Ver Perfil
                              </li>
                              <li
                                onClick={() => openModal(client)}
                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                              >
                                <FaEdit className="mr-2" />
                                Editar
                              </li>
                              <li
                                onClick={() => {
                                  handleDeleteClient(client.client_id);
                                }}
                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                              >
                                <FaTrash className="mr-2" />
                                Eliminar
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <RegisterClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onRegisterSuccess={handleRegisterSuccess}
        client={clientToEdit}
      />
      <SuccessMessage
        ref={messageRef}
        message={message}
        isVisible={isMessageVisible}
        type={messageType}
      />
      <ReusableModal
        isOpen={isDeletedModalOpen}
        onClose={() => setIsDeletedModalOpen(false)}
        title="Cliente Eliminado"
        content={
          <div className="text-center">
            <svg
              className="mx-auto mb-4 w-14 h-14 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">Cliente eliminado correctamente.</p>
          </div>
        }
      />
    </ContainerClient>
  );
};

export default ClientsPage;

