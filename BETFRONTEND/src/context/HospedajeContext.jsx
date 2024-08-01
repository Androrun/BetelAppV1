import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  getAllHospedajesRequest, 
  getHospedajeRequest,
  createHospedajeRequest, 
  updateHospedajeRequest, 
  deleteHospedajeRequest 
} from '../api/hospedaje.api';

const HospedajeContext = createContext();

export const useHospedaje = () => useContext(HospedajeContext);

export const HospedajeProvider = ({ children }) => {
  const [hospedajes, setHospedajes] = useState([]);
  const [hospedaje, setHospedaje] = useState(null);

  const fetchHospedajes = useCallback(async () => {
    try {
      const response = await getAllHospedajesRequest();
      setHospedajes(response.data);
    } catch (error) {
      console.error('Error fetching hospedajes:', error);
    }
  }, []);

  const fetchHospedaje = useCallback(async (id) => {
    try {
      const response = await getHospedajeRequest(id);
      setHospedaje(response.data);
    } catch (error) {
      console.error('Error fetching hospedaje:', error);
    }
  }, []);

  const addHospedaje = useCallback(async (hospedaje) => {
    try {
      const response = await createHospedajeRequest(hospedaje);
      setHospedajes((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding hospedaje:', error);
    }
  }, []);

  const updateHospedaje = useCallback(async (id, hospedaje) => {
    try {
      await updateHospedajeRequest(id, hospedaje);
      setHospedajes((prev) =>
        prev.map((h) => (h.id === id ? { ...h, ...hospedaje } : h))
      );
    } catch (error) {
      console.error('Error updating hospedaje:', error);
    }
  }, []);

  const deleteHospedaje = useCallback(async (id) => {
    try {
      await deleteHospedajeRequest(id);
      setHospedajes((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      console.error('Error deleting hospedaje:', error);
    }
  }, []);

  return (
    <HospedajeContext.Provider value={{ 
      hospedajes, 
      hospedaje,
      fetchHospedajes, 
      fetchHospedaje,
      addHospedaje, 
      updateHospedaje, 
      deleteHospedaje 
    }}>
      {children}
    </HospedajeContext.Provider>
  );
};
