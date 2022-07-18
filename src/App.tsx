import { FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, CustomProvider } from 'rsuite';
import './App.css';
import 'rsuite/dist/rsuite.min.css';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './context';
import HeaderComponent from './components/Header';
import NavbarComponent from './components/Nav/Navbar';

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
        <Container style={{ height: '94.2vh' }}>
        {store.isAuth && <NavbarComponent />}
        <AppRouter />
        </Container>
      </CustomProvider>
    </BrowserRouter>
  );
}

export default observer(App);
