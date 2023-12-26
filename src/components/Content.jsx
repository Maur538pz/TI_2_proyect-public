import "./style.css";
import { CardInformation } from "./CardInformation.jsx";
import { CategoryToggle } from "./CategoryToggle.jsx";
import data from "../data/contentPage.json";
import { useState, useEffect } from "react";

export const Content = ({ view, site }) => {
  const [changeCategory, setChangeCategory] = useState(false);
  const [cardsRow, setCardsRow] = useState([[],[]]);

  const classname = view ? "hiden mostrar" : "hiden";
  useEffect(() => {
    if(site!==''){
        const departament = site
        const temp = data.filter( e => e.title===departament.toLowerCase());
        //setDataTemp(temp[0])
        
        if ( temp.length>0 && Object.keys(temp[0]).length > 0){
            const aux = temp[0]
            const matrixCards = []
            const cardsEcosistemas = aux.ecosistemas.map(e => <CardInformation key={e.title} rowData={e}/>)
            matrixCards.push(cardsEcosistemas)
            const cardsAnimals = aux.animales.map(e => <CardInformation 
            key={e.title} rowData={e}/>)
            matrixCards.push(cardsAnimals)
            setCardsRow(matrixCards)
        }
    }
  }, [site]);
  return (
    <div className={classname}>
      <CategoryToggle
        toggleCat={changeCategory}
        setToggleCat={setChangeCategory}
      />
        {!changeCategory ? cardsRow[0] : cardsRow[1]}
    </div>
  );
};
