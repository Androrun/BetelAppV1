import React, { useState, useEffect } from 'react';
import { useHospedaje } from '../../context/HospedajeContext';
import { useClients } from '../../context/ClientsContext';
import { usePatients } from '../../context/PatientContext';

const RegisterHospedajeModal = ({ isOpen, onClose, onRegisterSuccess, hospedaje }) => {
  const initialFormData = {
    patient_id: '',
    client_id: '',
    start_date: '',
    end_date: '',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [searchClientTerm, setSearchClientTerm] = useState('');
  const [searchPatientTerm, setSearchPatientTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [clientsLoaded, setClientsLoaded] = useState(false);
  const [patientsLoaded, setPatientsLoaded] = useState(false);

  const { addHospedaje, updateHospedaje } = useHospedaje();
  const { clients, fetchClients } = useClients();
  const { patients, fetchPatients } = usePatients();

  useEffect(() => {
    if (isOpen) {
      fetchClients().then(() => setClientsLoaded(true));
      fetchPatients().then(() => setPatientsLoaded(true));
    }
  }, [isOpen, fetchClients, fetchPatients]);

  useEffect(() => {
    if (isOpen && clientsLoaded && patientsLoaded) {
      if (hospedaje) {
        const selectedClient = clients.find(client => client.client_id === hospedaje.client_id);
        const selectedPatient = patients.find(patient => patient.id === hospedaje.patient_id);
        const clientSearchTerm = selectedClient ? `${selectedClient.client_name} (${selectedClient.client_id})` : '';
        const patientSearchTerm = selectedPatient ? `${selectedPatient.name} (${selectedPatient.id})` : '';

        setFormData({
          patient_id: hospedaje.patient_id,
          client_id: hospedaje.client_id,
          start_date: new Date(hospedaje.start_date).toISOString().slice(0, -1),
          end_date: new Date(hospedaje.end_date).toISOString().slice(0, -1),
          notes: hospedaje.notes,
        });
        setSearchClientTerm(clientSearchTerm);
        setSearchPatientTerm(patientSearchTerm);
      } else {
        setFormData(initialFormData);
        setSearchClientTerm('');
        setSearchPatientTerm('');
      }
    }
  }, [isOpen, clientsLoaded, patientsLoaded, hospedaje, clients, patients]);

  useEffect(() => {
    if (searchClientTerm && !hospedaje) {
      const filtered = clients.filter(client =>
        `${client.client_name} ${client.client_id}`.toLowerCase().includes(searchClientTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients([]);
    }
  }, [searchClientTerm, clients, hospedaje]);

  useEffect(() => {
    if (searchPatientTerm && formData.client_id) {
      const filtered = patients.filter(patient =>
        patient.client_id === formData.client_id && `${patient.name} ${patient.id}`.toLowerCase().includes(searchPatientTerm.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  }, [searchPatientTerm, formData.client_id, patients, hospedaje]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
      };

      if (hospedaje) {
        await updateHospedaje(hospedaje.id, formattedData);
      } else {
        await addHospedaje(formattedData);
      }

      onRegisterSuccess();
      setFormData(initialFormData);
      onClose();
    } catch (error) {
      console.error('Error al registrar el hospedaje:', error);
    }
  };

  const handleSelectClient = (client) => {
    setFormData((prevData) => ({
      ...prevData,
      client_id: client.client_id,
      patient_id: ''
    }));
    setSearchClientTerm(`${client.client_name} (${client.client_id})`);
    setFilteredClients([]);
  };

  const handleSelectPatient = (patient) => {
    setFormData((prevData) => ({
      ...prevData,
      patient_id: patient.id,
    }));
    setSearchPatientTerm(`${patient.name} (${patient.id})`);
    setFilteredPatients([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl mb-4">{hospedaje ? 'Editar Hospedaje' : 'Registrar Hospedaje'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <label className="block text-gray-700">Buscar Cliente</label>
            <input
              type="text"
              name="searchClientTerm"
              value={searchClientTerm}
              onChange={(e) => setSearchClientTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              disabled={!!hospedaje}
            />
            {searchClientTerm && !hospedaje && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto w-full">
                {filteredClients.map(client => (
                  <div
                    key={client.client_id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectClient(client)}
                  >
                    {`${client.client_name} (${client.client_id})`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative mb-4">
            <label className="block text-gray-700">Buscar Paciente</label>
            <input
              type="text"
              name="searchPatientTerm"
              value={searchPatientTerm}
              onChange={(e) => setSearchPatientTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              disabled={!!hospedaje}
            />
            {searchPatientTerm && !hospedaje && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto w-full">
                {filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectPatient(patient)}
                  >
                    {`${patient.name} (${patient.id})`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Fecha de Ingreso</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Fecha de Salida</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Notas</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {hospedaje ? 'Guardar Cambios' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterHospedajeModal;













