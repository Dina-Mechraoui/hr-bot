"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { TOAST_DURATION } from "@/config/toast";


export function useRegister(registerFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRegister = async (e, formValues) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
        const { success, error } = await registerFn({
            ...formValues,
            date_of_birth: formValues.date_of_birth?.format?.("YYYY-MM-DD") || "",
        });

        if (success) {
            const redirect = searchParams.get("redirect");
            if (formValues.role === "HR") {
                toast.success("Account created successfully! Please wait for the admin to validate your account.", {
                duration: TOAST_DURATION.LONG,
                });
            } else {
                toast.success("Account created successfully!", {
                duration: TOAST_DURATION.SHORT,
                });
            }

            router.push(redirect ? `/login?redirect=${redirect}` : "/login");
        }else {
            setError(error || { general: "Registration failed" });
        }
    } catch (e) {
        toast.error("Unexpected error during registration");
        setError({ general: "Unexpected error during registration" });
    } finally {
        setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
    error,
  };
}
