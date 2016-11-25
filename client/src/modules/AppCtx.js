import Auth from "./Auth";

class AppCtx {

    static  doWithToken(context, req, returnPath) {
        return new Promise((resolve, reject) =>{
            req.headers.set("Authorization", "Bearer " + Auth.getToken());
            fetch(req)
                .then(response => {
                        if (response.status === 401) {
                            Auth.deauthenticateUser();
                            context.router.replace({
                                pathname: '/login',
                                state: {nextPathname: returnPath}
                            });
                            return;
                        }
                        resolve(response);
                    }
                )
                .catch(reason => {
                    console.log('while do with token ', reason);
                    reject("Service unavailable");
                });
        })
    }
}

export default AppCtx;