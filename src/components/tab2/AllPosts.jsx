import { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  IconButton,
  StackDivider,
  Spacer,
  Button,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Badge,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editedTodo, setEditedTodo] = useState({ id: null, title: '' });
  const [isEditing, setIsEditing] = useState(false);
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

  const openEditModal = (postId, title, content) => {
    setEditedTodo({
      id: postId,
      title: title,
      content: content,
    });
    setIsEditing(true);
  };

  const closeEditModal = () => {
    console.log('Closing modal...');

    setIsEditing(false);
    setEditedTodo({ id: null, title: '', content: '' });
  };

  const editTodo = async () => {
    try {
      console.log('Editing post:', editedTodo);

      const response = await fetch(
        `https://mytaskz.onrender.com/tasks/${editedTodo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            title: editedTodo.title,
            description: editedTodo.content,
          }),
        }
      );
      if (!response.ok) {
        console.error(
          `Server error: ${response.status} - ${response.statusText}`
        );
        return;
      }
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === editedTodo.id
            ? {
                ...post,
                title: editedTodo.title,
                description: editedTodo.content,
              }
            : post
        )
      );

      closeEditModal();
    } catch (error) {
      console.error('Error while trying to edit post');
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
              {isEditing && editedTodo.id === post._id ? (
                // If currently editing this todo, show the input fields in the modal
                <Modal isOpen={isEditing} onClose={closeEditModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                          type="text"
                          value={editedTodo.title}
                          onChange={(e) =>
                            setEditedTodo({
                              ...editedTodo,
                              title: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Content</FormLabel>
                        <Textarea
                          value={editedTodo.content}
                          onChange={(e) =>
                            setEditedTodo({
                              ...editedTodo,
                              content: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={editTodo}>
                        Save
                      </Button>
                      <Button variant="ghost" onClick={closeEditModal}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              ) : (
                // Otherwise, show the todo title
                <Text>{post.title}</Text>
              )}
              <Spacer />
              <Button
                onClick={() =>
                  openEditModal(post._id, post.title, post.content)
                }
              >
                Edit
              </Button>
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
