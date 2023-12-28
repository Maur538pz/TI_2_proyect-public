import { useEffect,useState } from 'react'
import './style.css'
import { OrgsNames } from './OrgsNames.jsx'
import data2 from '../data/iniciativas.json'
 
export const Iniciativas = ({view, site}) => {
    const [data, setData] = useState([])
    
    //const siteMin = `http://localhost:3000/scraping/${site}`
    const classname=view?'iniciativas present':'iniciativas'
    const [contador, setContador] = useState(0)
/*
    useEffect(()=>{
        setData([])
        if(site!==''){
            fetch(siteMin)
            .then(response => response.json())
            .then(data =>{
                setData(data)
                console.log(data)
            } )
            .catch(error =>console.error('Error',error))
            setContador(0)
        }
 
    },[site,siteMin])

    useEffect(()=>{
        const objetivo = data.length-1
        const intervalo = setInterval(()=>{
            if(contador < objetivo){
                setContador(contador => contador+1)
            }
        },100);

        return () => clearInterval(intervalo)
        

    },[contador,data])

    */

    useEffect(()=>{
        setData([])
        if(site!==''){
            const siteAux = site.toLowerCase()
            const cont = data2.filter(e => e.site ===siteAux)
            if(cont.length>0){
                const aux2 =cont[0].arr
                setData(aux2)
            }
            else{
                setData([])
            }
            setContador(0)
        }
 
    },[site])

    useEffect(()=>{
        const objetivo = data.length-1
        const intervalo = setInterval(()=>{
            if(contador < objetivo){
                setContador(contador => contador+1)
            }
        },300);

        return () => clearInterval(intervalo)
        

    },[contador,data])

    return (
        <div className={classname}>
            <strong className='iniciativas-title'>Iniciativas</strong>
            <span className='iniciativas-counter'>{contador}</span>
            <OrgsNames data={data}/>
        </div>
    )
}