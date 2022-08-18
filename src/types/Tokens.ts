export default interface TokenData {
    accessToken: string,
    idToken: string,
    refreshToken: string,
    tokenType: string,
    expiresIn: number,
    userId: string
  }