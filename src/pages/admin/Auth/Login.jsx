import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 0 20px;
    background-color: #f0f2f5;
`;

const Card = styled.div`
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 400px;
    text-align: center;
    transition: transform 0.3s;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
`;

const ErrorMessage = styled.p`
    color: #ff4d4f;
    margin-bottom: 15px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    margin-bottom: 15px;
    text-align: left;
    padding-right: 27px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
    }
`;

const Button = styled.button`
    padding: 12px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8000/api/admin/login', {
                username,
                password,
            });

            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('adminData', JSON.stringify(response.data.admin));
            
            window.location.href = '/admin/dashboard';
        } catch (error) {
            setErrorMessage('Password dan Username Salah!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Card>
                <Title>Admin Login</Title>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Form onSubmit={handleLogin}>
                    <InputContainer>
                        <Label>Username</Label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Masukkan Usename"
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Masukkan Password"
                        />
                    </InputContainer>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}

export default Login;
