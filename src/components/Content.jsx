import './style.css'


export const Content = ({view, site}) => {
    
    const classname=view?'hiden mostrar':'hiden'
    return (
        <div className={classname} >hola nose que sera esto la ptmr
            {site}
        </div>
    )
}