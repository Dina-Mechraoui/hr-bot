import axios from "@/api/base";
import Cookies from "js-cookie";

export const loginUser = async ({ email, password }) => {
    const response = await axios.post("/profiles/login/", {
      email,
      password,
    });
    const { access, refresh, user, success } = response.data;

    Cookies.set("success", success);
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
    const accessToken = Cookies.get("access");
    console.log("Access Token:", accessToken);
    // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    Cookies.set("role", user.role);
    Cookies.set("profile_review", user.status);
  
    Cookies.set("user", JSON.stringify(user));
    return response.data;
};

export const logoutUser = async () => {
    try {
        Cookies.remove("access");
        Cookies.remove("refresh");
        Cookies.remove("user");
        Cookies.remove("role");
        Cookies.remove("profile_review");
        Cookies.remove("success");
        console.log("Logout successful");
        
    } catch (error) {
        console.error("Error logging out:", error);
        
    }
};

export const RegisterCandidate = async (data) => {
  const formData = new FormData();

  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("gender", data.gender);
  formData.append("date_of_birth", data.date_of_birth);

  if (data.resume) {
    formData.append("resume", data.resume);
  }

  const response = await axios.post(
    "/profiles/signup/candidates/",
    formData
  );
  return response.data;
};

export const RegisterRecruiter = async (data) => {
  const formData = new FormData();

  formData.append("full_name", data.full_name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("gender", data.gender);
  formData.append("company_name", data.company_name);
  formData.append("company_field", data.company_field);
  formData.append("date_of_birth", data.date_of_birth);
  formData.append("agreed_to_terms", data.agreed_to_terms);


  const response = await axios.post(
    "/profiles/signup/HR/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const forgotPasswordCode = async (email) => {
  const response = await axios.post("/profiles/forget-password/email-verification/", {
    email,
  });
  if (response.data.success === true) {
    const sendCode = await axios.post("/profiles/forget-password/send-code/", {
      email,
    });
    return sendCode.data;
  }
}

export const verifyCode = async (email, code) => {
  const response = await axios.post("/profiles/forget-password/verify-code/", {
    email,
    code,
  });
  return response.data;
}
export const resetPassword = async (email, newPassword) => {
  const response = await axios.post("/profiles/forget-password/reset-password/", {
    email,
    newPassword,
  });
  return response.data;
} 
