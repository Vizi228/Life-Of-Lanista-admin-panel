import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useRef, useState } from 'react';
import { Context, State } from '../context';
import { Container, Content, FlexboxGrid, Panel, Form, ButtonToolbar, Button, FormInstance } from 'rsuite';
import { loginModel } from '../utils/schemas/LoginSchema';
import TextField from '../components/TextField';

const Login: FC = () => {
  const { store } = useContext<State>(Context);
  const [formError, setFormError] = useState<Object>({});
  const [formValue, setFormValue] = useState<Record<string, string>>({
    name: '',
    password: '',
  });
  const formRef = useRef() as React.MutableRefObject<FormInstance<Record<string, any>, string, { [x: string]: string | undefined; }>>;

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form error');
      return;
    }
    const userData = {
      login: formValue.name,
      password: formValue.password,
    }
    store.login(userData); // 0 - запрос на тесовый api, 1 - запрос на mock-server
  };

  return (
    <Container>
      <Content>
        <FlexboxGrid justify='center' align='middle' style={{ height: '90vh' }}>
          <FlexboxGrid.Item colspan={8}>
            <Panel header={<h3>Login</h3>} bordered>
              <Form
                ref={formRef}
                onChange={setFormValue}
                onCheck={setFormError}
                formValue={formValue}
                model={loginModel}
                fluid
              >
                <TextField type='text' name='name' aria-label='Login' />
                <TextField name='password' type={'password'} isPassword={true} aria-label='Password' aria-autocomplete='none' />

                <ButtonToolbar>
                  <Button appearance='primary' onClick={handleSubmit}>Sign in</Button>
                </ButtonToolbar>

              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  )
}

export default observer(Login);
