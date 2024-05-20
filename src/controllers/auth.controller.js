import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import md5 from 'md5';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (result.rowCount === 0) {
    return res.status(400).json({
      message: "El correo no está registrado",
    });
  }

  const validPassword = await bcrypt.compare(password, result.rows[0].password);

  if (!validPassword) {
    return res.status(400).json({
      message: "La contraseña es incorrecta",
    });
  }

  const token = await createAccessToken({
    id: result.rows[0].id,
    role_id: result.rows[0].role_id,
  });

  res.cookie("token", token, {
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  });

  return res.json({
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
    role_id: result.rows[0].role_id,
  });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;

    // Asignar el rol de USER por defecto (role_id = 3)
    const result = await pool.query(
      "INSERT INTO users(name, email, password, gravatar, role_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, email, hashedPassword, gravatar, 3]
    );

    const token = await createAccessToken({
      id: result.rows[0].id,
      role_id: result.rows[0].role_id,
    });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        message: "El correo ya está registrado",
      });
    }

    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
};

export const profile = async (req, res) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  return res.json(result.rows[0]);
};
