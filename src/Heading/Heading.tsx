import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { match,} from "ts-pattern";
import { accentColor } from "../colors";
import closePng from "/link/castlestory-images/close.png"
import minimizePng from "/link/castlestory-images/minimize.png"
import castleStoryLogoPng from "/link/castlestory-images/CastleStory_Logo.png"
import { Clickables, highlightedBarButtons, OnClick, titleBarButtons } from "./Buttons";

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

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const TitleBarButtonGroup = styled(TitleBar)``;

export const TitleBarImageButtonContainer = styled.div`
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
export const TitleBarImageButton = styled.img``;

export const TitleBarHighlighted = styled.div`
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

export const TitleBarHighlightedButton = styled.div`
  user-select: none;
  -webkit-app-region: no-drag;

  cursor: pointer;
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

  &:last-child {
    margin-right: 10px;
  }
`;


const CastleStoryLogo = styled.img`
  position: absolute;
  left: 45px;
  width: 320px;
`;

const RenderClickable = (Component: React.FC<PropsWithChildren<{ onClick?: OnClick }>>) =>
  (item: Clickables) =>
    match<Clickables>(item)
      .with({ kind: "link" }, ({ title, url }) => (
        <Component key={title} onClick={() => window.launcher.openExternal(url)}>
          {title}
        </Component>
      ))
      .with({ kind: "button" }, ({ title, onClick }) => (
        <Component key={title} onClick={onClick}>
          {title}
        </Component>
      ))
      .exhaustive();

export const Heading = () => {
  const _topButtons = React.useMemo(() => titleBarButtons.map(RenderClickable(TitleBarButton)), []);
  const _bottomButtons = React.useMemo(() => highlightedBarButtons.map(RenderClickable(TitleBarHighlightedButton)), []);
  const { mainWindow_minimize, mainWindow_quit } = window.launcher;

  return (
    <>
      <TitleBarDraggableBackdrop />
      <TitleBarContainer>
        <TitleBar>
          <TitleBarButtonGroup>{_topButtons}</TitleBarButtonGroup>
          <TitleBarImageButtonContainer onClick={() => mainWindow_minimize()}>
            <TitleBarImageButton src={minimizePng} />
          </TitleBarImageButtonContainer>
          <TitleBarImageButtonContainer onClick={() => mainWindow_quit()}>
            <TitleBarImageButton src={closePng} />
          </TitleBarImageButtonContainer>
        </TitleBar>
        <TitleBarHighlighted>
          <CastleStoryLogo src={castleStoryLogoPng} />
          {_bottomButtons}
        </TitleBarHighlighted>
      </TitleBarContainer>
    </>
  );
}