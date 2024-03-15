export function transformFormDataForSubmission(formData, submissionConstraints = () => true) {
  const payload = {};

  formData.forEach((field) => {
    payload[field.name] = field.value;
  });

  if (!submissionConstraints(payload)) {
    throw new Error("Passwords must match");
  }

  return payload;
}

// export async function postData(url, payload, callback) {

// }
