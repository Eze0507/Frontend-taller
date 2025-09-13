// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaUserCog,
  FaUsers,
  FaCogs,
  FaMoneyBillWave,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para detectar cambios de ruta
  const [username, setUsername] = useState("Usuario");
  const [userRole, setUserRole] = useState("Invitado");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    // 1. Eliminar los tokens de autenticación del localStorage.
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");

    // 2. Redirigir al usuario a la página de login.
    // `replace: true` evita que el usuario pueda volver al panel con el botón "atrás".
    navigate("/login", { replace: true });
  };

  // Este efecto se ejecutará cada vez que cambie la URL.
  // Así nos aseguramos de que la información del usuario se actualice después del login.
  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Usuario");    
    setUsername(localStorage.getItem("username") || "Usuario");
    setUserRole(localStorage.getItem("userRole") || "Invitado");
  }, [location.pathname]); // Se dispara con cada cambio de navegación

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome className="mr-2" />,
      key: "dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "Administración",
      icon: <FaUserCog className="mr-2" />,
      key: "administracion",
      subItems: [
        { name: "Rol", path: "/admin/roles" },
        { name: "Usuario", path: "/admin/usuarios" },
        { name: "Empleado", path: "/admin/empleados" },
        { name: "Cargo", path: "/admin/cargos" },
        { name: "Asistencia", path: "/admin/asistencias" },
        { name: "Nómina", path: "/admin/nominas" },
        { name: "Bitácora", path: "/admin/bitacora" },
      ],
    },
    {
      title: "Clientes",
      icon: <FaUsers className="mr-2" />,
      key: "clientes",
      subItems: [
        { name: "Cliente", path: "/admin/clientes" },
        { name: "Cita", path: "/admin/clientes/citas" },
        { name: "Asistente Virtual", path: "/admin/clientes/asistente" },
        { name: "Historial", path: "/admin/clientes/historial" },
      ],
    },
    {
      title: "Operaciones",
      icon: <FaCogs className="mr-2" />,
      key: "operaciones",
      subItems: [
        { name: "Diagnóstico", path: "/admin/operaciones/diagnosticos" },
        { name: "Presupuesto", path: "/admin/operaciones/presupuestos" },
        { name: "Orden de Trabajo", path: "/admin/operaciones/ordenes" },
        { name: "Vehículo", path: "/admin/operaciones/vehiculos" },
        { name: "Modelo", path: "/admin/operaciones/modelos" },
        { name: "Marca", path: "/admin/operaciones/marcas" },
        { name: "Repuestos", path: "/admin/operaciones/repuestos" },
        { name: "Servicios", path: "/admin/operaciones/servicios" },
        { name: "Proveedores", path: "/admin/operaciones/proveedores" },
      ],
    },
    {
      title: "Finanzas",
      icon: <FaMoneyBillWave className="mr-2" />,
      key: "finanzas",
      subItems: [
        { name: "Pagos", path: "/admin/finanzas/pagos" },
        { name: "Factura Proveedor", path: "/admin/finanzas/facturas-proveedor" },
        { name: "Reportes", path: "/admin/finanzas/reportes" },
        { name: "Métodos de Pago", path: "/admin/finanzas/metodos-pago" },
      ],
    },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 flex flex-col">
      <div className="p-4 text-center border-b border-gray-700 shadow-md">
        <h2 className="text-2xl font-bold text-white">Mi Taller</h2>
      </div>

      {/* Menú Desplazable */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((menu) => (
            <li key={menu.key}>
              {menu.subItems ? (
                <>
                  {/* 🔽 Módulos con subItems */}
                  <div
                    className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => toggleMenu(menu.key)}
                  >
                    <div className="flex items-center">
                      {menu.icon}
                      <span>{menu.title}</span>
                    </div>
                    {openMenu === menu.key ? (
                      <FaChevronDown className="text-xs" />
                    ) : (
                      <FaChevronRight className="text-xs" />
                    )}
                  </div>

                  {openMenu === menu.key && (
                    <ul className="ml-4">
                      {menu.subItems.map((sub, idx) => (
                        <li key={idx}>
                          <Link
                            to={sub.path}
                            className="block p-2 hover:bg-gray-700"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                /* 🔗 Items simples (ej: Dashboard) */
                <Link
                  to={menu.path}
                  className="flex items-center p-2 hover:bg-gray-700"
                >
                  {menu.icon}
                  <span>{menu.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sección de Usuario y Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center mb-4">
          <FaUserCircle className="text-2xl text-gray-400 mr-3" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white truncate">
              {username}
            </span>
            <span className="text-xs text-gray-400 capitalize">
              {userRole}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-colors duration-200"
        >
          <FaSignOutAlt className="mr-3" />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
