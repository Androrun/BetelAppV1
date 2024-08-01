import { z } from "zod";

// Esquema para la creación de hospedaje
export const createHospedajeSchema = z.object({
  patient_id: z
    .number({
      required_error: "El ID del paciente es requerido",
      invalid_type_error: "El ID del paciente debe ser un número",
    }),
  client_id: z
    .number({
      required_error: "El ID del cliente es requerido",
      invalid_type_error: "El ID del cliente debe ser un número",
    }),
  start_date: z
    .string({
      required_error: "La fecha de inicio es requerida",
      invalid_type_error: "La fecha de inicio debe ser un texto",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "La fecha de inicio debe ser una fecha válida",
      path: ["start_date"],
    })
    .transform((val) => new Date(val)),
  end_date: z
    .string({
      required_error: "La fecha de fin es requerida",
      invalid_type_error: "La fecha de fin debe ser un texto",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "La fecha de fin debe ser una fecha válida",
      path: ["end_date"],
    })
    .transform((val) => new Date(val)),
  notes: z
    .string()
    .max(1000)
    .optional(),
});

// Esquema para la actualización de hospedaje
export const updateHospedajeSchema = z.object({
  patient_id: z
    .number({
      required_error: "El ID del paciente es requerido",
      invalid_type_error: "El ID del paciente debe ser un número",
    }),
  client_id: z
    .number({
      required_error: "El ID del cliente es requerido",
      invalid_type_error: "El ID del cliente debe ser un número",
    }),
  start_date: z
    .string({
      required_error: "La fecha de inicio es requerida",
      invalid_type_error: "La fecha de inicio debe ser un texto",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "La fecha de inicio debe ser una fecha válida",
      path: ["start_date"],
    })
    .transform((val) => new Date(val)),
  end_date: z
    .string({
      required_error: "La fecha de fin es requerida",
      invalid_type_error: "La fecha de fin debe ser un texto",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "La fecha de fin debe ser una fecha válida",
      path: ["end_date"],
    })
    .transform((val) => new Date(val)),
  notes: z
    .string()
    .max(1000)
    .optional(),
});
