"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TokenVerificationResult {
  vendorId: null,
  vendorEmail: null,
  vendorContact: null,
  error: string | null;
  isLoading: boolean;
}

function useTokenVerification(): TokenVerificationResult {
  const [verificationResult, setVerificationResult] =
    useState<TokenVerificationResult>({
      vendorId: null,
      vendorEmail: null,
      vendorContact: null,
      error: null,
      isLoading: true,
    });

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const response = await axios.get<any>(
          "https://mxagro-backend.onrender.com/api/vendorTKNroute/verifyToken",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Set state directly from the response data
        setVerificationResult({
          vendorId: response.data.vendorId,
          vendorEmail: response.data.vendorEmail, // Assuming it's 'employeeId', adjust accordingly if different
          vendorContact: response.data.vendorContact,
          error: null,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error verifying token:", error);
        setVerificationResult({
          vendorId: null,
          vendorEmail: null,
          vendorContact: null,
          error: "Error occurred while verifying token",
          isLoading: false,
        });
        // router.push("/");
      }
    };

    const token = localStorage.getItem("vnkt");

    if (token) {
      verifyToken(token);
    } else {
      setVerificationResult({
        vendorId: null,
        vendorEmail: null,
        vendorContact: null,
        error: "Token not found in localStorage",
        isLoading: false,
      });
      // router.push("/");
    }

    // Periodic token verification every 30 minutes
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("vnkt");
      if (token) {
        verifyToken(token);
      }
    }, 30 * 60 * 1000); // 30 minutes

    // Cleanup function to clear the interval when component unmounts or when the token changes
    return () => clearInterval(intervalId);
  }, []); // Dependency array is empty, so this effect runs only once on mount

  return verificationResult;
}

export default useTokenVerification;
