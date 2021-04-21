import './OrderEditor.scss';
import Table from 'react-bootstrap/Table';
import { useContext, useState } from 'react';
import OrdersContext from  '../../contexts/ordersContext';
import bem from 'easy-bem';
import '../../components/btn.scss';

export default function OrderEditor({isOpen, onClose, id}) {

    const [customerId, setCustomerId] = useState('');
    const [masterId, setMasterId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [_visitDate, setVisitDate] = useState('');
    const [status, setStatus] = useState('');
    const [finishStatus, setFinishStatus] = useState(''); 

    const b = bem('OrderEditor');

    const { editOrder } = useContext(OrdersContext);

    if(!isOpen) {
        return null;
    }

    function reset() {
        setCustomerId('');
        setMasterId('');
        setServiceId('');
        setVisitDate('');
        setStatus('');
        setFinishStatus('');
    }

    function close(e) {
        e.preventDefault();
        
        reset();
        onClose();
    }

    function endEdit(event) {
        var visitDate =_visitDate;

        if (_visitDate) {
            visitDate = new Date(_visitDate).toISOString();
        }

        const data = {
            customerId,
            masterId,
            serviceId,
            visitDate,
            status,
            finishStatus
        }

        editOrder(id, data);
        close(event);
    }

    return (
        <>
        <div className={b('content')}>
            <form className={b('form')}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Закзчик</th>
                        <th>Телефон</th>
                        <th>Мастер</th>
                        <th>Услуга</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input name="customerId" value={customerId} onChange={event => setCustomerId(event.target.value)} placeholder="id заказчика"/>
                        </td>

                        <td>
                            <input name="masterId"   value={masterId} onChange={event => setMasterId(event.target.value)} placeholder="id мастера"/>
                        </td>

                        <td>
                            <input name="masterId"   value={serviceId} onChange={event => setServiceId(event.target.value)} placeholder="id услуги"/>
                        </td>

                        <td>
                            <input type="date" name="visitDate" value={_visitDate} onChange={event => setVisitDate(event.target.value)}/>
                        </td>

                        <td>
                            <select  value={status} onChange={event => setStatus(event.target.value)}>
                                <option value=''>Не выбран</option>
                                <option value='Opened'>Открыт</option>
                                <option value='Closed'>Закрыт</option>
                            </select>
                        </td>

                        <td>
                            <select  value={finishStatus} onChange={event => setFinishStatus(event.target.value)}>
                                <option value=''>Не выбран</option>
                                <option value='Success'>Завершен</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </Table>  
                <button className={b('btn') + ' btn'} onClick={event => endEdit(event)}>Сохранить изменения</button>              
            </form>
        </div>
        <div className={b('background')} onClick={e => close(e)}/><div></div>
        </>
      )
    
}

