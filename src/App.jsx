import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import InputTask from "./components/inputTask";
import InputListName from "./components/inputListName";
import ItemsList from "./components/itemsList";
import CPanel from "./components/cPanel";
import Footer from "./components/footer";

function App() {
  const obtenerArrayDelLocalStorage = (item, placeHolder) => {
    const data = localStorage.getItem(item);
    return data ? JSON.parse(data) : placeHolder;
  };

  const [todoList, setTodoList] = useState(
    obtenerArrayDelLocalStorage("todoList", [])
  );
  const [input, setInput] = useState("");
  const [listName, setListName] = useState(
    obtenerArrayDelLocalStorage("titleList", "📝 ToDo List")
  );

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const handleClearInput = () => {
    setInput("");
  };

  const handleClearAll = () => {
    const clearList = [];
    const clearTitle = "📝 ToDo List";
    setTodoList(clearList);
    setListName(clearTitle);
    handleUpdateLocalStorage(clearList);
    localStorage.setItem("titleList", JSON.stringify(clearTitle));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Actualizar input si no esta vacio
    if (input.length > 0) {
      const updatedList = [...todoList, { checked: false, text: input }];
      setTodoList(updatedList);
      handleUpdateLocalStorage(updatedList);
      handleClearInput();
    }
  };

  const handleUpdateLocalStorage = (data) => {
    localStorage.setItem("todoList", JSON.stringify(data));
  };

  const handleChecked = (event, index) => {
    const updatedList = todoList.map((elemento, idx) => {
      if (idx === index) {
        // Cambiar el valor en el índice especificado
        console.log({ checked: !elemento.checked, text: elemento.text });
        return { checked: !elemento.checked, text: elemento.text };
      }
      // Dejar el elemento sin cambios si el índice no coincide
      return elemento;
    });
    // Actualizar el estado con el nuevo array
    setTodoList(updatedList);
    handleUpdateLocalStorage(updatedList);
  };

  const handleMoveItem = (indice, direccion) => {
    // Verificar si el índice es válido y si el movimiento está dentro de los límites del array
    if (
      (direccion === "arriba" && indice > 0) || // Mover arriba: índice debe ser mayor que 0
      (direccion === "abajo" && indice < todoList.length - 1) // Mover abajo: índice debe ser menor que la longitud del array menos 1
    ) {
      // Crear una copia del array
      const nuevoArray = [...todoList];
      // Determinar el nuevo índice según la dirección
      const nuevoIndice = direccion === "arriba" ? indice - 1 : indice + 1;
      // Intercambiar los elementos
      [nuevoArray[indice], nuevoArray[nuevoIndice]] = [
        nuevoArray[nuevoIndice],
        nuevoArray[indice],
      ];
      // Actualizar el estado con el nuevo array
      handleUpdateLocalStorage(nuevoArray);
      setTodoList(nuevoArray);
    }
  };

  const handleDeleteItem = (index) => {
    const todoUpdated = todoList.filter((_, idx) => idx !== index);
    handleUpdateLocalStorage(todoUpdated);
    setTodoList(todoUpdated);
  };

  const descargarLocalStorage = () => {
    // Recuperar todos los datos de localStorage
    const datos = {};
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      datos[clave] = localStorage.getItem(clave);
    }

    // Convertir los datos a una cadena JSON
    const datosJson = JSON.stringify(datos);

    // Crear un objeto Blob con los datos JSON
    const blob = new Blob([datosJson], { type: "application/json" });

    // Crear un enlace de descarga
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = listName.length !== 0 ? `${listName}.json` : "no_name.json"; // Nombre del archivo a descargar

    // Simular un clic en el enlace para iniciar la descarga
    a.click();

    // Limpiar el objeto URL creado
    URL.revokeObjectURL(a.href);
  };

  const handleImport = (event) => {
    // Obtener el archivo seleccionado
    const archivo = event.target.files[0];

    if (archivo) {
      // Crear un objeto FileReader
      const lector = new FileReader();

      // Leer el archivo como texto
      lector.readAsText(archivo);

      // Evento de carga cuando se haya leído el archivo
      lector.onload = () => {
        // Obtener el contenido del archivo
        const contenido = lector.result;

        try {
          // Convertir el contenido a un objeto JavaScript
          const datos = JSON.parse(contenido);
          // Guardar cada clave-valor en localStorage
          for (const clave in datos) {
            if (Object.prototype.hasOwnProperty.call(datos, clave)) {
              localStorage.setItem(clave, datos[clave]);
            }
          }
          setTodoList(JSON.parse(datos.todoList));
          setListName(JSON.parse(datos.titleList));
        } catch (error) {
          console.error("Error al procesar el archivo:", error);
        }
      };

      // Evento de error si ocurre un problema al leer el archivo
      lector.onerror = () => {
        console.error("Error al leer el archivo:", lector.error);
      };
    }
  };

  const handleTitleChange = (event) => {
    const listNameUpdated = event.target.value;
    setListName(listNameUpdated);
    localStorage.setItem("titleList", JSON.stringify(listNameUpdated));
  };

  const pointerStyle = { cursor: "pointer" };

  useEffect(() => {}, [todoList]);

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
          minHeight: "90vh",
        }}
      >
        <InputTask
          handleSubmit={handleSubmit}
          handleChangeInput={handleChangeInput}
          input={input}
        />
        <InputListName
          listName={listName}
          handleTitleChange={handleTitleChange}
        />
        <ItemsList
          todoList={todoList}
          handleChecked={handleChecked}
          handleMoveItem={handleMoveItem}
          handleDeleteItem={handleDeleteItem}
        />
        <CPanel
          handleImport={handleImport}
          descargarLocalStorage={descargarLocalStorage}
          handleClearAll={handleClearAll}
        />
      </div>
      <Footer/>
    </>
  );
}

export default App;
