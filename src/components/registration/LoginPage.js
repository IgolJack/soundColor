import React from 'react';
import './LoginPage.css'


const LoginPage = (props) => {
    
    const { 
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
     } = props
    
    return (
        <section className="login">
            <div className="loginContainer">
                <label>Имя пользователя</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Пароль</label>
                <input
                    type="password"
                    autoFocus
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    <>
                    <button onClick={handleLogin}>Войти</button>
                    </>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;