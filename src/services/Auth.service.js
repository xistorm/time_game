

export class AuthService {

    static getUser() {
        const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        return parsedUser;
    }

    static login(user) {
        const parsedUser = JSON.stringify(user);
        localStorage.setItem('user', parsedUser);

        return user;
    }

    static logout() {
        localStorage.removeItem('user');
        return null;
    }

}