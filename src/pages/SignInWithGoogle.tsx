import React, { useState } from "react";
import {
  useGoogleLogin,
  TokenResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";

import axios from "axios";
import GoogleLogo from "../assets/Google__G__logo.svg"

export default function SignInWithGoogle() {
  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>();
  const [user, setUser] = useState<any>(null);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      var data = {
        code: codeResponse.code,
      };
      const tokens = await fetch("https://csclub-api.quinnpatwardhan.com/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      })
        .then((r) => r.json())
        .then((r) => {
          if (!r.error) {
            localStorage.setItem("username", r.username);
            localStorage.setItem("token", r.token);
            window.location.reload();
          } else {
            alert(r.msg);
          }
        });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <GoogleOAuthProvider clientId="449905501322-kdoojod5l6skjl6v7n3l56i46umjkbtc.apps.googleusercontent.com">
      <button
        onClick={() => googleLogin()}
        style={{
          fontFamily: "Inter,system-ui,Avenir,Helvetica,Arial,sans-serif",
          fontWeight: "500",
          fontSize: "1.2em",
          border: "none",
          zIndex: 9000000,
          background: "white",
          display: "flex",
          alignItems: "center",
          gap: ".5em",
          padding: ".25em .5em",
          whiteSpace: "nowrap",
        }}
      >
        <img
          src={
            GoogleLogo
            }
          style={{ objectFit: "contain", height: "1.25em" }}
        />
        Login with Google
      </button>
    </GoogleOAuthProvider>
  );
}
