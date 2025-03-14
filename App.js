import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Modal
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function App() {
  const [temperature, setTemperature] = useState({
    temperature: '-.--°C',
    timestamp: moment(),
  });

  const [isLoading, setIsLoading] = useState(false); // Состояние для индикатора загрузки

  // Функция получения данных
  const getData = async () => {
    setIsLoading(true); // Показываем индикатор загрузки

    try {
      const response = await axios.post('https://qjalti.ru/api/arduino/select/');
      const LAST_TEMPERATURE = response['data']['data'][0]['temperature'] + '°C';
      const LT_TIME = response['data']['data'][0]['timestamp'];

      setTemperature({
        temperature: LAST_TEMPERATURE,
        timestamp: LT_TIME,
      });

      if (!response.data.ok) {
        setTemperature({
          temperature: 'Непредвиденная ошибка',
          timestamp: moment(),
        });
      }
    } catch (error) {
      setTemperature({
        temperature: 'Непредвиденная ошибка',
        timestamp: moment(),
      });
    } finally {
      setIsLoading(false); // Скрываем индикатор загрузки после завершения
    }
  };

  // Вызов функции getData при загрузке приложения
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Основной контент */}
      <View style={styles.content}>
        <Text style={styles.temperature}>{temperature.temperature}</Text>
        <Text style={styles.timestamp}>
          {moment(temperature.timestamp).fromNow()}
        </Text>

        <Button title={'Обновить'} onPress={getData}/>
      </View>

      {/* Индикатор загрузки с backdrop */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 32,
    marginBottom: 20,
    color: '#f5f5f5',
  },
  timestamp: {
    fontSize: 16,
    marginBottom: 20,
    color: '#f5f5f5',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // Полностью покрывает экран
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Прозрачный чёрный фон
    justifyContent: 'center',
    alignItems: 'center',
  },
});