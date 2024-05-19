import styled from 'styled-components';

export const EmailDiv = styled.div`
  top: 50%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  @media (max-width: 800px) {
    min-width: 80%;
  }
`;
