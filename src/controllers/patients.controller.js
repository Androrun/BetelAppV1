import { pool } from "../db.js";
import { createPatientSchema, updatePatientSchema } from "../schemas/patient.schema.js";

// Obtener todos los pacientes
export const getAllPatients = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.breed, p.species, p.weight, p.birth_date, p.color, p.size, p.reproductive_status, p.client_id, p.gender, c.full_name as client_name
      FROM patients p
      LEFT JOIN clients c ON p.client_id = c.id
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Obtener un paciente por su ID
export const getPatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const result = await pool.query(`
      SELECT p.id, p.name, p.breed, p.species, p.weight, p.birth_date, p.color, p.size, p.reproductive_status, p.client_id, p.gender, c.full_name as client_name
      FROM patients p
      LEFT JOIN clients c ON p.client_id = c.id
      WHERE p.id = $1
    `, [patientId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo paciente
export const createPatient = async (req, res, next) => {
  try {
    const validatedData = createPatientSchema.parse(req.body);
    const { name, breed, species, weight, birth_date, color, size, reproductive_status, client_id, gender } = validatedData;

    console.log('Datos recibidos del paciente:', { name, breed, species, weight, birth_date, color, size, reproductive_status, client_id, gender });

    const result = await pool.query(
      "INSERT INTO patients (name, breed, species, weight, birth_date, color, size, reproductive_status, client_id, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [name, breed, species, weight, birth_date, color, size, reproductive_status, client_id, gender]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar información de un paciente
export const updatePatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const validatedData = updatePatientSchema.parse(req.body);
    const { name, breed, species, weight, birth_date, color, size, reproductive_status, client_id, gender } = validatedData;

    await pool.query(
      "UPDATE patients SET name = $1, breed = $2, species = $3, weight = $4, birth_date = $5, color = $6, size = $7, reproductive_status = $8, client_id = $9, gender = $10 WHERE id = $11",
      [name, breed, species, weight, birth_date, color, size, reproductive_status, client_id, gender, patientId]
    );

    res.json({ message: 'Paciente actualizado exitosamente.' });
  } catch (error) {
    next(error);
  }
};

// Eliminar un paciente
export const deletePatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    await pool.query("DELETE FROM patients WHERE id = $1", [patientId]);

    res.json({ message: 'Paciente eliminado exitosamente.' });
  } catch (error) {
    next(error);
  }
};
