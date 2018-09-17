declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue-awesome';
declare module 'vue-awesome/*';

declare module 'vue-checkbox-radio';
declare module 'vue-color';

declare let REMOTE: string;
declare let PROD: string;
declare let VERSION: string;
declare let COMMIT: string;
declare let COMMITS: {
  date: string,
  commit: string,
  subject: string,
  message: string
}[];

