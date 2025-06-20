import styled from "styled-components";

const InfoPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 40px;
  color: #f59d0e;
`;

type InfoProps = { pageName: string };

export const Info = ({ pageName }: InfoProps) => {
  return (
    <InfoPage>
      <Title>This is an info page named {pageName}</Title>
    </InfoPage>
  );
};
