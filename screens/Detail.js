import React, {
  useState,
  useEffect
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image
} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import { API_END_POINT, API_KEY } from '../env';
import List from '../components/List';
import Loader from '../components/Loader';

const { width } = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ProfileText = styled.Text`
  padding-top: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.75);
  font-size: 35px;
  color: #fff;
`;

const Detail = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  /* const [username, setUsername] = useState(
    navigation.getParam('username')
  ); */
  const [username, setUsername] = useState(
    'pual__k'
  );
  const [resultData, setResultData] = useState(
    []
  );

  const fetch = async () => {
    try {
      setLoading(true);

      const platform = 'kakao';
      const username = 'pual__k';
      /* const platform = await navigation.getParam(
        'platform'
      );
      const username = await navigation.getParam(
      'username'
      ); */
      let accountId = '';
      let seasonId = '';

      // Set default authorization
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${API_KEY}`;

      // GET user accound id
      await axios
        .get(
          `${API_END_POINT}/${platform}/players?filter[playerNames]=${username}`,
          {
            headers: {
              Accept: 'application/vnd.api+json'
            }
          }
        )
        .then(res => {
          const { status } = res;

          if (status === 200) {
            const {
              data: { data }
            } = res;

            data.map(
              prop => (accountId = prop.id)
            );
          }
        })
        .catch(err => console.log(err));

      // GET seasons
      await axios
        .get(
          `${API_END_POINT}/${platform}/seasons`,
          {
            headers: {
              Accept: 'application/vnd.api+json'
            }
          }
        )
        .then(res => {
          const { status } = res;
          if (status === 200) {
            const {
              data: { data }
            } = res;

            data.map(
              obj =>
                obj.attributes.isCurrentSeason &&
                (seasonId = obj.id)
            );
          }
        })
        .catch(err => console.log(err));

      // GET user season profile
      await axios
        .get(
          `${API_END_POINT}/${platform}/players/${accountId}/seasons/${seasonId}`,
          {
            headers: {
              Accept: 'application/vnd.api+json'
            }
          }
        )
        .then(async res => {
          const { status } = res;
          if (status === 200) {
            const {
              data: { data }
            } = res;

            let newObject = {};

            await Object.keys(
              data.attributes.gameModeStats
            ).forEach(object => {
              if (
                object !== 'solo-fpp' &&
                object !== 'duo-fpp' &&
                object !== 'squad-fpp'
              ) {
                newObject[object] =
                  data.attributes.gameModeStats[
                    object
                  ];
              }
            });
            setResultData(newObject);
          }
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : resultData && resultData.duo ? (
        <Container>
          <ImageBackground
            source={require('../assets/username.jpg')}
            style={{
              marginVertical: 15,
              width: width - 30,
              height: '100%',
              borderRadius: 10,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <ProfileText>{username}님의 전적</ProfileText>
          </ImageBackground>
          {Object.values(resultData).map(
            (prop, idx) => (
              <List key={idx} {...prop} />
            )
          )}
        </Container>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>검색결과가 없습니다.</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home')
            }
          >
            <Text>홈으로 돌아가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Detail;
