import { UserEntity } from "./entity";
import { UserServerCreateDTO, UserServerUpdateDTO } from "server/modules/user/dto";
import { UserEntity as UserServer } from "server/modules/user/entity";
import { UserServerError } from "server/modules/user/external/errors";
import { EntityApiRepository } from "libs/api/index";
import { HTTPRequest, HTTPResponse, HTTPError, POST, PUT, GET, ApiRepository, HTTPApiCall, UseAfter, UseBefore, OnError, OnSuccess, OnUndefined } from "libs/api/index";
import { Version, UserRole, UserPermission } from "../../../libs/permission/decorators";
import { PutSpecialApi } from "server/modules/user/external/api";
import { VERSIONS } from "../versions/constants";
import { UserPermissionName } from "../permissions/constants";
import { UserRoleName } from "../roles/constants";
import { UserDTO, UserDTOFactory } from "./dto";
import { sendToGoogleAnalytics, sendToTrackJS, tryAgain } from "../../../demohelpers";

@EntityApiRepository('users', UserEntity)
export class UserApiRepository extends ApiRepository {

  @HTTPResponse(UserServer)  // otherwise true is expected
  @HTTPRequest(UserServerCreateDTO) // otherwise nothing in request args is expected, can be different from payload
  @POST()
  create(payload: { firstName: string, lastName: string }) {
    return this.request(payload);
  }

  @HTTPError(UserServerError)   // dont forget to handle server error
  @HTTPResponse(UserServer)   // validate and parse response
  @HTTPRequest(UserServerUpdateDTO)   // make sure you send correct request
  @UseBefore((payload: UserDTO, config: any, next: any) => next(UserDTOFactory.create(payload, new UserServerUpdateDTO()), config)) // data mapping to server, any third party middleware
  @PUT('/:id')
  update(payload: UserDTO) {
    // same as in UseBefore
    const userDTOServer = UserDTOFactory.create(payload, new UserServerUpdateDTO());
    return this.request(userDTOServer);
  }

  @UseAfter((payload: UserServer, config: any, next: any) => next(UserDTOFactory.create(payload, new UserEntity()), config))                     // data mapping to client, any third party middleware
  @HTTPResponse(UserServer)
  @GET("/:id")
  get() {
    return this.request();
  }

  @OnSuccess(sendToGoogleAnalytics)
  @OnError(sendToTrackJS)
  @OnUndefined(tryAgain)
  @POST('/special')
  createSpecialUser(payload: { firstName: string, lastName: string }) {
    return this.request(payload);
  }

  @Version(VERSIONS.TWO_ONE)                                          // validate version before request, throw error if not allowed
  @UserPermission(UserPermissionName.Special)                         // validate permission before request, throw error if not allowed
  @UserRole(UserRoleName.Regular)                                     // validate role before request, throw error if not allowed
  @HTTPApiCall(PutSpecialApi)                                         // reuse api defined in server
  putSpecial(payload: UserDTO) {
    return this.request(payload);
  }
}
