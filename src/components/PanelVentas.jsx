import { FaSearch, FaPlus } from "react-icons/fa";
import { usePanelVentasLogic } from "../services/PanelVentas";

function PanelVentas() {
  const {
    form,
    productos,
    detalleVenta,
    handleChange,
    buscarDNI,
    agregarProducto,
    calcularTotal,
    registrarVenta
  } = usePanelVentasLogic();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Título */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Registro de Venta
          </h1>
        </div>

        {/* DATOS CLIENTE */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-5">
            Datos del Cliente
          </h2>

          {/* Documento + búsqueda */}
          <div className="flex gap-3 items-center mb-5">
            <select
              name="tipoDoc"
              value={form.tipoDoc}
              className="border rounded-lg p-3 w-32"
            >
              <option>DNI</option>
              <option>RUC</option>
            </select>

            <input
              type="text"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              maxLength={8}
              placeholder="Ingrese DNI"
              className="border rounded-lg p-3 flex-1"
            />

            <button
              onClick={buscarDNI}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-lg transition"
            >
              <FaSearch />
            </button>
          </div>

          {/* Nombre completo */}
          <div className="mb-5">
            <label className="font-medium block mb-2">
              Nombre completo
            </label>

            <input
              type="text"
              value={form.nombreCompleto}
              readOnly
              placeholder="Nombre del cliente"
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Dirección */}
          <div className="mb-5">
            <label className="font-medium block mb-2">
              Dirección
            </label>

            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Teléfono + Correo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-medium block mb-2">
                Teléfono
              </label>

              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="font-medium block mb-2">
                Correo
              </label>

              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="Correo"
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-5">
            Agregar Productos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

            <div>
              <label className="font-medium block mb-2">
                Producto
              </label>

              <select
                name="productoSeleccionado"
                value={form.productoSeleccionado}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">
                  Seleccione producto
                </option>

                {productos.map(
                  (producto) => (
                    <option
                      key={producto.id}
                      value={producto.id}
                    >
                      {producto.nombre}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="font-medium block mb-2">
                Cantidad
              </label>

              <input
                type="number"
                name="cantidad"
                value={form.cantidad}
                onChange={handleChange}
                placeholder="Cantidad"
                min="1"
                max="20"
                onKeyDown={(e) => {
                  if (
                    e.key === "+" ||
                    e.key === "-" ||
                    e.key === "." ||
                    e.key === "e"
                  ) {
                    e.preventDefault();
                  }
                }}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button onClick={agregarProducto} className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition">
              <FaPlus />
              Agregar
            </button>
          </div>
        </div>

        {/* TABLA PRODUCTOS */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-5">
            Detalle de Venta
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3">
                    Producto
                  </th>

                  <th className="border p-3">
                    Cantidad
                  </th>

                  <th className="border p-3">
                    Precio
                  </th>

                  <th className="border p-3">
                    Subtotal
                  </th>
                </tr>
              </thead>

              <tbody>
                {detalleVenta.length > 0 ? (
                  detalleVenta.map((producto, index) => (
                    <tr key={index}>
                      <td className="border p-3">
                        {producto.nombre}
                      </td>

                      <td className="border p-3">
                        {producto.cantidad}
                      </td>

                      <td className="border p-3">
                        S/ {producto.precio}
                      </td>

                      <td className="border p-3">
                        S/ {producto.subtotal}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="border p-3 text-center"
                      colSpan="4"
                    >
                      Sin productos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DATOS DE VENTA */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-5">
            Datos de Venta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">

            <div>
              <label className="font-medium block mb-2">
                Tipo comprobante
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>
                  BOLETA
                </option>

                <option>
                  FACTURA
                </option>
              </select>
            </div>

            <div>
              <label className="font-medium block mb-2">
                ID Empleado
              </label>

              <input
                type="text"
                value="1"
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="font-medium block mb-2">
                Total
              </label>

              <input
                type="text"
                value={`S/ ${calcularTotal().toFixed(2)}`}
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100 font-bold"
              />
            </div>
          </div>

          <button onClick={registrarVenta} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-semibold transition">
            Registrar Venta
          </button>
        </div>
      </div>
    </div>
  );
}

export default PanelVentas;