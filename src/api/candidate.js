import { apiRequest } from "@/utils/apiRequest";

export const processInterviewData = async (jobId) => {
  try {
    const response = await apiRequest({
      method: "POST",
      url: "/interviews/process-data/",
      data: { job_id: jobId },
    });
    console.log(response.job_offers_id)

    return {
      questions: response.questions,
      interaction_id: response.interaction_id,
      interviewCompleted: response.interviewCompleted,
      job_offers_id: response.job_offers_id
    };
  } catch (error) {
    console.log('error', error)
    const status = error.response?.status;
    const message = error.response?.data?.error || "Unknown error";
    console.log(message)

    console.error("Unexpected error processing interview:", error);
  }
};

export const submitInterviewAnswers = async (interactionId, answers) => {
  try {
    const response = await apiRequest({
      method: "POST",
      url: `/interviews/submit-answers/${interactionId}/`,
      data: { answers },
    });

    return response;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.error || "Unknown error";
    throw error;
  }
};


export const getUsageTracker = async () =>
  await apiRequest({
    method: "GET",
    url: "/profiles/usagetracker/dashboardJS/",
    withCredentials: true,
  });

export const getApplicationsJsStatus = async () =>
  await apiRequest({
    method: "GET",
    url: "job_offers/applications/js_status",
    withCredentials:true
  });

export const getOneJobOffer = async (id) => {
  const response = await apiRequest({
    method: "GET",
    url: `/job_offers/${id}/`,
  });
  return response.data;
};

export const getJobOffer = async (link) => {
  try {
    const response = await apiRequest({
      method: "GET",
      url: `/interviews/job-offers/${link}/`,
    });

    const job_id = response.job_id;

    const interview = await processInterviewData(job_id);

    if (interview?.interviewCompleted) {
      return {
        interviewCompleted: interview.interviewCompleted,
        job_id,
      };
    }

    const jobData = await getOneJobOffer(job_id);

    return {
      questions: interview.questions,
      interaction_id: interview.interaction_id,
      jobData,
    };
  } catch (error) {
    console.error("Error in getJobOffer:", error.response?.data || error);
    throw error;
  }
};


export const ResumeConsultation = async ({ jobDescription, resumeFile }) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("job_description", jobDescription);

  return await apiRequest({
    method: "POST",
    url: `/profiles/resume-consultor/`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserSettings = async () =>
  await apiRequest({
    method: "GET",
    url: "/profiles/settings/candidate/",
  });

export const getJobOffers = async () =>
  await apiRequest({
    method: "GET",
    url: "/interviews/candidate/accessed-offers/",
  });

export const getApplications = async () =>
  await apiRequest({
    method: "GET",
    url: "/job_offers/job-offers/applications/js_status/",
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
    url: "/profiles/settings/candidate/",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};