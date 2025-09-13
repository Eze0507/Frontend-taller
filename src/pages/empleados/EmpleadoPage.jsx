import React, { useEffect, useState } from "react";
import EmpleadoList from "./EmpleadoList.jsx";
import EmpleadoForm from "./EmpleadoForm.jsx";
import {
  fetchAllEmpleados, fetchAllCargos, fetchAllUsers,
  createEmpleado, updateEmpleado, deleteEmpleado, toApiEmpleado,
  checkUserPermissions
} from "../../api/empleadosApi.jsx";

const EmpleadoPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function loadEmpleados() {
    setLoading(true);
    try {
      const data = await fetchAllEmpleados();
      setEmpleados(data);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadCargos() {
    try {
      const data = await fetchAllCargos();
      setCargos(data);
    } catch (e) {
      console.error(e.message);
    }
  }

  async function loadUsuarios() {
    try {
      const data = await fetchAllUsers();
      setUsuarios(data);
    } catch (e) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    loadEmpleados();
    loadCargos();
    loadUsuarios();
  }, []);

  const handleEdit = (row) => { 
    console.log('✏️ Editando empleado:', row);
    setEditing(row); 
    setShowForm(true); 
  };
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este empleado?")) return;
    try {
      await deleteEmpleado(id);
      loadEmpleados();
    } catch (e) { console.error(e.message); }
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Verificar permisos antes de enviar
      const permissions = checkUserPermissions();
      console.log('🔍 Permisos del usuario:', permissions);
      
      const payload = toApiEmpleado(formData);
      console.log('📋 Datos del formulario:', formData);
      console.log('📤 Payload a enviar:', payload);
      
      if (editing) {
        await updateEmpleado(editing.id, payload);
        alert("Empleado actualizado correctamente");
      } else {
        await createEmpleado(payload);
        alert("Empleado creado correctamente");
      }
      setShowForm(false);
      setEditing(null);
      loadEmpleados();
    } catch (e) {
      console.error("Error:", e.message);
      alert("Error: " + e.message);
    }
  };

  return (
    <div className="p-6 space-y-6 relative">
      <EmpleadoList
        empleados={empleados}
        onEdit={handleEdit}
        onDelete={(row)=>handleDelete(row.id)}
        onAddNew={()=>{ setEditing(null); setShowForm(true); }}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          {console.log('📤 Pasando datos al formulario:', { editing, cargos: cargos.length, usuarios: usuarios.length })}
          <EmpleadoForm
            onSubmit={handleFormSubmit}
            onCancel={()=>{ setShowForm(false); setEditing(null); }}
            initialData={editing}
            cargos={cargos}
            usuarios={usuarios}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default EmpleadoPage;
