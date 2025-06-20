import styled from "styled-components";
import { usePageNavigation } from "../../providers";
import { AddPageButton } from "../navigation/buttons";
import { getCurrentPage } from "./utils/getCurrentPage";
import { Page } from "../../types";

const PageDiv = styled.div`
  border-radius: 20px;
  height: calc(95vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const PageHolderDiv = styled(PageDiv)`
  background: #11213d;
`;

const Placeholder = styled(PageDiv)`
  background: rgb(237, 237, 237);
`;

const Text = styled.h1`
  font-weight: 700;
  color: rgb(123, 127, 136);
`;

const Wrapper = styled.div`
  padding: 20px 20px 0px 20px;
`;

export const PageHolder = () => {
  const { currentPage, allPages } = usePageNavigation();

  return (
    <Wrapper>
      {currentPage ? (
        <CurrentPage currentPage={currentPage} />
      ) : allPages.length > 0 ? (
        <NoSelectedPages />
      ) : (
        <NoPages />
      )}
    </Wrapper>
  );
};

type CurrentPageProps = { currentPage: Page };

const CurrentPage = ({ currentPage }: CurrentPageProps) => {
  return <PageHolderDiv>{getCurrentPage(currentPage)}</PageHolderDiv>;
};

const NoSelectedPages = () => {
  return (
    <Placeholder>
      <Text>No Selected Pages Yet</Text>
    </Placeholder>
  );
};

const NoPages = () => {
  return (
    <Placeholder>
      <Text>No Pages Yet</Text>
      <AddPageButton newPageIndex={0} />
    </Placeholder>
  );
};
