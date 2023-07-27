import axios from "../commen/axios";

class AuthService {
    postLogin = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('user/auth/login', data)  
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        });

        return await promise;
    }
}

const authService = new AuthService();
export default authService;