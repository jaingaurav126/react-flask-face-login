// src/components/LoginForm.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 300px;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RegisterLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  return (
    <FormContainer>
      <h3>Login</h3>
      <Input type="email" placeholder="Email ID" />
      <Input type="password" placeholder="Password" />
      <Button>Login</Button>
      <RegisterLink to="/register">Register now</RegisterLink>
    </FormContainer>
  );
};

export default LoginForm;
