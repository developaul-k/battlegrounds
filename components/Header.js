import React from 'react';
import styled from 'styled-components';
import { logo } from '../assets/Image';

const Container = styled.View`
  padding: 20px 0;
  background-color: #000;
  align-items: center;
`;

const Image = styled.Image`
  width: 150px;
  height: 40px;
`;

const Header = () => (
  <Container>
    <Image
      resizeMode={'contain'}
      source={{
        uri: logo
      }}
    />
  </Container>
);

export default Header;
