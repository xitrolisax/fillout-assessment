import styled from "styled-components";
import { AddPageButton, NavigationButton } from "./buttons";
import { usePageNavigation } from "../../providers";
import { useCallback, useState } from "react";
import { Page } from "../../types";

const NavigationDiv = styled.div`
  height: 5vh;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ButtonSeparator = styled.div`
  height: 1px;
  width: 20px;
  border-top: 1px dashed #c0c0c0;
  transition: width 0.2s;
`;

const NavigationUnit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

export const Navigation = () => {
  const { allPages, setCurrentPage, currentPage, setAllPages } =
    usePageNavigation();
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const onDrop = useCallback(
    (pageId: Page["id"]) => {
      if (!draggedId || draggedId === pageId) return;

      const oldIndex = allPages.findIndex((p) => p.id === draggedId);
      const newIndex = allPages.findIndex((p) => p.id === pageId);

      const newPages = [...allPages];
      const [moved] = newPages.splice(oldIndex, 1);
      newPages.splice(newIndex, 0, moved);

      setAllPages(newPages);
      setDraggedId(null);
    },
    [allPages, draggedId, setAllPages]
  );

  return (
    <NavigationDiv>
      {allPages.map((page, index) => (
        <NavigationUnit key={index}>
          <NavigationButton
            isActive={currentPage?.id === page.id}
            page={page}
            selectPage={setCurrentPage}
            setDraggedId={setDraggedId}
            onDrop={onDrop}
          />

          <AddPageButton round newPageIndex={index + 1} />
          <ButtonSeparator />
        </NavigationUnit>
      ))}
      <AddPageButton newPageIndex={allPages.length + 1} />
    </NavigationDiv>
  );
};
