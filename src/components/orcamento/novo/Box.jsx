import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import { Form, Table, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
const style = {
  heigh: "100",
  width: "100%"
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const addItem = (columnId, columns, setColumns) => {
  const column = columns[columnId];
  const previousItems = [...column.items];
  previousItems.push({
    id: uuid(),
    content: "Mergulho golfinho",
    qtd: "1",
    valor: "$170,00"
  });
  setColumns({
    ...columns,
    [columnId]: {
      ...column,
      items: previousItems
    }
  });
};

const Box = (columnsFromBackend, itemsFromBackend, contadorDia) => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [items, setItems] = useState(itemsFromBackend);
  const [dia, setDia] = useState(contadorDia);

  return (
    <div
      style={{
        display: "inline-box",
        justifyContent: "center",
        minHeight: 100,
        width: "100%"
      }}
    >
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <div style={{ margin: 2, width: "100%" }}>
                <h2>{column.name}</h2>
                <input
                  type="button"
                  value="Add"
                  onClick={() =>
                    addItem(columnId, columns, setColumns, items, setItems)
                  }
                />
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "none",
                          padding: 4,
                          width: "100%",
                          minHeight: 100,
                          borderTop: "1px solid lightgray",
                          borderBottom: "1px solid lightgray"
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 5,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "none",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <Table class="table">
                                      <tr>
                                        <td
                                          style={{
                                            width: "20%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"servico" + index}
                                            defaultValue={item.content}
                                            class="form-control-viagem width20"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "5%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"qtd" + index}
                                            defaultValue={item.qtd}
                                            class="form-control-viagem width5"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "5%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"unitReal" + index}
                                            class="form-control-viagem width5"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "10%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"totalReal" + index}
                                            class="form-control-viagem width10"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "5%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"valorReal" + index}
                                            class="form-control-viagem width5"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "10%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"valorTotalReal" + index}
                                            class="form-control-viagem width10"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "5%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"unitDollar" + index}
                                            class="form-control-viagem width5"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "10%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"totalDollar" + index}
                                            class="form-control-viagem width10"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "5%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"valorDollar" + index}
                                            class="form-control-viagem width5"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "10%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"valorTotalDollar" + index}
                                            class="form-control-viagem width10"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "10%",
                                            padding: "2px",
                                            borderTop: "0"
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name={"obs" + index}
                                            class="form-control-viagem width10"
                                          />
                                        </td>
                                      </tr>
                                    </Table>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Box;
