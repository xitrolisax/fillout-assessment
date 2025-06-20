import styled from "styled-components";
import { PlusIcon } from "../../../assets";
import { useModal } from "../../../providers";
import { PageType } from "../../../types";
import { useRef, useState } from "react";
import { AddPageContextMenu } from "../contextMenu";

const AddPage = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8.4px;

  &.isRound {
    border-radius: 100px;
    padding: 4px;

    height: 16px;
    width: 16px;

    opacity: 0;
    position: absolute;
    margin: auto;
    top: 0px;
    bottom: 0px;
    right: -28px;

    svg {
      height: 10px;
      width: 10px;
    }

    &:hover,
    &:focus,
    &:active {
      opacity: 1;
    }
  }

  &:hover {
    svg {
      fill: #677289;
    }
  }
`;

const AddPageButtonWrapper = styled.div`
  position: relative;
  z-index: 2;
  min-height: 32px;

  &:has(.isRound:hover, .isRound:focus, .isRound:active) + div {
    width: 40px;
  }
`;

type AddPageButtonProps = {
  newPageIndex: number;
  round?: true;
};

export const AddPageButton = ({ newPageIndex, round }: AddPageButtonProps) => {
  const [isContextMenuOpened, setIsContextMenuOpened] = useState(false);
  const { showModal } = useModal();

  const showContextMenu = () => {
    setIsContextMenuOpened(true);
  };

  const closeContextMenu = () => setIsContextMenuOpened(false);
  const toggleContextMenu = () => setIsContextMenuOpened(!isContextMenuOpened);

  const showAddNewPageModal = (pageType: PageType, pageIndex: number) => {
    showModal(pageType, pageIndex);
    closeContextMenu();
  };

  const parentRef = useRef<HTMLDivElement | null>(null);

  return (
    <AddPageButtonWrapper ref={parentRef} onClick={toggleContextMenu}>
      {isContextMenuOpened && (
        <AddPageContextMenu
          showAddNewPageModal={showAddNewPageModal}
          closeContextMenu={closeContextMenu}
          parentRef={parentRef.current}
          newPageIndex={newPageIndex}
        />
      )}
      <AddPage onClick={showContextMenu} className={round && "isRound"}>
        <PlusIcon />
        {!round && <>Add page</>}
      </AddPage>
    </AddPageButtonWrapper>
  );
};
