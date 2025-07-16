import React, { createContext, useState } from 'react';

export const CarrerasContext = createContext();

export const CarrerasProvider = ({ children }) => {
  const [carreras, setCarreras] = useState([]);
  const [jornadas, setJornadas] = useState([]);

  const addCarrera = (origen, destino, precio, kilometros) => {
    setCarreras([...carreras, { id: carreras.length + 1, origen, destino, precio, kilometros }]);
  };

  const updateCarrera = (id, origen, destino, precio, kilometros) => {
    setCarreras(carreras.map(carrera =>
      carrera.id === id ? { ...carrera, origen, destino, precio, kilometros } : carrera
    ));
  };

  const finalizeJornada = () => {
    if (carreras.length > 0) {
      setJornadas([...jornadas, { id: jornadas.length + 1, carreras: [...carreras] }]);
      setCarreras([]);
    }
  };

  return (
    <CarrerasContext.Provider value={{ carreras, addCarrera, updateCarrera, jornadas, finalizeJornada }}>
      {children}
    </CarrerasContext.Provider>
  );
};