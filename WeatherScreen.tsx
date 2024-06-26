import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { useWeather } from './context/weather';

interface WeatherScreenProps {
  route: {
    params: {
      city: string;
      temperature: number;
      weather: string;
    };
  };
}



function kelvinToCelsius(kelvin: number) {
  const celsius = kelvin - 273.15;
  return celsius.toFixed(2);
}

const WeatherScreen: React.FC<WeatherScreenProps> = ({ route }) => {
  const { city } = route.params;
  const { data } = useWeather();

 
  const renderWeatherIcon = () => {
    switch (data?.weather?.[0]?.main?.toLowerCase()) {
      case 'clouds':
        return <Image source={require('./assets/clouds.jpg')} style={styles.weatherIcon} />;
      case 'rain':
        return <Image source={require('./assets/rain.jpg')} style={styles.weatherIcon} />;
      case 'clear':
      case 'sunny':
        return <Image source={require('./assets/sunny.jpg')} style={styles.weatherIcon} />;
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Weather in {city}</Text>
          <View style={styles.weatherContainer}>
            <Text style={styles.temperature}>
              {kelvinToCelsius(data?.main?.temp)}°C
            </Text>
            <Text style={styles.weatherDescription}>
              {data?.weather?.[0]?.description}
            </Text>
            {renderWeatherIcon()}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  weatherContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'capitalize',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default WeatherScreen;
