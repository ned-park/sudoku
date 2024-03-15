import Form from "./Form";
import { __SITE_PREFIX__ } from "../config";
import { transformFormDataForSubmission } from "../utilities/transformFormDataForSubmission";

const fields = [
  { name: "username", type: "text", val: "" },
  { name: "password", type: "password", val: "" },
];

function Login() {
  const onSubmit = async (formData) => {
    const payload = transformFormDataForSubmission(formData);
    const res = await fetch(`${__SITE_PREFIX__}/api/users/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(res); // set Auth Context
  };

  return <Form fields={fields} onSubmit={onSubmit} />;
}

export default Login;
