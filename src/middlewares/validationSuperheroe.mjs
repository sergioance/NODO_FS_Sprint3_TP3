import { body } from "express-validator";


//Validacion para nuevo superheroe
export const validarNuevoSuperheroe = () => [
  body("nombreSuperheroe")
    .notEmpty()
    .withMessage("El nombre del superhéroe es obligatorio")
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre del superhéroe debe tener entre 3 y 60 caracteres"),

  body("nombreReal")
    .notEmpty()
    .withMessage("El nombre real es obligatorio")
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre real debe tener al menos 3 y 60 caracteres"),

  body("edad")
    .notEmpty()
    .withMessage("La edad es obligatoria")
    .trim()
    .isNumeric()
    .withMessage("La edad debe ser un número")
    .isInt({ min: 0 })
    .withMessage("La edad debe ser un número entero positivo"),

// Validación de cada elemento dentro del array de poderes
  body("poderes")
    .notEmpty()
    .withMessage("Los poderes son obligatorios")
    .isArray({ min: 1 })
    .withMessage("Los poderes deben ser un arreglo con al menos un poder"),

  body("poderes.*")
    .isString()
    .withMessage("Cada poder debe ser una cadena de texto")
    .isLength({ min: 3, max: 60 })
    .withMessage("Cada poder debe tener entre 3 y 60 caracteres")
    .trim(),

  ];