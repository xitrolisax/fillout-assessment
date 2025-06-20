import { EndingIcon, InfoIcon, PageIcon } from "../../../assets";
import { PageType } from "../../../types";

type PageIconRendererProps = { pageType: PageType };

export const PageIconRenderer = ({ pageType }: PageIconRendererProps) => {
  switch (pageType) {
    case 1:
      return <EndingIcon />;
    case 2:
      return <InfoIcon />;
    default:
      return <PageIcon />;
  }
};
