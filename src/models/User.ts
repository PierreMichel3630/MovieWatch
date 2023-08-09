export interface UserGoogle {
  family_name: string;
  given_name: string;
  picture: string;
  name: string;
  locale: string;
  id: string;
  email: string;
  verified_email: boolean;
}

export interface User extends UserGoogle {
  last_connection?: Date;
}
