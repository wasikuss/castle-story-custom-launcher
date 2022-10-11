import React from "react";
import styled, { css } from "styled-components";

import { primaryColor } from "@/colors";

import { PlayButton } from "./PlayButton";
import playArrowPng from "/link/castlestory-images/play-arrow.png";

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

type LaunchPanelFieldOptionProps = {
  label: string;
  value: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
};
const LaunchPanelFieldOption: React.FC<LaunchPanelFieldOptionProps> = ({
  label,
  onClick
}) => {
  return (
    <LaunchPanelFieldContainer onClick={onClick}>
      <LaunchPanelFakeSelect>{label}</LaunchPanelFakeSelect>
    </LaunchPanelFieldContainer>
  )
};

type LaunchPanelFieldProps = {
  label: string;
  options: Record<string, string>;
  expanded: string;
  setExpanded: React.Dispatch<string>;
  selectedOption: string;
  setSelectedOption: React.Dispatch<string>;
};
const LaunchPanelField: React.FC<LaunchPanelFieldProps> = ({
  label,
  options,
  selectedOption,
  expanded: _expanded,
  setExpanded,
  setSelectedOption
}) => {
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
            .filter(([value,]) => value !== selectedOption)
            .map(([value, label]) => (
              <LaunchPanelFieldOption
                key={value}
                label={label}
                value={value}
                onClick={() => {
                  setSelectedOption(value);
                  setExpanded("");
                }}
              />
            ))
        }
      </LaunchPanelFieldBleedBottom>}
    </LaunchPanelFieldWrapper>
  );
}

const getCastleStoryExecPath = async () => {
  const platform = await window.launcher.os_platform();
  const castleStoryPath = await window.launcher.env_castlestorypath();
  const isModded = true;

  if (isModded) {
    switch (platform) {
      case "win32": return [castleStoryPath + "/Castle Story.exe"];
      case "linux": return ["/bin/sh", castleStoryPath, castleStoryPath + "/run_bepinex.sh"];
      default: return [castleStoryPath + "/Castle Story.exe"];
    }
  }

  switch (platform) {
    case "win32": return [castleStoryPath + "/Castle Story.exe"];
    case "linux": return [castleStoryPath + "/Castle Story"];
    default: return [castleStoryPath + "/Castle Story.exe"];
  }

}
const launchCastleStory = async (
  resolution: string,
  windowMode: string,
  monitor = 0
) => {
  const [pathExec, ...prefix] = await getCastleStoryExecPath();
  const [width, height] = resolution.split("x");
  const fullscreen = windowMode === "fullscreen";
  const borderless = windowMode === "borderless";

  try {
    switch (pathExec) {
      case "/bin/sh":
        // TODO: make this mess cleaner, awaiting merge of https://github.com/BepInEx/BepInEx/pull/496
        // eslint-disable-next-line no-case-declarations
        const [cwd, actualPath] = prefix;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const params = ["echo '",
        //   "-screen-width", width,
        //   "-screen-height", height,
        //   "-screen-fullscreen", JSON.stringify(fullscreen),
        //   "-screen-borderless", JSON.stringify(borderless),
        //   "-adapter", JSON.stringify(monitor),
        //   "'"
        // ].join(" ");
        await window.launcher.launch(
          pathExec, // [
          [ actualPath, "", "-screen-width", width, "-screen-height", height ], // , "-screen-height", height
          // , "-screen-width", width,
          // "-screen-height", height,
          // "-screen-fullscreen", JSON.stringify(fullscreen),
          // "-screen-borderless", JSON.stringify(borderless),
          // "-adapter", JSON.stringify(monitor)],
          // ]
          {
            detached: true,
            cwd            
          });
        break;
      default:
        await window.launcher.launch(
          pathExec, [
          ...(prefix ?? []),
          "-screen-width", width,
          "-screen-height", height,
          "-screen-fullscreen", JSON.stringify(fullscreen),
          "-screen-borderless", JSON.stringify(borderless),
          "-adapter", JSON.stringify(monitor)
        ], {
          detached: true
        });
    }
  } catch (err) {
    console.error("Not being able to get handle is expected", err);
  }
}

export const LaunchPanel = () => {
  const [expanded, setExpanded] = React.useState("");
  const [resolution, setResolution] = React.useState("2560x1300");
  const [windowMode, setWindowMode] = React.useState("borderless");
  const [skipLauncher, setSkipLauncher] = React.useState("always");

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
            "fullscreen_borderless": "Borderless (Fullscreen)",
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

// cd /home/daniel/.local/share/Steam/steamapps/common/Castle Story/run_bepinex.sh
// /bin/sh "/home/daniel/.local/share/Steam/steamapps/common/Castle Story/run_bepinex.sh" -- "-screen-width 1000"


// if (os.platform() == "darwin") {
//   console.log("ON EST SUR MAC");
//   LaunchApp(__dirname + '/../../../../../../Castle Story.app/Contents/MacOS/Castle Story', width, height,fullscreen,monitor);
// } else if (os.platform() == "win32") {
//     console.log('ON EST SUR WINDOWS');
//     LaunchApp(__dirname + '/../../../../Castle Story.exe', width, height,fullscreen,monitor);
// } else if (os.platform() == "linux") {
//     console.log("ON EST SUR LINUX");
//     LaunchApp(__dirname + '/../../../../Castle Story', width, height,fullscreen,monitor);
// } else {
//     console.log("NO SÉ");
//     LaunchApp(__dirname + '/../../../../../../Castle Story.app/Contents/MacOS/Castle Story', width, height,fullscreen,monitor);
// }


