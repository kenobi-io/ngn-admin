# angular + nestjs template starter (ngn-template)
## GRPS

## Develop
1. Api
    1. run serve mode microservice from nx `npm api:serve auth`
    2. install nodemon add nodemon config in microservice and run `npm run api:nodemon apps/<NAME_APP>/nodemon-debug.json` and set `auto attach` in setting vscode
        a. Nx + nest + auto attach on => don't work https://github.com/nrwl/nx/issues/3948
        b. create configuration in launch.json - debug and start manual `ng run micro-app-name:serve` - for watch
    ### Configration settings for debug and serve via vscode
    3. Create config `launch.json` and add task that is work in background and contains script for  run `serve`. 
        a. npm install nodemon -g
        b. fix set correct tasks in background (fix `endsPattern`)
        c. add config `auth:debug:nodemon` is work! https://github.com/microsoft/vscode-recipes/tree/master/nodemon
        e. config `auth:debug` work first time, but closed and don't wait for changes before restart like `auth:debug:nodemon` version 
    4. add proto as `assets` to each application. Becauce, proto don't copy to dist directory automaic :(
