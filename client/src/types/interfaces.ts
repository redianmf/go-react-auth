export interface IAuthCard {
  handleToggleCard: () => void;
}
export interface IRenewToken {
  newAccessToken: string;
  newRefreshToken: string;
}
export interface ILanguageOptions {
  country: string;
  lang: string;
  icon: string;
}
