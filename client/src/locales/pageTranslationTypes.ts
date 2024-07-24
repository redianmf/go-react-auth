export interface IPages {
  auth: IAuthPage;
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
}
