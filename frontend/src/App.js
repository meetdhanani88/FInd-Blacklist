
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import LogIn from './components/LogIn';

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <LogIn></LogIn>
      </div>
    </QueryClientProvider>
  );
}

export default App;
