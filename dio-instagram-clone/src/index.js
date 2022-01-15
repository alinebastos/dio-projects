import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

const App = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
    <Routes />
  </>
);

export default App;
