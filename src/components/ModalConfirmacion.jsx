import "../syles/ModalConfirmacion.css";
import { FaTimes, FaFilePdf } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

function ModalConfirmacion({ venta, onClose, onPdf }) {
    if (!venta) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                {/* X cerrar */}
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                {/* Ícono */}
                <div className="success-icon">
                    <MdCheckCircle />
                </div>

                {/* Título */}
                <h2 className="modal-title">Venta registrada</h2>

                {/* Resumen */}
                <div className="modal-info">
                    <div className="info-row">
                        <span>Cliente:</span>
                        <strong>{venta.nombreCliente}</strong>
                    </div>

                    <div className="info-row">
                        <span>Comprobante:</span>
                        <strong>{venta.numeroComprobante}</strong>
                    </div>

                    <div className="info-row">
                        <span>Tipo:</span>
                        <strong>{venta.tipoComprobante}</strong>
                    </div>

                    <div className="info-row">
                        <span>Estado:</span>
                        <strong className="status">{venta.estado}</strong>
                    </div>

                    <div className="info-row">
                        <span>Fecha:</span>
                        <strong>{venta.fechaEmision}</strong>
                    </div>

                    <div className="info-row">
                        <span>Hora:</span>
                        <strong>{venta.horaEmision.slice(0, 5)}</strong>
                    </div>

                    <div className="total-row">
                        <span>Total:</span>

                        <h3>S/ {venta.total}</h3>
                    </div>
                </div>

                {/* Botones */}
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancelar
                    </button>

                    <button className="pdf-btn" onClick={onPdf}>
                        <FaFilePdf />
                        Descargar PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacion;
