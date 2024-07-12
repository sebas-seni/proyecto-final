import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

import employeesRouter from './routes/employees.routes.js';
import db from './data/data.js';

dotenv.config({
  path: './config.env',
});
const app = express();

// Middleware para parsear body del request
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.use('/api/v1/employees', employeesRouter);

const createDBIfNotExists = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    console.log(`Conexion ok a la base de datos`);
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );
    console.log(
      `Base de datos ${process.env.DB_NAME} Verificada o creada exitosamente`
    );
  } catch (e) {
    console.error(e);
  }
};

// Creando ambiente de conexion a la base de datos
const connectiondb = async () => {
  try {
    await db.authenticate();
  } catch (error) {
    console.log(`el error es : ${error.message}`);
  }
};

app.listen(process.env.PORT, () => {
  connectiondb();
  createDBIfNotExists();
  console.log(
    `Servidor corriendo en el puerto http://localhost:${process.env.PORT}`
  );
});
