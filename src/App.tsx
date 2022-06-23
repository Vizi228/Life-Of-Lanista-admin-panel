import { FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CustomProvider } from 'rsuite';
import './App.css';
import 'rsuite/dist/rsuite.min.css';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './context';
import HeaderComponent from './components/Header';

const App: FC = () => {
  const { store } = useContext(Context);
  const [isTheme, setTheme] = useState<boolean>(true);
  useEffect(() => {
    store.checkAuth();
    setTheme(!!localStorage.getItem('theme'))
  }, [store])
  return (
    <BrowserRouter>
      <CustomProvider theme={isTheme ? 'light' : 'dark'}>
        <HeaderComponent isTheme={isTheme} setTheme={setTheme} />
        <AppRouter />
      </CustomProvider>
    </BrowserRouter>
  );
}

export default observer(App);
