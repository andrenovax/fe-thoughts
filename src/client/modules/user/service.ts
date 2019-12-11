import { BaseService, EntityService } from "libs/orm";
import { UserEntity } from './entity';

@EntityService(UserEntity)
export class UserService extends BaseService<UserEntity> {
  public findPrimary() {
    return this.findOne({
      isPrimary: true,
    });
  }
}
