import { UserEntity } from './entity';
import { EntityRepository, BaseRepository } from "libs/orm";

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  public async findByName(name: string) {
    return this.findOne({
      firstName: name,
    });
  }
}
