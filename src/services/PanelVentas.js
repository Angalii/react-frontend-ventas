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
    cantidad: 1,
    tipoComprobante: "BOLETA"
  });
  // estado para el modal de confirmación
  const [mostrarModal, setMostrarModal] = useState(false);

  const [ventaRegistrada, setVentaRegistrada] = useState(null);
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

  // Función para calcular el total de la venta sumando los subtotales de cada producto
  const calcularTotal = () => {
    return detalleVenta.reduce(
      (total, producto) =>
        total + producto.subtotal,
      0
    );
  };

  // Función para registrar la venta enviando los datos al backend
  const registrarVenta = async () => {
    // DNI obligatorio
    if (!form.dni.trim()) {
      alert("Debe ingresar un DNI");
      return;
    }

    // Validar DNI completo
    if (form.dni.length !== 8) {
      alert("El DNI debe tener 8 dígitos");
      return;
    }

    // Mínimo un producto
    if (detalleVenta.length === 0) {
      alert(
        "Debe agregar al menos un producto"
      );
      return;
    }

    const nombresSeparados =
      form.nombreCompleto.split(" ");

    const body = {
      venta: {
        tipoDocumento: "DNI",
        nroDocumento: form.dni,
        empleadoId: 1,

        productos: detalleVenta.map(
          (producto) => ({
            productoId: producto.id,
            cantidad: producto.cantidad
          })
        ),

        tipoComprobante: "BOLETA"
      },

      cliente: {
        tipoDocumento: "DNI",
        nroDocumento: form.dni,

        nombres:
          nombresSeparados[0] || "",

        apellidoP:
          nombresSeparados[1] || "",

        apellidoM:
          nombresSeparados[2] || "",

        direccion: form.direccion,
        telefono: form.telefono
      }
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/ventas/procesar",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      if (!response.ok) {
        throw new Error(
          "Error al registrar venta"
        );
      }

      const data = await response.json();

      setVentaRegistrada(data);
      setMostrarModal(true);

      // console.log(data);

      // alert("Venta registrada");
    } catch (error) {
      console.error(error);

      alert(
        "Error al registrar venta"
      );
    }
  };

  // Función para limpiar el formulario después de registrar la venta
  const limpiarFormulario = () => {
    setForm({
      tipoDoc: "DNI",
      dni: "",
      nombreCompleto: "",
      direccion: "",
      telefono: "",
      correo: "",
      productoSeleccionado: "",
      cantidad: ""
    });

    setDetalleVenta([]);
  };

  return {
    form,
    productos,
    detalleVenta,
    mostrarModal,
    ventaRegistrada,
    setMostrarModal,
    calcularTotal,
    handleChange,
    buscarDNI,
    agregarProducto,
    registrarVenta,
    limpiarFormulario
  };
};