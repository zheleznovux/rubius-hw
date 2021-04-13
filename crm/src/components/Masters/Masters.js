import Master from './Master/Master'
import bem from 'easy-bem';
import './Masters.scss';
import cn from 'classnames';

export default function Masters({ className, masters }) {

    const b = bem('Masters');
    const _className = cn(b(), className) + ' row';

    return(
        <div className={_className}>
            {masters.map(item => 
                <Master 
                    className={b('item') + ' col-3'}
                    key={item.id} 
                    master={item} 
                />
            )}
        </div>
    )
}