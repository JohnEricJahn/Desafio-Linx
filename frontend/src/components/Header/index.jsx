import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Menu, Logo } from './styles';

import logo from '../../assets/logo.png';

function Header() {
  return (
    <Container>
      <Logo src={logo} />

      <Menu>
        <Link to="/">LISTAGEM</Link>
        <Link to="/create">CRIAR CIDADE</Link>
        <Link to="/import">IMPORTAR</Link>
        <Link to="/report">RELATÓRIOS</Link>
      </Menu>
    </Container>
  );
}

export default Header;
