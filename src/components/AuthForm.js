import React, { useState } from "react";
import { auth } from 'fbase'

const AuthForm = () => {
    const [eamil, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(false)
    const [error, setError] = useState('')
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await auth.createUserWithEmailAndPassword(auth.getAuth(), eamil, password);
            } else {
                await auth.signInWithEmailAndPassword(auth.getAuth(), eamil, password);
            }
        } catch (error) {
            setError(error.message)
        }
    }
    const toggleAccount = () => setNewAccount(prev => !prev)
    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="text" placeholder="Email" required value={eamil} />
                <input onChange={onChange} name="password" type="password" placeholder="password" required value={password} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "createAccount"}</span>
        </>
    )
}

export default AuthForm;