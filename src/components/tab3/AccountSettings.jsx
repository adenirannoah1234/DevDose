import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react';

const AccountSettings = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // const user = JSON.parse(localStorage.getItem('user'));
  const toast = useToast();

  function handleUserSettings(e) {
    e.preventDefault();
    console.log('Handling user settings...');
    console.log('Email:', email);
    console.log('Username:', userName);
    console.log('Password:', password);
    console.log('New Password:', newPassword);

    if (!email || !password || !userName || !newPassword) {
      toast({
        title: 'Please fill in the fields.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
        zIndex: 9999,
      });
      return;
    }
  }

  return (
    <Stack>
      <form onSubmit={handleUserSettings}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            borderColor="blue.400"
            borderWidth="2px"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            borderColor="blue.400"
            borderWidth="2px"
            onChange={(e) => setUserName(e.target.value)}
          />
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            borderColor="blue.400"
            borderWidth="2px"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormLabel>New Password</FormLabel>
          <Input
            placeholder="password"
            borderColor="blue.400"
            borderWidth="2px"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button type="submit" colorScheme="blue" mt="6" w="93%">
            Button
          </Button>
        </FormControl>
      </form>
    </Stack>
  );
};

export default AccountSettings;
