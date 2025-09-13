// src/hooks/useRegister.jsx
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // 👈 para leer la cookie CSRF

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async ({ username, email, password, password2 }) => {
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Obtener la cookie CSRF
      await axios.get("http://127.0.0.1:8000/api/csrf/", {
        withCredentials: true,
      });

      // 2️⃣ Leer el token desde la cookie
      const csrfToken = Cookies.get("csrftoken");

      // 3️⃣ Enviar el POST con el token en el header
      const res = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          username,
          email,
          password,
          password2,
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      console.log("✅ Registro exitoso:", res.data);
      return true;
    } catch (err) {
      console.error("❌ Error en registro:", err.response?.data);
      setError(err.response?.data || "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}