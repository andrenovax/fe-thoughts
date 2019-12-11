1. 400, 500, 404 and other errors when calling api.
2. White screen and broken ui after clicking on a button.
3. Code problems:
    - Hardcode and copypaste (url, method, etc) when calling api:
        - Errors in url names, methods, etc
        - If url or method changes, lots of places require updates
    - No static typization and validation of the url params and request body:
        - Errors due to passing invalid url params (typo, wrong type, not passing at all)
        - Errors due to invalid request body (typo, wrong type, wrong structure, not passing at all)
        - When required request body changes, lots of duplicate changes are required
        - When required url params change, lots of duplicate changes are required
        - When we need to change request sending logic for specific api, lots of duplicate changes are required
    - No static typization and validation of the response:
        - Errors in parsing response (typo, wrong type, wrong structure)
        - If response body changes, lots of duplicate changes are required
        - When we need to change response parsing logic for specific api, lots of duplicate changes are required
    - Hard to set same logic of requests to the same entity:
        - add/remove permissions required for request
        - map data
        - etc
    - No simple way to share similar logic between different entities.
    - Hard to switch between http / socket / rpc
    - Hard to setup and work with cache
4. No way to setup api versioning and permission control
5. No standard way to handle 500/404 api error.
6. No way to handle connection error, when user goes offline for a minute (all the unsaved data will be lost).

Solution:

Using the next approach to work with api (with flow in a different direction):
https://github.com/typestack/routing-controllers
