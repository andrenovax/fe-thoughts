// works with data already received from repository
export class BaseService<Entity> {
  entities: Entity[];

  public findOne(args: any) {
    return this.entities.find(args);
  }
  public find() {
    // ...
  }
}
