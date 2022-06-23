import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../service/authService';
import { IGladiator } from '../models/IGladiator';

interface UserData {
  login: string;
  password: string;
  gladiators?: IGladiator[];
}

export interface IChangePassword extends UserData {
  newPassword: string;
}

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }


  async login(user: UserData) {
    await AuthService.login(user).then((res) => {
      this.setAuth(true);
      this.setUser(res.data);
      console.log(res.data)
    }).catch((error) => console.log(error.response.data ? error.response.data.message : error.message));
  }

  async logout() {
    await AuthService.logout().then((res) => {
      this.setAuth(false);
      this.setUser({} as IUser);
    }).catch((error) => console.log(error.response.data ? error.response.data.message : error.message))
  }

  async checkAuth() {
    await AuthService.checkAuth().then((res) => {
      this.setAuth(true);
      this.setUser(res.data);
    }).catch((error) => console.log(error.response.data ? error.response.data.message : error.message))
      .finally(() => this.setLoading(false));
  }

  async changePassword(body: IChangePassword) {
    this.setLoading(true);
    await AuthService.changePassword(body)
      .catch((error) => console.log(error.response.data ? error.response.data.message : error.message))
      .finally(() => this.setLoading(false));
  }
}
