import styled from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  height: 35px;

  background: #f0f0f5;

  display: flex;
  padding: 8px 0;

  border-radius: 10px;

  border: 2px solid #f0f0f5;
  border-color: ${props => (props.isErrored ? '#c53030' : '#f0f0f5')};

  input {
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 16px;
    color: #6c6c80;
    background: transparent;
  }
`;
export const Error = styled(Tooltip)`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`;
