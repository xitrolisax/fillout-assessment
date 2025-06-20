import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Modal } from "./components";
import { PageType } from "../types";

type ModalContextType = {
  toggleModal: () => void;
  showModal: (pageType: PageType, pageIndex: number) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
}: ModalProviderProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [newPageType, setNewPageType] = useState<PageType | undefined>();
  const [newPageIndex, setNewPageIndex] = useState<number | undefined>();

  const toggleModal = useCallback(() => {
    setIsModalOpened(!isModalOpened);
  }, [isModalOpened]);

  const showModal = useCallback((pageType: PageType, pageIndex: number) => {
    setIsModalOpened(true);
    setNewPageType(pageType);
    setNewPageIndex(pageIndex);
  }, []);

  return (
    <ModalContext.Provider value={{ toggleModal, showModal }}>
      {children}
      {isModalOpened && newPageType !== undefined && (
        <Modal
          toggleModal={toggleModal}
          newPageType={newPageType}
          newPageIndex={newPageIndex}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "usePageNavigation must be used within a NavigationProvider"
    );
  }

  return context;
};
