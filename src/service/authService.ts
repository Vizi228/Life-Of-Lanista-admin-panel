import { AxiosResponse } from 'axios';
import axiosInstance from '../api';
import { IUser } from '../models/IUser';
import { IChangePassword } from '../store/store';


interface UserData {
  login: string;
  password: string;
}

export default class AuthService {
  static async login(user: UserData): Promise<AxiosResponse<IUser>> {
    return await axiosInstance.post<IUser>('admin-auth/login', user);
  }

  static async logout(): Promise<AxiosResponse<IUser>> {
    return await axiosInstance.post<IUser>('admin-auth/logout');
  }

  static async checkAuth(): Promise<AxiosResponse<IUser>> {
    return await axiosInstance.get<IUser>('admin-auth');
  }
  static async changePassword(body: IChangePassword): Promise<AxiosResponse> {
    return await axiosInstance.patch('admin-auth/change-pwd', body);
  }
}   
