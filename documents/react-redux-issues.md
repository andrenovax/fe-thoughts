Lots of issues and unmaintainable code due to absence of the standard architecture:
1. Data related to one entity can be stored inside another entity (user in account, account in sculpt, etc).
2. Data related to one entity can be received by using methods of another entity (getting account data data with user methods).
3. Lots of side effects (i.e. storing some parsed version of the raw data somewhere in utils) for no reason in an uncontrollable way.
4. Lots of duplicate code related to CRUD of the data.
5. Lots of duplicate code related to working with the api.
6. No standard flow for data CRUD. No standard way of working with backend data. Makes sense to use standard oop patterns (entity, repository, etc) that will be clear for every new commer in the project instead of creating something custom.
7. Lots of business logic inside ui components.
8. No tools for working with data, you have to create your own (reusable selectors, actions, reducers, side effects, etc). It’s enough for working with ui data (set modal opened state, save query from filters, etc). Eventually you’re forced to reinvent the wheel for redux, i.e. write your own code for working with data (update, delete, create, etc). It’s all very well done and standardized in the backend world long time ago (you’ll find the same methods in most of the orms).
9. Lots of duplicate code when you need to create similar actions for different entities. You can create reusable reducers, etc, but it doesnt look very readable (personally).

Redux issues:
1. Lots of boilerplate to create an action.
2. Doesnt provide action status (i.e. in progress, succeeded, error). You have to write boilerplate for it.
Solution: when entity subscriber subscribes to ui changes with provider, ui subscribes to “topic”. When ui publishes data a “topic” is created. Topic has a status: “in progress”/“success”/“error”/“other” and error message if any. So when ui tries to get or save some data, it’ll get it’s action status. You dont have to write all this redux saga boilerplate to store and give ui an action status.
3. You have to create one big subscription where you use different selectors to get the data. Or write many hocs, that create lots of nested elements. Writing a hoc requires boilerplate. you cant subscribe to changes in specific entity. when something changes in store, all (!!!) the existing subscriptions (mapstatetoprops) are executed.

How to solve:
1. Use Model, Entity, Repository, Service, Controller patterns to create/update/delete data from ui along with pub/sub to pass data to ui to provide limitations to the developers and remove boilerplate code.

https://typeorm.io/#/
https://github.com/typestack/class-validator

2. Introduce subscription manager instead of "connect" function to subscribe to data.
3. Introduce pub manager instead of "connect" function to publish data.
