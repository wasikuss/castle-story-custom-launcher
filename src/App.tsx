import React from "react";
import styled from "styled-components";
import backgroundPng from "/link/castlestory-images/background.png"
import { primaryColor } from "./colors";
import { LaunchPanel } from "./LaunchPanel/LaunchPanel";
import { Heading } from "./Heading/Heading";
import { useQuery } from "@tanstack/react-query";
import { Check } from "shared/types";
import { CenterPanel } from "./UI/CenterPanel";
import { Button, ButtonLink } from "./UI/Button";
import ExternalLink from "./UI/Icons/ExternalLink.png";
import { getShouldAutostart } from "./getShouldAutostart";

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: url(${backgroundPng}) no-repeat;

  // from body
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const NewsPanel = styled.div`
  /* From https://css.glass */
  background: ${primaryColor}cc;
  backdrop-filter: blur(7.8px);
  -webkit-backdrop-filter: blur(7.8px);
  border: 5px solid black;
  box-shadow: 0 -15px 0px 0px #00000066 inset;

  width: 400px;

  position: fixed;
  left: 30px;
  top: 200px;

  box-sizing: border-box;
  padding: 15px 15px 30px 15px;

  display: flex;
  flex-direction: column;
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

const DebugData = styled.code`
  margin-bottom: 1rem;
  background-color: white;
`;

const App: React.FC = () => {
  const { data: checkData } = useQuery<Check>(["CastleStoryInstance_check"], window.launcher.CastleStoryInstance_check);
  const [gameRunning, setGameRunning] = React.useState(false);
  const [shouldAutostartErrorDismissed, setAutostartErrorDismissed] = React.useState(false);
  const shouldAutostart = getShouldAutostart();
  console.log("Config", window.config);

  React.useEffect(() => {
    window.game.start(() => {
      setGameRunning(true);
    });
    window.game.stop(() => {
      setGameRunning(false);
    });
  }, [setGameRunning]);

  if (!checkData) {
    return (
      <AppContainer>
        <Heading />
        <CenterPanel
          title="Looking for the game..."
        />
      </AppContainer>
    )
  }

  if (!checkData.exists) {
    return (
      <AppContainer>
        <Heading />
        <CenterPanel
          title="We can't find your game"
          description={`
            Make sure that the launcher file is in the game's folder.
            If launcher is in correct place - please get in contact with us.
          `}
        >
          <DebugData>
            {checkData.scannedFile}
          </DebugData>
          <ButtonLink
            variant="medium"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer nofollow"
            href="https://github.com/Danielduel/castle-story-custom-launcher/tree/main/docs/ISSUES.md"
          >
            <img src={ExternalLink} height="14"/>&nbsp;How to get help?
          </ButtonLink>
        </CenterPanel>
      </AppContainer>
    )
  }

  if (!checkData.access) {
    return (
      <AppContainer>
        <Heading />
        <CenterPanel
          title="We can't access your game"
          description={`
            Looks like launcher is in correct place, but for some reason game can't be ran.
            Please contact authors of the launcher.
          `}
        >
          <DebugData>
            {checkData.scannedFile}
          </DebugData>
          <ButtonLink
            variant="medium"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer nofollow"
            href="https://github.com/Danielduel/castle-story-custom-launcher/tree/main/docs/ISSUES.md"
          >
          <img src={ExternalLink} height="14"/>&nbsp;How to get help?
          </ButtonLink>
        </CenterPanel>
      </AppContainer>
    )
  }

  if (shouldAutostart.prevent && shouldAutostart.error && !shouldAutostartErrorDismissed) {
    return (
      <AppContainer>
        <Heading />
        <CenterPanel
          title="Autostart got ignored"
          description={shouldAutostart.message.join("\n")}
        >
          <Button center variant="medium" onClick={() => setAutostartErrorDismissed(true)}>
            Fine, show me the launcher now
          </Button>
        </CenterPanel>
      </AppContainer>
    );
  }

  if (!shouldAutostart.prevent) {
    window.launcher.CastleStoryInstance_launch();
    console.log("Autostarting");
    return (
      <AppContainer>
        <Heading />
        <CenterPanel
          title="Autostarting..."
        />
      </AppContainer>
    );
  }

  if (!gameRunning) {
    return (
      <AppContainer>
        <Heading />
        <NewsPanel>
          <NewsPanelVersionLabel>Our latest update is</NewsPanelVersionLabel>
          <NewsPanelVersionTitle>Version 1.1</NewsPanelVersionTitle>
        </NewsPanel>
        <LaunchPanel />
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      <Heading />
      <CenterPanel
        title="Game is running"
      />
    </AppContainer>
  )
}

export default App
