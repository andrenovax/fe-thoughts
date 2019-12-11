import { UserEntity } from "./entity";
import { UserServerCreateDTO, UserServerUpdateDTO } from "./dto";
import { UserServerError } from "./external/errors";
import {POST, PUT, GET } from "libs/api/index";
import { Version, UserRole, UserPermission } from "../../../libs/permission/decorators";
import { PutSpecialApi } from "./external/api";
import { VERSIONS } from "../versions/constants";
import { UserPermissionName } from "../permissions/constants";
import { UserRoleName } from "../roles/constants";
import { EntityController, ServerBaseController } from "../../../libs/controllers";
import { ApiResponse, ApiPayload, BodyParam } from "libs/api/index";

@EntityController('users', UserEntity)
export class UserController extends ServerBaseController<UserEntity> {

  @POST()
  async createo(payload: UserServerCreateDTO): ApiResponse<UserEntity> {
    const user = await this.repository.create(payload);
    return user;
  }

  @PUT('/:id')
  async updateo(payload: UserServerUpdateDTO): ApiResponse<UserEntity, UserServerError> {
    try {
      const user = await this.repository.update(payload);
      return user;
    } catch (e) {
      return new UserServerError(e);
    }
  }

  @GET("/:id")
  async get(@BodyParam() id: number): ApiResponse<UserEntity> {
    const user = await this.repository.findOne(id);
    return user;
  }

  @POST('/special')
  async createSpecialUser(payload: { firstName: string, lastName: string }): ApiResponse<UserEntity, UserServerError> {
    const user = await this.repository.update(payload);
    return user;
  }

  @Version(VERSIONS.TWO_ONE)                                          // validate version before request, throw error if not allowed
  @UserPermission(UserPermissionName.Special)                         // validate permission before request, throw error if not allowed
  @UserRole(UserRoleName.Regular)                                     // validate role before request, throw error if not allowed
  async putSpecial(payload: ApiPayload<PutSpecialApi>): ApiResponse<PutSpecialApi> {
    const user = await this.repository.create(payload);
    return user;
  }
}
