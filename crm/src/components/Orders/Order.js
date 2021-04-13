import { useContext, useState } from 'react';
import bem from 'easy-bem';
import ordersContext from '../../contexts/ordersContext';
import OrderEditor from './OrderEditor';
import './Order.scss';
import '../../components/btn.scss'

const b = bem('Order');

export default function Order({  className, order}) {
    const { id, customer, master = '', service = '', visitDate = '', status } = order;
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    
    function getDate(visitDate) {
        try
        {
            var dateParsed = new Date();
            dateParsed = Date.parse(visitDate);
            var _visitDate = new Intl.DateTimeFormat('ru-RU').format(dateParsed);    
            return _visitDate;
        } 
        catch(err) 
        {
            if(err.name !== 'RangeError'){
                console.error(err);
            }
            return 'Не выбрана';
        }
    }
    const _visitDate = getDate(visitDate);

    const { removeOrder } = useContext(ordersContext);

    return (
        <tr>
            <td>{id}</td>
            <td>{customer.fullName}</td>
            <td>{customer.phone}</td>
            <td>{master.fullName?master.fullName:'Не выбран'}</td>
            <td>{service.name?service.name:'Не выбрана'}</td>
            <td>{_visitDate}</td>
            <td>{status}</td>
            <td>
                <button className={b('btn') + ' btn'} onClick={() => removeOrder(id)}>Удалить</button>
                <button className={b('btn') + ' btn'} onClick={() => setIsModalOpen(true)}>Изменить</button>
                
                <OrderEditor isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={id}></OrderEditor>
            </td>
        </tr>
    )
}