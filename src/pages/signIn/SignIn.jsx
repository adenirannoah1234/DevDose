import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast, Center, Button } from '@chakra-ui/react';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [sign, setSign] = useState('');
  // const user = JSON.parse(localStorage.getItem('user'));
  const toast = useToast();
  const navigate = useNavigate();

  function handleUserLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Please fill in the fields.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } else {
      Login();
    }
  }

  const Login = async () => {
    try {
      const response = await fetch('https://mytaskz.onrender.com/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        sign(data.message);
      }
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/Dashboard');
      }
    } catch (error) {
      console.error('Error while trying to log in', error);
    }
  };

  // useEffect(() => {
  //   Login();
  // }, []);

  return (
    <div className="logs" style={{ paddingTop: '100px' }}>
      <form className="log-in" onSubmit={handleUserLogin}>
        <div className="mail">
          <label htmlFor="Email">Email:</label>
          <input
            type="Email"
            id="Email"
            name="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="pass">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              color: 'white',
              backgroundColor: 'blue',
              padding: '10px 20px',
              marginTop: '20PX',
            }}
          >
            Submit
          </button>
        </div>

        <div className="option">
          <p>Don't have an account?</p>
          <Link style={{ color: 'purple' }} to="/SignUp">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
