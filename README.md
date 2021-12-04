# retrolist-backend

A simple todo list app using keystone-next

-   Supports many users with n lists with n items
-   Session support
-   Password reset support

## dev

-   `npm i`
-   start mongodb and maildev: `docker-compose up`
    -   maildev: http://localhost:7775/
    -   install mongodb compass
-   build keystone: `npm run build`

-   create `.envrc` with settings:

```
export FRONTEND_URL
export COOKIE_SECRET
export DATABASE_URL
export PORT
export MAIL_FROM
export MAIL_HOST
export MAIL_PORT
export MAIL_USER
export MAIL_PASS
```

-   start devmode: `npm start`

## deployment

.envrc

```
export DEPLOYMENT_HOST
export DEPLOYMENT_USERNAME
export DEPLOYMENT_PATH
export DEPLOYMENT_ECOSYSTEM_PATH
```

`./scripts/deploy.sh`
