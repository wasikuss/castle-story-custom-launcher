import styled, { css } from "styled-components";
import { match } from "ts-pattern";
import { primaryColor } from "../colors";

type ButtonVariant = "medium";

type ButtonProps = {
  variant: ButtonVariant;
};

const heightButtonVariant = ({ variant }: ButtonProps) => match(variant)
  .with("medium", () => css`
    height: 2rem;
    width: initial;
  `)
  .exhaustive();

export const Button = styled.div`
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

  ${heightButtonVariant}
`;
