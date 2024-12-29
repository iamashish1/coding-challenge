import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Provider, useDispatch } from 'react-redux';
import store from './redux/ReduxStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, logout } from './redux/AuthSlice';
import AppNavigator from './AppNavigator';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          dispatch(loginSuccess({ token: token }));
        }
      } catch (error) {
        dispatch(logout());
      }
    };

    checkAuthState();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function MainApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
