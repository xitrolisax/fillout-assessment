import {
  CopyIcon,
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  SetAsFirstIcon,
} from "../../../assets";
import { usePageNavigation } from "../../../providers";
import { ButtonType, Page } from "../../../types";
import { ContextMenu } from "./ContextMenu";

type EditPageContextMenuProps = {
  hidePageContextMenu: () => void;
  parentRef: HTMLDivElement | HTMLButtonElement | null;
  page: Page;
};

export const EditPageContextMenu = ({
  hidePageContextMenu,
  parentRef,
  page,
}: EditPageContextMenuProps) => {
  const { setAsFirstPage, duplicatePage, deletePage } = usePageNavigation();

  return (
    <ContextMenu
      hideContextMenu={hidePageContextMenu}
      parentElement={parentRef}
    >
      <ContextMenu.Header>Settings</ContextMenu.Header>
      <ContextMenu.Body>
        <ContextMenu.Button onClick={() => setAsFirstPage(page)}>
          <ContextMenu.Icon>
            <SetAsFirstIcon />
          </ContextMenu.Icon>
          <ContextMenu.Title>Set as first page</ContextMenu.Title>
        </ContextMenu.Button>
        <ContextMenu.Button onClick={() => alert("We like this name!")}>
          <ContextMenu.Icon>
            <EditIcon />
          </ContextMenu.Icon>
          <ContextMenu.Title>Rename</ContextMenu.Title>
        </ContextMenu.Button>
        <ContextMenu.Button
          onClick={() => alert("Something has to be copied!")}
        >
          <ContextMenu.Icon>
            <CopyIcon />
          </ContextMenu.Icon>
          <ContextMenu.Title>Copy</ContextMenu.Title>
        </ContextMenu.Button>
        <ContextMenu.Button onClick={() => duplicatePage(page)}>
          <ContextMenu.Icon>
            <DuplicateIcon />
          </ContextMenu.Icon>
          <ContextMenu.Title>Duplicate</ContextMenu.Title>
        </ContextMenu.Button>
        <ContextMenu.Separator />
        <ContextMenu.Button
          onClick={() => deletePage(page)}
          buttonType={ButtonType.Delete}
        >
          <ContextMenu.Icon>
            <DeleteIcon />
          </ContextMenu.Icon>
          <ContextMenu.Title>Delete</ContextMenu.Title>
        </ContextMenu.Button>
      </ContextMenu.Body>
    </ContextMenu>
  );
};
