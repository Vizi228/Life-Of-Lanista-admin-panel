import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Header, Navbar, Nav } from 'rsuite';
import { Context, State } from '../context'

type HeaderProps = {
    isTheme: boolean,
    setTheme: React.Dispatch<React.SetStateAction<boolean>>,
}

const HeaderComponent: React.FC<HeaderProps> = ({ isTheme, setTheme }) => {
    const { store } = useContext<State>(Context);

    const handleTheme = () => {
        setTheme(!isTheme)
        localStorage.setItem('theme', `${!isTheme ? 'true' : ''}`)
    }

    const handleLogout = () => {
        store.logout()
    };
    return (
        <Header>
            <Navbar appearance="inverse">

                <Button
                    appearance='primary'
                    onClick={() => handleTheme()}
                    color='yellow'
                    style={{ margin: '10px 20px' }}
                >
                    Switch theme
                </Button>
                {store.isAuth &&
                    <Nav pullRight>
                        <Button onClick={handleLogout} color="red" appearance="primary" style={{ margin: '10px 20px' }}>Logout</Button>
                    </Nav>
                }
            </Navbar>
        </Header>
    )
}

export default observer(HeaderComponent)