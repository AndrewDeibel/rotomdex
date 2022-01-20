export class User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;

  // Authentication
  token?: string;
  expires_at?: Date;
  email_verified_at?: Date;
  email_verify_token: string;
  hasNovaAccess: boolean;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
