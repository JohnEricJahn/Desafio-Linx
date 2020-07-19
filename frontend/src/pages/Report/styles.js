import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Wrapper = styled.div`
  width: 1100px;
  height: 200px;
  background: #fff;

  border-radius: 10px;
`;
export const Filters = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

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
  }
`;
export const Reports = styled.div`
  margin-top: 50px;
  font-size: 18px;
  font-weight: 500;

  display: flex;
  justify-content: space-around;
`;
