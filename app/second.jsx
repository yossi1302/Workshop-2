import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Text,
  TextInput,
  Button,
} from 'react-native';

import axios from 'axios';
// Remove TypeScript types
global.Buffer = require('buffer').Buffer;

async function query(QueryData) {
  try {
    const response = await axios({
      url: `https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4`,
      method: 'POST',
      headers: {
        Authorization: `Bearer hf_GoBosgWLoUouXqVPDvPNLIJyLcQFoqpfu`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: QueryData,
      responseType: 'arraybuffer',
    });

    const mimeType = response.headers['content-type'];
    const result = response.data;

    const base64data = Buffer.from(result, 'binary').toString('base64');
    const img = `data:${mimeType};base64,${base64data}`;

    return img;
  } catch (error) {
    console.error('Error making the request:', error);
    throw error;
  }
}

function Second() {
  const [inputText, setInputText] = useState('');
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const data = { inputs: inputText }; // Ensure inputText is defined
      const response = await query(data);

      // Handle the image response
      console.log('Image Response:', response);
      setLoading(false);
      setImageData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text fontSize="xl" mt={10}>
          Input your prompt in the field below.
        </Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Blackhole"
            value={inputText}
            onChangeText={setInputText}
          />
          <Button
            size="sm"
            mt={5}
            variant="outline"
            colorScheme="primary"
            title='submit'
            onPress={handleButtonClick}
          >
            Submit
          </Button>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          imageData && (
            <Image
              source={{ uri: `${imageData}` }}
              style={{ width: 300, height: 300 }}
            />
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#007BFF',
    padding: 10,
    backgroundColor: '#F0F8FF',
    borderRadius: 5,
  },
});

export default Second;