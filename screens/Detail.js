import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_END_POINT, API_KEY } from '../env';
import List from '../components/List';

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} color='#000' />
    </View>
  );
};

const Detail = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState([]);

  const fetch = async () => {
    try {
      setLoading(true);

      const platform = await navigation.getParam('platform');
      const username = await navigation.getParam('username');
      let accountId = '';
      let seasonId = '';

      // Set default authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

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

            data.map(prop => (accountId = prop.id));
          }
        })
        .catch(err => console.log(err));

      // GET seasons
      await axios
        .get(`${API_END_POINT}/${platform}/seasons`, {
          headers: {
            Accept: 'application/vnd.api+json'
          }
        })
        .then(res => {
          const { status } = res;
          if (status === 200) {
            const {
              data: { data }
            } = res;

            data.map(
              obj => obj.attributes.isCurrentSeason && (seasonId = obj.id)
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

            await Object.keys(data.attributes.gameModeStats).forEach(object => {
              if (
                object !== 'solo-fpp' &&
                object !== 'duo-fpp' &&
                object !== 'squad-fpp'
              ) {
                newObject[object] = data.attributes.gameModeStats[object];
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
        Object.values(resultData).map((prop, idx) => (
          <List key={idx} {...prop} />
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>검색결과가 없습니다.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text>홈으로 돌아가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Detail;
