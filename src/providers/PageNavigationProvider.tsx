import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Page } from "../types";
import styled from "styled-components";

const PageNavigationWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

type PageNavigationContextType = {
  currentPage: Page | undefined;
  setCurrentPage: (page: Page | undefined) => void;
  allPages: Page[];
  addNewPage: (page: Page, newPageIndex?: number) => void;
  deletePage: (page: Page) => void;
  editPage: (page: Page) => void;
  setAsFirstPage: (page: Page) => void;
  duplicatePage: (page: Page) => void;
  setAllPages: (pages: Page[]) => void;
};

const PageNavigationContext = createContext<
  PageNavigationContextType | undefined
>(undefined);

type PageNavigationProviderProps = {
  children: ReactNode;
};

export const PageNavigationProvider: React.FC<PageNavigationProviderProps> = ({
  children,
}) => {
  const [allPages, setAllPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | undefined>();

  const addNewPage = useCallback(
    (page: Page, newPageIndex?: number) => {
      let allPagesArray: Page[] = [];
      if (newPageIndex) {
        const pagesBeforeNewIndex = allPages.slice(0, newPageIndex);
        const pagesAfterNewIndex = allPages.slice(newPageIndex);
        allPagesArray = [...pagesBeforeNewIndex, page, ...pagesAfterNewIndex];
      } else {
        allPagesArray = [...allPages, page];
      }

      setAllPages(allPagesArray);
    },
    [allPages]
  );

  const deletePage = useCallback(
    (page: Page) => {
      if (page.id === currentPage?.id) {
        setCurrentPage(undefined);
      }
      const pagesArray = allPages.filter(({ id }) => page.id !== id);
      setAllPages(pagesArray);
    },
    [allPages]
  );

  const editPage = useCallback(
    (page: Page) => {
      const pagesArray = allPages.map((existingPage) => {
        if (page.id === existingPage.id) {
          return page;
        }
        return existingPage;
      });

      setAllPages(pagesArray);
    },
    [allPages]
  );

  const setAsFirstPage = useCallback(
    (page: Page) => {
      const pagesArray = allPages.filter(({ id }) => page.id !== id);
      setAllPages([page, ...pagesArray]);
    },
    [allPages]
  );

  const duplicatePage = useCallback((page: Page) => {
    const name = `${page.name} Copy`;
    const newPage = {
      ...page,
      name,
      id: `page-${page.pageType}-${name}`,
    };

    setAllPages((allPages) => [...allPages, newPage]);
  }, []);

  return (
    <PageNavigationContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        allPages,
        addNewPage,
        deletePage,
        editPage,
        setAsFirstPage,
        duplicatePage,
        setAllPages,
      }}
    >
      <PageNavigationWrapper>{children}</PageNavigationWrapper>
    </PageNavigationContext.Provider>
  );
};

export const usePageNavigation = (): PageNavigationContextType => {
  const context = useContext(PageNavigationContext);

  if (!context) {
    throw new Error(
      "usePagePageNavigation must be used within a PageNavigationProvider"
    );
  }

  return context;
};
