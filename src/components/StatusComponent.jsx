import './style.css'

export const StatusComponent = ({status}) => {
    const textAndColor = [
        ['Preocupación menor','rgb(60, 181, 56)'],
        ['Casi amenazada','rgb(250, 187, 45)'],
        ['Vulnerable','#FC5E1F'],
        ['En peligro','#EE454A'],
        ['En peligro crítico','#ad3436']]
    const textStatus = textAndColor[status][0]
    const color = {'backgroundColor':textAndColor[status][1]}
    return (
        <strong className="card--status " style={color}>{textStatus}</strong>
    ) 
}