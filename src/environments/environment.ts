// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

class Environment {
  production: boolean;
  api: string;
  images: string;
  constructor(init?: Partial<Environment>) {
    Object.assign(this, init);
  }
}

export const environment = new Environment({
  production: false,
  api: 'https://api.rotomdex.app/api/',
  images: 'https://images.rotomdex.app/',
});

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
