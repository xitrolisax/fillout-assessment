export enum PageType {
  Details,
  Ending,
  Info,
  Other,
}

export type Page = {
  name: string;
  pageType: PageType;
  id: string;
};

export enum ButtonType {
  Primary,
  Delete,
}
