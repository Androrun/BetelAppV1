import { z } from "zod";

// Esquema para la creación de pacientes
export const createPatientSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1)
    .max(255),
  breed: z
    .string({
      required_error: "La raza es requerida",
      invalid_type_error: "La raza debe ser un texto",
    })
    .min(1)
    .max(255),
  species: z
    .string({
      required_error: "La especie es requerida",
      invalid_type_error: "La especie debe ser un texto",
    })
    .min(1)
    .max(255),
  weight: z
    .number({
      required_error: "El peso es requerido",
      invalid_type_error: "El peso debe ser un número",
    })
    .min(0)
    .max(999.99),
  birth_date: z
    .union([z.string(), z.date()])
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "La fecha de nacimiento debe ser una fecha válida",
      path: ["birth_date"],
    })
    .transform((val) => new Date(val)),
  color: z
    .string({
      required_error: "El color es requerido",
      invalid_type_error: "El color debe ser un texto",
    })
    .min(1)
    .max(255),
  size: z
    .string({
      required_error: "El tamaño es requerido",
      invalid_type_error: "El tamaño debe ser un texto",
    })
    .min(1)
    .max(255),
  reproductive_status: z
    .string({
      required_error: "El estado reproductivo es requerido",
      invalid_type_error: "El estado reproductivo debe ser un texto",
    })
    .min(1)
    .max(255),
  client_id: z
    .number({
      required_error: "El ID del cliente es requerido",
      invalid_type_error: "El ID del cliente debe ser un número",
    }),
  gender: z
    .string({
      required_error: "El género es requerido",
      invalid_type_error: "El género debe ser un texto",
    })
    .min(1)
    .max(255)
});

// Esquema para la actualización de pacientes
export const updatePatientSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1)
    .max(255),
  breed: z
    .string({
      required_error: "La raza es requerida",
      invalid_type_error: "La raza debe ser un texto",
    })
    .min(1)
    .max(255),
  species: z
    .string({
      required_error: "La especie es requerida",
      invalid_type_error: "La especie debe ser un texto",
    })
    .min(1)
    .max(255),
  weight: z
    .number({
      required_error: "El peso es requerido",
      invalid_type_error: "El peso debe ser un número",
    })
    .min(0)
    .max(999.99),
  birth_date: z
    .union([z.string(), z.date()])
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "La fecha de nacimiento debe ser una fecha válida",
      path: ["birth_date"],
    })
    .transform((val) => new Date(val)),
  color: z
    .string({
      required_error: "El color es requerido",
      invalid_type_error: "El color debe ser un texto",
    })
    .min(1)
    .max(255),
  size: z
    .string({
      required_error: "El tamaño es requerido",
      invalid_type_error: "El tamaño debe ser un texto",
    })
    .min(1)
    .max(255),
  reproductive_status: z
    .string({
      required_error: "El estado reproductivo es requerido",
      invalid_type_error: "El estado reproductivo debe ser un texto",
    })
    .min(1)
    .max(255),
  client_id: z
    .number({
      required_error: "El ID del cliente es requerido",
      invalid_type_error: "El ID del cliente debe ser un número",
    }),
  gender: z
    .string({
      required_error: "El género es requerido",
      invalid_type_error: "El género debe ser un texto",
    })
    .min(1)
    .max(255)
});
