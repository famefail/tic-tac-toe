import SignInButton from "./SignInButton"
import React from "react"
const SignIn = () => {
    return(
        <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow absolute w-full">
            <SignInButton/>
        </header>
    )
}

export default SignIn