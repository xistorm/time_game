

export class AuthService {

    static emptyUser = {
        name: '',
        rating: 0,
        level: 0,
    }

    static #saveUser(user) {
        const parsedUser = JSON.stringify(user);
        localStorage.setItem('user', parsedUser);
        this.#updateUserList(user);
    }

    static #updateUserList(user) {
        const { name, ...data } = user;
        const users = this.#getUserList();
        users[name] = data;

        const parsedUsers = JSON.stringify(users);
        localStorage.setItem('users', parsedUsers);
    }

    static #getUserList() {
        const users = localStorage.getItem('users');
        const parsedUsers = JSON.parse(users) || {};

        return parsedUsers;
    }

    static #getUserByName(name) {
        const users = this.#getUserList();
        return { name, ...users[name] };
    }

    static getUser() {
        const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        return parsedUser;
    }

    static userExist(name) {
        const users = this.#getUserList();

        return name in users;
    }

    static update(user) {
        this.#saveUser(user);
        return user;
    }

    static login(user) {
        if (user.name.length < 5 || user.name.length > 15 || !(/[a-zA-Z]+/g).test(user.name)) {
            throw new Error('Не соответствует формату');
        }

        const userFullInfo = this.userExist(user.name) ?
            this.#getUserByName(user.name) :
            { ...this.emptyUser, ...user };
        this.#saveUser(userFullInfo);

        return userFullInfo;
    }

    static logout() {
        localStorage.removeItem('user');
        return null;
    }

}