const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('hola')) {
        return '¡Hola! ¿Cómo estás el día de hoy?';
    } else if (lowerMessage.includes('qué horarios tiene') || lowerMessage.includes('qué día está abierto')) {
        return 'Lunes a Viernes de 8:00am a 5:30pm.';
    } else if (lowerMessage.includes('nombres de los técnicos')) {
        return 'José Varela, Juan Pérez, María López.';
    } else if (lowerMessage.includes('qué sanciones hay')) {
        return 'Hay variedad de sanciones: la acumulación de 5 tarjetas amarillas equivale a 1 partido de suspensión; doble tarjeta amarilla se transforma en roja y equivale a 1 partido de suspensión; y la tarjeta roja directa equivale a 2 partidos de sanción, dependiendo de lo que dicte el árbitro.';
    } else if (lowerMessage.includes('qué es una evaluación')) {
        return 'Una evaluación es donde el entrenador o técnico evalúa el rendimiento de los jugadores en el campo de juego.';
    } else if (lowerMessage.includes('ubicación de la academia')) {
        return 'La academia Monká está ubicada en Grecia de Alajuela.';
    } else if (lowerMessage.includes('qué categorías hay') || lowerMessage.includes('categoría')) {
        return 'Sub 10, Sub 12, Sub 14, Sub 16, Sub 18, Sub 20.';
    } else if (lowerMessage.includes('me puedo comunicar con un entrenador')) {
        return 'En este momento no es posible comunicarse con un entrenador.';
    } else if (lowerMessage.includes('qué es una plantilla')) {
        return 'Una plantilla en un equipo es el conjunto de jugadores que se unen en un campo de juego. Está formada por los 11 jugadores que inician en el campo y 10 jugadores que están en la suplencia. De esos, solo 5 pueden entrar de cambio según lo último que oficializó la FIFA.';
    } else if (lowerMessage.includes('gracias')) {
        return '¡Fue un honor ayudarte!';
    } else {
        return 'Lo siento, no entiendo esa pregunta. ¿Puedes decir otra duda?';
    }
}

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.textContent = userMessage;
    messagesDiv.appendChild(userMessageDiv);

    const botResponse = getBotResponse(userMessage);
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot';
    botMessageDiv.textContent = botResponse;
    messagesDiv.appendChild(botMessageDiv);

    userInput.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});