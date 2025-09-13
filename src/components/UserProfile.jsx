import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const UserProfile = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    username: '',
    email: ''
  });

  // Determinar si es empleado o cliente basado en el token o algún indicador
  const [userType, setUserType] = useState('empleado'); // 'empleado' o 'cliente'

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access');
      const endpoint = userType === 'empleado' ? '/empleados/profile/' : '/clientes/profile/';
      
      const response = await fetch(`http://127.0.0.1:8000/api${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setFormData({
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          direccion: data.direccion || '',
          telefono: data.telefono || '',
          username: data.username || '',
          email: data.email || '',
          ...(userType === 'empleado' ? { ci: data.ci || '' } : { tipo_cliente: data.tipo_cliente || '' })
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access');
      const endpoint = userType === 'empleado' ? '/empleados/profile/' : '/clientes/profile/';
      
      const response = await fetch(`http://127.0.0.1:8000/api${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserProfile(updatedData);
        setIsEditing(false);
        
        // Actualizar el nombre en localStorage si cambió
        if (formData.username) {
          localStorage.setItem('username', formData.username);
        }
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userProfile) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUser className="mr-2 text-blue-600" />
            {isEditing ? 'Editar Perfil' : 'Mi Perfil'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            {isEditing ? (
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-md">{userProfile?.nombre || 'No especificado'}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            {isEditing ? (
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-md">{userProfile?.apellido || 'No especificado'}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-md">{userProfile?.username || 'No especificado'}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-md">{userProfile?.email || 'No especificado'}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            {isEditing ? (
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-md">{userProfile?.telefono || 'No especificado'}</p>
            )}
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            {isEditing ? (
              <textarea
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-md">{userProfile?.direccion || 'No especificado'}</p>
            )}
          </div>

          {/* Campo específico para empleado: CI */}
          {userType === 'empleado' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CI
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="ci"
                  value={formData.ci}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded-md">{userProfile?.ci || 'No especificado'}</p>
              )}
            </div>
          )}

          {/* Campo específico para cliente: Tipo de cliente */}
          {userType === 'cliente' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Cliente
              </label>
              {isEditing ? (
                <select
                  name="tipo_cliente"
                  value={formData.tipo_cliente}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="particular">Particular</option>
                  <option value="empresa">Empresa</option>
                </select>
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded-md">{userProfile?.tipo_cliente || 'No especificado'}</p>
              )}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <FaSave className="mr-2" />
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <FaEdit className="mr-2" />
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
