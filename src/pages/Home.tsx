import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Context, State } from '../context'
import NavbarComponent from '../components/Nav/Navbar';
import { Container, Header, Content } from 'rsuite'

const Home: FC = () => {
  const { store } = useContext<State>(Context)

  if (store.isLoading) {
    return <div>Loading..</div>
  }

  return (
    <div>
      <Container style={{ height: '94.2vh' }}>
        <NavbarComponent />
        <Container style={{ background: "gray" }}>
        </Container>
      </Container>
    </div>
  )
}

export default observer(Home);
