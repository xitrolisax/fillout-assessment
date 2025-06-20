import { ButtonType } from "../../../../types";

export const getButtonClass = (ButtonType: ButtonType) => {
  switch (ButtonType) {
    case 1:
      return "deleteButton";
    default:
      return "primaryButton";
  }
};
