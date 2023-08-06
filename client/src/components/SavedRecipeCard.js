import { Card, CloseButton } from 'react-bootstrap';

function SavedRecipeCard(props){

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
      <Card.Body className='delete-recipe'>
        <CloseButton onClick={() => props.deleteSavedRecipe(props.recipe)} />
      </Card.Body>  
    </Card>
  );
}

export default SavedRecipeCard;