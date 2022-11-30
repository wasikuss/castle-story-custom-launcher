import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { primaryColor } from "../colors";

const CenterPanelContainer = styled.div`
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  max-width: 90vw;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  padding: 2rem;
  background: ${primaryColor};
  border: 5px solid black;
  box-shadow: 0 -5px 0px 0px #00000066 inset;
`;
const CenterPanelDescription = styled.div`
  font-size: 1.2rem;
  font-weight: normal;
  padding: 1.3rem;
  white-space: pre-line;
`;

type CenterPanelProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;
export const CenterPanel: React.FC<CenterPanelProps> = ({ title, description, children }) => {
  return (
    <CenterPanelContainer>
      {title}
      {
        !description
          ? null
          : (
            <CenterPanelDescription>
              {description}
            </CenterPanelDescription>
          )
      }
      {
        !children
          ? null
          : (
            <CenterPanelDescription>
              {children}
            </CenterPanelDescription>
          )
      }
    </CenterPanelContainer>
  )
};
