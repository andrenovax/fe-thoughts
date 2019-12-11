import { UserServerCreateDTO, UserServerUpdateDTO } from "server/modules/user/dto";
import { UserEntity as UserServer } from "server/modules/user/entity";

export class UserDTO {
  firstName: string;
  lastName: string;
}

export class UserDTOFactory {
  static create(fromUser: UserDTO | UserServerUpdateDTO | UserServer | UserServerCreateDTO, toUserType: UserDTO | UserServerUpdateDTO | UserServer | UserServerCreateDTO) {
    // some code
    console.log(fromUser);
    return toUserType;
  }
}
