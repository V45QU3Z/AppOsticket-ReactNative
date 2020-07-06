import { environment } from '../../environment/environment';
import AsyncStorage from '@react-native-community/async-storage';

export default class TicketService {

    static async getAllTickets(email, apikey){
        //header: {}
        let result = await fetch(`${environment.BASE_URL}/http.php/tickets/clientTickets?clientUserMail=${email}`,
                            {headers: {                             
                                'X-API-Key': apikey
                            }});
        let res = await result.json();
        return res;
    } 

    static async getAllTicketsNumber(number){
        //header: {}
        let apikey = await AsyncStorage.getItem('userToken');
        let result = await fetch(`${environment.BASE_URL}/http.php/tickets/ticketInfo?ticketNumber=${number}`,
                            {headers: {                             
                                'X-API-Key': apikey
                            }});
        let res = await result.json();
        return res;
    } 

    static async create(tickets){
        try {
            let apikey = await AsyncStorage.getItem('userToken');
            console.log(apikey)
            let result = await fetch(`${environment.BASE_URL}/http.php/tickets.json`,
                            {  //mode: 'no-cors',
                                method: 'POST',
                                headers: {
                                    'X-API-Key': apikey
                            }, body: JSON.stringify(tickets)
                        });
            //let ticket = await result.json();
            return result;
        } catch (error) {
            console.log(error)
        }
    }

}

