import { UserEntity } from './entity';
import { EntityController, BaseController, EntityFromPayload } from "../../../libs/controllers";
import { Version, UserPermission, UserRole } from "../../../libs/permission/decorators";
import { VERSIONS } from "../versions/constants";
import { UserPermissionName } from "../permissions/constants";
import { UserRoleName } from "../roles/constants";

@EntityController(UserEntity)
export class UserController extends BaseController<UserEntity> {

  async createFromName(firstName: string, lastName: string) {
    const { data } = await this.api.put({ firstName, lastName });
    this.repository.create(data);
  }

  async createFromEntity(user: UserEntity) {
    const { data } = await this.api.put(user);
    this.repository.create(data);
  }

  @Version(VERSIONS.TWO)
  @UserPermission(UserPermissionName.Special)
  @UserRole(UserRoleName.Admin)
  async createPermission(@EntityFromPayload() user: UserEntity) {
    const { data } = await this.api.put(user);
    this.repository.create(data);
  }
}
