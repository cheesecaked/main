import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
export const SignedOutScreen = () => {
  const [switchScreen, setSwitchScreen] = useState(false);

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    }}>
      {switchScreen ? (
      <>
        <SignUp path="/" routing="path" signInUrl="" />
      </>
      ) : (
      <>
        <SignIn path="/" routing="path" signUpUrl="" />
      </>
      )}
    </div>
  );
};
