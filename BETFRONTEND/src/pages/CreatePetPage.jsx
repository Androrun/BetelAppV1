import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientRequest } from '../api/clients.api';
import { getAllPatientsRequest } from '../api/patients.api';
import PetsForm from './PetsForm';
import PetsModal from '../components/modals/PetsModal';
import RegisterClientModal from '../components/ui/clientes/RegisterClientModal';

const CreatePetPage = () => {
  const { id } = useParams(); // `id` es el `clientId`
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await getClientRequest(id);
        setClient(response.data);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await getAllPatientsRequest();
        const clientPatients = response.data.filter(patient => patient.client_id === parseInt(id));
        setPatients(clientPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchClient();
    fetchPatients();
  }, [id]);

  const handleRegisterSuccess = async () => {
    const response = await getAllPatientsRequest();
    const clientPatients = response.data.filter(patient => patient.client_id === parseInt(id));
    setPatients(clientPatients);
    closePetModal();
  };

  const handleClientUpdateSuccess = async (updatedClient) => {
    setClient(updatedClient);
    closeClientModal();
  };

  const openPetModal = () => {
    setIsPetModalOpen(true);
  };

  const closePetModal = () => {
    setIsPetModalOpen(false);
  };

  const openClientModal = () => {
    setIsClientModalOpen(true);
  };

  const closeClientModal = () => {
    setIsClientModalOpen(false);
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
      <div className="md:w-1/3 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">INFORMACIÓN PERSONAL</h2>
        <div className="mb-4">
          <p><strong>Nombre:</strong> {client.client_name}</p>
          <p><strong>Cédula:</strong> {client.cedula}</p>
          <p><strong>Celular:</strong> <a href={`tel:${client.phone}`} className="text-blue-500">{client.phone}</a></p>
          <p><strong>Email:</strong> <a href={`mailto:${client.email}`} className="text-blue-500">{client.email}</a></p>
          <p><strong>Dirección:</strong> {client.address}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={openClientModal}>
            Editar
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
      <div className="md:w-2/3 p-4 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Pacientes</h2>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={openPetModal}
          >
            + Nuevo Paciente
          </button>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Raza
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Especie
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Peso
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Género
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.breed}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.species}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.weight} kg
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.gender}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PetsModal isOpen={isPetModalOpen} onClose={closePetModal}>
        <PetsForm onClose={closePetModal} onRegisterSuccess={handleRegisterSuccess} clientId={id} />
      </PetsModal>

      <PetsModal isOpen={isClientModalOpen} onClose={closeClientModal}>
        <RegisterClientModal
          isOpen={isClientModalOpen}
          onClose={closeClientModal}
          onRegisterSuccess={handleClientUpdateSuccess}
          client={client}
        />
      </PetsModal>
    </div>
  );
};

export default CreatePetPage;





