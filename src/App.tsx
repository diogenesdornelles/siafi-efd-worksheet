import './App.css';

import { AppProvider } from './context/appProvider';
import Home from './pages/Home';

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
