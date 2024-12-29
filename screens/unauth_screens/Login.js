import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { logIn } from '../../services/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginStart, loginFailure } from '../../redux/AuthSlice';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isLoading, error, user } = useSelector((state) => state.auth);

    const handleLogin = async () => {
        dispatch(loginStart());
        try {
            const data = await logIn(email, password);
            dispatch(loginSuccess({ user: data, token: data.accessToken }));
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };

    return (
        <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
            isLoading={isLoading}
            error={error}
        />
    );
};

export default LoginScreen;
