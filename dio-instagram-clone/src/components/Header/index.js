import React from 'react';
import { Image } from 'react-native';

import Logo from '../../assets/logo.png';

import { Container } from './styles';

const Header = () => {
  return (
    <Container>
      <Image source={Logo} />
    </Container>
  );
};

export default Header;
