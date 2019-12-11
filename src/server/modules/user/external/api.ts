import { HTTPApi, HTTPMethod } from "../../../../libs/api/index";
import { UserServer, UserServerUpdateDTO } from "./dto";
import { UserServerError } from './errors';

export class PutSpecialApi implements HTTPApi<UserServerUpdateDTO, UserServerError, UserServer> {
  path = '/:id/special';
  method = HTTPMethod.PUT;
  payload = UserServerUpdateDTO;
  error = UserServerError;
  data = UserServer;
}
