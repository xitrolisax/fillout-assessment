import { PageType } from "../../../types";
import { ContextMenu } from "./ContextMenu";

type AddPageContextMenuProps = {
  showAddNewPageModal: (pageType: PageType, pageIndex: number) => void;
  closeContextMenu: () => void;
  parentRef: HTMLDivElement | null;
  newPageIndex: number;
};

export const AddPageContextMenu = ({
  showAddNewPageModal,
  closeContextMenu,
  parentRef,
  newPageIndex,
}: AddPageContextMenuProps) => {
  return (
    <ContextMenu hideContextMenu={closeContextMenu} parentElement={parentRef}>
      <ContextMenu.Header>Choose a page type</ContextMenu.Header>
      <ContextMenu.Body>
        {menuLinks.map((link, index) => (
          <ContextMenu.Button
            key={index}
            onClick={() => showAddNewPageModal(link.pageType, newPageIndex)}
          >
            <ContextMenu.Title>{link.title}</ContextMenu.Title>
            <ContextMenu.Subtitle>{link.subtitle}</ContextMenu.Subtitle>
          </ContextMenu.Button>
        ))}
      </ContextMenu.Body>
    </ContextMenu>
  );
};

const menuLinks = [
  {
    title: "Details",
    subtitle: "Page to collect user details",
    pageType: PageType.Details,
  },
  {
    title: "Info",
    subtitle: "Page to collect user information",
    pageType: PageType.Info,
  },
  {
    title: "Ending",
    subtitle: "Show a thank you page or redirect users",
    pageType: PageType.Ending,
  },
  {
    title: "Other",
    subtitle: "Page to collect information",
    pageType: PageType.Other,
  },
];
