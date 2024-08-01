import axios from './axios';

export const getAllHospedajesRequest = () => axios.get('/veterinario/hospedaje');

export const getHospedajeRequest = (id) => axios.get(`/veterinario/hospedaje/${id}`);

export const createHospedajeRequest = (hospedaje) => axios.post('/veterinario/hospedaje', hospedaje);

export const updateHospedajeRequest = (id, hospedaje) => axios.put(`/veterinario/hospedaje/${id}`, hospedaje);

export const deleteHospedajeRequest = (id) => axios.delete(`/veterinario/hospedaje/${id}`);
