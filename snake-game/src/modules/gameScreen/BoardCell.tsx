import '../../stylesheets/gameStyles.scss'

interface coordinates{
    x: number,
    y: number
}

interface Props{
    id: string,
    coordinates: coordinates,
    category: string
}

const BoardCell = ({id, coordinates, category}:Props) => {
    return ( 
        <div className={`block ${category}`}></div>
     );
}
 
export default BoardCell;