import React, { useState, useEffect } from 'react';
import { useHospedaje } from '../context/HospedajeContext';
import RegisterHospedajeModal from '../components/modals/RegisterHospedajeModal';

const HospedajePage = () => {
  const { hospedajes, fetchHospedajes } = useHospedaje();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospedaje, setSelectedHospedaje] = useState(null);

  useEffect(() => {
    fetchHospedajes();
  }, [fetchHospedajes]);

  const handleAddHospedaje = () => {
    setSelectedHospedaje(null);
    setIsModalOpen(true);
  };

  const handleEditHospedaje = (hospedaje) => {
    setSelectedHospedaje(hospedaje);
    setIsModalOpen(true);
  };

  const handleRegisterSuccess = () => {
    fetchHospedajes();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Hospedaje</h1>
      <button
        onClick={handleAddHospedaje}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Registrar Hospedaje
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Paciente ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Cliente ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Fecha de Inicio</th>
              <th className="py-2 px-4 border-b border-gray-200">Fecha de Fin</th>
              <th className="py-2 px-4 border-b border-gray-200">Costo</th>
              <th className="py-2 px-4 border-b border-gray-200">Notas</th>
              <th className="py-2 px-4 border-b border-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {hospedajes.map((hospedaje) => (
              <tr key={hospedaje.id}>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.patient_id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.client_id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(hospedaje.start_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(hospedaje.end_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.cost}</td>
                <td className="py-2 px-4 border-b border-gray-200">{hospedaje.notes}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleEditHospedaje(hospedaje)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                  >
                    Editar
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










