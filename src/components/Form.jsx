import useForm from "../hooks/useForm";

function Form(props) {
  const { fields, onSubmit, submitText } = props;
  const { formData, handleChange, handleSubmit } = useForm({
    initialState: fields?.map((field) => ({
      name: field.name,
      type: field.type,
      value: field.value,
      placeholder: field.placeholder ?? field.name,
    })),
    onSubmit: onSubmit,
  });

  return (
    <>
      <form>
        {formData?.map((field) => (
          <input
            key={field.name}
            type={field.type}
            value={field.value}
            onChange={(e) => handleChange(e)}
            name={field.name}
            placeholder={field.placeholder[0].toUpperCase() + field.placeholder.slice(1)}
          />
        ))}
        <input type="submit" onClick={(e) => handleSubmit(e)} value={submitText} />
      </form>
    </>
  );
}

export default Form;
