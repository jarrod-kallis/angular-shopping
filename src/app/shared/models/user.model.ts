export class User {
  private _id: string;
  private _firstName?: string;
  private _lastName?: string;
  private _email: string;
  private _token: string;
  private _expirationDate: Date;

  constructor(id: string, email: string, token: string, expiresInSeconds: number = 0, firstName: string = "", lastName: string = "") {
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

  public get expirationDate(): Date {
    return this._expirationDate;
  }

  public set expirationDate(expirationDate: Date) {
    this._expirationDate = expirationDate;
  }

  public hasValidToken(): boolean {
    return this.token !== null;
  }

  // Returns the token expiration duration in milliseconds
  public getTokenExpirationDuration(): number {
    return this.expirationDate.getTime() - new Date().getTime();
  }

  public static convertFromLocalStorage(localStorageUser: string): User {
    const userObj: { _id: string, _firstName: string, _lastName: string, _email: string, _token: string, _expirationDate: string } = JSON.parse(localStorageUser);

    const user: User = new User(userObj._id, userObj._email, userObj._token, 0, userObj._firstName, userObj._lastName);
    user.expirationDate = new Date(userObj._expirationDate);

    return user;
  }
}
