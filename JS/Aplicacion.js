function Ticket(number, description) {
  this.number = number;
  this.description = description;
}

const ticketList = document.getElementById('ticketList');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const generateTicketButton = document.getElementById('generateTicketButton');
// Usuario para testear
const userEmail = 'coder@house.com';
const userPassword = '12345';
let ticketCounter = 1;

if (!isUserLoggedIn()) {
  
  loginButton.disabled = false;
  logoutButton.disabled = true;
  generateTicketButton.disabled = true;
} else {
  
  loginButton.disabled = true;
  logoutButton.disabled = false;
  generateTicketButton.disabled = false;

  
  const tickets = JSON.parse(localStorage.getItem('tickets'));
  if (tickets) {
    tickets.forEach(ticket => {
      const ticketItem = document.createElement('div');
      ticketItem.textContent = `Ticket #${ticket.number}: ${ticket.description}`;
      ticketList.appendChild(ticketItem);
    });
  }
}

function isUserLoggedIn() {
  const userEmail = localStorage.getItem('userEmail');
  const userPassword = localStorage.getItem('userPassword');

  return userEmail && userPassword;
}

loginButton.addEventListener('click', () => {
  const email = prompt('Ingrese su correo electrónico:') || '';
  const password = prompt('Ingrese su contraseña:') || '';

  if (email === userEmail && password === userPassword) {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    loginButton.disabled = true;
    logoutButton.disabled = false;
    generateTicketButton.disabled = false;
  } else {
    alert('Las credenciales no son correctas.');
  }
});

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userPassword');

  loginButton.disabled = false;
  logoutButton.disabled = true;
  generateTicketButton.disabled = true;
});

generateTicketButton.addEventListener('click', () => {
  const description = prompt('Ingrese la descripción para el nuevo ticket:') || '';

  if (description === '') {
    alert('La descripción no puede estar vacía.');
    return;
  }

  const newTicket = new Ticket(ticketCounter, description);
  const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  tickets.push(newTicket);
  localStorage.setItem('tickets', JSON.stringify(tickets));

  const ticketItem = document.createElement('div');
  ticketItem.textContent = `Ticket #${newTicket.number}: ${newTicket.description}`;
  ticketList.appendChild(ticketItem);

  ticketCounter++;

  console.log(`Ticket #${newTicket.number} generado con la descripción: ${newTicket.description}`);
});
