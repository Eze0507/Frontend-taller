// src/pages/register/RegisterForm.jsx
import React from "react";

const RegisterForm = ({
  username,
  email,
  password,
  password2,
  setUsername,
  setEmail,
  setPassword,
  setPassword2,
  onSubmit,
  loading,
  error,
}) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="Usuario"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Repetir contraseña"
      value={password2}
      onChange={(e) => setPassword2(e.target.value)}
      required
    />
    <button type="submit" disabled={loading}>
      {loading ? "Registrando..." : "Registrarse"}
    </button>
    {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}
  </form>
);

export default RegisterForm;