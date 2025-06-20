import styled from "styled-components";

const CloseButton = styled.button`
  border-radius: 50px;
  padding: 5px;
  position: absolute;
  top: -5px;
  right: -5px;
  height: 30px;
  width: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type CloseModalButtonProps = {
  toggleModal: () => void;
};

export const CloseModalButton = ({ toggleModal }: CloseModalButtonProps) => {
  return <CloseButton onClick={toggleModal}>X</CloseButton>;
};
