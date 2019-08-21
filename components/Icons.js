import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const IconContainer = styled.View``;

const Icons = ({ name, size = 15, color = '#000' }) => {
  return (
    <IconContainer>
      <Ionicons name={name} size={size} color={color} />
    </IconContainer>
  );
};

Icons.propsTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string
};

export default Icons;
