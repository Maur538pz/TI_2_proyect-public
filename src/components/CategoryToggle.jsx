import './style.css'

export const CategoryToggle = ({toggleCat,setToggleCat}) => {
    const toggle = () => {
        setToggleCat(prev => !prev)
    }
    const classSelectCat = toggleCat ? 'cat-color move-category' : 'cat-color'
    return (
        <nav className='categories' >
            <div className='cont--category' onClick={toggle}>
                <span className='category'>Ecosistemas</span>
                <span className={classSelectCat}></span>
                <span className='category'>Animales</span>
            </div>
        </nav>
    )
}
