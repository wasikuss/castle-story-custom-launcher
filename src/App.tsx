import React from "react";
import styled from "styled-components";
import castleStoryMp4 from "/link/castlestory-video/mp4.mp4"
import backgroundPng from "/link/castlestory-images/background.png"
import { primaryColor } from "./colors";
import { LaunchPanel } from "./LaunchPanel/LaunchPanel";
import { Heading } from "./Heading/Heading";

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: url(${backgroundPng}) no-repeat;
`;

const NewsPanel = styled.div`
  /* From https://css.glass */
  background: ${primaryColor}cc;
  backdrop-filter: blur(7.8px);
  -webkit-backdrop-filter: blur(7.8px);
  border: 5px solid black;
  box-shadow: 0 -15px 0px 0px #00000066 inset;

  height: calc(100vh - 400px);
  width: 400px;

  position: fixed;
  left: 30px;
  bottom: 200px;

  box-sizing: border-box;
  padding: 15px 15px 30px 15px;

  display: flex;
  flex-direction: column;
`;
const NewsPanelBleed = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: calc(100% + 30px);
  top: 70px;
  left: -15px; /* Counting in the border */
  border: 5px solid black;
  overflow: hidden;
`;
const NewsPanelVideo = styled.video`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  position: relative;
  display: block;
`;

const NewsPanelVersionLabel = styled.div`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 900;
  width: 100%;
`
const NewsPanelVersionTitle = styled.div`
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Heading />
      <NewsPanel>
        <NewsPanelVersionLabel>Our latest update is</NewsPanelVersionLabel>
        <NewsPanelVersionTitle>Version 1.1</NewsPanelVersionTitle>
        <NewsPanelBleed>
          <NewsPanelVideo src={castleStoryMp4} controls />
        </NewsPanelBleed>
      </NewsPanel>
      <LaunchPanel />
    </AppContainer>
  )
}

export default App
