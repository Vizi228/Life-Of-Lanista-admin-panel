import { observer } from 'mobx-react-lite';
import React, { FC, ReactNode, useContext } from 'react';
import { Button, Header, Dropdown, IconButton, Toggle } from 'rsuite';
import { Context, State } from '../context';
import MenuIcon from '@rsuite/icons/Menu';
type HeaderProps = {
  isTheme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

type DropdownStyledItemProps = {
  children: ReactNode;
};

const DropdownStyledItem: FC<DropdownStyledItemProps> = ({ children }) => {
  return (
    <Dropdown.Item
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {children}
    </Dropdown.Item>
  );
};

const HeaderComponent: FC<HeaderProps> = ({ isTheme, setTheme }) => {
  const { store } = useContext<State>(Context);

  const handleTheme = () => {
    setTheme(!isTheme);
    localStorage.setItem('theme', `${!isTheme ? 'true' : ''}`);
  };

  const handleLogout = () => {
    store.logout();
  };
  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Dropdown
        placement={'bottomEnd'}
        trigger={'click'}
        renderToggle={(props: any, ref: any) => (
          <IconButton
            {...props}
            ref={ref}
            style={{ backgroundColor: 'inherit' }}
            icon={<MenuIcon color={!isTheme ? 'white' : 'black'} style={{ fontSize: 24 }} />}
            circle
            appearance="primary"
          />
        )}>
        <DropdownStyledItem>
          <Toggle
            onChange={handleTheme}
            size="lg"
            checkedChildren="Switch theme"
            unCheckedChildren="Switch theme"
          />
        </DropdownStyledItem>

        <DropdownStyledItem>
          {store?.isAuth ? (
            <Button onClick={handleLogout} color="red" appearance="primary">
              Logout
            </Button>
          ) : (
            <p>Авторизируйтесь</p>
          )}
        </DropdownStyledItem>
      </Dropdown>
    </Header>
  );
};

export default observer(HeaderComponent);
