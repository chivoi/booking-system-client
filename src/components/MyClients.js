import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// utils
import { useGlobalContext } from '../utils/globalContext';
import { getClients, getTimeslots } from '../services/bookings';
// styled
import { Heading, Container, ClientDiv, GridSquare } from './styled/ClientStyles';

const MyClients = () => {
  
  const [clients, setClients] = useState([]);
  const {store} = useGlobalContext();

  useEffect(() => {
    getClients()
      .then(clients => {
        setClients(clients)
      })
      .catch(e => console.log(e));
  }, [])

  const getClientsBookings = (id, bookings) => {
    return bookings.filter(bkng => bkng.user_id === id)
  }

  return (
    <Container>
      <Heading>My clients</Heading>
      <ClientDiv>
        <GridSquare><b>Name</b></GridSquare>
        <GridSquare><b>Phone Number</b></GridSquare>
        <GridSquare><b>Email</b></GridSquare>
        <GridSquare><b>Bookings made</b></GridSquare>
      </ClientDiv>
      {clients.map(client => {
        return <ClientDiv key={client.id}>
          <GridSquare>{client.first_name} {client.last_name}</GridSquare>
          <GridSquare>{client.phone_num}</GridSquare>
          <GridSquare>{client.email}</GridSquare>
          <GridSquare >{getClientsBookings(client.id, store.bookings).length }</GridSquare>
          </ClientDiv>
      })}
    </Container>
  )

}

export default MyClients;