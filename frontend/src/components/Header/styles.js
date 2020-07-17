import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100px;
  background: #fff;
  padding: 0 200px;
`;
export const Menu = styled.nav`
  > a {
    text-decoration: none;
    color: #411e5a;
    font-size: 20px;
    margin-right: 50px;
    font-weight: 500;

    padding-bottom: 10px;
    transition: color 0.3s;

    cursor: pointer;

    &:hover {
      color: #000;
      border-bottom: 2px solid #ff8c00;
    }
  }
`;
export const Logo = styled.img`
  width: 150px;
`;
