import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/unauth_screens/Login';
import HomeScreen from './screens/auth_screens/Home';
import { useSelector } from 'react-redux';

const AuthStack = createStackNavigator();
const UnauthStack = createStackNavigator();

const AuthenticatedStack = () => (
    <AuthStack.Navigator initialRouteName="Home">
        <AuthStack.Screen name="Home" component={HomeScreen} />
    </AuthStack.Navigator>
);

const UnauthenticatedStack = () => (
    <UnauthStack.Navigator initialRouteName="Login">
        <UnauthStack.Screen name="Login" component={LoginScreen} />
    </UnauthStack.Navigator>
);

const AppNavigator = () => {
    const { token } = useSelector((state) => state.auth);
    return token ? <AuthenticatedStack /> : <UnauthenticatedStack />;
};
export default AppNavigator;
