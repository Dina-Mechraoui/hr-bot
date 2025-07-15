import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getJobOffers } from "@/api/hr";

export function useJobStatus() {
  const [jobs, setJobs] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [copiedJobId, setCopiedJobId] = useState(null);
  const menuRefs = useRef({});
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobOffers();
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };
    fetchJobs();
  }, []);

  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  const handleCopyLink = (jobId, link) => {
    const fullUrl = `http://localhost:3000/invite/${link}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedJobId(jobId);
      setTimeout(() => setCopiedJobId(null), 2000);
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const menuElement = menuRefs.current[openMenu];
      if (menuElement && !menuElement.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return {
    jobs,
    postToDelete,
    setPostToDelete,
    openMenu,
    toggleMenu,
    copiedJobId,
    handleCopyLink,
    menuRefs,
    router,
  };
}
