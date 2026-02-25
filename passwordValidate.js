export default function passwordValidate(password) {
  if (typeof password !== "string") return false;

  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{8,}$/;

  return pattern.test(password);
}
