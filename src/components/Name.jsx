
import './style.css'

export const Name = ({site}) => {
    const name = site
    const nameRender = name.replace(/_/g,' ')
    return (
        <div className='nameProvincia'>
            {nameRender}
        </div>
    )
}