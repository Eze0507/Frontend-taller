import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrdenById, fetchVehiculoByOrden } from "../../api/ordenesApi.jsx";

const OrdenDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orden, setOrden] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("vehiculo");

  useEffect(() => {
    loadOrdenData();
  }, [id]);

  const loadOrdenData = async () => {
    try {
      setLoading(true);
      const [ordenData, vehiculoData] = await Promise.all([
        fetchOrdenById(id),
        fetchVehiculoByOrden(id)
      ]);
      setOrden(ordenData);
      setVehiculo(vehiculoData);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (!orden) {
    return (
      <div className="text-center py-8">
        <div className="text-lg text-gray-600">Orden no encontrada</div>
        <button
          onClick={() => navigate("/ordenes")}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  const tabs = [
    { id: "vehiculo", label: "Vehículo" },
    { id: "fotos", label: "Fotos" },
    { id: "notas", label: "Notas" },
    { id: "informe", label: "Informe" },
    { id: "tareas", label: "Tareas" },
    { id: "citas", label: "Citas" },
    { id: "pago", label: "Pago" },
    { id: "info", label: "Info" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/ordenes")}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{orden.numero}</span>
              <span className="text-sm text-gray-300">{orden.fecha}</span>
              <button className="p-1 hover:bg-gray-700 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-gray-300">1:12 PM</span>
              <div className="w-4 h-4 bg-red-500 rounded"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Atendido por</span>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3H2a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2h-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm4 7H3v3h14v-3z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="w-1 h-6 bg-gray-600"></div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium">
                Pendiente
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium">
                Ingresar pago
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Contenido principal */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Información del cliente */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-lg">{orden.cliente}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">+59189456789</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Falla o requerimiento */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">FALLA O REQUERIMIENTO</h3>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                placeholder="Agrega una descripción"
                defaultValue={orden.descripcion}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="tipo" value="reparacion" defaultChecked className="mr-2" />
                Reparación
              </label>
              <label className="flex items-center">
                <input type="radio" name="tipo" value="mantencion" className="mr-2" />
                Mantención
              </label>
              <label className="flex items-center">
                <input type="radio" name="tipo" value="garantia" className="mr-2" />
                Garantía
              </label>
            </div>
          </div>

          {/* Producto o servicio */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">PRODUCTO O SERVICIO</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
                  <div>CANTIDAD</div>
                  <div>PRECIO</div>
                  <div>DESC</div>
                  <div>TOTAL</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium">aceite</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">1</span>
                    <span className="text-sm">Bs 80,00</span>
                    <span className="text-sm">-</span>
                    <span className="text-sm font-semibold">Bs80</span>
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span>Agregar nuevo producto o servicio</span>
              </button>
            </div>
          </div>

          {/* Totales */}
          <div className="flex justify-end space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">DESCUENTO</div>
              <div className="bg-gray-100 px-3 py-2 rounded-md text-sm">-</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">SUBTOTAL</div>
              <div className="bg-gray-100 px-3 py-2 rounded-md text-sm font-semibold">Bs80</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">IVA</div>
              <div className="bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center">
                <span>Bs10</span>
                <button className="ml-2 text-red-500 hover:text-red-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">TOTAL</div>
              <div className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-semibold">Bs90</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido del tab activo */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === "vehiculo" && (
              <div className="space-y-4">
                {/* Información del vehículo */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs font-bold">T</span>
                      </div>
                      <span className="font-semibold">{vehiculo?.marca} {vehiculo?.modelo}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
                      <button className="text-red-500 hover:text-red-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{vehiculo?.placa}</div>
                    <div>{vehiculo?.año} - {vehiculo?.color}</div>
                  </div>
                </div>

                {/* Kilometraje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kilometraje actual
                  </label>
                  <input
                    type="text"
                    defaultValue={orden.kilometraje}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Nivel de combustible */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nivel de combustible o carga
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex space-x-1 text-xs">
                      <span>E</span>
                      <span>1/4</span>
                      <span>1/2</span>
                      <span>3/4</span>
                      <span>F</span>
                    </div>
                  </div>
                </div>

                {/* Botones de inspección */}
                <div className="space-y-2">
                  <button className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                    </svg>
                    <span>Inspección de ingreso a taller</span>
                  </button>
                  <button className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800">
                    Inspecciones
                  </button>
                </div>

                {/* Estado general del vehículo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado general del vehículo
                  </label>
                  <textarea
                    defaultValue={orden.estadoVehiculo}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Inventario del vehículo */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Inventario del vehículo</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(orden.inventario || {}).map(([item, checked]) => (
                      <label key={item} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={checked}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="capitalize">{item.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span>Firmar</span>
                  </button>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3H2a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2h-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm4 7H3v3h14v-3z" clipRule="evenodd" />
                    </svg>
                    <span>Imprimir orden</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab !== "vehiculo" && (
              <div className="text-center text-gray-500 py-8">
                Contenido de {tabs.find(t => t.id === activeTab)?.label} próximamente
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdenDetalle;
