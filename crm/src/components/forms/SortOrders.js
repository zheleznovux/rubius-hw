import { useRef, useState, useEffect } from 'react';
import bem from 'easy-bem';
import cn from 'classnames';

export default function SortOrdersForm({ className, onSubmit }) {

    const form = useRef(null);
    const b = bem('Orders-form');
    const _className = cn(b(), className);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    function handleForm(event) {
        event.preventDefault();
        
        var _fromDate = '',
            _toDate = '';

        if (fromDate) {
            _fromDate = new Date(fromDate).toISOString();
        }
        if(toDate) {
            _toDate = new Date(toDate).toISOString();
        }

        const data = {
            _fromDate,
            _toDate,
            status,
            search
        }

        onSubmit(data);
    }

    return (
        <form className={_className} ref={form} onSubmit={handleForm}>
            <h3>Сортировка</h3>
            <div className={b('control-select')}>
                <label>Отсортировать по вермени:</label>
                от:<input name="from"  type='date' value={fromDate} onChange={event => setFromDate(event.target.value)}     placeholder="Дата начала периода"/>
                до:<input name="to"    type='date' value={toDate} onChange={event => setToDate(event.target.value)}         placeholder="Дата конца периода"/>
            </div>

            <div className={b('control-select')}>
                <label>Отсортировать по статусу:</label>
                <select  value={status} onChange={event => setStatus(event.target.value)}>
                    <option value=''>Не выбран</option>
                    <option value='Opened'>Открыт</option>
                    <option value='Closed'>Закрыт</option>
                </select>
            </div>

            <div className={b('control-select')}>
                <label>Поисковый запрос по ФИО клиента:</label>
                <input value={search} onChange={event => setSearch(event.target.value)}   placeholder="ФИО клиента"/>
            </div>
            
            <button className={b('btn') + ' btn'}>Отсортировать</button>
        </form>
    )
}