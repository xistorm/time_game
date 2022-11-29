

export class AuthService {

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
        return users[name];
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

    static login(user) {
        if (user.name.length < 5 || user.name.length > 15 || !(/[a-zA-Z]+/g).test(user.name)) {
            throw new Error('Не соответствует формату');
        }

        const parsedUser = this.userExist(user.name) ? JSON.stringify(user) : this.#getUserByName(user.name);
        this.#updateUserList(user);
        localStorage.setItem('user', parsedUser);

        return user;
    }

    static logout() {
        localStorage.removeItem('user');
        return null;
    }

}