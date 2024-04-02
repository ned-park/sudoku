import Form from "./Form";
import { transformFormDataForSubmission } from "../utilities/transformFormDataForSubmission";
import { useAuth } from "../hooks/useAuth";

const fields = [
  { name: "username", type: "text", value: "" },
  { name: "password", type: "password", value: "" },
];

export function Login({ setShowLogin }) {
  const { login } = useAuth();
  const onSubmit = async (formData) => {
    const payload = transformFormDataForSubmission(formData);
    login(payload);
    setShowLogin(false);
  };

  return (
    <section className="container center">
      <Form fields={fields} onSubmit={onSubmit} submitText="Login" />
    </section>
  );
}
