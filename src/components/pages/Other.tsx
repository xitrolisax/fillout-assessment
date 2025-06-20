import styled from "styled-components";

const OtherPage = styled.div`
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

type OtherProps = { pageName: string };

export const Other = ({ pageName }: OtherProps) => {
  return (
    <OtherPage>
      <Title>This is an other page named {pageName}</Title>
    </OtherPage>
  );
};
