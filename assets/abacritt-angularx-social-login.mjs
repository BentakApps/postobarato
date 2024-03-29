import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Inject, Directive, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, skip, filter, take, ReplaySubject, AsyncSubject, isObservable } from 'rxjs';
import { CommonModule } from '@angular/common';

class BaseLoginProvider {
    constructor() { }
    loadScript(id, src, onload, parentElement = null) {
        // get document if platform is only browser
        if (typeof document !== 'undefined' && !document.getElementById(id)) {
            let signInJS = document.createElement('script');
            signInJS.async = true;
            signInJS.src = src;
            signInJS.onload = onload;
            if (!parentElement) {
                parentElement = document.head;
            }
            parentElement.appendChild(signInJS);
        }
    }
}

class SocialUser {
}

const defaultInitOptions = {
    oneTapEnabled: true,
};
class GoogleLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
        this.changeUser = new EventEmitter();
        this._socialUser = new BehaviorSubject(null);
        this._accessToken = new BehaviorSubject(null);
        this._receivedAccessToken = new EventEmitter();
        this.initOptions = { ...defaultInitOptions, ...this.initOptions };
        // emit changeUser events but skip initial value from behaviorSubject
        this._socialUser.pipe(skip(1)).subscribe(this.changeUser);
        // emit receivedAccessToken but skip initial value from behaviorSubject
        this._accessToken.pipe(skip(1)).subscribe(this._receivedAccessToken);
    }
    initialize(autoLogin) {
        return new Promise((resolve, reject) => {
            try {
                this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://accounts.google.com/gsi/client', () => {
                    google.accounts.id.initialize({
                        client_id: this.clientId,
                        auto_select: autoLogin,
                        callback: ({ credential }) => {
                            const socialUser = this.createSocialUser(credential);
                            this._socialUser.next(socialUser);
                        },
                        prompt_parent_id: this.initOptions?.prompt_parent_id,
                        itp_support: this.initOptions.oneTapEnabled
                    });
                    // if (this.initOptions.oneTapEnabled) {
                    //     this._socialUser
                    //         .pipe(filter((user) => user === null))
                    //         .subscribe(() => google.accounts.id.prompt(console.debug));
                    // }
                    if (this.initOptions.scopes) {
                        const scope = this.initOptions.scopes instanceof Array
                            ? this.initOptions.scopes.filter((s) => s).join(' ')
                            : this.initOptions.scopes;
                        this._tokenClient = google.accounts.oauth2.initTokenClient({
                            client_id: this.clientId,
                            scope,
                            callback: (tokenResponse) => {
                                if (tokenResponse.error) {
                                    this._accessToken.error({
                                        code: tokenResponse.error,
                                        description: tokenResponse.error_description,
                                        uri: tokenResponse.error_uri,
                                    });
                                }
                                else {
                                    this._accessToken.next(tokenResponse.access_token);
                                }
                            },
                        });
                    }
                    resolve();
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            if (this._socialUser.value) {
                resolve(this._socialUser.value);
            }
            else {
                reject(`No user is currently logged in with ${GoogleLoginProvider.PROVIDER_ID}`);
            }
        });
    }
    refreshToken() {
        return new Promise((resolve, reject) => {
            google.accounts.id.revoke(this._socialUser.value.id, (response) => {
                if (response.error)
                    reject(response.error);
                else
                    resolve(this._socialUser.value);
            });
        });
    }
    getAccessToken() {
        return new Promise((resolve, reject) => {
            if (!this._tokenClient) {
                if (this._socialUser.value) {
                    reject('No token client was instantiated, you should specify some scopes.');
                }
                else {
                    reject('You should be logged-in first.');
                }
            }
            else {
                this._tokenClient.requestAccessToken({
                    hint: this._socialUser.value?.email,
                });
                this._receivedAccessToken.pipe(take(1)).subscribe(resolve);
            }
        });
    }
    revokeAccessToken() {
        return new Promise((resolve, reject) => {
            if (!this._tokenClient) {
                reject('No token client was instantiated, you should specify some scopes.');
            }
            else if (!this._accessToken.value) {
                reject('No access token to revoke');
            }
            else {
                google.accounts.oauth2.revoke(this._accessToken.value, () => {
                    this._accessToken.next(null);
                    resolve();
                });
            }
        });
    }
    signIn() {
        return Promise.reject('You should not call this method directly for Google, use "<asl-google-signin-button>" wrapper ' +
            'or generate the button yourself with "google.accounts.id.renderButton()" ' +
            '(https://developers.google.com/identity/gsi/web/guides/display-button#javascript)');
    }
    async signOut() {
        google.accounts.id.disableAutoSelect();
        this._socialUser.next(null);
    }
      createSocialUser(idToken) {
          const user = new SocialUser();
          user.idToken = idToken;
          const payload = this.decodeJwt(idToken);
          user.id = payload.sub;
          user.name = payload.name;
          user.email = payload.email;
          user.photoUrl = payload.picture;
          user.firstName = payload['given_name'];
          user.lastName = payload['family_name'];
          return user;
      }
      decodeJwt(idToken) {
          const base64Url = idToken.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(window.atob(base64)
              .split("")
              .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
              .join(""));
          return JSON.parse(jsonPayload);
      }
}
GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';

/**
 * The service encapsulating the social login functionality. Exposes methods like
 * `signIn`, `signOut`. Also, exposes an `authState` `Observable` that one can
 * subscribe to get the current logged in user information.
 *
 * @dynamic
 */
class SocialAuthService {
    /**
     * @param config A `SocialAuthServiceConfig` object or a `Promise` that resolves to a `SocialAuthServiceConfig` object
     */
    constructor(config, _ngZone, _injector) {
        this._ngZone = _ngZone;
        this._injector = _injector;
        this.providers = new Map();
        this.autoLogin = false;
        this._user = null;
        this._authState = new ReplaySubject(1);
        /* Consider making this an enum comprising LOADING, LOADED, FAILED etc. */
        this.initialized = false;
        this._initState = new AsyncSubject();
        if (config instanceof Promise) {
            config.then((config) => {
                this.initialize(config);
            });
        }
        else {
            this.initialize(config);
        }
    }
    /** An `Observable` that one can subscribe to get the current logged in user information */
    get authState() {
        return this._authState.asObservable();
    }
    /** An `Observable` to communicate the readiness of the service and associated login providers */
    get initState() {
        return this._initState.asObservable();
    }
    initialize(config) {
        this.autoLogin = config.autoLogin !== undefined ? config.autoLogin : false;
        const { onError = console.error } = config;
        config.providers.forEach((item) => {
            this.providers.set(item.id, 'prototype' in item.provider
                ? this._injector.get(item.provider)
                : item.provider);
        });
        Promise.all(Array.from(this.providers.values()).map((provider) => provider.initialize(this.autoLogin)))
            .then(() => {
            if (this.autoLogin) {
                const loginStatusPromises = [];
                let loggedIn = false;
                this.providers.forEach((provider, key) => {
                    const promise = provider.getLoginStatus();
                    loginStatusPromises.push(promise);
                    promise
                        .then((user) => {
                        this.setUser(user, key);
                        loggedIn = true;
                    })
                        .catch(console.debug);
                });
                Promise.all(loginStatusPromises).catch(() => {
                    if (!loggedIn) {
                        this._user = null;
                        this._authState.next(null);
                    }
                });
            }
            this.providers.forEach((provider, key) => {
                if (isObservable(provider.changeUser)) {
                    provider.changeUser.subscribe((user) => {
                        this._ngZone.run(() => {
                            this.setUser(user, key);
                        });
                    });
                }
            });
        })
            .catch((error) => {
            onError(error);
        })
            .finally(() => {
            this.initialized = true;
            this._initState.next(this.initialized);
            this._initState.complete();
        });
    }
    async getAccessToken(providerId) {
        const providerObject = this.providers.get(providerId);
        if (!this.initialized) {
            throw SocialAuthService.ERR_NOT_INITIALIZED;
        }
        else if (!providerObject) {
            throw SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND;
        }
        else if (!(providerObject instanceof GoogleLoginProvider)) {
            throw SocialAuthService.ERR_NOT_SUPPORTED_FOR_ACCESS_TOKEN;
        }
        return await providerObject.getAccessToken();
    }
    refreshAuthToken(providerId) {
        return new Promise((resolve, reject) => {
            if (!this.initialized) {
                reject(SocialAuthService.ERR_NOT_INITIALIZED);
            }
            else {
                const providerObject = this.providers.get(providerId);
                if (providerObject) {
                    if (typeof providerObject.refreshToken !== 'function') {
                        reject(SocialAuthService.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);
                    }
                    else {
                        providerObject
                            .refreshToken()
                            .then((user) => {
                            this.setUser(user, providerId);
                            resolve();
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    }
                }
                else {
                    reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
    refreshAccessToken(providerId) {
        return new Promise((resolve, reject) => {
            if (!this.initialized) {
                reject(SocialAuthService.ERR_NOT_INITIALIZED);
            }
            else if (providerId !== GoogleLoginProvider.PROVIDER_ID) {
                reject(SocialAuthService.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);
            }
            else {
                const providerObject = this.providers.get(providerId);
                if (providerObject instanceof GoogleLoginProvider) {
                    providerObject.revokeAccessToken().then(resolve).catch(reject);
                }
                else {
                    reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
    /**
     * A method used to sign in a user with a specific `LoginProvider`.
     *
     * @param providerId Id with which the `LoginProvider` has been registered with the service
     * @param signInOptions Optional `LoginProvider` specific arguments
     * @returns A `Promise` that resolves to the authenticated user information
     */
    signIn(providerId, signInOptions) {
        return new Promise((resolve, reject) => {
            if (!this.initialized) {
                reject(SocialAuthService.ERR_NOT_INITIALIZED);
            }
            else {
                let providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject
                        .signIn(signInOptions)
                        .then((user) => {
                        this.setUser(user, providerId);
                        resolve(user);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                else {
                    reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
    /**
     * A method used to sign out the currently loggen in user.
     *
     * @param revoke Optional parameter to specify whether a hard sign out is to be performed
     * @returns A `Promise` that resolves if the operation is successful, rejects otherwise
     */
    signOut(revoke = false) {
        return new Promise((resolve, reject) => {
            if (!this.initialized) {
                reject(SocialAuthService.ERR_NOT_INITIALIZED);
            }
            else if (!this._user) {
                reject(SocialAuthService.ERR_NOT_LOGGED_IN);
            }
            else {
                let providerId = this._user.provider;
                let providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject
                        .signOut(revoke)
                        .then(() => {
                        resolve();
                        this.setUser(null);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                else {
                    reject(SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
    setUser(user, id) {
        if (user && id)
            user.provider = id;
        this._user = user;
        this._authState.next(user);
    }
}
SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
SocialAuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
SocialAuthService.ERR_NOT_INITIALIZED = 'Login providers not ready yet. Are there errors on your console?';
SocialAuthService.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN = 'Chosen login provider is not supported for refreshing a token';
SocialAuthService.ERR_NOT_SUPPORTED_FOR_ACCESS_TOKEN = 'Chosen login provider is not supported for getting an access token';
SocialAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SocialAuthService, deps: [{ token: 'SocialAuthServiceConfig' }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
SocialAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SocialAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SocialAuthService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['SocialAuthServiceConfig']
                }] }, { type: i0.NgZone }, { type: i0.Injector }]; } });

class GoogleSigninButtonDirective {
    constructor(el, socialAuthService) {
        this.type = 'icon';
        this.size = 'medium';
        this.text = 'signin_with';
        this.shape = 'rectangular';
        this.theme = 'outline';
        this.logo_alignment = 'left';
        this.width = '';
        this.locale = '';
        socialAuthService.initState.pipe(take(1)).subscribe(() => {
            Promise.resolve(this.locale).then((value) => {
                console.log("value", value);
            });
            Promise.resolve(this.width).then((value) => {
                if (value > '400' || (value < '200' && value != '')) {
                    Promise.reject('Please note .. max-width 400 , min-width 200 ' +
                        '(https://developers.google.com/identity/gsi/web/tools/configurator)');
                }
                else {
                    google.accounts.id.renderButton(el.nativeElement, {
                        type: this.type,
                        size: this.size,
                        text: this.text,
                        width: this.width,
                        shape: this.shape,
                        theme: this.theme,
                        logo_alignment: this.logo_alignment,
                        locale: this.locale,
                    });
                }
            });
        });
    }
}
GoogleSigninButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: GoogleSigninButtonDirective, deps: [{ token: i0.ElementRef }, { token: SocialAuthService }], target: i0.ɵɵFactoryTarget.Directive });
GoogleSigninButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0", type: GoogleSigninButtonDirective, selector: "asl-google-signin-button", inputs: { type: "type", size: "size", text: "text", shape: "shape", theme: "theme", logo_alignment: "logo_alignment", width: "width", locale: "locale" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: GoogleSigninButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: 'asl-google-signin-button',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: SocialAuthService }]; }, propDecorators: { type: [{
                type: Input
            }], size: [{
                type: Input
            }], text: [{
                type: Input
            }], shape: [{
                type: Input
            }], theme: [{
                type: Input
            }], logo_alignment: [{
                type: Input
            }], width: [{
                type: Input
            }], locale: [{
                type: Input
            }] } });

/**
 * The main module of angularx-social-login library.
 */
class SocialLoginModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocialLoginModule is already loaded. Import it in the AppModule only');
        }
    }
    static initialize(config) {
        return {
            ngModule: SocialLoginModule,
            providers: [
                SocialAuthService,
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: config
                }
            ]
        };
    }
}
SocialLoginModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SocialLoginModule, deps: [{ token: SocialLoginModule, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule });
SocialLoginModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: SocialLoginModule, declarations: [GoogleSigninButtonDirective], imports: [CommonModule], exports: [GoogleSigninButtonDirective] });
SocialLoginModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SocialLoginModule, providers: [
        SocialAuthService
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SocialLoginModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GoogleSigninButtonDirective],
                    imports: [
                        CommonModule
                    ],
                    providers: [
                        SocialAuthService
                    ],
                    exports: [GoogleSigninButtonDirective]
                }]
        }], ctorParameters: function () { return [{ type: SocialLoginModule, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }]; } });

// Simulates login / logout without actually requiring an Internet connection.
//
// Useful for certain development situations.
//
// For example, if you want to simulate the greatest football referee England has ever produced:
//
//  const dummyUser: SocialUser = {
//     id: '0123456789',
//     name: 'Howard Webb',
//     email: 'howard@webb.com',
//     firstName: 'Howard',
//     lastName: 'Webb',
//     authToken: 'dummyAuthToken',
//     photoUrl: 'https://en.wikipedia.org/wiki/Howard_Webb#/media/File:Howard_Webb_march11.jpg',
//     provider: 'DUMMY',
//     idToken: 'dummyIdToken',
//     authorizationCode: 'dummyAuthCode'
// };
//
//  let config = new AuthServiceConfig([
//  { ... },
//  {
//       id: DummyLoginProvider.PROVIDER_ID,
//       provider: new DummyLoginProvider(dummyUser)  // Pass your user into the constructor
//   },
//  { ... }
//  ]);
class DummyLoginProvider extends BaseLoginProvider {
    constructor(dummy) {
        super();
        if (dummy) {
            this.dummy = dummy;
        }
        else {
            this.dummy = DummyLoginProvider.DEFAULT_USER;
        }
        // Start not logged in
        this.loggedIn = false;
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            if (this.loggedIn) {
                resolve(this.dummy);
            }
            else {
                reject('No user is currently logged in.');
            }
        });
    }
    initialize() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    signIn() {
        return new Promise((resolve, reject) => {
            this.loggedIn = true;
            resolve(this.dummy);
        });
    }
    signOut(revoke) {
        return new Promise((resolve, reject) => {
            this.loggedIn = false;
            resolve();
        });
    }
}
DummyLoginProvider.PROVIDER_ID = 'DUMMY';
DummyLoginProvider.DEFAULT_USER = {
    id: '1234567890',
    name: 'Mickey Mouse',
    email: 'mickey@mouse.com',
    firstName: 'Mickey',
    lastName: 'Mouse',
    authToken: 'dummyAuthToken',
    photoUrl: 'https://en.wikipedia.org/wiki/File:Mickey_Mouse.png',
    provider: 'DUMMY',
    idToken: 'dummyIdToken',
    authorizationCode: 'dummyAuthCode',
    response: {},
};

class FacebookLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {}) {
        super();
        this.clientId = clientId;
        this.requestOptions = {
            scope: 'email,public_profile',
            locale: 'en_US',
            fields: 'name,email,picture,first_name,last_name',
            version: 'v10.0',
        };
        this.requestOptions = {
            ...this.requestOptions,
            ...initOptions,
        };
    }
    initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.loadScript(FacebookLoginProvider.PROVIDER_ID, `//connect.facebook.net/${this.requestOptions.locale}/sdk.js`, () => {
                    FB.init({
                        appId: this.clientId,
                        autoLogAppEvents: true,
                        cookie: true,
                        xfbml: true,
                        version: this.requestOptions.version,
                    });
                    resolve();
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    let authResponse = response.authResponse;
                    FB.api(`/me?fields=${this.requestOptions.fields}`, (fbUser) => {
                        let user = new SocialUser();
                        user.id = fbUser.id;
                        user.name = fbUser.name;
                        user.email = fbUser.email;
                        user.photoUrl =
                            'https://graph.facebook.com/' +
                                fbUser.id +
                                '/picture?type=normal&access_token=' +
                                authResponse.accessToken;
                        user.firstName = fbUser.first_name;
                        user.lastName = fbUser.last_name;
                        user.authToken = authResponse.accessToken;
                        user.response = fbUser;
                        resolve(user);
                    });
                }
                else {
                    reject(`No user is currently logged in with ${FacebookLoginProvider.PROVIDER_ID}`);
                }
            });
        });
    }
    signIn(signInOptions) {
        const options = { ...this.requestOptions, ...signInOptions };
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                if (response.authResponse) {
                    let authResponse = response.authResponse;
                    FB.api(`/me?fields=${options.fields}`, (fbUser) => {
                        let user = new SocialUser();
                        user.id = fbUser.id;
                        user.name = fbUser.name;
                        user.email = fbUser.email;
                        user.photoUrl =
                            'https://graph.facebook.com/' +
                                fbUser.id +
                                '/picture?type=normal';
                        user.firstName = fbUser.first_name;
                        user.lastName = fbUser.last_name;
                        user.authToken = authResponse.accessToken;
                        user.response = fbUser;
                        resolve(user);
                    });
                }
                else {
                    reject('User cancelled login or did not fully authorize.');
                }
            }, options);
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                resolve();
            });
        });
    }
}
FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';

class AmazonLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {
        scope: 'profile',
        scope_data: {
            profile: { essential: false },
        },
        redirect_uri: location.origin,
    }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
    }
    initialize() {
        let amazonRoot = null;
        if (document) {
            amazonRoot = document.createElement('div');
            amazonRoot.id = 'amazon-root';
            document.body.appendChild(amazonRoot);
        }
        window.onAmazonLoginReady = () => {
            amazon.Login.setClientId(this.clientId);
        };
        return new Promise((resolve, reject) => {
            try {
                this.loadScript('amazon-login-sdk', 'https://assets.loginwithamazon.com/sdk/na/login1.js', () => {
                    resolve();
                }, amazonRoot);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            let token = this.retrieveToken();
            if (token) {
                amazon.Login.retrieveProfile(token, (response) => {
                    if (response.success) {
                        let user = new SocialUser();
                        user.id = response.profile.CustomerId;
                        user.name = response.profile.Name;
                        user.email = response.profile.PrimaryEmail;
                        user.response = response.profile;
                        resolve(user);
                    }
                    else {
                        reject(response.error);
                    }
                });
            }
            else {
                reject(`No user is currently logged in with ${AmazonLoginProvider.PROVIDER_ID}`);
            }
        });
    }
    signIn(signInOptions) {
        const options = { ...this.initOptions, ...signInOptions };
        return new Promise((resolve, reject) => {
            amazon.Login.authorize(options, (authResponse) => {
                if (authResponse.error) {
                    reject(authResponse.error);
                }
                else {
                    amazon.Login.retrieveProfile(authResponse.access_token, (response) => {
                        let user = new SocialUser();
                        user.id = response.profile.CustomerId;
                        user.name = response.profile.Name;
                        user.email = response.profile.PrimaryEmail;
                        user.authToken = authResponse.access_token;
                        user.response = response.profile;
                        this.persistToken(authResponse.access_token);
                        resolve(user);
                    });
                }
            });
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            try {
                amazon.Login.logout();
                this.clearToken();
                resolve();
            }
            catch (err) {
                reject(err.message);
            }
        });
    }
    persistToken(token) {
        localStorage.setItem(`${AmazonLoginProvider.PROVIDER_ID}_token`, token);
    }
    retrieveToken() {
        return localStorage.getItem(`${AmazonLoginProvider.PROVIDER_ID}_token`);
    }
    clearToken() {
        localStorage.removeItem(`${AmazonLoginProvider.PROVIDER_ID}_token`);
    }
}
AmazonLoginProvider.PROVIDER_ID = 'AMAZON';

class VKLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {
        fields: 'photo_max,contacts',
        version: '5.124',
    }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
        this.VK_API_URL = '//vk.com/js/api/openapi.js';
        this.VK_API_GET_USER = 'users.get';
    }
    initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.loadScript(VKLoginProvider.PROVIDER_ID, this.VK_API_URL, () => {
                    VK.init({
                        apiId: this.clientId,
                    });
                    resolve();
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => this.getLoginStatusInternal(resolve, reject));
    }
    signIn() {
        return new Promise((resolve, reject) => this.signInInternal(resolve, reject));
    }
    signOut() {
        return new Promise((resolve, reject) => {
            VK.Auth.logout((response) => {
                resolve();
            });
        });
    }
    signInInternal(resolve, reject) {
        VK.Auth.login((loginResponse) => {
            if (loginResponse.status === 'connected') {
                this.getUser(loginResponse.session.mid, loginResponse.session.sid, resolve);
            }
        });
    }
    getUser(userId, token, resolve) {
        VK.Api.call(this.VK_API_GET_USER, {
            user_id: userId,
            fields: this.initOptions.fields,
            v: this.initOptions.version,
        }, (userResponse) => {
            resolve(this.createUser(Object.assign({}, { token }, userResponse.response[0])));
        });
    }
    getLoginStatusInternal(resolve, reject) {
        VK.Auth.getLoginStatus((loginResponse) => {
            if (loginResponse.status === 'connected') {
                this.getUser(loginResponse.session.mid, loginResponse.session.sid, resolve);
            }
        });
    }
    createUser(response) {
        const user = new SocialUser();
        user.id = response.id;
        user.name = `${response.first_name} ${response.last_name}`;
        user.photoUrl = response.photo_max;
        user.authToken = response.token;
        return user;
    }
}
VKLoginProvider.PROVIDER_ID = 'VK';

/**
 * Protocol modes supported by MSAL.
 */
var ProtocolMode;
(function (ProtocolMode) {
    ProtocolMode["AAD"] = "AAD";
    ProtocolMode["OIDC"] = "OIDC";
})(ProtocolMode || (ProtocolMode = {}));
const COMMON_AUTHORITY = 'https://login.microsoftonline.com/common/';
/**
 * Microsoft Authentication using MSAL v2: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser
 */
class MicrosoftLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions) {
        super();
        this.clientId = clientId;
        this.initOptions = {
            authority: COMMON_AUTHORITY,
            scopes: ['openid', 'email', 'profile', 'User.Read'],
            knownAuthorities: [],
            protocolMode: ProtocolMode.AAD,
            clientCapabilities: [],
            cacheLocation: 'sessionStorage'
        };
        this.initOptions = {
            ...this.initOptions,
            ...initOptions
        };
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(MicrosoftLoginProvider.PROVIDER_ID, 'https://alcdn.msauth.net/browser/2.13.1/js/msal-browser.min.js', () => {
                try {
                    const config = {
                        auth: {
                            clientId: this.clientId,
                            redirectUri: this.initOptions.redirect_uri ?? location.origin,
                            authority: this.initOptions.authority,
                            knownAuthorities: this.initOptions.knownAuthorities,
                            protocolMode: this.initOptions.protocolMode,
                            clientCapabilities: this.initOptions.clientCapabilities
                        },
                        cache: !this.initOptions.cacheLocation ? null : {
                            cacheLocation: this.initOptions.cacheLocation
                        }
                    };
                    this._instance = new msal.PublicClientApplication(config);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    getSocialUser(loginResponse) {
        return new Promise((resolve, reject) => {
            //After login, use Microsoft Graph API to get user info
            let meRequest = new XMLHttpRequest();
            meRequest.onreadystatechange = () => {
                if (meRequest.readyState == 4) {
                    try {
                        if (meRequest.status == 200) {
                            let userInfo = JSON.parse(meRequest.responseText);
                            let user = new SocialUser();
                            user.provider = MicrosoftLoginProvider.PROVIDER_ID;
                            user.id = loginResponse.idToken;
                            user.authToken = loginResponse.accessToken;
                            user.name = loginResponse.idTokenClaims.name;
                            user.email = loginResponse.account.username;
                            user.idToken = loginResponse.idToken;
                            user.response = loginResponse;
                            user.firstName = userInfo.givenName;
                            user.lastName = userInfo.surname;
                            resolve(user);
                        }
                        else {
                            reject(`Error retrieving user info: ${meRequest.status}`);
                        }
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            };
            //Microsoft Graph ME Endpoint: https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http
            meRequest.open('GET', 'https://graph.microsoft.com/v1.0/me');
            meRequest.setRequestHeader('Authorization', `Bearer ${loginResponse.accessToken}`);
            try {
                meRequest.send();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async getLoginStatus() {
        const accounts = this._instance.getAllAccounts();
        if (accounts?.length > 0) {
            const loginResponse = await this._instance.ssoSilent({
                scopes: this.initOptions.scopes,
                loginHint: accounts[0].username
            });
            return await this.getSocialUser(loginResponse);
        }
        else {
            throw `No user is currently logged in with ${MicrosoftLoginProvider.PROVIDER_ID}`;
        }
    }
    async signIn() {
        const loginResponse = await this._instance.loginPopup({
            scopes: this.initOptions.scopes,
            prompt: this.initOptions.prompt,
        });
        return await this.getSocialUser(loginResponse);
    }
    async signOut(revoke) {
        const accounts = this._instance.getAllAccounts();
        if (accounts?.length > 0) {
            await this._instance.logoutPopup({
                account: accounts[0],
                postLogoutRedirectUri: this.initOptions.logout_redirect_uri ?? this.initOptions.redirect_uri ?? location.href
            });
        }
    }
}
MicrosoftLoginProvider.PROVIDER_ID = 'MICROSOFT';

/**
 * Generated bundle index. Do not edit.
 */

export { AmazonLoginProvider, BaseLoginProvider, DummyLoginProvider, FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonDirective, MicrosoftLoginProvider, SocialAuthService, SocialLoginModule, SocialUser, VKLoginProvider };
//# sourceMappingURL=abacritt-angularx-social-login.mjs.map
