import React from 'react';
import './App.css';
import Login from './components/Login';  // Importa el componente Login desde la nueva ubicación

function App() {
  return (
    <div className="App">
      <h1>App de Restaurante</h1>
      <Login />  {/* Renderiza el componente Login */}
    </div>
  );
}

export default App;
