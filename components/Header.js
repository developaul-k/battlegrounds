import React from 'react';
import { View, Image } from 'react-native';
import { logo } from '../assets/Image';

const Header = () => (
  <View
    style={{
      paddingVertical: 20,
      backgroundColor: 'black',
      alignItems: 'center',
    }}>
    <Image
      style={{ width: 150, height: 40 }}
      resizeMode={'contain'}
      source={{
        uri: logo,
      }}
    />
  </View>
);

export default Header;
