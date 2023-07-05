import SignInScreen from "./signin-screen"
import SignUpScreen from "./signup-screen"
import { useState, useContext } from "react"
import { DataContext } from "../context/provider"
export const SignedOutScreen = () => {
    const {inOutSwitch} = useContext(DataContext)

    return (
        inOutSwitch 
        ?  <SignUpScreen />
        : <SignInScreen /> 
    )
}