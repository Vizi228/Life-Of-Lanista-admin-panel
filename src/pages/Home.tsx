import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';
import { Context, State } from '../context';
import { Container } from 'rsuite';

const Home: FC = () => {
  const { store } = useContext<State>(Context);

  if (store.isLoading) {
    return <div>Loading..</div>;
  }

  return <Container style={{ background: 'gray' }}></Container>;
};

export default observer(Home);
