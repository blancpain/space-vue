export type TUserProfile = {
  email: string;
  favorites: TUserFavorites[];
};

export type TUserFavorites = {
  title: string;
  url: string;
};
