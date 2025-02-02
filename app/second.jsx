import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const fetchImage = async () => {
    try {
      console.log("Sending request with prompt:", prompt);
      const response = await axios({
        url: `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell`,
        method: 'POST',
        headers: { 
          Authorization: 'Bearer ',
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        responseType: "blob",
        data: {inputs: prompt}
      });

      console.log("API response:", response);

      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image URI set");
        setImageUri(reader.result);
      };
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.error("Error generating image:", error);
      Alert.alert("Error", "Failed to generate image. Check API key & network.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your prompt"
        value={prompt}
        onChangeText={setPrompt}
        style={styles.input}
      />
      <Button title="Generate Image" onPress={fetchImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
