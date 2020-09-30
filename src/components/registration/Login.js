import React, {useState, useEffect} from 'react';
import {auth} from '../services/firebase'
import LoginPage from './LoginPage'
import Home from '../Home'

const Login = () => {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [hasAccount, setHasAccount] = useState("")

    const clearInputs = () => {
        setEmail("")
        setPassword("")
    }

    const clearErrors = () => {
        setEmailError("")
        setPasswordError("")
    }

    const handleLogin = () => {
        clearErrors()
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email" :
                    case "auth/user-disabled" :
                    case "auth/user-not-found" :
                        setEmailError(err.message)
                        break
                    case "auth/wrong-password" :
                        setPasswordError(err.message)
                        break
                }
            })
    }

    const handleSignup = () => {
        clearErrors()
        auth
            .createWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-already-is-use" :
                    case "auth/invalid-email" :
                        setEmailError(err.message)
                        break
                    case "auth/wea-password" :
                        setPasswordError(err.message)
                        break
                }
            })
    }

    const handleLogout = () => {
        auth.signOut()
    }

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                clearInputs()
                setUser(user)
            } else {
                setUser("")
            }
        })
    }

    useEffect(() => {
        authListener()
    }, [])


    const chooseYourSide = () => {
        console.log("выбираем сторону!")
        if (user) {
            return <Home handleLogout={handleLogout}/>
        } else {
            return <LoginPage
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
            />
        }
    }

    return (
        <div>

            {chooseYourSide()}

        </div>
    );

}

export default Login;