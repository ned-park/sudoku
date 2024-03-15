import useForm from "../hooks/useForm";

function Form(props) {
  const { fields, onSubmit } = props;
  const { formData, handleChange, handleSubmit } = useForm({
    initialState: fields?.map((field) => ({
      name: field.name,
      type: field.type,
      value: field.value,
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
          />
        ))}
        <input type="submit" onClick={(e) => handleSubmit(e)} value="Login" />
      </form>
    </>
  );
}

export default Form;
