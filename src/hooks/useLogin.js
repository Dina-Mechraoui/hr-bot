"use client";
import { loginUser } from "@/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function useLogin(formValues) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      const { success, data, error } = await loginUser(formValues);
      if ( success && data?.role) {
        const role = data.role;
        const redirectPath = searchParams.get("redirect") || `/auth/${role}/Dashboard`;
        router.push(redirectPath);
      } else {
        setError(error || { general: "Login failed. No role found." });
      }
    } catch (err) {
        setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
