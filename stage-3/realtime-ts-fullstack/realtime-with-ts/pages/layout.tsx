import React from "react";
import Chat from "./component/chat";
import { SignOutButton } from "@clerk/nextjs";
export const Layout = () => {
    return <div>
        <Chat/>
        <h1> Sign Out </h1>
        <SignOutButton/>
    </div>
}