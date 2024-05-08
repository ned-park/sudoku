import Form from "./Form";
import { __SITE_PREFIX__ } from "../config";
import { transformFormDataForSubmission } from "../utilities/transformFormDataForSubmission";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuthContext } from "../hooks/useAuthContext";

const fields = [
  { name: "username", type: "text", val: "" },
  { name: "password", type: "password", val: "" },
  { name: "confirmpassword", type: "password", val: "", placeholder: "Confirm password" },
];

const submissionConstraints = (payload) => {
  return payload.password === payload.confirmpassword;
};

export function Signup({ setShowSignup }) {
  const { dispatch } = useAuthContext();
  const { setItem } = useLocalStorage();

  const onSubmit = async (formData) => {
    const payload = transformFormDataForSubmission(formData, submissionConstraints);
    const res = await fetch(`${__SITE_PREFIX__}/api/users/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      const userPayload = { token: data.token, username: data.user.username, id: data.user.id };
      setItem("user", JSON.stringify(userPayload));
      dispatch({ type: "LOGIN", payload: userPayload });
      setShowSignup(false);
      return userPayload;
    } else {
      throw new Error("Something went wrong please try again");
    }
  };

  return (
    <section className="wrapper">
      <Form fields={fields} onSubmit={onSubmit} submitText="Signup" />
    </section>
  );
}
