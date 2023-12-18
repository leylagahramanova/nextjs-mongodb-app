// /components/Login.js
import { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ handleLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(password);
  };

  return (
    <div className="w3-black">
      <div className="sector">
        <motion.div
          id="box"
          initial={{ opacity: 0, y: -50 }} // Initial animation state
          animate={{ opacity: 1, y: 0, rotate: 360 }} // Animated state
          transition={{ duration: 1 }} // Animation duration
          style={{ textAlign: 'center', padding: '20px',  }}
        >
          <h1 className="title">Log in</h1>
          <div className="log">
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button">
                <h3>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                </h3>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;