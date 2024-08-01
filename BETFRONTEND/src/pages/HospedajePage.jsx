import React, { useState, useEffect } from 'react';
import { useHospedaje } from '../context/HospedajeContext';
import { useClients } from '../context/ClientsContext';
import { usePatients } from '../context/PatientContext';
import RegisterHospedajeModal from '../components/modals/RegisterHospedajeModal';
import { FaPlus } from 'react-icons/fa';

const HospedajePage = () => {
  const { hospedajes, fetchHospedajes, deleteHospedaje } = useHospedaje();
  const { clients, fetchClients } = useClients();
  const { patients, fetchPatients } = usePatients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospedaje, setSelectedHospedaje] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchPatients();
    fetchHospedajes();
  }, [fetchClients, fetchPatients, fetchHospedajes]);

  useEffect(() => {
    if (hospedajes.length && clients.length && patients.length) {
      const combinedData = hospedajes.map(hospedaje => {
        const client = clients.find(client => client.client_id === hospedaje.client_id);
        const patient = patients.find(patient => patient.id === hospedaje.patient_id);
        return {
          ...hospedaje,
          client_name: client ? client.client_name : 'Cliente no encontrado',
          patient_name: patient ? patient.name : 'Paciente no encontrado',
        };
      });
      setData(combinedData);
    }
  }, [hospedajes, clients, patients]);

  const handleAddHospedaje = () => {
    setSelectedHospedaje(null);
    setIsModalOpen(true);
  };

  const handleEditHospedaje = (hospedaje) => {
    setSelectedHospedaje(hospedaje);
    setIsModalOpen(true);
  };

  const handleDeleteHospedaje = async (id) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este registro de hospedaje?');
    if (confirmed) {
      await deleteHospedaje(id);
    }
  };

  const handleRegisterSuccess = () => {
    fetchHospedajes();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl mb-4">Hospedaje</h1>
        <button
          onClick={handleAddHospedaje}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Registrar Hospedaje
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Paciente</th>
              <th className="py-2 px-4 border-b border-gray-200">Cliente</th>
              <th className="py-2 px-4 border-b border-gray-200">Fecha de Inicio</th>
              <th className="py-2 px-4 border-b border-gray-200">Fecha de Fin</th>
              <th className="py-2 px-4 border-b border-gray-200">Notas</th>
              <th className="py-2 px-4 border-b border-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((hospedaje) => (
              <tr key={hospedaje.id}>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.patient_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.client_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(hospedaje.start_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(hospedaje.end_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.notes}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleEditHospedaje(hospedaje)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteHospedaje(hospedaje.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RegisterHospedajeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
        hospedaje={selectedHospedaje}
      />
    </div>
  );
};

export default HospedajePage;












