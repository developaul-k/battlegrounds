import React from 'react';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components';

const { width } = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`;

const ListContainer = styled.View`
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
const ListText = styled.Text`
  font-size: 15px;
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
  headshotKills
}) => {
  const getKD = (kills, losses) => {
    return (kills / losses).toFixed(2);
  };
  const getKDA = (kills, assists, losses) => {
    return ((kills + assists) / losses).toFixed(
      2
    );
  };
  const getAverageWin = (wins, roundsPlayed) => {
    return `${(
      (wins / roundsPlayed) *
      100
    ).toFixed(2)}%`;
  };
  const getAverageDamage = (
    damageDealt,
    roundsPlayed
  ) => {
    return (damageDealt / roundsPlayed).toFixed(
      0
    );
  };
  const getToFixed = (value, length) => {
    return value.toFixed(length);
  };
  const getHeadShot = (headshotkills, kills) =>
    `${((headshotkills / kills) * 100).toFixed(
      1
    )}%`;

  return (
    <Container>
      <ListContainer>
        <ListText>
          {wins}승 {top10s}탑{' '}
          {losses - wins - top10s}패
        </ListText>
      </ListContainer>
      <ListContainer>
        <ListText bold>승률</ListText>
        <ListText>
          {getAverageWin(wins, losses)}
        </ListText>
      </ListContainer>
      <ListContainer>
        <ListText bold>Top10</ListText>
        <ListText>
          {getAverageWin(top10s, roundsPlayed)}
        </ListText>
      </ListContainer>
      <ListContainer>
        <ListText bold>K/D</ListText>
        <ListText>
          {getKD(kills, losses)}
        </ListText>
      </ListContainer>
      <ListContainer>
        <ListText bold>KDA</ListText>
        <ListText>
          {getKDA(kills, assists, losses)}
        </ListText>
      </ListContainer>
      <ListContainer>
        <ListText bold>평균 딜량</ListText>
        <ListText>
          {getAverageDamage(
            damageDealt,
            roundsPlayed
          )}
        </ListText>
      </ListContainer>
      <ListContainer>
        <ListText bold>헤드샷</ListText>
        <ListText>
          {getHeadShot(headshotKills, kills)}
        </ListText>
      </ListContainer>
      <ListContainer>
        <ListText bold>저격</ListText>
        <ListText>
          {getToFixed(longestKill, 2)}m
        </ListText>
      </ListContainer>
      <ListContainer>
        <ListText bold>게임 수</ListText>
        <ListText>{roundsPlayed}</ListText>
      </ListContainer>
    </Container>
  );
};

export default List;
