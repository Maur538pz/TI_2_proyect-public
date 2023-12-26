import './style.css'

export const OrgsNames = ({data}) => {
    const orgs = data.length > 0 ? data.map(e => <details className='li-orgName' key={e[0]+e[1]} name="orgs">
        <summary className='orgName'>{e[0]}</summary>
        <span className='orgName-name'>{e[1]}</span>
        

        
    </details>) : []
    return (
        <ul className='ul-orgName'>
            {orgs}
        </ul>
    )
}