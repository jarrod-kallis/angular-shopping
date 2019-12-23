export class User {
  private _id: string;
  private _firstName?: string;
  private _lastName?: string;
  private _email: string;
  private _token: string;
  private _expirationDate: Date;

  constructor(id: string, email: string, token: string, expiresInSeconds: number, firstName?: string, lastName?: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._token = token;
    this._expirationDate = new Date(new Date().getTime() + (expiresInSeconds * 1000));
  }

  public get id(): string {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get email(): string {
    return this._email;
  }

  public get token(): string {
    if (this._expirationDate < new Date()) {
      this._token = null;
    }

    return this._token;
  }

  public hasValidToken(): boolean {
    return this.token !== null;
  }
}
