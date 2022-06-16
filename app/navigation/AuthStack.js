import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';


const AuthNav = createStackNavigator();

const PasswordStack = createStackNavigator();
const PasswordStackScreen = () => (
    <PasswordStack.Navigator initialRouteName='ResetPasswordScreen'>
        <PasswordStack.Screen name='ResetPassword' component={ResetPasswordScreen} options={{headerShown: false,}} />
    </PasswordStack.Navigator>
)

const SignInStack = createStackNavigator();
const SignInStackScreen = () => (
    <SignInStack.Navigator>
        <SignInStack.Screen name='SignIn' component={SignInScreen} options={{headerShown: false,}} />
        <SignInStack.Screen name='SignUp' component={SignUpScreen} options={{headerShown: false,}} />
    </SignInStack.Navigator>
)

function AuthStack() {
    return(
        <AuthNav.Navigator initialRouteName="WelcomeScreen">
            <AuthNav.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown: false,}}/>
            <AuthNav.Screen name='SignUpScreen' component={SignUpScreen} options={{headerShown: false,}}/>
            <AuthNav.Screen name='SignInScreen' component={SignInScreen} options={{headerShown: false,}}/>
            <AuthNav.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} options={{headerShown: false,}} />
            <AuthNav.Screen name='ConfirmEmailScreen' component={ConfirmEmailScreen} options={{headerShown: false,}} />
            <AuthNav.Screen name='NewPasswordScreen' component={NewPasswordScreen} options={{headerShown: false,}} />
        </AuthNav.Navigator>
    );
}

export default AuthStack;