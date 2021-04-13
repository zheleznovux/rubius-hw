import { useContext } from 'react';
import bem from 'easy-bem';
import cn from 'classnames';
import mastersContext from '../../../contexts/mastersContext'
import './Master.scss';

const b = bem('Master');

export default function Master({ master, className}) {

    const { id, photo, patronymic, firstName, surName, position } = master;
    const _className = cn(b(), className);
    const _photo = photo || 'https://1.bp.blogspot.com/-xiL6L9a8dFc/WZgdlWha4WI/AAAAAAAAAYQ/dok77V8_3gwFn3lP75OEROBjmAZht01vACPcBGAYYCw/s1600/face_female_blank_user_avatar_mannequin-512.png';

    const { removeMaster } = useContext(mastersContext);

    return (
        <div className={_className}>
            <div className={b('photo')} style={{ backgroundImage:`url(${_photo})` }}>
            </div>

            <div className={b('name') }>{firstName + ' ' + patronymic + ' ' + surName}</div>
            <div className={b('position')}>{position}</div>
            <button className={b('btn') + ' btn'} onClick={() => removeMaster(id)}>Удалить мастера</button>   
        </div>
    )
}