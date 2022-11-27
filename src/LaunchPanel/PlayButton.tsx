import React from "react";
import styled from "styled-components";

import playArrowPng from "/link/castlestory-images/play-arrow.png";

const PlayButtonWrapper = styled.div`
  backdrop-filter: blur(7.8px);
  -webkit-backdrop-filter: blur(7.8px);
  background: #FFFFFFCC;
  border: 5px solid black;
  box-shadow: 0 -15px 0px 0px #00000066 inset;

  width: 400px;
  height: 100px;

  position: fixed;
  right: 30px;
  bottom: 30px;
  box-sizing: border-box;
  padding-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: background 0.1s linear, backdrop-filter 0.5s linear;

  &:hover {
    background: #FFFFFF33;
    backdrop-filter: blur(3px);
  }
`;

const PlayButtonText = styled.div`
  display: inline-block;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.5rem;
`;
const PlayButtonImage = styled.img`
  display: inline-block;
  margin-left: 1rem;
  image-rendering: pixelated;
`;

type PlayButtonProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <PlayButtonWrapper onClick={onClick}>
      <PlayButtonText>Play</PlayButtonText>
      <PlayButtonImage src={playArrowPng} />
    </PlayButtonWrapper>
  );
}
