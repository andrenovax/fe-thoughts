// Base explanation
// -----
// In router, we keep only:
// - path
// - path params validation
// - permissions (role, feature, version)

@Feature(Feature.FancyFeature)    // open only for FancyFeature owners only, all the children that dont update this permission will be hidden by default
@Role(Role.AccountOwner)          // open only for AccountOwner owners only
@Route("users", { sensitive: true, strict: true })          // path, only here, no more duplication
export class UsersRoutes {

  @Route()                                              // Child Route
  profile: Route;                                       // final path: /users/profile,  open: router.goTo('users.profile') or  router.goTo(UsersRoutes.profile) (will be validated in compile time)

  @Role(Role.Admin)                                     // require different role for this url, specify error callback in ui
  @Route()
  adminuser: Route;                                     // final path: /users/adminuser, open: router.goTo('users', 'adminuser')

  @Feature(Feature.SomethingElse)                       // require different feature here
  @Route()
  adduser: Route;

  @Props({ id: id => typeof id === 'number' })         // validate params from url (validates when updated by user manually)
  @Route('updateuser/:id', { exact: true })            // final path: /users/updateuser/:id, open: router.goTo(UsersRoutes.updateuser, { id: 1 })
  updateuser: Route<{ id: number }>;                    // typing for compile time validation of bad params when navigating in code,

  @MemoryProps({ key: yup.string().required() })  // or you can use yup here :)
  @MemoryRoute('inviteform/:id')                             // change page without changing location in the address bar
  @Route("invite")                                      // ui path: /users/invite, memory path: /inviteform/:id,  open: router.goTo(UsersRoutes.profile.inviteuser,, { key: 1 })
  inviteuser: Route<{}, { key: string }>;               // will be opened when

  @MemoryRoute('invitesent')
  @Route("invite")
  invitesent: Route;                                    // ui path: /users/invite, memory path: /invitesent

  @Version(VERSION.TWO.ONE)                             // show for v2 users only
  @Route("/showinv2")
  v2viewonly: Route;

  @BasePath('somewhereelse')
  @MemoryProps({ hasDogs: hasDogs => hasDogs ? 'great' : 'go get one' })
  @Route()
  edituser: Route<{}, { hasDogs: number }>;             // now you need to pass stateparams value when you go to this route
}

/*
  Navigating between pages
 */

// By name
router.goTo(['users', 'profile']);

// By link
router.goTo(UsersRoutes.profile)


/*
  One more time, rendered routes:

  /users/profile
  /users/adminuser
  /users/adduser
  /users/updateuser/:id
  /users/invite
    - /inviteform/:id (in memory)
    - /invitesent     (in memory)
  /users/showinv2
  /somewhereelse/edituser
*/


// Router component
//
// Connect these props in **redux** for validation, or add it optionally to Router
//
// values={{
//   location: location,                        // values required by validators
//   feature: userFeatures,                     // values required by validators
//   role: userFeatures,
//   version: userVersion
// }}

export function UsersRoutesComponent({ sleep, onRouteChange, onFeatureError, onLoadingErrorAction, onParamErrorAction, onStateParamErrorAction, onRoleError, onErrorAction, onInvalidVerAction, onLeaveAction }: any) {
  return (
    <Router
      name="users"
      errors={{
        feature: FeatureErrorComponent,             // Show this component if users doesnt have feature enabled, works as default for all the children components unless rewritten
        role: RoleErrorComponent,                   // Show this component if users doesnt have role enabled
        version: null,                              // Dont show anything when user doesnt have a permission
        catch: CatchErrorComponent,                 // Show component on error in code, so users dont see a blank disabled screen on error
        default: DefaultErrorComponent,             // When user didnt add any component to handle error, show this one if it happens
      }}
      onError={{
        feature: onFeatureError,                    // Dispatch "onFeatureError" action on error, works along with showing FeatureErrorComponent
        role: onRoleError,                          // Dispatch "onRoleError" action on error, if 2 errors happen, you'll get 2 actions
        version: sleep,                             // Dont show anything when user doesnt have a permission
        catch: onRoleError,                         //
      }}
      onChange={onRouteChange}                      // executed on change
      stopChangeOnError                             // if new route has error, it wont be rendered
    >
      <Switch>
        <Route
          name="profile"
          component={CurrentUser}
          errors={{
            default: SomeErrorComponent,            // overwrite default parent component
            all: SomeErrorComponent,                // overwrite all the parent error components
          }}
        />

        <Route
          name="admin"
          component='path/to/component'             // lazy loading of the component, handy for code splitting
          loading={LoadingComponent}                // loading component (spinner or something), show while
          errors={{
            loading: SomeErrorComponent,            // loading error component
          }}
          onError={{
            loading: onLoadingErrorAction           // loading error callback
          }}
        />

        <Route
          name="updateuser"
          component={UpdateUser}
          errors={{
            param: SomeErrorComponent,              // bad params provided
          }}
          onError={{
            param: onParamErrorAction               // will be executed when param validation fails
          }}
        />

        <Route
          name="inviteform"
          component={InviteformComponent}
          errors={{
            default: InviteformComponent,           // Notice the same component as above, this is the way to remount it
            memoryparam: onStateParamErrorAction    // bad memoryparam provided
          }}
        />

        <Route
          name="invitesent"
          component={InvitesentComponent}
          onError={{
            all: onErrorAction                      // overrides all onError callbacks above only for *this* route
          }}
        />

        <Route
          name="v2viewonly"
          component={V2ViewOnlyComponent}
          onError={{
            version: onInvalidVerAction             // what to do if user opens a page and he doesnt have a permission
          }}
        />

        <Route
          name="edituser"
          component={EditUserComponent}
          onChange={onLeaveAction}                  // will be executed when user tries to navigate out, will pause changing the route until user confirms it
        />

        <ConditionalRoute
          name="users"
          components={{
            version: {
              [VERSION.ONE.ONE]: ComponentOne,        // show this component for v1.1
              [VERSION.ONE.TWO]: ComponentTwo,        // show this component for v1.2
            }
          }}
          onChange={onLeaveAction}                    // will be executed before user changes this route, he can cancel it there
        />
      </Switch>
    </Router>
  );
}


export function PageWithLink() {
  return (
    <div>
      This is a page with link

      <Link                                           // if user doesnt have permission to this link, it will be hidden
        to="updateuser"
        params={{ id: 10 }}
      >
        <div>
          go to update user page
        </div>
      </Link>

      <Link
        to="invitesent"
        noHide                                        // dont hide link if user doesnt have permission
      >
        <div>
          go to invite page
        </div>
      </Link>

      <Link
        to="edituser"
        memoryparams={{ hasDogs: true }}
        error={{
          version: SomeErrorComponent                 // show this component if user doesnt have an access to this page
        }}
      >
        <div>
          go to invite page
        </div>
      </Link>
    </div>
  )
}
