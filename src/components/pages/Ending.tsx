import styled from "styled-components";

const EndingPage = styled.div`
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

type EndingProps = { pageName: string };

export const Ending = ({ pageName }: EndingProps) => {
  return (
    <EndingPage>
      <Title>This is an ending page named "{pageName}"</Title>
    </EndingPage>
  );
};
