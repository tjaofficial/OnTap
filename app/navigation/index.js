import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen, SignInScreen, NewPasswordScreen, ResetPasswordScreen, ConfirmEmailScreen } from '../screens/AuthFolder';
import { AddTeam } from '../screens/EventsFolder/events';
import OnTapProScreen from '../screens/OnTapProScreen';
import Tabs from './tabs';
import WelcomeScreen from '../screens/WelcomeScreen';

import Amplify from 'aws-amplify';
import config from '../aws-exports';


Amplify.configure(config);
//Auth.configure(config);

const Stack = createStackNavigator();

const Navigation = () => {
    
  /*const [user, setUser] = useState(undefined);
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  if (user === undefined) {
    return (
      <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }*/
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeStack">
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown: false,}}/>
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{headerShown: false,}}/>
        <Stack.Screen name='SignInScreen' component={SignInScreen} options={{headerShown: false,}}/>
        <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} options={{headerShown: false,}} />
        <Stack.Screen name='ConfirmEmailScreen' component={ConfirmEmailScreen} options={{headerShown: false,}} />
        <Stack.Screen name='NewPasswordScreen' component={NewPasswordScreen} options={{headerShown: false,}} />

        <Stack.Screen name='AddTeam' component={AddTeam} options={{headerShown: false,}} />
        <Stack.Screen name='OnTapProScreen' component={OnTapProScreen} options={{headerShown: false,}} />

        <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;