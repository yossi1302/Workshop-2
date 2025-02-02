import React, { useState } from 'react';
import axios from 'axios';
import { Button, Text, TextInput, ScrollView } from 'react-native';

const Home = () => {
const [response, setResponse] = useState('Click the button to see AI magic!');
const [inputText, setInputText] = useState('');

const fetchData = async () => {
  try {
    setResponse('Loading...'); // Reset response to indicate loading
    const result = await axios({
      url: `https://api-inference.huggingface.co/models/openai-community/gpt2`,
      method: 'POST',
      headers: { 
        Authorization: 'Bearer ',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: { inputs: inputText }
    });
    //alert(result.status); // <<< Check the status code of your request. 200 means good.
    //alert(JSON.stringify(result)); // << Check how the result looks like.
    
    setResponse(result.data[0].generated_text); // << Extract the data from your API response accordingly.
    
  } catch (error) {
    setResponse('Error fetching data. ' + error);
  }
};

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>    
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Type your text here"
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Text className='bg-black' style={{ fontSize: 16 }}>{response}</Text>
      <Button className='bg-black' title="Generate Text" onPress={fetchData}>Generate Text</Button>
    </ScrollView>
  );
}

export default Home