import { useState } from 'react';

export function useForm(initialValues = {}) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  const updateField = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formValues,
    handleChange,
    handleFileChange,
    updateField,
    setFormValues,
  };
}
