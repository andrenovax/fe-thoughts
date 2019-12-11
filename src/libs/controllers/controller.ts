export class BaseController<ENTITY=never> {
  repository: any;
  api: any;

  async create(payload: ENTITY) {
    const { data } = await this.api.create(payload);
    this.repository.create(data);
  }

  async update(payload: ENTITY) {
    const { data } = await this.api.update(payload);
    this.repository.update(data);
  }
}

export class ServerBaseController<ENTITY=never> {
  repository: any;
  api: any;

  async create(payload: ENTITY) {
    const { data } = await this.api.create(payload);
    this.repository.create(data);
  }

  async update(payload: ENTITY) {
    const { data } = await this.api.update(payload);
    this.repository.update(data);
  }
}
