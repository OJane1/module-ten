import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { LoaderPage } from './LoaderPage';
import DefaultExample from './ListGroup';
import { ListGroupItem, Container, Card, Button, Form, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';


function App() {

const [mySearch, setMySearch] = useState();
const [wordSubmitted, setWordSubmitted] = useState('');
const [myNutrition, setMyNutrition] = useState();
const [stateLoader, setStateLoader] = useState(false);

const MY_ID = "372fa69e";
const MY_KEY = "ddd166987ee910ac6108c5a98ff4eb00";
const MY_URL = "https://api.edamam.com/api/nutrition-details"

const fetchData = async (ingr) => {
 setStateLoader(true);

  const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({ ingr: ingr })
})

const handleAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Ingredients entered incorrectly!",
    footer: "Try this: 1 banana, 50 ml milk, 1 tbs sugar..."
  });
}

if(response.ok) {
  setStateLoader(false);
  const data = await response.json();
  setMyNutrition(data);
} else {
  setStateLoader(false);
  handleAlert();
}
}

const myRecipeSearch = e => {
  setMySearch(e.target.value);
}

const finalSearch = e => {
  e.preventDefault();
  setWordSubmitted(mySearch);
}

useEffect(() => {
  if (wordSubmitted !== '') {
     let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
     fetchData(ingr);
  }
}, [wordSubmitted])

  return (
    
    <div>
      <Container className='Container'>
        <Card className='App'>
          <Card.Title className='mt-3'><h1>Nutrition Analysis</h1></Card.Title>
          <Card.Img src="https://img.freepik.com/free-photo/circle-food-including-variety-ingredients-including-beans-blueberries-other-ingredients_188544-41038.jpg?size=626&ext=jpg&uid=R102590521&ga=GA1.1.1848613001.1707887797&semt=ais_ai_generated/150/50" />
          <Card.Body className="mb-5 mt-3">
          <Card.Text><p>Know what you eat!</p> Type the ingredients of your meal and their quantities below and get a full breakdown of nutrients in your plate</Card.Text>
      <Form onSubmit={finalSearch}>
        <Col>
        <Row>
          <Form.Control type="text" onChange={myRecipeSearch} placeholder="Search...">
          </Form.Control>
        <Form.Text>For example: 1 beefsteak, 200 g french fries
        </Form.Text>
        </Row>
        <Row>
        <Button type="submit" className='Btn'>SEARCH</Button>
        </Row>
        {stateLoader && <LoaderPage />}
        </Col>
      </Form>
      <div className='List'>
      { myNutrition && Object.values(myNutrition.totalNutrients)
          .map(({ label, quantity, unit }) =>
        <DefaultExample
        label={label}
        quantity={quantity}
        unit={unit}
        />
          )}
      </div>
          </Card.Body>
        </Card>
      </Container>
    </div> 
  );
}

export default App;
