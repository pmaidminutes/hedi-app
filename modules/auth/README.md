# HEDI auth module

handles oauth2 login flow via next-auth

token refresh is not yet implemented by the lib, keep an eye open, might change in future

## requirements
* `.env.local` contains some constants and secrets:
  * cms oauth id and secret
  * next-auth jwt secret signing the token which is used to pass around the user session (could be encrypted if we want)
* `next-auth/client Provider` react context has to be available to subcomponents

## available exports
there are no direct exports, since one needs to separate between serverside and clientside

one index exporting them all breaks next

### server
* __withAuth:__ sets up NextAuth api handler (in `/api/auth[...nextauth].ts`)
* __getUserAuthHeader:__ returns the required oauth login header, if available
* __getUserAuth:__ returns userinfo and tokens

### client
* __getUser:__ hook to retrieve username and email

### demo
* `sandbox/auth` in browser
* `/api/sandbox/auth` serverside api example

## TODOs
* login flow error handling
* proper login component
* find a way to provide the login mask as modal or subcomponent instead of an indiviual page
* make login translatable