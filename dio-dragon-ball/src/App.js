import React from 'react';
import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from '@rebass/preset';
import { Flex, Box, Text } from 'rebass';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Manager from './layout/Manager';
import FormCep from './components/FormCep/FormCep';

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box maxWidth='700px' margin='0 auto'>
          <Flex px={2} alignItems='center'>
            <Text p={2} fontWeight='bold'>
              Test demos
            </Text>
            <Box mx='auto' />
            <Link to='/dragon-ball-manager'>Dragon Ball Manager</Link>
            <Link to='/form-cep'>Address Form</Link>
          </Flex>
          <Switch>
            <Route path='/dragon-ball-manager'>
              <Manager />
            </Route>
            <Route path='/form-cep'>
              <FormCep />
            </Route>
          </Switch>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
