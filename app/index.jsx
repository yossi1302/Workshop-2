import React, { useState } from 'react';
import axios from 'axios';
import { Button, Text } from 'react-native';

const Home = () => {
const [response, setResponse] = useState('Click the button to see AI magic!');

const fetchData = async () => {
  try {
    const result = await axios({
      url: `https://api-inference.huggingface.co/models/openai-community/gpt2`,
      method: 'POST',
      headers: { 
        Authorization: 'Bearer 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',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {inputs: 'Once upon a time'}
    });
    //alert(result.status); // <<< Check the status code of your request. 200 means good.
    //alert(JSON.stringify(result)); // << Check how the result looks like.
    
    setResponse(result.data[0].generated_text); // << Extract the data from your API response accordingly.
    
  } catch (error) {
    setResponse('Error fetching data. ' + error);
  }
};

  return (
    <>    
      <Text className='bg-black' style={{ fontSize: 16}}>{response}</Text>
      <Button className='bg-black' title="Generate Text" onPress={fetchData}>Generate Text</Button>
    </>
  );
}

export default Home