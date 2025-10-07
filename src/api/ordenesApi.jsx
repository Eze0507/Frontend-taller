// API para gestión de órdenes de trabajo
const API_BASE_URL = 'http://localhost:8000/api';

// Datos de ejemplo para el prototipo
const ordenesEjemplo = [
  {
    id: 1,
    numero: "#1",
    fecha: "3 Oct",
    cliente: "Carlos Carlos",
    marcaModelo: "Toyota 4runner 2019",
    total: "Bs90",
    pago: "",
    estado: "Pendiente",
    tipoOrden: "Reparación",
    estadoOrden: "En proceso",
    asignadoA: "Juan Pérez",
    prioridad: "Media",
    estadoPago: "Pendiente",
    descripcion: "Cambio de aceite",
    kilometraje: "45000",
    nivelCombustible: "3/4",
    estadoVehiculo: "Buen estado general",
    inventario: {
      antenas: true,
      botiquin: true,
      documentos: true,
      encendedor: false,
      extintor: true,
      gata: true,
      herramientas: true,
      llave1: true,
      llave2: false,
      llaveRueda: true,
      pisos: true,
      ruedaRepuesto: true,
      tag: true,
      tapasRuedas: true,
      triangulos: true
    }
  }
];

const vehiculosEjemplo = [
  {
    id: 1,
    marca: "Toyota",
    modelo: "4runner",
    año: "2019",
    color: "blanco",
    placa: "JEJE201",
    logo: "Toyota"
  }
];

// Funciones de la API (simuladas para el prototipo)
export const fetchAllOrdenes = async () => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  return ordenesEjemplo;
};

export const fetchOrdenById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return ordenesEjemplo.find(orden => orden.id === parseInt(id)) || null;
};

export const fetchVehiculoByOrden = async (ordenId) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return vehiculosEjemplo[0]; // Por ahora siempre retorna el mismo vehículo
};

export const createOrden = async (ordenData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const nuevaOrden = {
    id: ordenesEjemplo.length + 1,
    numero: `#${ordenesEjemplo.length + 1}`,
    ...ordenData,
    fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    estado: "Pendiente"
  };
  ordenesEjemplo.push(nuevaOrden);
  return nuevaOrden;
};

export const updateOrden = async (id, ordenData) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const index = ordenesEjemplo.findIndex(orden => orden.id === parseInt(id));
  if (index !== -1) {
    ordenesEjemplo[index] = { ...ordenesEjemplo[index], ...ordenData };
    return ordenesEjemplo[index];
  }
  throw new Error('Orden no encontrada');
};

export const deleteOrden = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const index = ordenesEjemplo.findIndex(orden => orden.id === parseInt(id));
  if (index !== -1) {
    ordenesEjemplo.splice(index, 1);
    return true;
  }
  throw new Error('Orden no encontrada');
};

// Funciones auxiliares
export const toApiOrden = (formData) => {
  return {
    cliente: formData.cliente,
    marcaModelo: formData.marcaModelo,
    descripcion: formData.descripcion,
    tipoOrden: formData.tipoOrden,
    total: formData.total,
    kilometraje: formData.kilometraje,
    nivelCombustible: formData.nivelCombustible,
    estadoVehiculo: formData.estadoVehiculo,
    inventario: formData.inventario
  };
};

export const checkUserPermissions = () => {
  // Simular permisos de usuario
  return {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canView: true
  };
};
