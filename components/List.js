import React from 'react';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components';

const { width } = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
`;

const ProfileContainer = styled.View`
  margin: 10px;
  padding: 30px;
  height: 100px;
  border-radius: 10px;
  background-color: ${props =>
    props.index === 0 ? '#EAE1D7' : props.index === 1 ? '#8BD0B4' : '#DD4B4F'};
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`;

const Card = styled.View`
  margin: 10px;
  width: ${width / 3 - 20};
  height: 100px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  box-shadow: 10px 5px 5px #000;
`;
const Text = styled.Text`
  font-size: ${props => (props.size === 'big' ? '25px' : '15px')};
  ${props =>
    props.bold &&
    css`
      font-weight: bold;
    `}
`;

const List = ({
  longestKill,
  kills,
  losses,
  assists,
  wins,
  roundsPlayed,
  top10s,
  damageDealt,
  headshotKills,
  index,
  roundMostKills
}) => {
  const getKD = (kills, losses) => {
    return (kills / losses).toFixed(2);
  };
  const getKDA = (kills, assists, losses) => {
    return ((kills + assists) / losses).toFixed(2);
  };
  const getAverageWin = (wins, roundsPlayed) => {
    return `${((wins / roundsPlayed) * 100).toFixed(2)}%`;
  };
  const getAverageDamage = (damageDealt, roundsPlayed) => {
    return (damageDealt / roundsPlayed).toFixed(0);
  };
  const getToFixed = (value, length) => {
    return value.toFixed(length);
  };
  const getHeadShot = (headshotkills, kills) =>
    `${((headshotkills / kills) * 100).toFixed(1)}%`;

  return (
    <Container>
      <ProfileContainer index={index}>
        <Text size='big'>
          {index === 0 ? '솔로' : index === 1 ? '듀오' : '스쿼드'}
        </Text>
        <Text>
          {wins}승 {top10s}탑 {losses - wins - top10s}패
        </Text>
      </ProfileContainer>
      <CardContainer>
        <Card>
          <Text bold>K/D</Text>
          <Text>{getKD(kills, losses)}</Text>
        </Card>
        <Card>
          <Text bold>승률</Text>
          <Text>{getAverageWin(wins, losses)}</Text>
        </Card>
        <Card>
          <Text bold>Top10</Text>
          <Text>{getAverageWin(top10s, roundsPlayed)}</Text>
        </Card>
        <Card>
          <Text bold>KDA</Text>
          <Text>{getKDA(kills, assists, losses)}</Text>
        </Card>
        <Card>
          <Text bold>평균 딜량</Text>
          <Text>{getAverageDamage(damageDealt, roundsPlayed)}</Text>
        </Card>
        <Card>
          <Text bold>여포</Text>
          <Text>{roundMostKills}</Text>
        </Card>
        <Card>
          <Text bold>헤드샷</Text>
          <Text>{getHeadShot(headshotKills, kills)}</Text>
        </Card>
        <Card>
          <Text bold>저격</Text>
          <Text>{getToFixed(longestKill, 2)}m</Text>
        </Card>
        <Card>
          <Text bold>게임 수</Text>
          <Text>{roundsPlayed}</Text>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default List;
