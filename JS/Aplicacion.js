
function Ticket(number, description) {
  this.number = number;
  this.description = description;
}


const ticketList = document.getElementById('ticketList');
const generateTicketButton = document.getElementById('generateTicket');

let ticketCounter = 1;

generateTicketButton.addEventListener('click', () => {
  const description = prompt('Ingrese la descripción para el nuevo ticket:') || 'Sin descripción';

  const newTicket = new Ticket(ticketCounter, description);

  const ticketElement = document.createElement('div');
  ticketElement.className = 'ticket';
  ticketElement.innerHTML = `Ticket #${newTicket.number} - ${newTicket.description}`;

  ticketList.appendChild(ticketElement);
  
  ticketCounter++;

  console.log(`Ticket #${newTicket.number} generado con la descripción: ${newTicket.description}`);

  if (ticketCounter % 5 === 0) {
    console.log('Se generó el quinto ticket.');
  }

  for (let i = 0; i < ticketCounter; i++) {
    console.log(`Iteración ${i + 1} del bucle For.`);
  }

  const ticketsArray = Array.from(ticketList.children);
  const filteredTickets = ticketsArray.filter(ticket => ticket.textContent.includes('5'));
  console.log('Tickets que contienen el número 5:', filteredTickets);
});
