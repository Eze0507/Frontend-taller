import React, { useEffect, useState } from "react";
import OrdenList from "./OrdenList.jsx";
import {
  fetchAllOrdenes,
  createOrden, updateOrden, deleteOrden, toApiOrden,
  checkUserPermissions
} from "../../api/ordenesApi.jsx";

const OrdenPage = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  async function loadOrdenes() {
    setLoading(true);
    try {
      const data = await fetchAllOrdenes();
      console.log('📋 Datos de órdenes recibidos:', data);
      setOrdenes(data);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrdenes();
  }, []);

  const handleEdit = (row) => { 
    console.log('✏️ Editando orden:', row);
    setEditing(row); 
  };

  const handleDelete = async (id) => {
    console.log('🗑️ Intentando eliminar orden con ID:', id);
    
    if (!id || id === "" || id === null || id === "undefined") {
      console.error('❌ ID inválido recibido:', id);
      alert('Error: No se puede eliminar esta orden porque no tiene un ID válido');
      return;
    }
    
    if (!window.confirm("¿Seguro que quieres eliminar esta orden?")) {
      console.log('❌ Eliminación cancelada por el usuario');
      return;
    }
    
    try {
      console.log('🚀 Iniciando eliminación...');
      await deleteOrden(id);
      console.log('✅ Eliminación exitosa, recargando lista...');
      alert('Orden eliminada correctamente');
      loadOrdenes();
    } catch (e) { 
      console.error('❌ Error en eliminación:', e.message);
      alert('Error al eliminar orden: ' + e.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Verificar permisos antes de enviar
      const permissions = checkUserPermissions();
      console.log('🔍 Permisos del usuario:', permissions);
      
      const payload = toApiOrden(formData);
      console.log('📋 Datos del formulario:', formData);
      console.log('📤 Payload a enviar:', payload);
      
      if (editing) {
        await updateOrden(editing.id, payload);
        alert("Orden actualizada correctamente");
      } else {
        await createOrden(payload);
        alert("Orden creada correctamente");
      }
      setEditing(null);
      loadOrdenes();
    } catch (e) {
      console.error("Error:", e.message);
      alert("Error: " + e.message);
    }
  };

  const handleAddNew = () => {
    setEditing(null);
    // Aquí podrías abrir un modal de formulario o navegar a una página de creación
    alert("Funcionalidad de nueva orden - próximamente");
  };

  const handleEstadoChange = async (ordenId, nuevoEstado) => {
    try {
      console.log(`🔄 Cambiando estado de orden ${ordenId} a: ${nuevoEstado}`);
      
      // Encontrar la orden actual
      const ordenActual = ordenes.find(orden => orden.id === ordenId);
      if (!ordenActual) {
        throw new Error('Orden no encontrada');
      }

      // Crear payload con el nuevo estado
      const payload = {
        ...ordenActual,
        estado: nuevoEstado
      };

      // Hacer la llamada a la API
      await updateOrden(ordenId, toApiOrden(payload));
      
      // Actualizar el estado local
      setOrdenes(prevOrdenes => 
        prevOrdenes.map(orden => 
          orden.id === ordenId 
            ? { ...orden, estado: nuevoEstado }
            : orden
        )
      );

      console.log(`✅ Estado actualizado correctamente a: ${nuevoEstado}`);
    } catch (error) {
      console.error('❌ Error al cambiar estado:', error.message);
      alert('Error al cambiar el estado: ' + error.message);
    }
  };

  return (
    <div className="p-6 space-y-6 relative">
      <OrdenList
        ordenes={ordenes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        onEstadoChange={handleEstadoChange}
      />
    </div>
  );
};

export default OrdenPage;
