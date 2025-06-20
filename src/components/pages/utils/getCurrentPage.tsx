import { Page, PageType } from "../../../types";
import { Details } from "../Details";
import { Ending } from "../Ending";
import { Info } from "../Info";
import { Other } from "../Other";

export const getCurrentPage = (currentPage: Page) => {
  switch (currentPage.pageType) {
    case PageType.Details:
      return <Details pageName={currentPage.name} />;
    case PageType.Ending:
      return <Ending pageName={currentPage.name} />;
    case PageType.Info:
      return <Info pageName={currentPage.name} />;
    case PageType.Other:
      return <Other pageName={currentPage.name} />;
  }
};
