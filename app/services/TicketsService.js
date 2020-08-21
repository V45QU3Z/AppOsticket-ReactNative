import { environment } from '../../environment/environment';
import AsyncStorage from '@react-native-community/async-storage';

export default class TicketService {

    static async getAllTickets(page, limit){
        let email = await AsyncStorage.getItem('email');
        let apikey = await AsyncStorage.getItem('userToken');
        let result = await fetch(`${environment.BASE_URL}/tickets/tickets_email.php?email=${email}
                                    &apikey=${apikey}&page=${page}&limit=${limit}`);
        let res = await result.json();
        return res;
    } 

    static async getAllTicketForParameter(ticket, state, page, limit){
        let email = await AsyncStorage.getItem('email');
        //let email = 'manuel.suica1984@gmail.com';
        let apikey = await AsyncStorage.getItem('userToken');
        let result = await fetch(`${environment.BASE_URL}/tickets/tickets_email_new.php?email=${email}
                                &apikey=${apikey}&ticket=${ticket}&state=${state}&page=${page}&limit=${limit}`);
        let res = await result.json();
        return res;
    } 

    static async getAllTicketsNumber(number){
        //header: {}
        let apikey = await AsyncStorage.getItem('userToken');
        let result = await fetch(`${environment.BASE_URL}/tickets/ticket_number.php?number=${number}&apikey=${apikey}`);
        let res = await result.json();
        return res;
    } 
    static async getTicketCreated(subject){
        let result = await fetch(`${environment.BASE_URL}/tickets/ticket_created_resp.php?subject=${subject}`);
        let res = await result.json();
        return res;
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
            console.log(error)
        }
    }

}

