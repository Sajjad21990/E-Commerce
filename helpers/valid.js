const valid = (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword)
    return "Please fill all fields";

  if (!validateEmail(email)) return "Invalid Email";

  if (password.length < 6) return "Password must be atleast 6 characters long";

  if (password !== confirmPassword) return "passwords don't match";
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default valid;
