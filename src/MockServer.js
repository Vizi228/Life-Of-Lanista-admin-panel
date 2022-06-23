class MockServer {
  constructor() {
    this.reqID = 0;
    this.mockUsers = [
      {
        id: 1,
        login: 'user',
        password: '12345678',
        role: 'admin',
        token: 'qwfdb455ldgkln564',
      }
    ];
  }

  sleep = async (time) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time)
    });
  }

  post = (url, data, timeout = 10000) => {
    return new Promise(async (resolve, reject) => {
      const reqID = ++this.reqID;
      console.log(`=> REQUEST ${reqID}`, { url, data });

      let t;
      const onError = (e) => {
        clearTimeout(t);
        reject(e);
      }

      t = setTimeout(onError, timeout);

      await this.sleep(500);

      try {
        const response = this.handlePostRequest(url, data);
        console.log(`<= RESPONSE ${reqID}`, { response });
        resolve(response);
      } catch (error) {
        reject(error);
      }

    });
  }

  get = (url, data, timeout = 10000) => {
    return new Promise(async (resolve, reject) => {
      const reqID = ++this.reqID;
      console.log(`=> REQUEST ${reqID}`, { url, data });

      let t;
      const onError = (e) => {
        clearTimeout(t);
        reject(e);
      }

      t = setTimeout(onError, timeout);

      await this.sleep(500);

      try {
        const response = this.handleGetRequest(url, data);
        console.log(`<= RESPONSE ${reqID}`, { response });
        resolve(response);
      } catch (error) {
        reject(error);
      }

    });
  }

  defResponse = (data) => {
    return {
      ...data,
    }
  }

  handlePostRequest = (url, reqData) => {

    function AxiosError(message, statusCode, statusText) {
      this.message = `Request faild with status code ${statusCode}`;
      this.name = 'AxiosError';
      this.response = {
        data: {
          message: message,
          statusCode: statusCode,
        }
      };
      this.status = statusCode;
      this.statusText = statusText;
    }

    switch (url) {
      case '/admin-auth/login': {
        const user = this.mockUsers.find(user => user.login === reqData.login && user.password === reqData.password);

        if (user) {
          return this.defResponse({
            data: {
              ...user,
              password: undefined,
            },
          });
        }
        return throw new AxiosError('Wrong credentials provided', 400, 'Bad request');
      }

      case '/admin-auth/logout': {
        const user = this.mockUsers.find(user => user.login === reqData.login);

        if (user) {
          return this.defResponse({
            data: 'Logouted'
          });
        }
        return throw new AxiosError('Wrong credentials provided', 400, 'Bad request');
      }

      default: {
        return throw new AxiosError('Something went wrong', 500, 'Internal server error');
      }
    }
  }

  handleGetRequest = (url, reqData) => {

    function AxiosError(message, statusCode, statusText) {
      this.message = `Request faild with status code ${statusCode}`;
      this.name = 'AxiosError';
      this.response = {
        data: {
          message: message,
          statusCode: statusCode,
        }
      };
      this.status = statusCode;
      this.statusText = statusText;
    }

    switch (url) {
      case '/admin-auth': {
        const user = this.mockUsers.find(user => user.token === reqData.token);

        if (user) {
          return this.defResponse({
            data: {
              ...user,
              password: undefined,
            }
          });
        }

        return throw new AxiosError('Unauthorized', 401, 'Unauthorized');
      }

      default: {
        return this.defResponse({});
      }
    }
  }
}

export default new MockServer();
