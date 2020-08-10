import { environment } from '../../environment/environment';

export default class AuthServcie {

    static async signIn(email, password, role){
        try {
            let result = await fetch(`${environment.AUTH_URL}?email=${email}&password=${password}&role=${role}`);
            let res = await result.json();
            return res;   
        } catch (error) {
            console.log({
                ok: false,
                message: 'server connection error', 
                error: error})
        }
    } 

    /* static signIn(username, password){
        let url =  `${environment.AUTH_URL}?email=${username}&password=${password}`;
        let res = fetch(url).then(result => {
            result.json();
        }).catch(e => {
            console.log('Error de peticion: ', e)
        });
        return res;
    } */


}
