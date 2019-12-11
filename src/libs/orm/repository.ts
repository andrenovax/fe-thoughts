export class BaseRepository<Entity> {
  public async update(entity: Entity) {
    console.log(entity);
    // ...
  }
  public async create() {
    // ...
  }
  public async remove() {
    // ...
  }
  public async findOne(args: any) {
    console.log(args);
    // ...
  }
  public async find() {
    // ...
  }
}
