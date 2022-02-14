import styled from 'styled-components';

/* COLOR PALETTES
#50514F Davys Grey
#B4ADEA Maximum Blue Purple
#FDFFF7 Baby Powder
#59FFA0 Medium Spring Green
#FFED65 Corn
*/

export const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;

  background: #50514F;
  background: linear-gradient(to left, #B4ADEA, #50514F);

  color: #FDFFF7;
`;

export const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;

  background: #50514F;
  background: linear-gradient(to left, #B4ADEA, #50514F);
`;