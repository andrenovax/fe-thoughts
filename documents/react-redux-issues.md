Lots of issues and unmaintainable code due to:
1. Data related to one entity can be stored inside another entity (user in account, account in sculpt, etc).
2. Data related to one entity can be received by using methods of another entity (getting account data data with user methods).
3. Lots of side effects (i.e. storing some parsed version of the raw data somewhere in utils) for no reason in an uncontrollable way.
4. Lots of duplicate code related to CRUD of the data.
5. Lots of duplicate code related to working with the api.
6. No standard flow for data CRUD.
7. Lots of business logic inside ui components.
8. Lots of boilerplate to create an action.
9. Lots of duplicate code when similar actions for different entities.


How to solve:
1. Use Model, Entity, Repository, Service, Controller patterns to create/update/delete data from ui along with pub/sub to pass data to ui to provide limitations to the developers and remove boilerplate code.

https://typeorm.io/#/
https://github.com/typestack/class-validator

2. Introduce subscription manager instead of "connect" function to subscribe to data.
3. Introduce pub manager instead of "connect" function to publish data.
