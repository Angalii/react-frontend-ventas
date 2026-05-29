import { useEffect, useState } from "react";

export const usePanelVentasLogic = () => {
  // Estado para el detalle de la venta (productos agregados)
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [form, setForm] = useState({
    tipoDoc: "DNI",
    dni: "",
    nombreCompleto: "",
    telefono: "",
    correo: "",
    direccion: "",
    productoSeleccionado: "",
    cantidad: 1
  });
  // Estado para almacenar los productos obtenidos del backend
  const [productos, setProductos] = useState([]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // Función para buscar el DNI con DECOLECTA
  const buscarDNI = async () => {
    try {
      const response =
        await fetch(
          `http://localhost:8080/api/clientes/buscar?dni=${form.dni}`
        );

      if (!response.ok) {
        throw new Error(
          "No encontrado"
        );
      }

      const data =
        await response.json();

      setForm((prev) => ({
        ...prev,

        nombreCompleto:
          `${data.first_name} ${data.first_last_name} ${data.second_last_name}`,
      }));
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert(
        "No se encontró el DNI"
      );
    }
  };

  // Función para cargar los productos del select desde el backend
  useEffect(() => {
    const cargarProductos =
      async () => {
        try {
          const response =
            await fetch(
              "http://localhost:8080/api/productos"
            );

          const data =
            await response.json();

          setProductos(data);
        } catch (error) {
          console.error(
            "Error cargando productos:",
            error
          );
        }
      };

    cargarProductos();
  }, []);

  // Función para agregar un producto a la mini tabla del detalle de la venta
  const agregarProducto = () => {

    if (!form.productoSeleccionado) {
      alert("Seleccione un producto");
      return;
    }

    if (form.cantidad < 1) {
      alert("Cantidad inválida");
      return;
    }

    const productoEncontrado = productos.find(
      (producto) =>
        producto.id === Number(form.productoSeleccionado)
    );

    if (!productoEncontrado) return;

    const nuevoProducto = {
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      cantidad: Number(form.cantidad),
      subtotal: productoEncontrado.precio * Number(form.cantidad)
    };

    setDetalleVenta((prev) => [
      ...prev,
      nuevoProducto
    ]);

    setForm((prev) => ({
      ...prev,
      productoSeleccionado: "",
      cantidad: 1
    }));
  };

  const calcularTotal = () => {
    return detalleVenta.reduce(
      (total, producto) =>
        total + producto.subtotal,
      0
    );
  };

  return {
    form,
    productos,
    detalleVenta,
    calcularTotal,
    handleChange,
    buscarDNI,
    agregarProducto
  };
};