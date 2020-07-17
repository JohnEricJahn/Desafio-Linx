import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;

  form {
    width: 500px;
    height: 50%;
    background: #fff;
    padding: 10px 30px;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 10px;

    label {
      font-weight: 500;
      margin-top: 20px;
    }
  }

  button {
    width: 140px;
    height: 40px;
    margin-top: 30px;
    background: #ff9000;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    transition: background 0.4s;
    cursor: pointer;

    &:hover {
      background: ${darken(0.1, '#ff9000')};
    }
  }
`;
