export interface IPages {
  auth: IAuthPage;
  home: IHomePage;
}

interface IAuthPage {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  submit: string;
  noAccount: string;
  haveAccount: string;
  register: string;
  login: string;
  loginGoogle: string;
}

interface IHomePage {
  logout: string;
  welcome: string;
}
