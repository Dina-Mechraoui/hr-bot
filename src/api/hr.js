import axios from "@/api/base";
import Cookies from "js-cookie";

const accessToken = Cookies.get("access");


export const getUsageTracker = async () => {
  try {
    console.log("Access Token:", accessToken);
    const response = await axios.get("/profiles/usagetracker/dashboardHR/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
   console.log("Usage Tracker Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching usage tracker data:", error);
    throw error;
  }
}

export const getSettings = async () => {
  try {
    const response = await axios.get("/profiles/settings/hr/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching settings data:", error);
    throw error;
  }
}

export const updateSettings = async (data) => {
  try {
    const formData = new FormData();
    
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    const response = await axios.patch("/profiles/settings/hr/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Update Settings Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating settings data:", error);
    throw error;
  }
};

export const createJobOffer = async (data, accessToken) => {
  try {
    const accessToken = Cookies.get("access");
    console.log(accessToken)
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        if (key === 'custom_questions') {
          formData.append('custom_questions', JSON.stringify(data.custom_questions));
        } else if (key === 'image') {
          formData.append('image', data.picture);
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    console.log(accessToken)

    const response = await axios.post("/job_offers/job-offers/create/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating job offer:", error.response?.data || error);
    throw error;
  }
};

