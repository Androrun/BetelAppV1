import axios from './axios';

export const getAllPatientsRequest = () => axios.get('/veterinario/patients');

export const getPatientRequest = (id) => axios.get(`/veterinario/patients/${id}`);

export const createPatientRequest = (patient) => axios.post('/veterinario/patients', patient);

export const updatePatientRequest = (id, patient) => axios.put(`/veterinario/patients/${id}`, patient);

export const deletePatientRequest = (id) => axios.delete(`/veterinario/patients/${id}`);

export const getClientRequest = (id) => axios.get(`/veterinario/clients/${id}`);


