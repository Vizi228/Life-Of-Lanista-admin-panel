import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context, State } from '../context'
import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const AppRouter: FC = () => {
  const { store } = useContext<State>(Context);
  if (store.isLoading) {
    return <h1>...Loading</h1>
  }

  return (
    store.isAuth ?
      <>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<Navigate to='home' />} />
        </Routes>
      </>
      :
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Navigate to='login' />} />
      </Routes>
  )
}

export default observer(AppRouter);
