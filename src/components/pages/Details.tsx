import styled from "styled-components";

const DetailsPage = styled.div`
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

type DetailsProps = { pageName: string };

export const Details = ({ pageName }: DetailsProps) => {
  return (
    <DetailsPage>
      <Title>This is a details page named "{pageName}"</Title>
    </DetailsPage>
  );
};
