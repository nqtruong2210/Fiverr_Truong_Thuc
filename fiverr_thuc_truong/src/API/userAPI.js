import fetcher from "./fetcher";

// Đăng nhập
export const signInAPI = async (data) => {
  try {
    const response = await fetcher.post("/auth/signin", data);
    return response.data.content;
  } catch (error) {
    throw Error("Error!!!");
  }
};

// Đăng ký
export const signUpAPI = async (data) => {
  try {
    const response = await fetcher.post("/auth/signup", data);
    console.log("SignUp:", data);
    return response.data.content;
  } catch (error) {
    console.error("Error onSubmit:", error);
    throw Error("Error!!!");
  }
};
