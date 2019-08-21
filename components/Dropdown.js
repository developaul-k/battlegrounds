import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import Icons from '../components/Icons';

const Dropdown = ({ placeholder, setPlatform }) => {
  return (
    <RNPickerSelect
      placeholder={{ label: placeholder }}
      onValueChange={value => setPlatform(value)}
      Icon={() => (
        <Icons
          name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-dropdown'}
        />
      )}
      items={[
        { label: '카카오', value: 'kakao' },
        { label: '스팀', value: 'steam' }
      ]}
      style={{
        iconContainer: {
          top: '50%',
          right: 15,
          marginTop: -8
        },
        inputIOS: {
          fontSize: 15,
          height: 50,
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          backgroundColor: '#fff',
          color: 'black'
        },
        inputAndroid: {
          fontSize: 15,
          height: 50,
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          backgroundColor: '#fff',
          color: 'black'
        }
      }}
    />
  );
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  setPlatform: PropTypes.func.isRequired
};

export default Dropdown;
