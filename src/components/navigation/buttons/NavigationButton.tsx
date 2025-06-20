import styled from "styled-components";
import { Page } from "../../../types";
import { PageIconRenderer } from "./PageIconRenderer";
import { MenuIcon } from "../../../assets";
import { useRef, useState } from "react";
import { EditPageContextMenu } from "../contextMenu";

const Button = styled.button`
  position: relative;

  svg {
    fill: none;
    stroke: #f59d0e;
  }

  &:hover {
    svg {
      stroke: #677289;
    }
  }
`;

const ContextMenuButton = styled.button`
  fill: #677289;
  border: none;
  padding: 0px;
  background: transparent;
  width: 25px;

  &:focus,
  &:hover,
  &:active {
    outline: none;
    box-shadow: none;
    background: transparent;
  }
`;

const NavigationButtonWrapper = styled.div`
  position: relative;
`;

type NavigationButtonProps = {
  page: Page;
  selectPage: (page: Page) => void;
  isActive: boolean;
  setDraggedId: (id: Page["id"]) => void;
  onDrop: (id: Page["id"]) => void;
};

export const NavigationButton = ({
  page,
  selectPage,
  isActive,
  setDraggedId,
  onDrop,
}: NavigationButtonProps) => {
  const [isPageContextMenuOpened, setIsPageContextMenuOpened] = useState(false);

  const togglePageContextMenu = () =>
    setIsPageContextMenuOpened(!isPageContextMenuOpened);

  const hidePageContextMenu = () => setIsPageContextMenuOpened(false);

  const parentRef = useRef<HTMLButtonElement | null>(null);

  return (
    <NavigationButtonWrapper>
      {isActive && isPageContextMenuOpened && (
        <EditPageContextMenu
          page={page}
          hidePageContextMenu={hidePageContextMenu}
          parentRef={parentRef.current}
        />
      )}
      <Button
        onClick={() => selectPage(page)}
        ref={parentRef}
        draggable
        onDragStart={() => setDraggedId(page.id)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => onDrop(page.id)}
      >
        <PageIconRenderer pageType={page.pageType} /> {page.name}
        {isActive && (
          <ContextMenuButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              togglePageContextMenu();
            }}
          >
            <MenuIcon />
          </ContextMenuButton>
        )}
      </Button>
    </NavigationButtonWrapper>
  );
};
