import { useEffect, useState } from 'react';
import Masters from "../components/Masters/Masters";
import MastersForm from '../components/forms/MastersForm';
import MastersContexts from '../contexts/mastersContext';
import ApiService from '../api/api-service';
import bem from 'easy-bem';
import './Masters-page.scss';

const b = bem('Masters-page');

export default function MastersPage() {

    const[masters, setMasters] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const masters = await ApiService.getMasters();

			setMasters(masters);
		}

		fetchData();
	}, []);

	async function createMaster(master, formData) {
		const { id } = masters[masters.length - 1];
		master.id = id+1;	
		try
		{
			await ApiService.addMasters(formData);
			setMasters(masters.concat(master));
		}
		catch(err) 
		{
			alert("Мастер не был создан, возможно проблема на стороне сервера");
			console.error(err);
		}
	}

	async function removeMaster(id) {
		const conf = window.confirm('Вы уверены?');
		if(conf) {
			try 
			{
				setMasters(masters.filter(m => m.id !== id));
				await ApiService.deleteMasters(id);
			} 
			catch(err)
			{
				alert("Мастер не был удалён, возможно проблема на стороне сервера");
				console.error(err);
			}
		} else {
			return null;
		}
	}

    return (
        <>
            <MastersForm className={b('form')} onSubmit = {createMaster} />

            <MastersContexts.Provider value={{ removeMaster}}>
                {masters.length === 0 ?
                    <p>Нет данных</p> :
                    <Masters className={b('content')} masters={masters}/>}
            </MastersContexts.Provider>
        </>
    )
}