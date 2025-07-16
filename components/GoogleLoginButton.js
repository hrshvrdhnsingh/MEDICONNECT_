// components/GoogleLoginButton.js
import { auth, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "./Component.module.css";
import { useState } from "react";

export default function GoogleLoginButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async () => {
        setIsLoading(true);
        setErrorMsg("");
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const token = await user.getIdToken();

            // Check in your own DB if this uid exists
            const res = await fetch(`/api/check-user-or-doctor?uid=${user.uid}`);
            const { exists, type } = await res.json();

            // Set all cookies before redirecting
            Cookies.set("token", token, { expires: 7 });
            Cookies.set("user_uid", user.uid, { expires: 7 });
            Cookies.set("userType", type, { expires: 7 });

            // Ensure cookies are set before redirecting. If the uid exists then redirect to home page, 
            // otherwise route to fill the user-details
            await router.push(exists ? "/" : "/user-details");
        } 
        catch (err) {
            if (err.code === "auth/popup-blocked") {
                setErrorMsg("Please enable popups in your browser to sign in with Google.");
            } else if (err.code === "auth/popup-closed-by-user") {
                setErrorMsg("Popup was closed before completing sign in.");
            } else {
                setErrorMsg("Google sign-in failed. Please try again.");
            }
            setIsLoading(false);
        }
    };

    return (
        <>
            <button className={styles.oauthButton} onClick={handleLogin} disabled={isLoading}>
                <svg className={styles.icon} viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    ></path>
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    ></path>
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    ></path>
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    ></path>
                    <path d="M1 1h22v22H1z" fill="none"></path>
                </svg>
                {isLoading ? "Signing in..." : "Continue with Google"}
            </button>
            {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
        </>
    );
}
