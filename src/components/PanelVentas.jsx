import { FaSearch, FaPlus } from "react-icons/fa";
import { usePanelVentasLogic } from "../services/PanelVentas";
import ModalConfirmacion from "../components/ModalConfirmacion";

function PanelVentas() {
  const {
    form,
    productos,
    detalleVenta,
    mostrarModal,
    ventaRegistrada,
    setMostrarModal,
    handleChange,
    buscarDNI,
    agregarProducto,
    calcularTotal,
    registrarVenta,
    limpiarFormulario
  } = usePanelVentasLogic();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-[28px] shadow-sm p-8">

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Registro de Venta
          </h1>

          <p className="text-gray-500 mt-2">
            Gestiona clientes, productos y registra ventas
          </p>
        </div>

        {/* DATOS CLIENTE */}
        <div className="border-b border-gray-100 pb-8 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            Datos del Cliente
          </h2>

          {/* Documento + búsqueda */}
          <div className="flex gap-3 items-center mb-5">
            <select
              name="tipoDoc"
              value={form.tipoDoc}
              className="bw-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition"
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
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition"
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
            <label className="text-sm font-semibold text-gray-600 block mb-2">
              Nombre completo
            </label>

            <input
              type="text"
              value={form.nombreCompleto}
              readOnly
              placeholder="Nombre del cliente"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-4 focus:ring-gray-100 transition"
            />
          </div>

          {/* Dirección */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-600 block mb-2">
              Dirección
            </label>

            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition"
            />
          </div>

          {/* Teléfono + Correo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Teléfono
              </label>

              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Correo
              </label>

              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="Correo"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition"
              />
            </div>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="border-b border-gray-100 pb-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Agregar Productos
            </h2>

            <span className="text-sm text-gray-400">
              Selecciona un producto
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">

            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Producto
              </label>

              <select
                name="productoSeleccionado"
                value={form.productoSeleccionado}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition"
              >
                <option value="">
                  Seleccione producto
                </option>

                {productos.map((producto) => (
                  <option
                    key={producto.id}
                    value={producto.id}
                  >
                    {producto.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
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
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition"
              />
            </div>

            {/* Botón */}
            <button
              onClick={agregarProducto}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:scale-[1.02] hover:shadow-lg text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 font-semibold"
            >
              <FaPlus />
              Agregar Producto
            </button>
          </div>
        </div>

        {/* TABLA PRODUCTOS */}
        <div className="border-b border-gray-100 pb-8 mb-8">
          <h2 className="text-xl font-semibold mb-5 text-gray-800">
            Detalle de Venta
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200">

            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">

                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Producto
                  </th>

                  <th className="px-6 py-4 font-semibold text-center">
                    Cantidad
                  </th>

                  <th className="px-6 py-4 font-semibold text-center">
                    Precio
                  </th>

                  <th className="px-6 py-4 font-semibold text-right">
                    Subtotal
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {detalleVenta.length > 0 ? (
                  detalleVenta.map((producto, index) => (
                    <tr
                      key={index}
                      className="hover:bg-pink-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {producto.nombre}
                      </td>

                      <td className="px-6 py-4 text-center text-gray-600">
                        {producto.cantidad}
                      </td>

                      <td className="px-6 py-4 text-center text-gray-600">
                        S/ {producto.precio}
                      </td>

                      <td className="px-6 py-4 text-right font-semibold text-pink-600">
                        S/ {producto.subtotal}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      No hay productos agregados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DATOS DE VENTA */}
        {/* <div className="border-b border-gray-100 pb-8 mb-8">
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
        </div> */}
        <div className="pt-2">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Datos de Venta
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Revisa la información antes de registrar
              </p>
            </div>

            <div className="bg-pink-50 px-5 py-3 rounded-2xl border border-pink-100">
              <p className="text-sm text-gray-500">
                Total
              </p>

              <h3 className="text-2xl font-bold text-pink-600">
                S/ {calcularTotal().toFixed(2)}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Tipo comprobante
              </label>

              <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition">
                <option>BOLETA</option>
                <option>FACTURA</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                ID Empleado
              </label>

              <input
                type="text"
                value="1"
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-100 outline-none px-4 py-3 text-gray-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Total
              </label>

              <input
                type="text"
                value={`S/ ${calcularTotal().toFixed(2)}`}
                readOnly
                className="w-full rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 font-bold text-pink-600 text-lg outline-none"
              />
            </div>
          </div>

          <button
            onClick={registrarVenta}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:shadow-lg hover:scale-[1.01] text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200"
          >
            Registrar Venta
          </button>
        </div>
        {mostrarModal && (
          <ModalConfirmacion
            venta={ventaRegistrada}
            onClose={() => {
              setMostrarModal(false);
              limpiarFormulario();
            }}
            onPdf={() =>
              console.log("PDF")
            }
          />
        )}
      </div>
    </div>
  );
}

export default PanelVentas;