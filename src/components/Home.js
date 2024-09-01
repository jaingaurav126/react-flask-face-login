// src/components/Home.js
import React from 'react';
import styled from 'styled-components';
import CameraView from './CameraView';
import LoginForm from './LoginForm';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const CameraSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  return (
    <Container>
      <CameraSection>
        <CameraView />
      </CameraSection>
      <FormSection>
        <LoginForm />
      </FormSection>
    </Container>
  );
};

export default Home;
