import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientRequest, deletePatientRequest } from '../api/patients.api';
import PetsModal from '../components/modals/PetsModal';
import PetsForm from '../pages/PetsForm';

const PerfilMascotaPage = () => {
  const { id } = useParams(); // `id` es el `petId`
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await getPatientRequest(id);
        setPet(response.data);
      } catch (error) {
        console.error('Error obteniendo la mascota:', error);
      }
    };

    fetchPet();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePatientRequest(id);
      navigate('/veterinario/patients'); // Redirige a la lista de pacientes después de eliminar
    } catch (error) {
      console.error('Error eliminando la mascota:', error);
    }
  };

  const handleCertificado = () => {
    navigate(`/veterinario/patients/${id}/certificado`);
  };

  const openModal = () => {
    setPatientToEdit(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPatientToEdit(null);
  };

  const handleRegisterSuccess = async () => {
    const response = await getPatientRequest(id);
    setPet(response.data);
    closeModal();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (!pet) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">INFORMACIÓN PERSONAL</h2>
        <div className="mb-4">
          <p><strong>Nombre:</strong> {pet.name}</p>
          <p><strong>Especie:</strong> {pet.species}</p>
          <p><strong>Raza:</strong> {pet.breed}</p>
          <p><strong>Peso:</strong> {pet.weight} kg</p>
          <p><strong>Fecha de Nacimiento:</strong> {formatDate(pet.birth_date)}</p>
          <p><strong>Color:</strong> {pet.color}</p>
          <p><strong>Tamaño:</strong> {pet.size}</p>
          <p><strong>Estado Reproductivo:</strong> {pet.reproductive_status}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={openModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Eliminar
          </button>
          <button
            onClick={handleCertificado}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Certificado
          </button>
        </div>
      </div>

      <PetsModal isOpen={isModalOpen} onClose={closeModal}>
        <PetsForm onClose={closeModal} onRegisterSuccess={handleRegisterSuccess} clientId={pet.client_id} patientId={pet.id} />
      </PetsModal>
    </div>
  );
};

export default PerfilMascotaPage;

