import { useState, useEffect } from 'react';
import Blogs from '../../components/blogs/Blogs';
import Dashboard from '../dashboard/Dashboard';
import { useAccordion } from '@chakra-ui/react';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const currentDate = new Date();
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = currentDate.toLocaleString('en-US', options);

  const getBlogs = async () => {
    try {
      const response = await fetch('https://mytaskz.onrender.com/');
      const data = await response.json();
      setBlogs(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching recommende movies', error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <header className="blogs">
        <h2>Blogs</h2>
        <h3>{formattedDate}</h3>
      </header>
      {blogs && <Blogs blogs={blogs} />}
      {/* <Dashboard /> */}
    </>
  );
};

export default Home;
