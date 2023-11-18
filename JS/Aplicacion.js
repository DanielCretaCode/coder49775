// función constructora para los tickets
function Ticket(number, description) {
  this.number = number;
  this.description = description;
}

// Referencias a los elementos HTML
const ticketList = document.getElementById('ticketList');
const generateTicketButton = document.getElementById('generateTicket');

// contador de tickets
let ticketCounter = 1;

// Generacion de eventos
generateTicketButton.addEventListener('click', () => {
  // Pedir al usuario que ingrese una descripción para el ticket
  const description = prompt('Ingrese la descripción para el nuevo ticket:') || 'Sin descripción';

  // Crear un nuevo objeto
  const newTicket = new Ticket(ticketCounter, description);

  // Representacion del ticket
  const ticketElement = document.createElement('div');
  ticketElement.className = 'ticket';
  ticketElement.innerHTML = `Ticket #${newTicket.number} - ${newTicket.description}`;

  // Agregar el ticket a la lista de tickets
  ticketList.appendChild(ticketElement);

  // Incrementar el contador de tickets
  ticketCounter++;

  // Mostrar por consola
  console.log(`Ticket #${newTicket.number} generado con la descripción: ${newTicket.description}`);

  // Ejemplo de estructura condicional IF
  if (ticketCounter % 5 === 0) {
    console.log('Se generó el quinto ticket.');
  }

  // Ejemplo de bucle For
  for (let i = 0; i < ticketCounter; i++) {
    console.log(`Iteración ${i + 1} del bucle For.`);
  }

  // Ejemplo de método de búsqueda y filtrado sobre un Array
  const ticketsArray = Array.from(ticketList.children);
  const filteredTickets = ticketsArray.filter(ticket => ticket.textContent.includes('5'));
  console.log('Tickets que contienen el número 5:', filteredTickets);
});
