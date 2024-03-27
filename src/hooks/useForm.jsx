import { useState } from "react";

export default function useForm({ initialState = {}, onSubmit }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((oldFormData) =>
      oldFormData.map((oldValue) =>
        oldValue.name == e.target.name ? { ...oldValue, value: e.target.value } : { ...oldValue }
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return { formData, handleChange, handleSubmit };
}
