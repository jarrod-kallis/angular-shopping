export class AuthenticationResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

  constructor(authenticationResponse: {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
  }) {
    this.kind = authenticationResponse.kind;
    this.idToken = authenticationResponse.idToken;
    this.email = authenticationResponse.email;
    this.refreshToken = authenticationResponse.refreshToken;
    this.expiresIn = authenticationResponse.expiresIn;
    this.localId = authenticationResponse.localId;
    this.registered = authenticationResponse.registered;
  }
}
