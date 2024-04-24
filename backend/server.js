const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const users = []; // Aquí almacenaremos los usuarios (por ahora, en memoria)

// Registro de usuario
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
  };

  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado con éxito' });
});

// Login de usuario
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ id: user.id }, 'tu_secreto_secreto', { expiresIn: '1h' });

  res.json({ message: 'Login exitoso', token });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
