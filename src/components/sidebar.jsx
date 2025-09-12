// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaUserCog,
  FaUsers,
  FaCogs,
  FaMoneyBillWave,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    // TODO: Implementar lógica de logout
    console.log("Logout clicked - funcionalidad pendiente");
    alert("Función de logout pendiente de implementar");
  };

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
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
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
        
        {/* Botón de Logout */}
        <div className="mt-8 pt-4 border-t border-gray-600">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;


