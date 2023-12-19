const ticketManager = {
  tickets: [],

  init() {
    this.setupEventListeners();
    this.checkUserSession();
    this.loadTickets();
  },

  setupEventListeners() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const generateTicketButton = document.getElementById('generateTicketButton');

    loginButton.addEventListener('click', () => this.handleLogin());
    logoutButton.addEventListener('click', () => this.handleLogout());
    generateTicketButton.addEventListener('click', () => this.handleGenerateTicket());
  },

  checkUserSession() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const generateTicketButton = document.getElementById('generateTicketButton');

    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    if (!userEmail || !userPassword) {
      loginButton.disabled = false;
      logoutButton.disabled = true;
      generateTicketButton.disabled = true;
    } else {
      loginButton.disabled = true;
      logoutButton.disabled = false;
      generateTicketButton.disabled = false;
    }
  },

  renderTickets() {
    const ticketList = document.getElementById('ticketList');
    ticketList.innerHTML = '';

    this.tickets.forEach((ticket, index) => {
      const ticketItem = document.createElement('div');
      ticketItem.classList.add('ticket');

      const ticketInfo = document.createElement('div');
      ticketInfo.classList.add('ticket-info');

      const number = document.createElement('p');
      number.textContent = `Ticket #${ticket.number}`;

      const description = document.createElement('p');
      description.textContent = `Descripción: ${ticket.description}`;

      const date = document.createElement('p');
      date.textContent = `Fecha de creación: ${ticket.date}`;

      const status = document.createElement('p');
      status.textContent = `Estado: ${ticket.status}`;

      const closeButton = document.createElement('button');
      closeButton.textContent = 'Cerrar';
      closeButton.dataset.index = index;
      closeButton.classList.add('closeTicket');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.dataset.index = index;
      deleteButton.classList.add('deleteTicket');

      ticketInfo.appendChild(number);
      ticketInfo.appendChild(description);
      ticketInfo.appendChild(date);
      ticketInfo.appendChild(status);
      ticketInfo.appendChild(closeButton);
      ticketInfo.appendChild(deleteButton);

      ticketItem.appendChild(ticketInfo);
      ticketList.appendChild(ticketItem);
    });

   
    this.setupTicketEventListeners();
  },

  setupTicketEventListeners() {
    const closeTicketButtons = document.querySelectorAll('.closeTicket');
    closeTicketButtons.forEach(button => {
      button.addEventListener('click', event => {
        const ticketIndex = event.target.dataset.index;
        this.closeTicket(ticketIndex);
      });
    });

    const deleteTicketButtons = document.querySelectorAll('.deleteTicket');
    deleteTicketButtons.forEach(button => {
      button.addEventListener('click', event => {
        const ticketIndex = event.target.dataset.index;
        this.deleteTicket(ticketIndex);
      });
    });
  },

  handleLogin() {
    const email = prompt('Ingrese su correo electrónico:') || '';
    const password = prompt('Ingrese su contraseña:') || '';

    const userEmail = 'coder@house.com';
    const userPassword = '12345';

    if (email === userEmail && password === userPassword) {
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
      this.checkUserSession();
      this.loadTickets(); 
    } else {
      alert('Las credenciales no son correctas.');
    }
  },

  handleLogout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    this.checkUserSession();
    this.renderTickets(); 
  },

  handleGenerateTicket() {
    const description = prompt('Ingrese la descripción para el nuevo ticket:') || '';
    const currentDate = new Date().toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'medium' }); 

    const status = 'Abierto';

    const newTicket = {
      number: this.tickets.length + 1,
      description,
      date: currentDate,
      status,
    };

    this.tickets.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(this.tickets));

    this.renderTickets();
  },

  loadTickets() {
    fetch('./JS/tickets.json')
      .then(response => response.json())
      .then(data => {
        this.tickets = data;
        this.renderTickets(); 
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  },

  closeTicket(index) {
    if (index >= 0 && index < this.tickets.length) {
      this.tickets[index].status = 'Cerrado';
      this.renderTickets();
    }
  },

  deleteTicket(index) {
    if (index >= 0 && index < this.tickets.length) {
      this.tickets.splice(index, 1);
      this.renderTickets();
    }
  },
};

ticketManager.init();
