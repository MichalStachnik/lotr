import { Container } from '@mui/material';
import './App.css';
import Movies from './components/Movies';
import Characters from './components/Characters';
import Quotes from './components/Quotes';

// Normally would be in .env
export const ACCESS_TOKEN = 'BILJ5ndH4AwicXe7ocJp';
export const BASE_URL = 'https://the-one-api.dev/v2';

function App() {
  return (
    <Container>
      <Movies />
      <Characters />
      <Quotes />
    </Container>
  );
}

export default App;
