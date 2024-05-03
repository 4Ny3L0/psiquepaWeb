const loginService = async (userInfo) => {
  let { user_name, password } = userInfo;
  let body = { user_name, password };
  const request = await fetch("http://localhost:8000/login/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await request.json();
  return response;
};

export { loginService };
