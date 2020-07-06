import { environment } from '../../environment/environment';
import AsyncStorage from '@react-native-community/async-storage';

export default class DashboardService {
    //{{url_osticket}}/api/dashboard/main.php?mes=julio&anio=2020&apikey=3F703EC2DECE6917C16FDEE2F88E3660
    static async getAllDashboard(mes, anio, apikey){
        //header: {}
        let result = await fetch(`${environment.BASE_URL}/dashboard/main.php?mes=${mes}&anio=${anio}&apikey=${apikey}`);
        let res = await result.json();
        return res;
    }

    static async getAllDashboardForUser(mes, anio, email, apikey){
        //header: {}
        let result = await fetch(`${environment.BASE_URL}/dashboard/user_account.php?mes=${mes}&anio=${anio}&email=${email}&apikey=${apikey}`);
        let res = await result.json();
        return res;
    }

}