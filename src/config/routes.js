export const ROUTES = {
  LOGIN: "/login",
  REGISTER: (role) => `/register/${role.toLowerCase()}`, // dynamic based on role
  DASHBOARD: (role) => `/auth/${role}/Dashboard`,
  APPLICATIONS: (role) => `${ROUTES.DASHBOARD(role)}/applications`,
  BILLINGS: (role) => `${ROUTES.DASHBOARD(role)}/billings`,
  CREATE_BILLING: (role) => `${ROUTES.DASHBOARD(role)}/create-billing`,
  REPORTS: (role) => `${ROUTES.DASHBOARD(role)}/reports`,
  CANDIDATES: (role) => `${ROUTES.DASHBOARD(role)}/candidates`,
  POSTS: (role) => `${ROUTES.DASHBOARD(role)}/posts`,
  RESUME_CONSULTOR: (role) => `${ROUTES.DASHBOARD(role)}/resume-consultor`,
  STATUS: (role) => `${ROUTES.DASHBOARD(role)}/status`,
  TRACKER: (role) => `${ROUTES.DASHBOARD(role)}/tracker`,
  SETTINGS: (role) => `${ROUTES.DASHBOARD(role)}/settings`,
};
