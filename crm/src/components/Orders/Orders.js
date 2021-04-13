import bem from 'easy-bem';
import Order from './Order';
import Table from 'react-bootstrap/Table';

export default function Orders({ orders }) {

    const b = bem('Orders');

    return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Закзчик</th>
                    <th>Телефон</th>
                    <th>Мастер</th>
                    <th>Услуга</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Отредактировать</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(item => 
                        <Order
                            className={b('item') + ' col-3'}
                            key={item.id} 
                            order={item} 
                        />
                    )}
                </tbody>
            </Table>
    )
}