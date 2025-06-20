import { PageType } from "../../../types";

export const getPageType = (pageType: PageType | undefined) => {
  switch (pageType) {
    case 0:
      return "details";
    case 1:
      return "ending";
    case 2:
      return "info";
    case 3:
      return "other";
    default:
      return "n/a";
  }
};
