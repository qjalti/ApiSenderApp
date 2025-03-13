import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function App() {
  const [temperature, setTemperature] = useState({
    temperature: '-.--°C',
    timestamp: moment()
  });

  const sendData = async () => {

    try {
      const response = await axios.post('https://qjalti.ru/api/arduino/select/');

      const LAST_TEMPERATURE = response['data']['data'][0]['temperature'] +
        '°C';
      const LT_TIME = response['data']['data'][0]['timestamp'];

      setTemperature({
        temperature: LAST_TEMPERATURE,
        timestamp: LT_TIME
      });

      if (!response.data.ok) {
        setTemperature({
          temperature: 'Непредвиденная ошибка',
          timestamp: moment()
        });
      }
    } catch (error) {
      setTemperature({
        temperature: 'Непредвиденная ошибка',
        timestamp: moment()
      });
    }
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
      backgroundColor: '#121212',
    }}>
      <Text
        style={{
          fontSize: 32,
          marginBottom: 20,
          color: '#f5f5f5',
        }}
      >
        {temperature.temperature}
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
          color: '#f5f5f5',
        }}
      >
        {
          moment(temperature.timestamp).fromNow()
        }
      </Text>

      <Button
        title={'Обновить'}
        onPress={sendData}
      />
    </View>
  );
}