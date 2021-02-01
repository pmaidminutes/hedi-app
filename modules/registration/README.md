# HEDI user registration module

even though registering new users / account is thematically closely related to user auth module, it is separated into a distinct module since it is not part of oauth2/openid nor nextauth.js

currently the server side is implemented as a custom gql mutation
