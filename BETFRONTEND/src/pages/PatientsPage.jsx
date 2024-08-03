import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { FaPlus, FaEllipsisV, FaChevronLeft, FaChevronRight, FaEdit, FaUser, FaTrash } from 'react-icons/fa';
import PetsForm from '../pages/PetsForm';
import ContainerPatient from '../components/ui/clientes/ContainerPatient';
import PetsModal from '../components/modals/PetsModal';

const PatientsPage = () => {
  const { patients, fetchPatients, deletePatient } = usePatients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage, setPatientsPerPage] = useState(10);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);
  const navigate = useNavigate();
  const dropdownRefs = useRef([]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

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
    fetchPatients();
    closeModal();
  };

  const openModal = (patient = null) => {
    setPatientToEdit(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPatientToEdit(null);
    setIsModalOpen(false);
  };

  const openDeletedModal = () => {
    setIsDeletedModalOpen(true);
    setTimeout(() => {
      setIsDeletedModalOpen(false);
    }, 3000);
  };

  const toggleDropdown = (index) => {
    setIsDropdownOpen((prev) => (prev === index ? null : index));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePatientsPerPageChange = (event) => {
    setPatientsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.client_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const handleDeletePatient = (id) => {
    deletePatient(id);
    openDeletedModal();
  };

  const handleViewProfile = (id) => {
    navigate(`/veterinario/patients/${id}`);
  };

  return (
    <ContainerPatient className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lista de Pacientes</h1>
        
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={paginatePrev}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={indexOfFirstPatient === 0}
            >
              <FaChevronLeft />
            </button>
            <select
              value={patientsPerPage}
              onChange={handlePatientsPerPageChange}
              className="border border-gray-300 rounded px-2 py-1 mx-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={paginateNext}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={indexOfLastPatient >= filteredPatients.length}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar por nombre o propietario"
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
                  Especie
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Raza
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Peso
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Nacimiento
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tamaño
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado Reproductivo
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Propietario
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient, index) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.species}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.breed}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.weight}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {formatDate(patient.birth_date)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.color}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.size}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.reproductive_status}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.client_name || 'Sin propietario'}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="relative" ref={(el) => (dropdownRefs.current[index] = el)}>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none mr-3"
                      >
                        <FaEllipsisV />
                      </button>
                      {isDropdownOpen === index && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                          <ul>
                            <li
                              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleViewProfile(patient.id)}
                            >
                              <FaUser className="mr-2" />
                              Ver Perfil
                            </li>
                            <li
                              onClick={() => openModal(patient)}
                              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                              <FaEdit className="mr-2" />
                              Editar
                            </li>
                            <li
                              onClick={() => handleDeletePatient(patient.id)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PetsModal isOpen={isModalOpen} onClose={closeModal}>
        <PetsForm onClose={closeModal} onRegisterSuccess={handleRegisterSuccess} clientId={patientToEdit ? patientToEdit.client_id : 1} patientId={patientToEdit ? patientToEdit.id : null} />
      </PetsModal>
      {isDeletedModalOpen && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-4 rounded">
          <p>Paciente eliminado exitosamente.</p>
        </div>
      )}
    </ContainerPatient>
  );
};

export default PatientsPage;





