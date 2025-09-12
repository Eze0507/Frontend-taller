// src/components/StyledForm.jsx
import React from "react";

const StyledForm = ({ title = "Formulario", children, onSubmit }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default StyledForm;


