import styled from 'styled-components';

export const Sidecontainer = styled.div`
  height: 100%;
  display: flex;
  left: 0;
  width: 12vw;
  min-width: 120px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  flex-direction: column;
`;
