import {
  Search,
  FileText,
  BarChart,
  Settings,
  X,
  Menu
} from '@deemlol/next-icons';
import { ROUTES } from './routes';
import { ROLES } from './roles';

export const navLinks = {
  Admin: [
    { href: ROUTES.APPLICATIONS(ROLES.ADMIN), icon: <Search className="w-5 h-5" />, label: "Applications" },
    { href: ROUTES.BILLINGS(ROLES.ADMIN), icon: <FileText className="w-5 h-5" />, label: 'All Billings' },
    { href: ROUTES.CREATE_BILLING(ROLES.ADMIN), icon: <FileText className="w-5 h-5" />, label: 'Create Billing' },
    { href: ROUTES.REPORTS(ROLES.ADMIN), icon: <BarChart className="w-5 h-5" />, label: "HR Reports" },
    { href: ROUTES.CANDIDATES(ROLES.ADMIN), icon: <FileText className="w-5 h-5" />, label: 'Candidates' },
  ],
  Candidate: [
    { href: ROUTES.POSTS(ROLES.CANDIDATE), icon: <Search className="w-5 h-5" />, label: "Posts" },
    { href: ROUTES.RESUME_CONSULTOR(ROLES.CANDIDATE), icon: <FileText className="w-5 h-5" />, label: 'Resume Consultor' },
    { href: ROUTES.STATUS(ROLES.CANDIDATE), icon: <BarChart className="w-5 h-5" />, label: 'Applications Status' },
    { href: ROUTES.TRACKER(ROLES.CANDIDATE), icon: <Settings className="w-5 h-5" />, label: 'Usage Tracker'},
    { href: ROUTES.SETTINGS(ROLES.CANDIDATE), icon: <Settings className="w-5 h-5" />, label: 'Settings' }
    ],
  HR: [
    { href: ROUTES.STATUS(ROLES.HR), icon: <Search className="w-5 h-5" />, label: "Applications' Status" },
    { href: ROUTES.POSTS(ROLES.HR), icon: <FileText className="w-5 h-5" />, label: 'Create Post' },
    { href: ROUTES.TRACKER(ROLES.HR), icon: <BarChart className="w-5 h-5" />, label: 'Usage Tracker' },
    { href: ROUTES.SETTINGS(ROLES.HR), icon: <Settings className="w-5 h-5" />, label: 'Settings' }
  ],
};
