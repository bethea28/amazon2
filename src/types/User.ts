export type Interests = {[key: string]: boolean}

export default interface UserData {
    id?: string,
    name: string,
    username: string,
    bio: string,
    interests: Interests,
    projects: Array<String>
  }