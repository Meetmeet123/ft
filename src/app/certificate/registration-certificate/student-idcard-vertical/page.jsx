import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/" style={styles.link}>Go back home</Link>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  link: {
    fontSize: '1rem',
    color: '#0070f3',
    textDecoration: 'underline',
  },
};
