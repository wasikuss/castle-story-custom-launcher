import { primaryColor } from "../colors";
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TitleBarHighlighted, TitleBarImageButton, TitleBarImageButtonContainer } from "../Heading/Heading";
import closePng from "/link/castlestory-images/close.png"
import { Button } from "../UI/Button";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 9999;

  width: 100vw;
  height: 100vh;

  background: ${primaryColor}aa;
  backdrop-filter: blur(7.8px);
  -webkit-backdrop-filter: blur(7.8px);
`;

const ModalTitleBar = styled(TitleBarHighlighted)`
  width: 100%;
  position: relative;
  background: ${primaryColor};

  box-shadow: 0 2px 0px 0px #00000066;
`;

const CustomResolutionModalWrapper = styled.div`
  z-index: 99999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 400px;
  background: #FFFFFFCC;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalInputWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ModalInputLabel = styled.div`
  width: 8rem;
  margin-right: 1rem;
`;
const ModalInput = styled.input`
  padding: 0.5rem;
  width: 100%;
`;

const SaveModalButton = styled(Button)`
  align-self: flex-end;
  margin-right: 2rem;
  margin-top: 2rem;
`;

const ModalTitleBarImageButtonContainer = styled(TitleBarImageButtonContainer)`
  
`;

type CustomResolutionModalProps = {
  setModal: React.Dispatch<string>;
  setResolution: React.Dispatch<string>;
};
export const CustomResolutionModal: React.FC<CustomResolutionModalProps> = ({ setModal, setResolution }) => {
  const { register, formState: { errors }, getValues } = useForm();
  const onSave = React.useCallback(() => {
    const {
      width,
      height
    } = getValues();
    setModal("");
    setResolution(`${width}x${height}`);
  }, [setModal, setResolution])

  return (
    <>
      <ModalBackdrop onClick={() => setModal("")} />
      <CustomResolutionModalWrapper>
        <ModalTitleBar>
          <ModalTitleBarImageButtonContainer onClick={() => setModal("")}>
            <TitleBarImageButton src={closePng} />
          </ModalTitleBarImageButtonContainer>
        </ModalTitleBar>
        <ModalInputWrapper>
          <ModalInputLabel>Width&nbsp;(pixels)</ModalInputLabel>
          <ModalInput type="number" {...register("width", { required: true })} />
        </ModalInputWrapper>
        <ModalInputWrapper>
          <ModalInputLabel>Height&nbsp;(pixels)</ModalInputLabel>
          <ModalInput type="number" {...register("height", { required: true })} />
        </ModalInputWrapper>
        <SaveModalButton variant="medium" onClick={onSave}>
          Save
        </SaveModalButton>
      </CustomResolutionModalWrapper>
    </>
  );
};
