import { apiRequest } from "@/utils/apiRequest";


export const getUsageTracker = async () =>
  await apiRequest({
    method: "GET",
    url: "/profiles/usagetracker/dashboardHR/",
  });

export const getSettings = async () =>
  await apiRequest({
    method: "GET",
    url: "/profiles/settings/hr/",
  });

  export const updateSettings = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  return await apiRequest({
    method: "PATCH",
    url: "/profiles/settings/hr/",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getJobOffers = async () =>
  await apiRequest({
    method: "GET",
    url: "/job_offers/list/",
  });
  
export const getOneJobOffer = async (id) => {
  const response = await apiRequest({
    method: "GET",
    url: `/job_offers/${id}/`,
  });
  return response;
};

export const createJobOffer = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      if (key === "custom_questions") {
        formData.append("custom_questions", JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
        console.log(data[key])
      }
    }
  }

  return await apiRequest({
    method: "POST",
    url: "/job_offers/create/",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePostById = async (job_offer_id) =>
  await apiRequest({
    method: "DELETE",
    url: `/job_offers/${job_offer_id}/delete/`,
  });

export const getApplicantsById = async (job_id) =>
  await apiRequest({
    method: "GET",
    url: `/job_offers/${job_id}/applications/`,
  });


  export const updateApplicantStatus = async (application_id, data) =>
    await apiRequest({
      method: 'PATCH',
      url:`/job_offers/applications/${application_id}/status/`,
      data: data
    })