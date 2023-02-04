import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const AuthBox = styled.div`
  margin: auto;
  text-align: center;
  max-width: 400px; 
  border-radius: 5px;
  background: ${(props) => props.theme.colors.WHITE_100};
  padding: 10px 0 30px 0;

  & p {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.GREY};
    margin-bottom: 5px;
  }
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  margin-bottom: 20px;
`;

export const InputTitle = styled.label`
  text-align: left;
  max-width: 400px;
  margin-top: 10px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  margin: 10px auto;
  border: 1px solid ${(props) => props.theme.colors.BLUE_100};
  border-radius: 5px;
  padding: 0 10px;
`;

export const Navigate = styled(Link)`
color:  ${(props) => props.theme.colors.BLUE_200}
`;