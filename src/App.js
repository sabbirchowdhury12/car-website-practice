import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes';

function App() {
  return (
    <div data-theme="light" className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
