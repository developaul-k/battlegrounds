import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const { width } = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ListText = styled.Text`
  padding: 20px 10px;
  width: ${width / 3};
  background-color: #f1f1f1;
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
  headshotKills
}) => {
  const getKD = (kills, losses) => {
    return (kills / losses).toFixed(2);
  };
  const getKDA = (kills, assists, losses) => {
    return ((kills + assists) / losses).toFixed(2);
  };
  const getAverageWin = (wins, losses) => {
    return `${((wins / (wins + losses)) * 100).toFixed(2)}%`;
  };
  const getAverageDamage = (damageDealt, roundsPlayed) => {
    return (damageDealt / roundsPlayed).toFixed(0);
  };
  const getToFixed = (value, length) => {
    return value.toFixed(length);
  };
  const getHeadShot = (headshotkills, kills) =>
    `${((11 / 57) * 100).toFixed(1)}%`;

  return (
    <Container>
      <ListText>
        {wins}승 {top10s}탑 {losses}패
      </ListText>
      <ListText>
        저격: {getToFixed(longestKill, 2)}m 최대 거리: {longestKill}
      </ListText>
      <ListText>K/D: {getKD(kills, losses)}</ListText>
      <ListText>KDA: {getKDA(kills, assists, losses)}</ListText>
      <ListText>
        평균 딜량: {getAverageDamage(damageDealt, roundsPlayed)}
      </ListText>
      <ListText>승률: {getAverageWin(wins, losses)}</ListText>
      <ListText>Top10: {getAverageWin(top10s, losses)}</ListText>
      <ListText>헤드샷: {getHeadShot(headshotKills, kills)}</ListText>
    </Container>
  );
};

export default List;
