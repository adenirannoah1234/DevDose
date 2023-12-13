import { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  IconButton,
  StackDivider,
  Spacer,
  Button,
  Badge,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [remove, setRemove] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const allPost = async () => {
    try {
      const response = await fetch('https://mytaskz.onrender.com/tasks', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        // body: JSON.stringify({ title, description: content }),
      });

      if (!response.ok) {
        console.error(
          `Server error: ${response.status} - ${response.statusText}`
        );
        return;
      }
      const data = await response.json();
      console.log(data);
      setPosts(data.todos.reverse());
    } catch (error) {
      console.error('Error while trying to add post', error);
    }
  };

  useEffect(() => {
    allPost();
  }, []);

  const deleteTodo = async (postId) => {
    try {
      const response = await fetch(
        `https://mytaskz.onrender.com/tasks/${postId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          `Server error: ${response.status} - ${response.statusText}`
        );
        return;
      }

      // If deletion is successful, update the state to remove the deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error while trying to delete post', error);
    }
  };
  return (
    <VStack
      divider={<StackDivider />}
      borderColor="blue.400"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      maxW={{ base: '200vw', sm: '160vw', lg: '50vw', xl: '40vw' }}
      alignItems="stretch"
      // backgroundColor="#3498db "
    >
      <VStack>
        {/* Set 1 */}
        {posts &&
          posts.map((post) => (
            <HStack
              justifyContent="space-between"
              w="100%"
              maxW={{ base: '200vw' }}
            >
              <Text>{post.title}</Text>
              <Spacer />
              <Button>Edit</Button>
              <IconButton
                icon={<FaTrash />}
                isRound
                onClick={() => deleteTodo(`${post._id}`)}
              />
            </HStack>
          ))}
        {/* Set 2 */}
      </VStack>
    </VStack>
  );
};

export default AllPosts;
