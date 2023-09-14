export const checkValidData = (email, password, name = null) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isNameValid = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(name);

  if (!isNameValid) return { error: "name", message: "Name is not valid" };

  if (!isEmailValid)
    return { error: "email", message: "Email Id is not valid" };
  if (!isPasswordValid)
    return { error: "password", message: "Password is not valid" };
  return null;
};
