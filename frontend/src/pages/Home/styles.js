import styled from 'styled-components';
import { darken } from 'polished';
import { FiXSquare } from 'react-icons/fi';

export const Container = styled.main`
  width: 100%;
  height: 100%;
`;
export const Filters = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  padding: 50px 0;

  .field {
    & {
      margin-right: 40px;
    }

    select {
      margin-left: 5px;
      background: #f0f0f5;
      border-radius: 5px;
      padding: 10px 5px;
      font-size: 16px;
      color: #6c6c80;
    }

    input {
      margin-left: 5px;
      background: #f0f0f5;
      border-radius: 5px;
      padding: 10px 5px;
      font-size: 16px;
      color: #6c6c80;
    }
  }

  button {
    margin-left: 30px;
    width: 140px;
    height: 40px;
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
export const TableContainer = styled.section`
  margin-top: 20px;

  table {
    width: 100%;
    border-spacing: 0 8px;
    text-align: center;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 7px 15px;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 10px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #000;
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
export const DeleteIcon = styled(FiXSquare)`
  width: 25px;
  height: 25px;

  color: red;
  cursor: pointer;
`;
