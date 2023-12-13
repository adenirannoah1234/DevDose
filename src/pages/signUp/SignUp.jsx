import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast, Center, Button } from '@chakra-ui/react';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sign, setSign] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  function handleUserSignUp(e) {
    e.preventDefault();
    console.log('Form submitted');

    if (!email || !password || !userName || !confirmPassword) {
      toast({
        title: 'Please fill in the fields.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      return;
    } else {
      SignUp();
    }
  }

  const SignUp = async () => {
    try {
      const response = await fetch('https://mytaskz.onrender.com/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, username: userName }),
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
      console.error('Error fetching recommende movies', error);
    }
  };

  useEffect(() => {
    SignUp();
  }, []);

  return (
    <form className="signup" onSubmit={handleUserSignUp}>
      <div className="password">
        <label htmlFor="Email">Email:</label>
        <input
          type="Email"
          id="Email"
          name="Email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="password">
        <label htmlFor="password">Username:</label>
        <input
          type="text"
          id="text"
          name="text"
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="password">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="password">
        <label htmlFor="password">ConfirmPassword:</label>
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          placeholder="confirmpassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          type="submit"
          style={{
            color: 'white',
            backgroundColor: 'pink',
            padding: '10px 20px',
            marginTop: '20PX',
          }}
        >
          Submit
        </button>
      </div>
      <div className="option">
        <p>Already have an account?</p>
        <Link style={{ color: 'purple' }} to="/SignIn">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
