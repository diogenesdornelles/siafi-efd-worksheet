import './App.css';
import Home from './pages/Home';
import { AppProvider } from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
