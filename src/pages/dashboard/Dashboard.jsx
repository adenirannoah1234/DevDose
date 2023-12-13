import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Center,
  VStack,
  Box,
} from '@chakra-ui/react';
import AllPosts from '../../components/tab2/AllPosts';
import AddPost from '../../components/tab1/AddPost';
import AccountSettings from '../../components/tab3/AccountSettings';

const Dashboard = () => {
  return (
    <Center>
      <VStack
        border="3px"
        borderColor="gray.200"
        p="4"
        borderRadius="md"
        backgroundColor="#d1d5db"
        mt="10"
        mb="10"
      >
        {/* <Box border="3px"> */}
        <Box
          borderWidth="3px"
          borderRadius="md"
          p="4"
          width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        >
          <Tabs>
            <h2 alignSelf="flex-start">Dashboard</h2>
            <TabList>
              <Tab>Add a Post</Tab>
              <Tab>All Posts</Tab>
              <Tab>Account Settings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <AddPost />
              </TabPanel>
              <TabPanel>
                <AllPosts />
              </TabPanel>
              <TabPanel>
                <AccountSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {/* </Box> */}
      </VStack>
    </Center>
  );
};

export default Dashboard;
