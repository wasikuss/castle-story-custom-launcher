import React from "react";
import styled, { css } from "styled-components";

import { primaryColor } from "../colors";

import { PlayButton } from "./PlayButton";
import playArrowPng from "/link/castlestory-images/play-arrow.png";
import { store, StoreType } from "../Store";
import { CustomResolutionModal } from "./CustomResolutionModal";

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
  z-index: 11;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 1rem 0;
  border-left: 3px solid black;
  box-sizing: border-box;
  min-height: 5rem;
  height: 5rem;
  max-height: 5rem;
  display: flex;
  flex-direction: row;

  transform: translateY(-100%);

  ::-webkit-scrollbar {
    display: none;
  }

  background: ${primaryColor}aa;
  backdrop-filter: blur(7.8px);
  -webkit-backdrop-filter: blur(7.8px);
  box-shadow: 0 -2px 1px 0px black;
`;
const LaunchPanelFieldBleedBottom = styled.div`
  z-index: 11;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;

  max-height: 200px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  transform: translateY(100%);

  background: ${primaryColor}aa;
  backdrop-filter: blur(7.8px);
  -webkit-backdrop-filter: blur(7.8px);
  box-shadow: 0 2px 1px 0px black;
`;

const LaunchPanelButton = styled.div`
  cursor: pointer;
  height: 100%;
  margin-left: 0.5rem;
  padding: 0 0.5rem 0 0.5rem;
  margin-top: -5px;
  box-shadow: 0 0 2px 0px black;
  background: ${primaryColor}aa;

  display: flex;
  align-items: center;

  background: #FFFFFFCC;
  border: 5px solid black;
  box-shadow: 0 -5px 0px 0px #00000066 inset;

  &:hover {
    background: #FFFFFFEE;
  }
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
  actions?: Record<string, () => void>;
  options: Record<AvailableValues, string> | Promise<Record<AvailableValues, string>>;
  expanded: string;
  setExpanded: React.Dispatch<string>;
  selectedOption: AvailableValues;
  setSelectedOption: React.Dispatch<AvailableValues>;
};
const LaunchPanelField = <V extends string>({
  label,
  actions = {},
  options: _options,
  selectedOption,
  expanded: _expanded,
  setExpanded,
  setSelectedOption
}: LaunchPanelFieldProps<V>) => {
  const [options, setOptions] = React.useState({} as Record<V, string>);
  React.useEffect(() => {
    (async () => {
      setOptions(await _options);
    })()
  });
  const selectedOptionLabel = options[selectedOption] ?? selectedOption;
  // const selectedOptionIsInOptions = selectedOption in options;
  const expanded = _expanded === label;

  return (
    <LaunchPanelFieldWrapper>
      {expanded && !!Object.entries(actions).length &&
        <LaunchPanelFieldBleedTop>
          {
            Object
              .entries(actions)
              .map(([label, callback]) => (
                <LaunchPanelButton key={label} onClick={callback}>{label}</LaunchPanelButton>
              ))
          }
        </LaunchPanelFieldBleedTop>
      }
      <LaunchPanelFieldContainer
        expanded={expanded}
        onClick={() => setExpanded(expanded ? "" : label)}
      >
        <LaunchPanelFieldImage src={playArrowPng} />
        <LaunchPanelFieldLabel>{label}</LaunchPanelFieldLabel>
        <LaunchPanelFakeSelect>{selectedOptionLabel}</LaunchPanelFakeSelect>
      </LaunchPanelFieldContainer>
      {expanded &&
        <LaunchPanelFieldBleedBottom>
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
        </LaunchPanelFieldBleedBottom>
      }
    </LaunchPanelFieldWrapper>
  );
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

const customResolutionModalName = "custom_resolution";
export const LaunchPanel = () => {
  const [expanded, setExpanded] = React.useState("");
  const [modal, setModal] = React.useState("");
  const [resolution, setResolution] = useStoredState("lastResolution");
  const [windowMode, setWindowMode] = useStoredState("lastWindowMode");
  const [skipLauncher, setSkipLauncher] = useStoredState("lastSkipLauncher");
  const supportedResolutions = React.useMemo(() => {
    return window.launcher
      .getSupportedResolutions()
      .then(resolutions => resolutions
        .reduce<Record<string, string>>((result, resolution) => ({
          ...result,
          [`${resolution.width}x${resolution.height}`]: `${resolution.width}x${resolution.height}`
        }), {})
      )
  }, []);

  const isCustomResolutionModalVisible = modal === customResolutionModalName;

  return (
    <>
      {isCustomResolutionModalVisible && <CustomResolutionModal setModal={setModal} setResolution={setResolution} />}
      <LaunchPanelWrapper>
        <LaunchPanelTitle>Settings</LaunchPanelTitle>
        <LaunchPanelField
          label="Resolution"
          expanded={expanded}
          setExpanded={setExpanded}
          selectedOption={resolution}
          setSelectedOption={setResolution}
          actions={{
            "Add custom resolution": () => setModal(customResolutionModalName),
          }}
          options={supportedResolutions}
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
            "fullscreen": "Fullscreen",
          }}
        />
        <LaunchPanelField
          label="Autostart"
          expanded={expanded}
          setExpanded={setExpanded}
          selectedOption={skipLauncher}
          setSelectedOption={setSkipLauncher}
          options={{
            "always": "Always",
            "never": "Never",
            "always_force": "Always (force)"
          }}
        />
      </LaunchPanelWrapper>
      <PlayButton onClick={() => window.launcher.CastleStoryInstance_launch()} />
    </>
  )
};
