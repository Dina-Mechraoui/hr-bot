import { apiRequest } from "@/utils/apiRequest";

// CREATE PRICING FUNCTION
export const createPricingPlan = async (data) =>
  apiRequest({
    method: "POST",
    url: "/administrateur/billing/create",
    data,
  });

// FETCH HRs FUNCTION
export const fetchPendingUsers = async () =>
  apiRequest({
    method: "GET",
    url: "/administrateur/hr/pending/",
  });

// FETCH CANDIDATES FUNCTION
export const fetchCandidates = async () =>
  apiRequest({
    method: "GET",
    url: "/profiles/candidates/",
  });

// FETCH BILLINGS FUNCTION
export const fetchBillingPlans = async () =>
  apiRequest({
    method: "GET",
    url: "/administrateur/billing",
  });

// APPROVE ACCOUNT FUNCTION
export const approveHrAccount = async ({ user_id, status, id_plan }) =>
  apiRequest({
    method: "POST",
    url: `/administrateur/hr/${user_id}/approve/`,
    data: { status, id_plan },
  });

// DELETE BILLING FUNCTION
export const deleteBillingPlan = async (id) =>
  apiRequest({
    method: "DELETE",
    url: `/administrateur/billing/${id}/delete`,
  });

// FETCH HR FUNCTION
export const fetchHrBillingReport = async () =>
  apiRequest({
    method: "GET",
    url: "/administrateur/hr/report/",
  });