import React, {
  useState,
  useEffect
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground
} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import { API_END_POINT, API_KEY } from '../env';
import List from '../components/List';
import Loader from '../components/Loader';

const { width } = Dimensions.get('screen');

const Container = styled.View`
  padding-bottom: 20px;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #f1f1f1;
`;

const ProfileText = styled.Text`
  padding-top: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
  font-size: 35px;
  color: #fff;
`;

const Detail = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  // const [username, setUsername] = useState(navigation.getParam('username'));
  const [username, setUsername] = useState(
    'pual__k'
  );
  /* const [resultData, setResultData] = useState({
    duo: {
      assists: 10,
      boosts: 128,
      dBNOs: 28,
      dailyKills: 9,
      dailyWins: 0,
      damageDealt: 7215.784,
      days: 9,
      headshotKills: 11,
      heals: 95,
      killPoints: 0,
      kills: 57,
      longestKill: 190.60527,
      longestTimeSurvived: 1621.976,
      losses: 50,
      maxKillStreaks: 2,
      mostSurvivalTime: 1621.976,
      rankPoints: 0,
      rankPointsTitle: '',
      revives: 5,
      rideDistance: 17564.047,
      roadKills: 0,
      roundMostKills: 6,
      roundsPlayed: 50,
      suicides: 1,
      swimDistance: 203.62117,
      teamKills: 1,
      timeSurvived: 39737.996,
      top10s: 17,
      vehicleDestroys: 0,
      walkDistance: 81746.336,
      weaponsAcquired: 198,
      weeklyKills: 22,
      weeklyWins: 0,
      winPoints: 0,
      wins: 0,
    },
    solo: {
      assists: 0,
      boosts: 14,
      dBNOs: 0,
      dailyKills: 0,
      dailyWins: 0,
      damageDealt: 894.4474,
      days: 3,
      headshotKills: 2,
      heals: 7,
      killPoints: 0,
      kills: 7,
      longestKill: 165.901,
      longestTimeSurvived: 1167.257,
      losses: 4,
      maxKillStreaks: 1,
      mostSurvivalTime: 1167.257,
      rankPoints: 0,
      rankPointsTitle: '',
      revives: 0,
      rideDistance: 0,
      roadKills: 0,
      roundMostKills: 4,
      roundsPlayed: 4,
      suicides: 0,
      swimDistance: 0,
      teamKills: 0,
      timeSurvived: 2797.066,
      top10s: 0,
      vehicleDestroys: 0,
      walkDistance: 5344.4175,
      weaponsAcquired: 21,
      weeklyKills: 0,
      weeklyWins: 0,
      winPoints: 0,
      wins: 0,
    },
    squad: {
      assists: 8,
      boosts: 74,
      dBNOs: 32,
      dailyKills: 4,
      dailyWins: 0,
      damageDealt: 5198.2754,
      days: 6,
      headshotKills: 4,
      heals: 75,
      killPoints: 0,
      kills: 26,
      longestKill: 131.1825,
      longestTimeSurvived: 1812.241,
      losses: 38,
      maxKillStreaks: 2,
      mostSurvivalTime: 1812.241,
      rankPoints: 0,
      rankPointsTitle: '',
      revives: 2,
      rideDistance: 39428.586,
      roadKills: 0,
      roundMostKills: 4,
      roundsPlayed: 38,
      suicides: 1,
      swimDistance: 0,
      teamKills: 1,
      timeSurvived: 23311.53,
      top10s: 10,
      vehicleDestroys: 0,
      walkDistance: 34589.285,
      weaponsAcquired: 131,
      weeklyKills: 4,
      weeklyWins: 0,
      winPoints: 0,
      wins: 0,
    },
  }); */
  const [resultData, setResultData] = useState(
    {}
  );
  async function fetchUrl() {
    try {
      setLoading(true);

      const platform = 'kakao';
      const username = 'pual__k';

      let accountId = '';
      let seasonId = '';

      // Set default authorization
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${API_KEY}`;
      axios.defaults.headers.common['Accept'] =
        'application/vnd.api+json';

      // GET user accound id
      /* const response = await fetch(
        // `${API_END_POINT}/${platform}/players?filter[playerNames]=${username}`,
        'https://api.pubg.com/shards/kakao/players/account.5134075579024a26a6562f9f0370cca0/seasons/division.bro.official.pc-2018-04',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: 'application/vnd.api+json'
          }
        }
      );
      const json = await response.json();
      console.log(json);
      setResultData(json); */
      await axios
        .get(
          `${API_END_POINT}/${platform}/players?filter[playerNames]=${username}`
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
        .catch(err => {
          console.log(err);
          console.log({
            errN: 'user account id',
            err
          });
        });

      // GET seasons
      await axios
        .get(
          `${API_END_POINT}/${platform}/seasons`
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
        .catch(err =>
          console.log({ errN: 'seasons', err })
        );

      // GET user season profile
      await axios
        .get(
          `${API_END_POINT}/${platform}/players/${accountId}/seasons/${seasonId}`
        )
        .then(async res => {
          const { status } = res;
          if (status === 200) {
            const {
              data: { data }
            } = res;

            let newObject = {};
            let resultObject = {};

            await Object.keys(
              data.attributes.gameModeStats
            ).map(object => {
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
            const objectToArray =
              await Object.keys(newObject).map(key => {
                return [key, newObject[key]];
              });
            await objectToArray.unshift(...objectToArray.splice(1,1));
            await objectToArray.map(arr => {
              return (resultObject[arr[0]] = arr[1]);
            });
            setResultData(resultObject);
          }
        })
        .catch(err =>
          console.log({ errN: 'stat', err })
        );
    } catch (err) {
      console.log({ errN: 'catch', err });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : resultData && resultData.duo ? (
        <ScrollView>
          <Container>
            <ImageBackground
              source={require('../assets/username.jpg')}
              style={{
                marginBottom: 15,
                width: width,
                height: 150,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <ProfileText>
                {username}님의 전적
              </ProfileText>
            </ImageBackground>
            {Object.values(resultData).map(
              (prop, idx) => (
                <List key={idx} {...prop} />
              )
            )}
          </Container>
        </ScrollView>
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
