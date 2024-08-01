import React, { useState, useEffect } from 'react';
import {
  FaStethoscope,
  FaMicroscope,
  FaSyringe,
  FaPills,
  FaHome,
  FaHospitalAlt,
  FaDog
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReusableModal from '../components/modals/ReusableModal';
import SearchModal from '../components/modals/SearchModal';
import PreHospitalizacionModal from '../components/modals/PreHospitalizacionModal';
import PreHospitalizacionForm from './PreHospitalizacionForm';
import { useClients } from '../context/ClientsContext';

const HomePage = () => {
  const { clients, fetchClients } = useClients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreHospModalOpen, setIsPreHospModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const sections = [
    { name: 'Hospedaje', icon: <FaHome />, color: 'bg-blue-400', onClick: () => navigate('/veterinario/hospedaje') },
    { name: 'Hospitalización', icon: <FaHospitalAlt />, color: 'bg-yellow-400', onClick: () => setIsModalOpen(true) },
    { name: 'Certificado Médico', icon: <FaDog />, color: 'bg-green-400', onClick: () => navigate('/veterinario/patients/:id/certificado') },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClientSelect = (client, pet) => {
    setSelectedClient(client);
    setSelectedPet(pet);
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    if (selectedPet) {
      setIsPreHospModalOpen(true);
    } else {
      alert('Por favor, seleccione un paciente.');
    }
  };

  const closePreHospModal = () => {
    setIsPreHospModalOpen(false);
    setSelectedClient(null);
    setSelectedPet(null);
  };

  const handleRegisterSuccess = () => {
    console.log('Registro exitoso');
    setIsPreHospModalOpen(false);
    setSelectedClient(null);
    setSelectedPet(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">¿Qué deseas hacer hoy?</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 ${section.color} text-white rounded-full shadow-lg cursor-pointer`}
            onClick={section.onClick}
          >
            <div className="text-4xl mb-2">{section.icon}</div>
            <div className="text-center">{section.name}</div>
          </div>
        ))}
      </div>
      {selectedClient && selectedPet && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Selecciona al paciente y su propietario:</h2>
          <div className="flex items-center">
            <div className="flex-grow border border-gray-300 rounded px-4 py-2">
              {selectedPet.name} - {selectedClient.client_name} ({selectedClient.cedula})
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-700"
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      <SearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleClientSelect}
        clients={clients}
      />
      <PreHospitalizacionModal
        isOpen={isPreHospModalOpen}
        onClose={closePreHospModal}
      >
        <PreHospitalizacionForm
          onClose={closePreHospModal}
          onRegisterSuccess={handleRegisterSuccess}
          selectedPatientId={selectedPet ? selectedPet.id : null}
        />
      </PreHospitalizacionModal>
    </div>
  );
};

export default HomePage;


