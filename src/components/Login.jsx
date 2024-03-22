import Form from "./Form";
import { transformFormDataForSubmission } from "../utilities/transformFormDataForSubmission";
import { useAuth } from "../hooks/useAuth";

const fields = [
  { name: "username", type: "text", value: "" },
  { name: "password", type: "password", value: "" },
];

function Login() {
  const { login } = useAuth();
  const onSubmit = async (formData) => {
    const payload = transformFormDataForSubmission(formData);
    await login(payload);
  };

  return <Form fields={fields} onSubmit={onSubmit} />;
}

export default Login;
