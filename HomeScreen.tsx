import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWeather } from './context/weather';
import { citiesArray } from './config';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();

    const { fetchWeatherByCityName, data } = useWeather();
    const [city, setCity] = useState<string>('');
    const [filteredCities, setFilteredCities] = useState<string[]>([]);
    const [isFlatListVisible, setIsFlatListVisible] = useState<boolean>(false);

    const handleSearch = async () => {
        if (!city) {
            alert('Please enter a city name');
            return;
        }
        await fetchWeatherByCityName(city);
        navigation.navigate('Weather', { city: city });
    };

    const handleCityChange = (text: string) => {
        setCity(text);
        if (text) {
            const filteredCities = citiesArray.filter((item) =>
                item.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredCities(filteredCities);
            setIsFlatListVisible(true);
        } else {
            setFilteredCities([]);
            setIsFlatListVisible(false);
        }
    };

    const handleSelectCity = (selectedCity: string) => {
        setCity(selectedCity);
        setIsFlatListVisible(false); // Hide the FlatList after selection
    };

    const renderCityItem = ({ item }: { item: string }) => (
        <TouchableOpacity onPress={() => handleSelectCity(item)}>
            <Text style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Weather Forecast</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter city name"
                    placeholderTextColor="#ccc"
                    onChangeText={handleCityChange}
                    value={city}
                />
                {isFlatListVisible && (
                    <FlatList
                        data={filteredCities}
                        renderItem={renderCityItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.flatList}
                    />
                )}
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Check weather</Text>
                </TouchableOpacity>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        width: '80%',
        borderRadius: 8,
        backgroundColor: '#fff',
        color: '#333',
        fontSize: 16,
    },
    flatList: {
        width: '80%',
        maxHeight: 200,
        marginTop: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
