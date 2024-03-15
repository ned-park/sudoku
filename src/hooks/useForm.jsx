import { useState } from "react";

export default function useForm({ initialState = {}, onSubmit }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((oldFormData) =>
      oldFormData.map((oldVal) => (oldVal.name == e.target.name ? { ...oldVal, value: e.target.value } : { ...oldVal }))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return { formData, handleChange, handleSubmit };
}
