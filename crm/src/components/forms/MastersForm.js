import { useRef, useState } from 'react';
import './Masters-form.scss';
import bem from 'easy-bem';
import cn from 'classnames';

export default function MastersForm({ className, onSubmit }) {

    const form = useRef(null);
    const b = bem('Masters-form');
    const _className = cn(b(), className);

    const [surName, setSurName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [photo, setPhoto] = useState('');
    const [startWorkDate, setStartWorkDate] = useState('');
    const [position, setPosition] = useState('');

    function reset() {
        setSurName('');
        setFirstName('');
        setPatronymic('');
        setPhoto('');
        setPosition('');
        setStartWorkDate('');
    }

    function handleForm(event) {

        event.preventDefault();
        
        const formData = new FormData(form.current);

        const data = {
            firstName,
            patronymic,
            surName,
            position,
            startWorkDate,
            photo
        }

        reset();
        onSubmit(data, formData);
    }

    return (
        <form className={_className} ref={form} onSubmit={handleForm}>
            <input className={b('control')} name="firstName"  value={firstName} onChange={event => setFirstName(event.target.value)}             placeholder="Имя" required />
            <input className={b('control')} name="patronymic"  value={patronymic} onChange={event => setPatronymic(event.target.value)}          placeholder="Отчество" required />
            <input className={b('control')} name="surName"  value={surName} onChange={event => setSurName(event.target.value)}                   placeholder="Фамилия" required />
            <input className={b('control')} name="position"  value={position} onChange={event => setPosition(event.target.value)}                placeholder="Позиция" required/>
            <input className={b('control')} name="startWorkDate"  value={startWorkDate} onChange={event => setStartWorkDate(event.target.value)} placeholder="Дата начала работы"/>
            <input className={b('control')} name="photo"  value={photo} onChange={event => setPhoto(event.target.value)}                         placeholder="Ссылка на фотографию"/>
            <button className={b('btn') + ' btn'}>Добавить нового мастера</button>
        </form>
    )
}