import { useState, useEffect } from 'react';
import ApiService from '../api/api-service';
import OrdersForm from '../components/forms/OrdersForm';
import SortOrders from '../components/forms/SortOrders';
import Orders from '../components/Orders/Orders'
import OrdersContexts from '../contexts/ordersContext';
import bem from 'easy-bem';
import './Orders-page.scss';

export default function OrdersPage() {

    const b = bem('Orders-page');

    const [ orders, setOrders] = useState([]);
    const [ isFeature, setFeature] = useState(true);

    useEffect(() => {
		async function fetchData() {
			const orders = await ApiService.getOrders();

			setOrders(orders);
		}

		fetchData();
	}, [ isFeature]);

    async function createOrder(order) {
		try
		{
			await ApiService.addOrders(order);
			setFeature(!isFeature); //извините за костыль, пока думаю над решением) 
		}
		catch(err) 
		{
			alert("Заявка не была создана, возможно проблема на стороне сервера");
			console.error(err);
		}
	}
    
    async function updateOrders(data) {
        try
		{
			const orders = await ApiService.getSortedOrders(data);
            setOrders(orders);
		}
		catch(err) 
		{
			alert("Заявка не была создана, возможно проблема на стороне сервера");
			console.error(err);
		}
    }

    async function removeOrder(id) {
        const conf = window.confirm('Вы уверены?');
		if(conf) {
            try 
            {
                await ApiService.deleteOrders(id);
                setFeature(!isFeature);
            } 
            catch(err)
            {
                alert("Заявка не была удалёна, возможно проблема на стороне сервера");
                console.error(err);
            }
        } else {
            return null;
        }
	}

    async function editOrder(id, data) {
		try 
		{
			await ApiService.changeOrder(id, data);
            setFeature(!isFeature);
		} 
		catch(err)
		{
			alert("Заявка не была отредактирована, возможно проблема на стороне сервера");
			console.error(err);
		}
	}

   
    return (
        <>
            <OrdersForm className={b('new-orders-form')} onSubmit = {createOrder}/>
            <SortOrders className={b('sort-orders-form')} onSubmit = {updateOrders}/>

            <OrdersContexts.Provider value={{ removeOrder, editOrder }}>
                {orders.length === 0 ?
                    <p>Нет данных</p> :
                    <Orders className={b('orders')} orders={orders}/>}
            </OrdersContexts.Provider>

        </>

    );
}