import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './app/navigation/index';
import { SafeAreaView } from 'react-native-safe-area-context';




const Stack = createStackNavigator();

const App = () => {
  

  return(
    <SafeAreaView style={styles.background}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
  },
})

export default App;