import { useState } from 'react';
import { Stack, Input, Textarea, Button } from '@chakra-ui/react';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const addPost = async () => {
    console.log(JSON.stringify({ title, description: content }));
    try {
      const response = await fetch('https://mytaskz.onrender.com/add-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, description: content }),
      });

      if (!response.ok) {
        console.error(
          `Server error: ${response.status} - ${response.statusText}`
        );
        return;
      }
      setTitle('');
      setContent('');

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error while trying to add post', error);
    }
  };

  const handleAddClick = () => {
    addPost();
  };

  return (
    <Stack>
      <Input
        placeholder="add title"
        borderColor="blue.400"
        borderWidth="2px"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="create a post"
        h="200px"
        borderColor="blue.400"
        borderWidth="2px"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleAddClick}>
        Button
      </Button>
    </Stack>
  );
};

export default AddPost;
