// import Router from "./core/router";
// import { NewsFeedView, NewsDetailView } from "./page";
// import Store from './store';

// //import { Store } from './types';

// // const store: Store = {
// //   currentPage: 1,
// //   feeds: [],
// // };

// // declare global {
// //   interface Window {
// //     store: Store;
// //   }
// // }

// // window.store = store;

// const store = new Store();

// const router: Router = new Router();
// const newsFeedView = new NewsFeedView('root', store);
// const newsDetailView = new NewsDetailView('root', store);

// router.setDefaultPage(newsFeedView);

// router.addRoutePath('/page/', newsFeedView, /page\/(\d+)/);
// router.addRoutePath('/show/', newsDetailView, /show\/(\d+)/);

// // router.route();
// router.go();

import template from './app.template';
import { CantContainWhitespace, CantStartNumber, MinimumLengthLimit } from './constant';
import { AnyObject } from './types';
import { TextField, PasswordField, AddressField } from './views';

export default class App {
    template = template;
    data: AnyObject;
    container: HTMLElement;
    fields: AnyObject[];
    active: boolean = false;

    constructor(container: string, data: AnyObject = {}) {
        this.container = document.querySelector(container) as HTMLElement;
        this.data = data;
        this.fields = [];

        this.initialize();

        setInterval(this.validFieldMonitor, 1000/30);
    }

    private initialize = () => {
        const nameField = new TextField('#required-fields', {
            id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요', require: true,
        });

        const idField = new TextField('#required-fields', {
            id: 'id', label: '아이디', type: 'text', placeholder: '아이디를 입력해주세요', require: true,
        });

        const emailField = new TextField('#required-fields', {
            id: 'email', label: '이메일', type: 'email', placeholder: '이메일을 입력해주세요', require: true,
        });
    }
}

