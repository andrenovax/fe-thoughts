import { UserEntity } from "../../modules/user/entity";
import { UserService } from "../../modules/user/service";
import { UserController } from "../../modules/user/controller";
import { BasePageProvider, SUB, PUB, CONTROLLER } from "../../../libs/pageprovider";

export class UsersPageProvider extends BasePageProvider {
  @SUB(UserEntity)
  getUsers(userservice: UserService) {
    return {
      users: userservice.entities,
    };
  }

  @SUB(UserEntity)
  getPrimaryUsers(userservice: UserService) {
    return {
      primaryUser: userservice.findPrimary()
    };
  }

  @PUB(UserEntity)
  createFromName(@CONTROLLER() usercontroller: UserController, firstName: string, lastName: string) {
    return usercontroller.createFromName(firstName, lastName);
  }
}
