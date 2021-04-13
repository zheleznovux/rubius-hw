import { useRef, useState, useEffect } from 'react';
import bem from 'easy-bem';
import cn from 'classnames';
import ApiService from '../../api/api-service';
import './Orders-form.scss';
import '../../components/btn.scss';

export default function OrdersForm({ className, onSubmit }) {

    const form = useRef(null);
    const b = bem('Orders-form');
    const _className = cn(b(), className);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [masterIdCollect, setMasterIdCollect] = useState([]);
    const [masterId, setMasterId] = useState('');
    const [serviceIdCollect, setServiceIdCollect] = useState([]);
    const [serviceId, setServiceId] = useState('');
    const [visitDate, setVisitDate] = useState('');

    function reset() {
        setName('');
        setPhone('');
        setVisitDate('');
        setMasterId('');
        setServiceId('');
    }

    useEffect(() => {
		async function fetchData() {
			const masterId = await ApiService.getMasters();
			const serviseId = await ApiService.getSaloonServices();

            setServiceIdCollect(serviseId);
			setMasterIdCollect(masterId);
		}

		fetchData();
	}, []);

    function handleForm(event) {

        event.preventDefault();

        const data = {
            name,
            phone,
            masterId,
            serviceId,
            visitDate
        }

        reset();
        onSubmit(data);
    }

    return (
        <form className={_className} ref={form} onSubmit={handleForm}>
            <h3>Новая заявка</h3>
            <div className={b('controls')}>
                <input className={b('control')} name="name"  value={name} onChange={event => setName(event.target.value)}     placeholder="ФИО" required />
                <input className={b('control')} name="phone" value={phone} onChange={event => setPhone(event.target.value)}   placeholder="Телефон" required />
            </div>

            <div   className={b('control-select')}>
                <label>Выберите мастера</label>
                <select name="masterId" value={masterId} onChange={event => setMasterId(event.target.value)}>
                    <option value>Не выбрана</option>
                    {masterIdCollect.map(item => 
                    <option key={item.id} value={item.id}>{item.fullName}</option>
                )}
                </select>
            </div>

            <div    className={b('control-select')}>
                <label>Выберите услугу</label>
                <select name="masterId" value={serviceId} onChange={event => setServiceId(event.target.value)}>
                    <option value>Не выбрана</option>
                    {serviceIdCollect.map(item => 
                    <option key={item.id} value={item.id}>{item.name}</option>
                )}
                </select>
            </div>

            <div className={b('control-select')}>
                <label>Выберите дату</label>
                <input type="date" name="visitDate" value={visitDate} onChange={event => setVisitDate(event.target.value)}></input>
            </div>
            
            <button className={b('btn') + ' btn'}>Добавить новую заявку</button>
        </form>
    )
}