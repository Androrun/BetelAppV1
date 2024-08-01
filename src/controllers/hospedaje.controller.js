import { pool } from "../db.js";
import { createHospedajeSchema, updateHospedajeSchema } from "../schemas/hospedaje.schema.js";

// Obtener todos los registros de hospedaje
export const getAllHospedajes = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT h.id, h.patient_id, p.name as patient_name, h.client_id, c.full_name as client_name, h.start_date, h.end_date, h.notes
      FROM hospedaje h
      LEFT JOIN patients p ON h.patient_id = p.id
      LEFT JOIN clients c ON h.client_id = c.id
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Obtener un registro de hospedaje por su ID
export const getHospedaje = async (req, res, next) => {
  try {
    const { hospedajeId } = req.params;
    const result = await pool.query(`
      SELECT h.id, h.patient_id, p.name as patient_name, h.client_id, c.full_name as client_name, h.start_date, h.end_date, h.notes
      FROM hospedaje h
      LEFT JOIN patients p ON h.patient_id = p.id
      LEFT JOIN clients c ON h.client_id = c.id
      WHERE h.id = $1
    `, [hospedajeId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Hospedaje no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo registro de hospedaje
export const createHospedaje = async (req, res, next) => {
  try {
    const validatedData = createHospedajeSchema.parse(req.body);
    const { patient_id, client_id, start_date, end_date, notes } = validatedData;

    const result = await pool.query(
      "INSERT INTO hospedaje (patient_id, client_id, start_date, end_date, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [patient_id, client_id, start_date, end_date, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar información de un registro de hospedaje
export const updateHospedaje = async (req, res, next) => {
  try {
    const { hospedajeId } = req.params;
    const validatedData = updateHospedajeSchema.parse(req.body);
    const { patient_id, client_id, start_date, end_date, notes } = validatedData;

    await pool.query(
      "UPDATE hospedaje SET patient_id = $1, client_id = $2, start_date = $3, end_date = $4, notes = $5 WHERE id = $6",
      [patient_id, client_id, start_date, end_date, notes, hospedajeId]
    );

    res.json({ message: 'Hospedaje actualizado exitosamente.' });
  } catch (error) {
    next(error);
  }
};

// Eliminar un registro de hospedaje
export const deleteHospedaje = async (req, res, next) => {
  try {
    const { hospedajeId } = req.params;

    await pool.query("DELETE FROM hospedaje WHERE id = $1", [hospedajeId]);

    res.json({ message: 'Hospedaje eliminado exitosamente.' });
  } catch (error) {
    next(error);
  }
};
