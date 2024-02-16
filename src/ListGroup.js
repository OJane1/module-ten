import ListGroup from 'react-bootstrap/ListGroup';

function DefaultExample({ label, quantity, unit }) {
  return (
    <ListGroup>
      <ListGroup.Item><b>{label}</b> - {quantity.toFixed(2)} {unit}</ListGroup.Item>
      
    </ListGroup>
  );
}

export default DefaultExample;