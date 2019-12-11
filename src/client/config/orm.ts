import { createStore } from 'libs/orm';
import { UserEntity } from "../modules/user/entity";

export function createAppStore() {
  return createStore({
    driver: 'memory',
    entities: [UserEntity],
  })
}
