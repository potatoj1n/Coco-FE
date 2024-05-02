import './styles/App.css';
import { RouterProvider } from 'react-router-dom';
import Routers from './routes/Router';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ThemeProvider } from './components/Theme';

const AppStyles = createGlobalStyle`
  ${reset};
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`;

export default function App() {
  return (
    <ThemeProvider>
      <AppStyles />
      <div className="App">
        <RouterProvider router={Routers}></RouterProvider>
      </div>
    </ThemeProvider>
  );
}
