import styled from "styled-components";

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #59FFA0;
  padding: 5px;
  cursor: pointer;

  transition: all 0.1s ease-in;

  &:hover {
    background: #59FFA0;
    color: #FDFFF7;
  }
`;

export const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

export const StyledButtonLarge = styled(StyledButton)`
  padding: 8px;
`;