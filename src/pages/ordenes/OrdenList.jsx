import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button.jsx";

const OrdenList = ({ ordenes, onEdit, onDelete, onAddNew }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list o grid
  const [filtros, setFiltros] = useState({
    tipoOrden: "",
    estadoOrden: "",
    asignadoA: "",
    prioridad: "",
    estadoPago: ""
  });

  const filtered = useMemo(() => {
    if (!ordenes || !Array.isArray(ordenes)) return [];
    if (!searchTerm && Object.values(filtros).every(f => f === "")) return ordenes;
    
    return ordenes.filter((orden) => {
      const matchesSearch = !searchTerm || 
        orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orden.numero.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (!filtros.tipoOrden || orden.tipoOrden === filtros.tipoOrden) &&
        (!filtros.estadoOrden || orden.estadoOrden === filtros.estadoOrden) &&
        (!filtros.asignadoA || orden.asignadoA === filtros.asignadoA) &&
        (!filtros.prioridad || orden.prioridad === filtros.prioridad) &&
        (!filtros.estadoPago || orden.estadoPago === filtros.estadoPago);
      
      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, ordenes, filtros]);

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Pendiente": return "bg-red-100 text-red-800 border-red-200";
      case "En proceso": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completado": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleVerDetalle = (orden) => {
    navigate(`/ordenes/${orden.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full">
      {/* Header con título y controles */}
      <div className="bg-gray-800 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Órdenes</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-gray-600" : "hover:bg-gray-700"}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-600" : "hover:bg-gray-700"}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por cliente o núm. de orden"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-white text-gray-700 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
              <Button variant="guardar" onClick={onAddNew}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Nueva orden
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de filtros */}
      <div className="bg-gray-700 text-white p-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <select
              value={filtros.tipoOrden}
              onChange={(e) => handleFiltroChange("tipoOrden", e.target.value)}
              className="bg-gray-600 text-white px-3 py-1 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tipo de orden</option>
              <option value="Reparación">Reparación</option>
              <option value="Mantención">Mantención</option>
              <option value="Garantía">Garantía</option>
            </select>
            
            <select
              value={filtros.estadoOrden}
              onChange={(e) => handleFiltroChange("estadoOrden", e.target.value)}
              className="bg-gray-600 text-white px-3 py-1 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Estado de orden</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Completado">Completado</option>
            </select>
            
            <select
              value={filtros.asignadoA}
              onChange={(e) => handleFiltroChange("asignadoA", e.target.value)}
              className="bg-gray-600 text-white px-3 py-1 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Asignado a</option>
              <option value="Juan Pérez">Juan Pérez</option>
              <option value="María García">María García</option>
            </select>
            
            <select
              value={filtros.prioridad}
              onChange={(e) => handleFiltroChange("prioridad", e.target.value)}
              className="bg-gray-600 text-white px-3 py-1 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Prioridad</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
            
            <select
              value={filtros.estadoPago}
              onChange={(e) => handleFiltroChange("estadoPago", e.target.value)}
              className="bg-gray-600 text-white px-3 py-1 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Estado de pago</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
              <option value="Parcial">Parcial</option>
            </select>
          </div>
          
          <div className="text-sm">
            {filtered.length} ordenes
          </div>
        </div>
      </div>

      {/* Tabla de órdenes */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">N°</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Fecha</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Cliente</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Marca y modelo</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Pago</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Estado</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((orden) => (
                <tr key={orden.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{orden.numero}</td>
                  <td className="py-3 px-4">{orden.fecha}</td>
                  <td className="py-3 px-4 font-semibold">{orden.cliente}</td>
                  <td className="py-3 px-4">{orden.marcaModelo}</td>
                  <td className="py-3 px-4 font-semibold">{orden.total}</td>
                  <td className="py-3 px-4">{orden.pago || "-"}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(orden.estado)}`}>
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {orden.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVerDetalle(orden)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Ver detalle
                      </button>
                      <button
                        onClick={() => onEdit(orden)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(orden.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron órdenes que coincidan con los filtros
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdenList;
