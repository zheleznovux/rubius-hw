import { API_PATH } from '../constants';
import { HttpService } from '../services/http-service';

export class ApiService extends HttpService {

    constructor() {
        super(API_PATH);
    }

    getMasters() {
        return this.get('staff');
    }

    deleteMasters(id) {
        return this.delete('staff/' + id);
    }

    addMasters( newStaffBody) {
        return this.postForm('staff', newStaffBody);
    }

    getSaloonServices() {
        return this.get('services');
    }

    createOrder(order) {
        return this.post('orders', order);
    }

    getOrders() {
        return this.get('orders');
    }

    changeOrder(id, body) {
        const path = 'orders/' + id;
        return this.patch(path, body);
    }

    getSortedOrders(body) {
        const status = (body.status) ?
            `status=${body.status}` 
            : '';

        const fromDate = (body._fromDate) ?
            `&from=${body._fromDate}`
            : '';  

        const toDate = (body._toDate) ?
            `&to=${body._toDate}`
            : '';  

        const search  = (body.search) ?
            `&search=${encodeURIComponent(body.search)}`
            : '';  

        const path = status + fromDate + toDate + search;

        return this.get(`orders?${path}`);
    }

    deleteOrders(id) {
        return this.delete('orders/' + id);
    }

    addOrders( body ) {
        return this.post('orders', body);
    }

    login(authData) {
        return this.post('login', authData);
    }
}

export default new ApiService();