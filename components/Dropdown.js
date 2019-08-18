import React from 'react';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = ({ placeholder, setPlatform }) => {
  return (
    <RNPickerSelect
      placeholder={{ label: placeholder }}
      onValueChange={value => setPlatform(value)}
      items={[
        { label: '카카오', value: 'kakao' },
        { label: '스팀', value: 'steam' }
      ]}
      style={{
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
