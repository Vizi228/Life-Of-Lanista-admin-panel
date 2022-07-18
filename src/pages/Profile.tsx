import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useRef, useState } from 'react';
import { Context, State } from '../context';
import { Content, FlexboxGrid, Panel, Form, ButtonToolbar, Button, FormInstance } from 'rsuite';
import { loginModel } from '../utils/schemas/LoginSchema';
import ModalComponent from '../components/Modal';
import TextField from '../components/TextField';

const Profile: FC = () => {
  const { store } = useContext<State>(Context);
  const [, setFormError] = useState<Object>({});
  const [formValue, setFormValue] = useState<Record<string, string>>({
    login: '',
    password: '',
    changePassword: '',
  });

  const handleChangePassword = () => {
    const newUserPassword = {
      login: formValue.login,
      password: formValue.password,
      newPassword: formValue.changePassword,
    };
    store.changePassword(newUserPassword);
  };

  const formRef = useRef() as React.MutableRefObject<
    FormInstance<Record<string, any>, string, { [x: string]: string | undefined }>
  >;
  return (
    <Content>
      <FlexboxGrid justify="center" align="middle" style={{ height: '94.2vh' }}>
        <FlexboxGrid.Item colspan={8}>
          <Panel header={<h3 style={{ textAlign: 'center' }}>Settings</h3>} bordered>
            <ButtonToolbar
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                minHeight: '100px',
              }}>
              <ModalComponent
                onClickButton={handleChangePassword}
                title="Change Password"
                name="Change Password">
                <Form
                  ref={formRef}
                  onChange={setFormValue}
                  onCheck={setFormError}
                  formValue={formValue}
                  model={loginModel}
                  fluid>
                  <TextField type="text" aria-label="Login" name="login" />
                  <TextField
                    type={'password'}
                    name="password"
                    isPassword={true}
                    aria-label="Password"
                  />
                  <TextField
                    type={'password'}
                    name="changePassword"
                    isPassword={true}
                    aria-label="New Password"
                  />
                </Form>
              </ModalComponent>
              <Button appearance="primary">Sign Out</Button>
            </ButtonToolbar>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Content>
  );
};

export default observer(Profile);
