import React, { useState, useEffect } from 'react';
import { createPatientRequest, updatePatientRequest, getPatientRequest } from '../api/patients.api';

const PetsForm = ({ onClose, onRegisterSuccess, clientId, patientId }) => {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [estadoReproductivo, setEstadoReproductivo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [color, setColor] = useState('');
  const [raza, setRaza] = useState('');
  const [especie, setEspecie] = useState('');
  const [talla, setTalla] = useState('');
  const [peso, setPeso] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      if (patientId) {
        try {
          const response = await getPatientRequest(patientId);
          const patient = response.data;
          setNombre(patient.name);
          setGenero(patient.gender);
          setEstadoReproductivo(patient.reproductive_status);
          setFechaNacimiento(patient.birth_date);
          setColor(patient.color);
          setRaza(patient.breed);
          setEspecie(patient.species);
          setTalla(patient.size);
          setPeso(patient.weight);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      }
    };

    fetchPatientData();
  }, [patientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const birthDateFormatted = new Date(fechaNacimiento).toISOString().split('T')[0];
    const weightNumber = parseFloat(peso);

    const patientData = {
      name: nombre,
      breed: raza,
      species: especie,
      weight: weightNumber,
      birth_date: birthDateFormatted,
      color,
      size: talla,
      reproductive_status: estadoReproductivo,
      gender: genero,
      client_id: parseInt(clientId, 10),
    };

    try {
      if (patientId) {
        await updatePatientRequest(patientId, patientData);
        console.log('Mascota actualizada:', patientId);
      } else {
        const response = await createPatientRequest(patientData);
        console.log('Mascota creada:', response.data);
      }
      onRegisterSuccess();
      onClose();
    } catch (error) {
      console.error('Error guardando mascota:', error.response?.data || error.message);
      setError(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">{patientId ? 'Editar Mascota' : 'Registrar Mascota'}</h2>
        {error && <div className="text-red-500 mb-4">{JSON.stringify(error)}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-bold mb-1">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 font-bold mb-1">ID (opcional)</label>
            <input
              type="text"
              id="id"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="especie" className="block text-gray-700 font-bold mb-1">Especie</label>
            <select
              id="especie"
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Selecciona una especie</option>
              <option value="Canina">Canina</option>
              <option value="Felina">Felina</option>
              <option value="Lagomorfo">Conejo</option>
              <option value="Roedor">Hamster</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="raza" className="block text-gray-700 font-bold mb-1">Raza</label>
            <input
              type="text"
              id="raza"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genero" className="block text-gray-700 font-bold mb-1">Género</label>
            <select
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Seleccione una opción</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block text-gray-700 font-bold mb-1">Color</label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fechaNacimiento" className="block text-gray-700 font-bold mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="peso" className="block text-gray-700 font-bold mb-1">Peso</label>
            <div className="flex items-center">
              <input
                type="number"
                id="peso"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <select className="ml-2 px-3 py-2 border rounded-md">
                <option value="kg">Kilogramos</option>
                <option value="lbs">Libras</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="talla" className="block text-gray-700 font-bold mb-1">Talla</label>
            <select
              id="talla"
              value={talla}
              onChange={(e) => setTalla(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Seleccione una opción</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="estadoReproductivo" className="block text-gray-700 font-bold mb-1">Estado Reproductivo</label>
            <select
              id="estadoReproductivo"
              value={estadoReproductivo}
              onChange={(e) => setEstadoReproductivo(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Seleccione estado</option>
              <option value="entero">Entero</option>
              <option value="esterilizado">Esterilizado</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 bg-red-500 text-white">Cerrar</button>
          <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-md">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default PetsForm;








