import React from 'react';
import { useSome } from '../utilities/MainContextProvider';

// Add some styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
  },
  welcomeText: {
    fontSize: '2.5rem',
    color: '#333',
  },
  userName: {
    fontSize: '2rem',
    color: '#333',
  },
};

export default function Home() {
  const { currentUser } = useSome();

  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeText}>Welcome</h1>
      <h2 style={styles.userName}>{currentUser.username}</h2>
      <p>Thanks for joining us! We are glad to have you here.</p>
    </div>
  );
}
