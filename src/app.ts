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
import addressFieldTemplate from './views/address-field.template';

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

        const passwordField = new PasswordField('#required-fields', {
            id: 'password', label: '비밀번호', placeholder: '비밀번호를 입력해주세요',
        });

        const addressField = new AddressField('#optional-fields', {
            id: 'address', label: '배송지 주소',
        });

        idField.addValidateRule(CantContainWhitespace);
        idField.addValidateRule(CantStartNumber);
        idField.addValidateRule(MinimumLengthLimit(3));

        emailField.addValidateRule(CantContainWhitespace);
    
        this.fields.push(nameField);
        this.fields.push(idField);
        this.fields.push(emailField);
        this.fields.push(passwordField);
        this.fields.push(addressField);
    }

    private validFieldMonitor = () => {
        const btnJoin = this.container.querySelector('#btn-join') as HTMLButtonElement;

        if (this.fields.filter(field => field.isValid).length === this.fields.length) {
            this.active = true;
            btnJoin.classList.remove('bg-gray-300');
            btnJoin.classList.add('bg-green-500');
        } else {
            this.active = false;
            btnJoin.classList.remove('bg-green-500');
            btnJoin.classList.add('bg-gray-300');
        } 
    }

    private onSubmit = (e: Event) => {
        e.preventDefault();

        if (!this.active) return;

        const submitData: AnyObject = this.fields
            .map(field => ({ [field.name]: field.value }))
            .reduce((a, b) => ({ ...a, ...b }), {});

        console.log(submitData);
    }

    public render = () => {
        this.container.innerHTML = this.template(this.data);
        this.fields.forEach(field => {
            field.render(true);
        });

        this.container.addEventListener('submit', this.onSubmit);
    }
}

