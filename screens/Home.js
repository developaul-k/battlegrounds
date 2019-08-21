import React, { useState } from 'react';
import { Dimensions, Alert } from 'react-native';
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';

const { width, height } = Dimensions.get('screen');

const Title = styled.Text`
  font-size: 30px;
  padding: 20px 0;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
`;

const SearchContainer = styled.View``;

const SearchInput = styled.TextInput`
  margin-top: 10px;
  padding: 0 15px;
  width: ${width - 100};
  height: 50px;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 15px;
`;

const SearchButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: ${width - 100};
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #000;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #fff;
`;

const Home = ({ navigation }) => {
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');

  const onChange = text => {
    setUsername(text);
  };

  const onSubmit = async () => {
    if (platform === '') {
      Alert.alert('플랫폼을 선택해주세요.');
    } else if (username === '') {
      Alert.alert('닉네임을 입력해주세요.');
    }
    navigation.navigate('Detail', {
      platform,
      username
    })
  };

  return (
    <Container>
      <Title>배틀그라운드 전적 조회</Title>
      <SearchContainer>
        <Dropdown
          placeholder='플랫폼을 선택해주세요.'
          setPlatform={setPlatform}
        />
        <SearchInput
          onChangeText={onChange}
          value={username}
          placeholder='배틀그라운드 닉네임을 입력해주세요.'
          returnKeyType='search'
          onSubmitEditing={onSubmit}
          autoCapitalize={'none'}
        />
        <SearchButton onPress={onSubmit}>
          <ButtonText>검색</ButtonText>
        </SearchButton>
      </SearchContainer>
    </Container>
  );
};

export default Home;
