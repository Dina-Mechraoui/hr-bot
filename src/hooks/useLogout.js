import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/api/auth";
export function useLogout() {   
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleLogout = async () => {
        setLoading(true);
        setError("");
    
        try {
            await logoutUser();
            router.replace("/login");
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    
    return { handleLogout, loading, error };
}