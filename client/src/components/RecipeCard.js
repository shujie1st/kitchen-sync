import Card from 'react-bootstrap/Card';
import { FaRegHeart } from "@react-icons/all-files/fa/FaRegHeart";

function RecipeCard(){

  const recipe = {
    img: "https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDJZG4y%2FfFvts%2FqWb1QCFWWZgDjBnzwpwL7FCT%2BFEgrwQIhAJnhFLwXrqDp1SZDJ1wyN36rmRr1qu1jLZFLODciVHzPKrkFCGoQABoMMTg3MDE3MTUwOTg2IgyXxHXkPb1jcHpxs1wqlgUy4f6t1%2FcLhrdwQFqiJYsvjsbnUPIfKaYh9P6bIxaoNGCXgbyiNDU1RT36ylmd50bvCrgiryyrkyaFeCu%2FoqcLGXiXTdMvNwWyV8%2BYP5waLkMEWXRWeUSAJ7VnAP6JM2o7fIF026iu0sl%2F7yjBiAOxr6Fip0Pfxhh%2BsJRLjNcyhzPGlSm4U9inzrP%2BSyy1KD7amkl5nIvCP6NQVMSnNU2XAZDtKLvS0OweAQhf151mNLVs7SZPnXYZWkES4t%2FZItT%2Bm34qLwUyjZ2O26hNFIHNSxcmgO%2FZR23pLXNdezR2qFM15piPOzW13IB7TbeaWk2mRlTmOCRY2ZvvhnEHSWLyy%2F8WgHjql7OWZ8SSyUVM6EhY5ATwOhD4KOWZUJYEyyrHYi2KOOgvRVuD8Fl1WbejYCa63ejCzbqhbcSmWb6gZj2TQWgID3Mmxi7Q3F2o1YTTqk85nRYeElUTN2%2FjaJ6mmaWAFxpDdQB4Xbeglw4NMjokqmBd%2FdMvaZ57%2BxRfIRi3BdrTGC%2BlQfAgzUVtcHkfbMc6CbmhXcStfAvdB73wnxslzDURd4EApWI3TgmNN%2FPbQz1BXWQX%2B%2B87%2BQhD1E%2BLy9h98tmyPzrTsy9yygKCmywefzkL6IIWkPDNs%2FzlRCtJHEyDvCWCSo0ULbEKGJnNQFwFEYWJGGM1BeINXPN9ndnrCIIepaxKsSsGfKGTW%2FPL47QnDV1D5t7wTLdoQfepX4OxuQFe%2BaEUj0SAzue64pD2R4aTwREqGX%2FPq74SO3BUB%2FR0ht7oLfz1KyCtGbS0b0awc%2BnlA8qjRra23w5TQYzTh8nXSEsBosRGEwAhrOkAMfJ7hRERm4Bz4KgEQ3b3kIOFygtyEUcNljQzA0gmXWu0EQFILTDUpYymBjqwAXQ1obZKhyFOwDI5CsaPHS4eOpz4ahnOoUodjhWreH6mvvKj7cFIuhF%2Fo%2BVGHHLjz1qTvN0QRmflln4SyCv4Hi8ZAgOYo7o50IUnCeylTKiKFR7qhRmDiwbCt2YV7m08ggz6vFbJQHWA9ycmskNT8Uy%2BUc%2Fs9KjKvBBbgOpoJALSlWbpEplOa7VZg0fTdsSoSAm96FK45Lya2FRXEbu3YR9fd%2FeFnfnOHIO8b7qNPZRo&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230728T015314Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFAEESTPRU%2F20230728%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f5c76d4a7051754097735f645c21fb266378095135eff854b1c43d2767466c86",
    name: "Chicken Vesuvio",
    websiteName: "Serious Eats",
    websiteLink: "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
    dishType: "main course"
  }
 
  return (
    <Card className='recipe-card'>
      <Card.Img variant="top" src={recipe.img} />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text className='dish-type'>
          {recipe.dishType}
        </Card.Text>
        <Card.Text className='recipe-link'>
          from <Card.Link href={recipe.websiteLink} target="_blank">{recipe.websiteName}</Card.Link>
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <FaRegHeart />
      </Card.Body>
        
    </Card>
  );
}

export default RecipeCard;