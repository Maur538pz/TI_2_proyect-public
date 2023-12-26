import "./style.css";
import { useState } from "react";
import { StatusComponent } from './StatusComponent.jsx'
export const CardInformation = ({rowData}) => {
  const [viewText, setViewText] = useState(false);
  const toggleText = () => {
    setViewText((prev) => !prev);
  };
  const classText = viewText ? 'text-acordion view-text-card':'text-acordion'
  const textButton = viewText ? 'Mostrar menos' : 'Mostrar mas'
  const displayContent = viewText ? 'displayText viewText' : 'displayText'
  return (
    <article className="card">
      <div className="card-head">
        <h3 className="card--title">{rowData.title}</h3>
        <StatusComponent status={rowData.status}/>
      </div>

      <div className="card-body">
        <figure className="card--figure">
          <img 
          src={rowData.image} 
          alt={rowData.title} 
          className="card--figure-image"/>
        </figure>
        <div className="card--description">
          <span className="card--description-text">
            {rowData.description}
          </span>
          <button className="description-button" onClick={toggleText}>
            {textButton}
          </button>
        </div>
      </div>
        <div className={displayContent}>
            <p className={classText}>
            {rowData.content}
        </p>
        </div>
    </article>
  );
};
