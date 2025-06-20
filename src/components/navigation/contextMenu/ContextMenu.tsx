import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { ButtonType } from "../../../types";
import { getButtonClass } from "../buttons/utils";

const ContextMenuDiv = styled.div`
  border-radius: 12px;
  width: 240px;
  border: 1px solid #e1e1e1;
  background-color: #fff;
  position: absolute;
  z-index: 2;
  color: #000;
  transform: translateY(-104%);
  overflow: hidden;
`;

const MenuHeader = styled.div`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #fafbfc;
  font-weight: 600;
  font-family: "BL Melody Regular";
  padding: 8px 12px;
  border-bottom: 1px solid #e1e1e1;
  font-size: 12px;
  text-align: left;
`;

const MenuBody = styled.div`
  gap: 0px;
  display: flex;
  flex-direction: column;
`;

const SeparatorElement = styled.div`
  height: 0.5px;
  background-color: #e1e1e1;
  width: 100%;
  margin: 0px auto;
  max-width: 90%;

  + div {
    padding-top: 14px;
  }
`;

const MenuSubtitle = styled.p`
  font-weight: 400;
  color: rgb(155, 155, 155);
  font-size: 10px;
  text-align: left;
  grid-column-start: 2;
  line-height: 100%;

  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const MenuButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
  padding: 7px 12px;

  &.deleteButton {
    color: #ef494f;
  }

  &:has(${IconWrapper}) {
    column-gap: 6px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
  }

  &:has(${MenuSubtitle}) {
    row-gap: 2px;
    grid-template-rows: auto auto;

    ${IconWrapper} {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }

  &:hover {
    background: #fafbfc;
    filter: grayscale(100%);
  }

  &:first-of-type {
    padding-top: 12px;
  }

  &:last-of-type {
    padding-bottom: 12px;
  }

  &:has(+ ${SeparatorElement}) {
    padding-bottom: 14px;
  }
`;

const MenuTitle = styled.p`
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  grid-column-start: 2;
  line-height: 100%;

  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const ContextMenuWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 5;
`;

type ContextMenuProps = {
  children: ReactNode;
  hideContextMenu: () => void;
  parentElement: HTMLDivElement | HTMLButtonElement | null;
};

type ContextMenuButtonProps = {
  children: ReactNode;
  onClick: () => void;
  buttonType?: ButtonType;
};

type ContextMenuHeaderProps = { children: ReactNode };
type ContextMenuBodyProps = { children: ReactNode };
type ContextMenuTitleProps = { children: ReactNode };
type ContextMenuSubtitleProps = { children: ReactNode };
type ContextMenuIconProps = { children: ReactNode };

export const ContextMenu = ({
  children,
  hideContextMenu,
  parentElement,
}: ContextMenuProps) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (parentElement) {
      const rect = parentElement.getBoundingClientRect();
      setPosition({ top: rect.top, left: rect.left });
    }
  }, [parentElement]);

  return createPortal(
    <ContextMenuWrapper onClick={hideContextMenu}>
      <ContextMenuDiv style={{ top: position.top, left: position.left }}>
        {children}
      </ContextMenuDiv>
    </ContextMenuWrapper>,
    document.body
  );
};

const Header = ({ children }: ContextMenuHeaderProps) => {
  return <MenuHeader>{children}</MenuHeader>;
};

const Body = ({ children }: ContextMenuBodyProps) => {
  return <MenuBody>{children}</MenuBody>;
};

const Button = ({ children, onClick, buttonType }: ContextMenuButtonProps) => {
  const buttonClass = buttonType ? getButtonClass(buttonType) : "primaryButton";

  return (
    <MenuButton className={buttonClass} onClick={onClick}>
      {children}
    </MenuButton>
  );
};

const Title = ({ children }: ContextMenuTitleProps) => {
  return <MenuTitle>{children}</MenuTitle>;
};

const Subtitle = ({ children }: ContextMenuSubtitleProps) => {
  return <MenuSubtitle>{children}</MenuSubtitle>;
};

const Separator = () => {
  return <SeparatorElement></SeparatorElement>;
};

const Icon = ({ children }: ContextMenuIconProps) => {
  return <IconWrapper>{children}</IconWrapper>;
};

ContextMenu.Header = Header;
ContextMenu.Body = Body;
ContextMenu.Button = Button;
ContextMenu.Title = Title;
ContextMenu.Subtitle = Subtitle;
ContextMenu.Separator = Separator;
ContextMenu.Icon = Icon;
