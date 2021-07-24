import React, {useState, useEffect} from 'react';
import { getClients } from '../services/bookings';
// styled
import { Heading, Container, ClientDiv, GridSquare } from './styled/ClientStyles';

const MyClients = () => {
  
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients()
      .then(clients => {
        setClients(clients)
      })
      .catch(e => console.log(e));
  }, [])

  return (
    <Container>
      <Heading>My clients</Heading>
      <ClientDiv>
        <GridSquare><b>Name</b></GridSquare>
        <GridSquare><b>Phone Number</b></GridSquare>
        <GridSquare><b>Email</b></GridSquare>
      </ClientDiv>
      {clients.map(client => {
        return <ClientDiv key={client.id}>
          <GridSquare>{client.first_name} {client.last_name}</GridSquare>
          <GridSquare>{client.phone_num}</GridSquare>
          <GridSquare>{client.email}</GridSquare>
          </ClientDiv>
      })}
    </Container>
  )

}

export default MyClients;