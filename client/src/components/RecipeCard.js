import Card from 'react-bootstrap/Card';
import { FaRegHeart } from "@react-icons/all-files/fa/FaRegHeart";

function RecipeCard(props){

  return (
    <Card className='recipe-card'>
      <Card.Img variant="left" src={props.recipe.imageLink} />
      <Card.Body className='recipe-body'>
        <Card.Title>{props.recipe.name}</Card.Title>
        <Card.Text className='dish-type'>
          {props.recipe.dishType}
        </Card.Text>
        <Card.Text className='recipe-link'>
          from <Card.Link href={props.recipe.websiteLink} target="_blank">{props.recipe.websiteName}</Card.Link>
        </Card.Text>
      </Card.Body>
      <Card.Body className='favorite-icon'>
        <FaRegHeart onClick={() => props.favoriteIconClicked(props.recipe)} />
      </Card.Body>  
    </Card>
  );
}

export default RecipeCard;