import { environment } from '../../environment/environment';
import AsyncStorage from '@react-native-community/async-storage';

export default class TicketService {

    static async getAllTicketForParameter(ticket, state, page, limit){
        let email='';
        let apikey='';
        try {
            email = await AsyncStorage.getItem('email');
            apikey = await AsyncStorage.getItem('userToken');
        } catch (error) {
            console.log('Error: get token or email', error)
        }
        try {
            let result = await fetch(`${environment.BASE_URL}/tickets/tickets_email_new.php?email=${email}&apikey=${apikey}&ticket=${ticket}&state=${state}&page=${page}&limit=${limit}`);
            let res = await result.json();
            return res;
        } catch (error) {
            console.log('Error: get tickets for parameter')
        }
    } 

    static async create(tickets){
        try {
            let apikey = await AsyncStorage.getItem('userToken');
            console.log(apikey)
            let result = await fetch(`${environment.BASE_URL}/tickets.json`,
                            {  //mode: 'no-cors',
                                method: 'POST',
                                headers: {
                                    'X-API-Key': apikey
                            }, body: JSON.stringify(tickets)
                        });
            let ticket = await result.json();
            return ticket;
        } catch (error) {
            console.log('Error: create tickets failed ',error)
        }
    }

}
