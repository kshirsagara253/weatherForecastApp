import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WeatherScreen from './WeatherScreen';
import { WeatherContext } from './context/weather';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <WeatherContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Weather Forecast' }} />
          <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'Weather Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherContext>
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
