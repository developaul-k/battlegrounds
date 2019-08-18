import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const { width, height } = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ListText = styled.Text`
  width: ${width / 3};
  background-color: red;
`;

const List = ({
  longestKill,
  kills,
  losses,
  assists,
  wins,
  roundsPlayed,
  top10s,
  damageDealt
}) => {
  const getKD = (kills, losses) => {
    return (kills / losses).toFixed(2);
  };
  const getKDA = (kills, assists, losses) => {
    return ((kills + assists) / losses).toFixed(2);
  };
  const getAverageWin = (wins, losses) => {
    return (wins / (wins + losses)) * 100;
  };
  const getAverageDamage = (damageDealt, roundsPlayed) => {
    return damageDealt / roundsPlayed
  }
  return (
    <Container>
      <ListText>{wins}승 {top10s}탑 {losses}패</ListText>
      <ListText>최대 거리: {longestKill}</ListText>
      <ListText>K/D: {getKD(kills, losses)}</ListText>
      <ListText>KDA: {getKDA(kills, assists, losses)}</ListText>
      <ListText>평균 딜량: {getAverageDamage(damageDealt, roundsPlayed)}</ListText>
      <ListText>승률: {getAverageWin(wins, losses)}</ListText>
      <ListText>Top10: {getAverageWin(top10s, losses)}</ListText>
    </Container>
  );
};

export default List;
