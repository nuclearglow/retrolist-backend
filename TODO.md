-   format and send mail
-   insertSeedData
-   roles: only logged in users may see their lists
-   Build & Deploy

    -   Set up production variable usage (NODE_ENV = 'production' etc.)
    -   Clean out the server

        -   remove sina-und-chris
        -   remove sina und chris websites, email, dns entries etc.
        -   remove the old user
        -   remove node and npm

    -   Set up api.svenvowe.de

        -   Set up deployer user
            -   Set up zsh (just like svenvowe)
            -   Set up nvm
            -   Set up Forever just like the wedding user

    -   Remove wedding user

    -   Set up new websites

        -   add dns entries retrolist-backend.svenvowe.de
            -   Set up https for that
            -   Set up the backend for deployment using reverse proxy
        -   add dns entries retrolist.svenvowe.de
            -   Set up https for that
        -   add keystone-next roles using advanced react course to protect lists

    -   Deployment script and SSH, copy this over from latest incarnation github svenvowe.de
        -   backend: check out from git, build and run
    -   Test it out, configure
