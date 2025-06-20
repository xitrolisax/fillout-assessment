import styled from "styled-components";
import { CloseModalButton } from "./CloseModalButton";
import { useCallback, useMemo, useState } from "react";
import { usePageNavigation } from "../PageNavigationProvider";
import { getNewPageObject } from "../utils/getNewPageObject";
import { PageType } from "../../types";
import { getPageType } from "../utils";

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  background-color: #9da4b259;
  padding: 40px 30px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  position: relative;
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormTitle = styled.h3`
  font-weight: 500;
`;

const NameInput = styled.input``;

const Button = styled.button``;

type ModalProps = {
  toggleModal: () => void;
  newPageType: PageType;
  newPageIndex: number | undefined;
};

export const Modal = ({
  toggleModal,
  newPageType,
  newPageIndex,
}: ModalProps) => {
  const { addNewPage, setCurrentPage } = usePageNavigation();
  const [newPageName, setNewPageName] = useState("");

  const pageType = getPageType(newPageType);

  const newPage = useMemo(() => {
    return getNewPageObject({ newPageName, newPageType });
  }, [newPageName, newPageType]);

  const createNewPage = useCallback(() => {
    addNewPage(newPage, newPageIndex);
    toggleModal();
    setCurrentPage(newPage);
  }, [addNewPage, newPage, newPageIndex, setCurrentPage, toggleModal]);

  return (
    <ModalWrapper onClick={toggleModal}>
      <Form onClick={(e) => e.stopPropagation()}>
        <CloseModalButton toggleModal={toggleModal} />
        <FormTitle>Name your {pageType} form page</FormTitle>
        <NameInput
          onChange={(e) => setNewPageName(e.currentTarget.value)}
          value={newPageName}
        />
        <Button disabled={!newPageName} onClick={createNewPage}>
          Add new page
        </Button>
      </Form>
    </ModalWrapper>
  );
};
