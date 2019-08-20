import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { logo } from '../assets/Image';

const Container = styled.View`
  padding-top: ${Platform.OS === 'ios' ? 50 : 20};
  padding-bottom: 20px;
  background-color: #000;
`;

const Image = styled.Image`
  width: 150px;
  height: 40px;
`;

const Header = () => (
  <Container
    style={{
      paddingVertical: 20,
      backgroundColor: 'black',
      alignItems: 'center'
    }}
  >
    <Image
      resizeMode={'contain'}
      source={{
        uri: logo
      }}
    />
  </Container>
);

export default Header;
