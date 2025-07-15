import { apiRequest } from "@/utils/apiRequest";
import { clearAllCookies } from "@/utils/clearAllCookies";
import { setAuthCookies } from "@/utils/setAuthCookies";

//LOGIN FUNCTION
export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiRequest({
      method: "post",
      url: "/profiles/login/",
      data: { email, password }
    });

    const { access, refresh, user, success } = response;

    setAuthCookies({ access, refresh, user });

    return { success: success, data: user };
  } catch (error) {
    const rawErrors = error?.response?.data || {};

    const parsedErrors = {};
    for (const key in rawErrors) {
      parsedErrors[key] = Array.isArray(rawErrors[key])
        ? rawErrors[key][0]
        : rawErrors[key];
    }

    return { success: false, error: parsedErrors };
  }
};
//LOGOUT FUNCTION
export const logoutUser = async () => {
    try {
        clearAllCookies();
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
//REGISTER ADMIN FUNCTION
export const RegisterAdmin = async (data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await apiRequest({
      method: "post",
      url: "/profiles/signup/ADMIN/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const rawErrors = error?.response?.data;

    const parsedErrors = {};
    for (const key in rawErrors) {
      parsedErrors[key] = Array.isArray(rawErrors[key])
        ? rawErrors[key][0]
        : rawErrors[key];
    }
  
    return { success: false, error: parsedErrors };
  }
};
//REGISTER CANDIDATE FUNCTION
export const RegisterCandidate = async (data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await apiRequest({
      method: "post",
      url: "/profiles/signup/candidates/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const rawErrors = error?.response?.data;

    const parsedErrors = {};
    for (const key in rawErrors) {
      parsedErrors[key] = Array.isArray(rawErrors[key])
        ? rawErrors[key][0]
        : rawErrors[key];
    }
  
    return { success: false, error: parsedErrors };
  }
};
//REGISTER HR FUNCTION
export const RegisterRecruiter = async (data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await apiRequest({
      method: "post",
      url: "/profiles/signup/HR/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const rawErrors = error?.response?.data;

    const parsedErrors = {};
    for (const key in rawErrors) {
      parsedErrors[key] = Array.isArray(rawErrors[key])
        ? rawErrors[key][0]
        : rawErrors[key];
    }
  
    return { success: false, error: parsedErrors };
  }
};
//FORGOT PASSWORD -- GET CODE FUNCTION
export const forgotPasswordCode = async (email) => {
  try {
    const verify = await apiRequest({
      method: "POST",
      url: "/profiles/forget-password/email-verification/",
      data: { email },
    });
    if (!verify?.success) {
      console.log('error')
      return { success: false, error: "Email verification failed." };
    }
    const sendCode = await apiRequest({
      method: "POST",
      url: "/profiles/forget-password/send-code/",
      data: { email },
    });
    return { success: true, ...sendCode };
  } catch (error) {
    const raw = error?.response?.data;

    return {
      success: false,
      error:
        raw?.detail ||
        raw?.message ||
        raw?.error ||
        "Something went wrong. Please try again.",
    };
  }
};
//FORGOT PASSWORD -- VERIFY CODE FUNCTION
export const verifyCode = async (email, code) => {
  try {
    const response = await apiRequest({
      method: "POST",
      url: "/profiles/forget-password/verify-code/",
      data: { email, code },
    });
    return response;
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.detail || "Failed to verify code.",
    };
  }
};
//FORGOT PASSWORD -- RESET PASSWORD FUNCTION
export const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await apiRequest({
      method: "POST",
      url: "/profiles/forget-password/reset-password/",
      data: {
        email,
        code,
        new_password: newPassword,
      },
    });

    return response;
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.detail || "Failed to reset password.",
    };
  }
};
