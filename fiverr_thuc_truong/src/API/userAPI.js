import fetcher from "./fetcher";

// Đăng nhập
const signInAPI = async (data) => {
  try {
    const response = await fetcher.post("/auth/signin", data);
    return response.data.content;
  } catch (error) {
    throw Error("Error!!!");
  }
};

// Đăng ký
const signUpAPI = async (data) => {
  try {
    const response = await fetcher.post("/auth/signup", data);
    console.log("SignUp:", data);
    return response.data.content;
  } catch (error) {
    console.error("Error onSubmit:", error);
    throw Error("Error!!!");
  }
};
const getUserById = async (id) => {
  try {
    const response = await fetcher.get(
      `/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
}

export { signInAPI, signUpAPI, getUserById };
