export default interface UserData {
    id?: string,
    name: string,
    username: string,
    bio: string,
    interests: {[key: string] : boolean}
  }