import React from "react";
import styled, { css } from "styled-components";

import { primaryColor } from "@/colors";

import { PlayButton } from "./PlayButton";
import playArrowPng from "/link/castlestory-images/play-arrow.png";
import { store, StoreType } from "@/Store";

const LaunchPanelWrapper = styled.div`
  /* From https://css.glass */
  background: ${primaryColor}cc;
  backdrop-filter: blur(7.8px);
  -webkit-backdrop-filter: blur(7.8px);
  border: 5px solid black;
  box-shadow: 0 -15px 0px 0px #00000066 inset;

  width: 400px;

  position: fixed;
  z-index: 9;
  right: 30px;
  bottom: 160px;

  box-sizing: border-box;
  padding: 15px 15px 30px 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  user-select: none;
`;

const LaunchPanelTitle = styled.div`
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  width: 100%;
`;
const LaunchPanelFakeSelect = styled.div``;

const LaunchPanelFieldWrapper = styled.div`
  position: relative;
  margin-bottom: 3px;
`;

const LaunchPanelItemsBackground = css`
  background: linear-gradient(to right, #3334, transparent 10%);
  &:hover {
    background: linear-gradient(to right, #fff5, transparent 50%);
  }
`;

const LaunchPanelFieldContainer = styled.div`
  position: relative;

  border-left: 3px solid black;
  padding: 5px 10px;

  overflow: hidden;
  cursor: pointer;

  ${LaunchPanelItemsBackground}
  ${({ expanded }: { expanded?: boolean }) => expanded && css`
    box-shadow: 0 0 1px 0 black;
    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: block;
      background: ${primaryColor}cc;
    }
  `}
`;

const LaunchPanelFieldLabel = styled.div`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;
const LaunchPanelFieldImage = styled.img`
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
`;
const LaunchPanelFieldBleedTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  transform: translateY(-100%);
`;
const LaunchPanelFieldBleedBottom = styled.div`
  z-index: 11;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;

  transform: translateY(100%);

  background: ${primaryColor}aa;
  backdrop-filter: blur(7.8px);
  -webkit-backdrop-filter: blur(7.8px);
  box-shadow: 0 2px 1px 0px black;
`;

type LaunchPanelFieldOptionProps<AvailableValues extends string> = {
  label: string;
  value: AvailableValues;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
};
const LaunchPanelFieldOption = <V extends string>({
  label,
  onClick
}: LaunchPanelFieldOptionProps<V>) => {
  return (
    <LaunchPanelFieldContainer onClick={onClick}>
      <LaunchPanelFakeSelect>{label}</LaunchPanelFakeSelect>
    </LaunchPanelFieldContainer>
  )
};

type LaunchPanelFieldProps<AvailableValues extends string> = {
  label: string;
  options: Record<AvailableValues, string>;
  expanded: string;
  setExpanded: React.Dispatch<string>;
  selectedOption: AvailableValues;
  setSelectedOption: React.Dispatch<AvailableValues>;
};
const LaunchPanelField = <V extends string>({
  label,
  options,
  selectedOption,
  expanded: _expanded,
  setExpanded,
  setSelectedOption
}: LaunchPanelFieldProps<V>) => {
  const selectedOptionLabel = options[selectedOption] ?? selectedOption;
  // const selectedOptionIsInOptions = selectedOption in options;
  const expanded = _expanded === label;

  return (
    <LaunchPanelFieldWrapper>
      <LaunchPanelFieldBleedTop>

      </LaunchPanelFieldBleedTop>
      <LaunchPanelFieldContainer
        expanded={expanded}
        onClick={() => setExpanded(expanded ? "" : label)}
      >
        <LaunchPanelFieldImage src={playArrowPng} />
        <LaunchPanelFieldLabel>{label}</LaunchPanelFieldLabel>
        <LaunchPanelFakeSelect>{selectedOptionLabel}</LaunchPanelFakeSelect>
      </LaunchPanelFieldContainer>
      {expanded && <LaunchPanelFieldBleedBottom>
        {
          Object
            .entries(options)
            .filter(([optionValue,]) => optionValue !== selectedOption)
            .map(([optionValue, optionLabel]) => (
              <LaunchPanelFieldOption
                key={optionValue}
                label={optionLabel as string}
                value={optionValue as V}
                onClick={() => {
                  setSelectedOption(optionValue as V);
                  setExpanded("");
                }}
              />
            ))
        }
      </LaunchPanelFieldBleedBottom>}
    </LaunchPanelFieldWrapper>
  );
}

const getCastleStoryExecutable = (platform: string, isModded: boolean) => {
  // TODO: Mac?
  if (isModded) {
    switch (platform) {
      case "win32": return "Castle Story.exe";
      case "linux": return "run_bepinex.sh";
      default: return "Castle Story.exe";
    }
  }

  // TODO: Mac?
  switch (platform) {
    case "win32": return "Castle Story.exe";
    case "linux": return "Castle Story";
    default: return "Castle Story.exe";
  }
}

const launchCastleStory = async (
  resolution: string,
  windowMode: string,
  monitor = 0
) => {
  const platform = await window.launcher.os_platform();
  const isModded = false;
  const castleStoryPath = await window.launcher.env_castlestorypath();
  const executableName = getCastleStoryExecutable(platform, isModded);
  const [width, height] = resolution.split("x");
  const fullscreen = windowMode === "fullscreen";
  const borderless = windowMode === "borderless";

  const gameParams: string[] = [
    "-popupwindow",
    "-screen-width", `${width}`,
    "-screen-height", `${height}`,
    "-screen-fullscreen", `${fullscreen}`,
    // "-window-mode", "borderless",
    // ...(borderless ? ["-window-mode", "borderless"] : []),
    "-adapter", `${monitor}`
  ];

  const cwd = castleStoryPath;

  try {
    if (platform === "linux" && isModded) {
      return await window.launcher.launch(
        "/bin/sh",
        [
          executableName,
          "", // skipping the first parameter for BepInEx
          ...gameParams
        ],
        {
          detached: true,
          cwd
        }
      );
    }

    return await window.launcher.launch(
      `${cwd}/${executableName}`,
      gameParams,
      {
        detached: true,
        cwd
      }
    );
  } catch (err) {
    console.error("Not being able to get handle is expected", err);
  }
}

const useStoredState = <K extends keyof StoreType>(key: K): [
  StoreType[K],
  (value: StoreType[K]) => void
] => {
  type T = StoreType[K];
  const storedValue = store.get(key);
  const [state, _setState] = React.useState<T>(storedValue);

  const setState = React.useCallback((value: T) => {
    _setState(value);
    store.set(key, value);
  }, [_setState]);

  return [state, setState] as [
    StoreType[K],
    (value: StoreType[K]) => void
  ];
}

export const LaunchPanel = () => {
  const [expanded, setExpanded] = React.useState("");
  const [resolution, setResolution] = useStoredState("lastResolution");
  const [windowMode, setWindowMode] = useStoredState("lastWindowMode");
  const [skipLauncher, setSkipLauncher] = useStoredState("lastSkipLauncher");

  return (
    <>
      <LaunchPanelWrapper>
        <LaunchPanelTitle>Settings</LaunchPanelTitle>
        <LaunchPanelField
          label="Resolution"
          expanded={expanded}
          setExpanded={setExpanded}
          selectedOption={resolution}
          setSelectedOption={setResolution}
          options={{
            "800x600": "800x600",
            "1024x768": "1024x768",
            "2560x1300": "2560x1300",
            "5120x1440": "5120x1440",
          }}
        />
        <LaunchPanelField
          label="Window"
          expanded={expanded}
          setExpanded={setExpanded}
          selectedOption={windowMode}
          setSelectedOption={setWindowMode}
          options={{
            "window": "Windowed",
            "borderless": "Borderless",
            "fullscreen_borderless": "Borderless (Fullscreen) - Requires a mod",
            "fullscreen": "Fullscreen",
          }}
        />
        <LaunchPanelField
          label="Skip launcher"
          expanded={expanded}
          setExpanded={setExpanded}
          selectedOption={skipLauncher}
          setSelectedOption={setSkipLauncher}
          options={{
            "always": "Always",
            "never": "Never"
          }}
        />
      </LaunchPanelWrapper>
      <PlayButton onClick={() => launchCastleStory(
        resolution,
        windowMode,
        0
      )} />
    </>
  )
};
