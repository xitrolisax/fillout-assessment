import { Page, PageType } from "../../types";

type GetNewPageObjectProps = {
  newPageName: string;
  newPageType: PageType;
};

export const getNewPageObject = ({
  newPageName,
  newPageType,
}: GetNewPageObjectProps): Page => {
  const newPage = {
    id: `page-${newPageType}-${newPageName}`,
    name: newPageName,
    pageType: newPageType,
  };

  return newPage;
};
