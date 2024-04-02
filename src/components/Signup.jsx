import Form from "./Form";
import { __SITE_PREFIX__ } from "../config";
import { transformFormDataForSubmission } from "../utilities/transformFormDataForSubmission";
const fields = [
  { name: "username", type: "text", val: "" },
  { name: "password", type: "password", val: "" },
  { name: "confirmpassword", type: "password", val: "" },
];

const submissionConstraints = (payload) => {
  return payload.password === payload.confirmpassword;
};

export function Signup() {
  const onSubmit = async (formData) => {
    const payload = transformFormDataForSubmission(formData, submissionConstraints);
    const res = await fetch(`${__SITE_PREFIX__}/api/users/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(res); // set Auth Context
  };

  return (
    <section className="wrapper">
      <Form fields={fields} onSubmit={onSubmit} submitText="Signup" />
    </section>
  );
}
