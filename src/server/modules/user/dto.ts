import { UserEntity } from "./entity";

export class UserServerCreateDTO {
  firstName: string;
  lastName: string;
}

export class UserServerUpdateDTO {
  id: number;
  firstName: string;
  lastName: string;
}

export class UserDTOFactory {
  static create(fromUser: UserServerUpdateDTO | UserEntity | UserServerCreateDTO, toUserType: UserServerUpdateDTO | UserEntity | UserServerCreateDTO) {
    // some code
    console.log('fromUser', fromUser)
    return toUserType;
  }
}
