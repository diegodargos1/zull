import React, { useState, Component } from "react";
import Box from "./Box";
import uuid from "uuid/v4";

const itemsFromBackend = [
  { id: uuid(), content: "Almoço", qtd: "1", valor: "$17,00" },
  { id: uuid(), content: "Jantar", qtd: "1", valor: "$27,00" },
  { id: uuid(), content: "Bungee Jump", qtd: "1", valor: "$80,00" },
  { id: uuid(), content: "Café da manhã", qtd: "1", valor: "$17,00" },
  { id: uuid(), content: "Mergulho golfinho", qtd: "1", valor: "$170,00" }
];

const contadorDia = { count: 1 };

const columnsFromBackend = {
  [uuid()]: {
    name: "Pré Viagem",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "Dia " + contadorDia.count,
    items: [
      { id: uuid(), content: "Mergulho golfinho", qtd: "1", valor: "$170,00" }
    ]
  }
};

const addColumn = (columns, setColumns, dia, setDia) => {
  const newDay = dia.count + 1;
  setDia({ count: newDay });
  setColumns({
    ...columns,
    [uuid()]: {
      name: "Dia " + newDay,
      items: []
    }
  });
};

const Container = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [dia, setDia] = useState(contadorDia);
  return (
    <div
      style={{ overflow: "auto", clear: "both", width: "auto" }}
      className="desktop"
    >
      <input
        type="button"
        value="Add Dia"
        onClick={() => addColumn(columns, setColumns, dia, setDia)}
      />
      {Box(columnsFromBackend, itemsFromBackend, contadorDia)}
    </div>
  );
};

export default Container;
