import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospedaje } from '../context/HospedajeContext';
import { useClients } from '../context/ClientsContext';

const HospedajeRegistroPage = () => {
  const { addHospedaje } = useHospedaje();
  const { clients, fetchClients } = useClients();

  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPet, setSelectedPet] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    if (searchTerm) {
      const results = clients.filter(client =>
        client.client_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(results);
    } else {
      setFilteredClients([]);
    }
  }, [searchTerm, clients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hospedaje = {
      patient_id: selectedPet,
      start_date: startDate,
      end_date: endDate,
      notes: notes,
    };

    console.log('Hospedaje a enviar:', hospedaje); // Depuración para ver el objeto antes de enviarlo

    try {
      await addHospedaje(hospedaje);
      navigate('/veterinario/hospedaje'); // Redirige a la ruta correcta después de registrar
    } catch (error) {
      console.error('Error al registrar hospedaje:', error);
    }
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setFilteredClients([]);
    setSearchTerm(client.client_name);
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Registrar Hospedaje</h2>
        <div className="mb-4 relative">
          <label htmlFor="client-search" className="block text-lg font-medium text-gray-700">
            Buscar Cliente
          </label>
          <input
            id="client-search"
            type="text"
            placeholder="Buscar por nombre del cliente"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredClients.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-60 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {filteredClients.map((client) => (
                <li
                  key={client.client_id}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                  onClick={() => handleClientSelect(client)}
                >
                  <span className="block truncate">
                    {client.client_name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedClient && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pet" className="block text-lg font-medium text-gray-700">
              Mascota
            </label>
            <select
              id="pet"
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccione una mascota</option>
              {selectedClient.pets.map(pet => (
                <option key={pet.pet_id} value={pet.pet_id}>
                  {pet.pet_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="start-date" className="block text-lg font-medium text-gray-700">
              Fecha de Ingreso
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-lg font-medium text-gray-700">
              Fecha de Retiro
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-lg font-medium text-gray-700">
              Notas
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Registrar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HospedajeRegistroPage;



