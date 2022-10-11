import React from "react";
import styled from "styled-components";
import castleStoryMp4 from "/link/castlestory-video/mp4.mp4"
import closePng from "/link/castlestory-images/close.png"
import minimizePng from "/link/castlestory-images/minimize.png"
import backgroundPng from "/link/castlestory-images/background.png"
import playArrowPng from "/link/castlestory-images/play-arrow.png"
import castleStoryLogoPng from "/link/castlestory-images/CastleStory_Logo.png"
import { accentColor, primaryColor } from "./colors";
import { LaunchPanel } from "./LaunchPanel/LaunchPanel";

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: url(${backgroundPng}) no-repeat;
`;

const TitleBarDraggableBackdrop = styled.div`
  -webkit-app-region: drag;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
`;

const TitleBarContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TitleBarImageButtonContainer = styled.div`
  user-select: none;
  -webkit-app-region: no-drag;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 42px;
  background: transparent;
  cursor: pointer;
  transition: background 0.1s linear;

  &:hover {
    background: ${accentColor};
  }
`;
const TitleBarImageButton = styled.img``;

const TitleBarHighlighted = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 63px;
  width: 100vw;
  background-color: ${accentColor};
  box-shadow: 0 6px 0px 0px #00000033;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TitleBarHighlightedButton = styled.div`
  user-select: none;
  -webkit-app-region: no-drag;

  color: white;
  font-size: 1.05rem;
  font-weight: 900;
  height: 100%;
  padding: 0 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  transition: color 0.1s linear;

  &:hover {
    color: black;
  }

  &:last-child {
    margin-right: 40px;
  }
`;

const TitleBarButton = styled(TitleBarHighlightedButton)`
  font-size: 0.72rem;
  padding: 0 8px;
`;
const TitleBarButton_Last = styled(TitleBarButton)`
  margin-right: 10px;
`

const CastleStoryLogo = styled.img`
  position: absolute;
  left: 45px;
  width: 320px;
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
      {/* <Background src={backgroundPng} /> */}
      <TitleBarDraggableBackdrop />
      <TitleBarContainer>
        <TitleBar>
          <TitleBarButton>Twitter</TitleBarButton>
          <TitleBarButton>Facebook</TitleBarButton>
          <TitleBarButton>Twitch</TitleBarButton>
          <TitleBarButton>YouTube</TitleBarButton>
          <TitleBarButton_Last>Discord</TitleBarButton_Last>
          <TitleBarImageButtonContainer>
            <TitleBarImageButton src={minimizePng} />
          </TitleBarImageButtonContainer>
          <TitleBarImageButtonContainer>
            <TitleBarImageButton src={closePng} />
          </TitleBarImageButtonContainer>
        </TitleBar>
        <TitleBarHighlighted>
          <CastleStoryLogo src={castleStoryLogoPng} />
          <TitleBarHighlightedButton>NexusMods</TitleBarHighlightedButton>
          <TitleBarHighlightedButton>Forum</TitleBarHighlightedButton>
          <TitleBarHighlightedButton>Chat</TitleBarHighlightedButton>
          <TitleBarHighlightedButton>Wiki</TitleBarHighlightedButton>
          <TitleBarHighlightedButton>Support</TitleBarHighlightedButton>
          <TitleBarHighlightedButton>Credits</TitleBarHighlightedButton>
        </TitleBarHighlighted>
      </TitleBarContainer>
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
