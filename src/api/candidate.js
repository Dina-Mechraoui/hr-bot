import axios from "@/api/base";
import Cookies from "js-cookie";

const accessToken = Cookies.get("access");



export const getUsageTracker = async () => {
  try {
    const response = await axios.get("/profiles/usagetracker/dashboardJS/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching usage tracker data:", error);
    throw error;
  }
}

export const ResumeConsultation = async ({jobDescription, resumeFile}) => {
  try {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);
    const response = await axios.post(`/profiles/resume-consultor/`,formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching resume data:", error);
    throw error;
  }
}