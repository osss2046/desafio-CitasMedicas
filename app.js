// Importación de módulos necesarios utilizando ESM
import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';

// Crear una instancia del servidor Express
const app = express();
const port = 3000;

// Almacenar los usuarios registrados en memoria
let users = [];

// Función asincrónica para obtener datos de un usuario aleatorio de la API de Random User
async function fetchRandomUser() {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];
    user.id = uuidv4(); // Agregar un ID único
    user.timestamp = moment().format('YYYY-MM-DD HH:mm:ss'); // Agregar un timestamp formateado
    return user;
  } catch (error) {
    console.error(chalk.red('Error fetching user:'), error);
    return null;
  }
}

// Ruta para registrar un nuevo usuario y devolverlo
app.get('/register-user', async (req, res) => {
  try {
    const newUser = await fetchRandomUser();
    if (newUser) {
      users.push(newUser);
      console.log(chalk.blue.bgWhite('Nuevo Usuario Registrado:'), newUser);
      res.status(201).json(newUser);
    } else {
      throw new Error('Failed to fetch user');
    }
  } catch (error) {
    console.log(chalk.red('Error al registrar usuario:'), error);
    res.status(500).json({ message: 'Error registering new user', error: error.message });
  }
});

// Ruta para obtener y devolver todos los usuarios registrados, divididos por sexo
app.get('/users', (req, res) => {
  const maleUsers = _.filter(users, { gender: 'male' });
  const femaleUsers = _.filter(users, { gender: 'female' });
  console.log(chalk.blue.bgWhite('Lista de Usuarios:'), { maleUsers, femaleUsers });
  res.json({ maleUsers, femaleUsers });
});

// Ruta raíz para confirmar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor de citas médicas en funcionamiento');
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
  console.log(chalk.green(`Servidor escuchando en http://localhost:${port}`));
});
