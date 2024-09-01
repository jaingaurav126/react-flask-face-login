// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 400px;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  margin: 50px auto;
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

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
    photo: null,
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('designation', formData.designation);
    data.append('photo', formData.photo);

    try {
      const response = await axios.post('http://localhost:5000/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data);
      navigate('/home');
    } catch (error) {
      setMessage('Error registering your profile. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h3>Register</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="designation"
          placeholder="Company Designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="photo"
          onChange={handleFileChange}
          required
        />
        <Button type="submit">Register</Button>
      </form>
    </FormContainer>
  );
};

export default RegistrationForm;
