document.addEventListener('DOMContentLoaded', () => {
  // Create cursor light element
  const cursorLight = document.createElement('div');
  cursorLight.className = 'cursor-light';
  document.body.appendChild(cursorLight);

  // Update cursor light position
  document.addEventListener('mousemove', (e) => {
    cursorLight.style.left = e.clientX + 'px';
    cursorLight.style.top = e.clientY + 'px';
    
    // Update CSS variables for radial gradient background
    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
  });

  // Adjust cursor light size on interactive elements
  const interactiveElements = document.querySelectorAll('button, a, input');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorLight.style.width = '400px';
      cursorLight.style.height = '400px';
    });
    
    element.addEventListener('mouseleave', () => {
      cursorLight.style.width = '300px';
      cursorLight.style.height = '300px';
    });
  });

  // English Learning Game functionality
  const words = {
    "Hola": "Hello",
    "Gracias": "Thank you",
    "Por favor": "Please",
    "Adiós": "Goodbye",
    "Gato": "Cat",
    "Perro": "Dog",
    "Casa": "House",
    "Coche": "Car",
    "Amigo": "Friend",
    "Familia": "Family",
    "Comida": "Food",
    "Agua": "Water",
    "Sol": "Sun",
    "Luna": "Moon",
    "Libro": "Book",
    "Mesa": "Table",
    "Silla": "Chair",
    "Computadora": "Computer",
    "Teléfono": "Phone",
    "Zapato": "Shoe",
    "Ropa": "Clothes",
    "Jardín": "Garden",
    "Flor": "Flower",
    "Árbol": "Tree",
    "Cielo": "Sky",
    "Tierra": "Earth",
    "Mar": "Sea",
    "Montaña": "Mountain",
    "Río": "River",
    "Playa": "Beach",
    "Ciudad": "City",
    "País": "Country",
    "Escuela": "School",
    "Trabajo": "Work",
    "Tiempo": "Time",
    "Día": "Day",
    "Noche": "Night",
    "Mañana": "Morning",
    "Tarde": "Afternoon",
    "Año": "Year",
    "Mes": "Month",
    "Semana": "Week",
    "Hora": "Hour",
    "Minuto": "Minute",
    "Segundo": "Second",
    "Música": "Music",
    "Baile": "Dance",
    "Canto": "Song",
    "Película": "Movie",
    "Teatro": "Theater",
    "Arte": "Art",
    "Color": "Color",
    "Rojo": "Red",
    "Azul": "Blue",
    "Verde": "Green",
    "Amarillo": "Yellow",
    "Negro": "Black",
    "Blanco": "White",
    "Naranja": "Orange",
    "Morado": "Purple",
    "Rosa": "Pink",
    "Marrón": "Brown",
    "Gris": "Gray"
  };

  let currentSpanishWord = '';
  let usedWords = new Set();

  // Function to get a new random word
  function getNewWord() {
    const spanishWords = Object.keys(words);
    const availableWords = spanishWords.filter(word => !usedWords.has(word));
    
    // If all words have been used, reset the used words set
    if (availableWords.length === 0) {
      usedWords.clear();
      return spanishWords[Math.floor(Math.random() * spanishWords.length)];
    }
    
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }

  // Function to load new word
  function loadNewWord() {
    currentSpanishWord = getNewWord();
    usedWords.add(currentSpanishWord);
    const wordToTranslate = document.getElementById('word-to-translate');
    const userTranslation = document.getElementById('user-translation');
    
    if (wordToTranslate && userTranslation) {
      wordToTranslate.textContent = currentSpanishWord;
      userTranslation.value = '';
      userTranslation.focus();
    }
  }

  // Function to show feedback
  function showFeedback(isCorrect, correctAnswer) {
    const feedbackModal = document.createElement('div');
    feedbackModal.className = 'feedback-modal';
    
    const content = `
      <div class="feedback-content ${isCorrect ? 'success' : 'error'}">
        <div class="feedback-icon">${isCorrect ? '🎉' : '🤔'}</div>
        <div class="feedback-message">
          ${isCorrect ? 
            '¡Excelente trabajo! ¡Sigamos aprendiendo!' : 
            '¡No te preocupes! La respuesta correcta es:'}
        </div>
        ${!isCorrect ? `
          <div class="feedback-correct-answer">${correctAnswer}</div>
          <div class="feedback-buttons">
            <button class="try-again-button">Intentar de Nuevo</button>
            <button class="close-feedback">Cerrar</button>
          </div>
        ` : `
          <div class="feedback-buttons">
            <button class="next-word-button">Siguiente Palabra</button>
          </div>
        `}
      </div>
    `;
    
    feedbackModal.innerHTML = content;
    document.body.appendChild(feedbackModal);

    // Event listeners for feedback buttons
    if (!isCorrect) {
      const tryAgainButton = feedbackModal.querySelector('.try-again-button');
      const closeFeedback = feedbackModal.querySelector('.close-feedback');

      tryAgainButton.addEventListener('click', () => {
        feedbackModal.remove();
        const userTranslation = document.getElementById('user-translation');
        userTranslation.value = '';
        userTranslation.focus();
      });

      closeFeedback.addEventListener('click', () => {
        feedbackModal.remove();
      });
    } else {
      const nextWordButton = feedbackModal.querySelector('.next-word-button');
      nextWordButton.addEventListener('click', () => {
        feedbackModal.remove();
        loadNewWord();
      });
    }

    // Close modal when clicking outside
    feedbackModal.addEventListener('click', (e) => {
      if (e.target === feedbackModal) {
        feedbackModal.remove();
      }
    });
  }

  // Event listener for check translation button
  const checkTranslationButton = document.getElementById('check-translation');
  if (checkTranslationButton) {
    checkTranslationButton.addEventListener('click', () => {
      const userTranslation = document.getElementById('user-translation');
      if (userTranslation) {
        const userGuess = userTranslation.value.trim().toLowerCase();
        const correctAnswer = words[currentSpanishWord].toLowerCase();
        const isCorrect = userGuess === correctAnswer;
        
        showFeedback(isCorrect, words[currentSpanishWord]);
      }
    });
  }

  // Event listener for enter key
  const userTranslationInput = document.getElementById('user-translation');
  if (userTranslationInput) {
    userTranslationInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        checkTranslationButton.click();
      }
    });
  }

  // Initialize the game
  if (document.getElementById('word-to-translate')) {
    loadNewWord();
  }

  // Examples Section functionality with show/hide
  const examples = [
    { english: "How are you today?", spanish: "¿Cómo estás hoy?" },
    { english: "I love learning English!", spanish: "¡Me encanta aprender inglés!" },
    { english: "The weather is beautiful.", spanish: "El clima está hermoso." },
    { english: "Could you help me, please?", spanish: "¿Podrías ayudarme, por favor?" },
    { english: "Where is the nearest restaurant?", spanish: "¿Dónde está el restaurante más cercano?" },
    { english: "I need to practice more.", spanish: "Necesito practicar más." },
    { english: "What time is the meeting?", spanish: "¿A qué hora es la reunión?" },
    { english: "This book is very interesting.", spanish: "Este libro es muy interesante." },
    { english: "Can you speak more slowly?", spanish: "¿Puedes hablar más despacio?" },
    { english: "I don't understand.", spanish: "No entiendo." },
    { english: "What's your favorite movie?", spanish: "¿Cuál es tu película favorita?" },
    { english: "Let's go to the beach!", spanish: "¡Vamos a la playa!" },
    { english: "How much does this cost?", spanish: "¿Cuánto cuesta esto?" },
    { english: "The food is delicious.", spanish: "La comida está deliciosa." },
    { english: "See you tomorrow!", spanish: "¡Hasta mañana!" }
  ];

  const examplesList = document.getElementById('examples-list');
  const showMoreButton = document.getElementById('show-more-examples');
  const hideExamplesButton = document.getElementById('hide-examples');
  let areExamplesExpanded = false;

  function displayExamples(showAll) {
    if (!examplesList) return;
    
    const count = showAll ? examples.length : 2;
    examplesList.innerHTML = examples.slice(0, count).map((example, index) => `
      <li class="example-item">
        <div class="example-card">
          <div class="example-number">${index + 1}</div>
          <div class="example-content">
            <p class="english">${example.english}</p>
            <p class="spanish">${example.spanish}</p>
          </div>
        </div>
      </li>
    `).join('');

    if (showMoreButton) showMoreButton.style.display = showAll ? 'none' : 'block';
    if (hideExamplesButton) hideExamplesButton.style.display = showAll ? 'block' : 'none';
  }

  if (showMoreButton) {
    showMoreButton.addEventListener('click', () => {
      areExamplesExpanded = true;
      displayExamples(true);
    });
  }

  if (hideExamplesButton) {
    hideExamplesButton.addEventListener('click', () => {
      areExamplesExpanded = false;
      displayExamples(false);
    });
  }

  // Initial display of examples
  displayExamples(false);

  // Challenge modal functionality
  const challenges = {
    1: {
      title: "Saludos Básicos",
      description: "Traduce al inglés: 'Buenos días, ¿cómo estás?'",
      answer: "Good morning, how are you?"
    },
    2: {
      title: "Números del 1-10",
      description: "Escribe en inglés los números del 1 al 10 separados por comas",
      answer: "one, two, three, four, five, six, seven, eight, nine, ten"
    },
    3: {
      title: "Colores",
      description: "Traduce al inglés: 'Mi color favorito es el azul'",
      answer: "My favorite color is blue"
    },
    4: {
      title: "La Familia",
      description: "Traduce al inglés: 'Tengo dos hermanos y una hermana'",
      answer: "I have two brothers and one sister"
    },
    5: {
      title: "Días de la Semana",
      description: "Escribe los días de la semana en inglés empezando por el domingo",
      answer: "sunday, monday, tuesday, wednesday, thursday, friday, saturday"
    },
    6: {
      title: "Animales Comunes",
      description: "Traduce al inglés: 'Mi perro y mi gato son mejores amigos'",
      answer: "My dog and my cat are best friends"
    },
    7: {
      title: "Frases Cotidianas",
      description: "Traduce al inglés: '¿Podrías repetir eso, por favor?'",
      answer: "Could you repeat that, please?"
    },
    8: {
      title: "Objetos del Hogar",
      description: "Traduce al inglés: 'La mesa está en la cocina'",
      answer: "The table is in the kitchen"
    },
    9: {
      title: "Verbos Irregulares",
      description: "Escribe el pasado y participio de: go, eat, write",
      answer: "went/gone, ate/eaten, wrote/written"
    },
    10: {
      title: "Preposiciones",
      description: "Completa con las preposiciones correctas: 'I am ___ home, sitting ___ my desk, looking ___ the window'",
      answer: "at, at, through"
    },
    11: {
      title: "Presente Continuo",
      description: "Traduce usando presente continuo: 'Ellos están jugando fútbol en el parque'",
      answer: "They are playing football in the park"
    },
    12: {
      title: "Adjetivos Comparativos",
      description: "Traduce usando comparativos: 'Este libro es más interesante que esa película'",
      answer: "This book is more interesting than that movie"
    },
    13: {
      title: "Adverbios de Frecuencia",
      description: "Ordena los adverbios de frecuencia de mayor a menor: sometimes, always, never, usually",
      answer: "always, usually, sometimes, never"
    },
    14: {
      title: "Expresiones Idiomáticas",
      description: "¿Qué significa y cuál es el equivalente en español de 'It's raining cats and dogs'?",
      answer: "It means it's raining very heavily / Significa que está lloviendo a cántaros"
    },
    15: {
      title: "Pronombres Relativos",
      description: "Completa con who, which, where: 'The person ___ called me, the house ___ I live, the book ___ is on the table'",
      answer: "who, where, which"
    },
    16: {
      title: "Pasado Simple",
      description: "Traduce al inglés usando pasado simple: 'Ayer fui al cine y vi una película increíble'",
      answer: "Yesterday I went to the cinema and saw an amazing movie"
    },
    17: {
      title: "Condicionales",
      description: "Traduce usando el segundo condicional: 'Si tuviera un millón de dólares, viajaría por el mundo'",
      answer: "If I had a million dollars, I would travel around the world"
    },
    18: {
      title: "Voz Pasiva",
      description: "Transforma a voz pasiva: 'Shakespeare wrote this play in 1601'",
      answer: "This play was written by Shakespeare in 1601"
    },
    19: {
      title: "Reported Speech",
      description: "Transforma a reported speech: 'I am going to the party tonight'",
      answer: "He/She said that he/she was going to the party that night"
    },
    20: {
      title: "Phrasal Verbs",
      description: "Explica el significado de: look up, give up, turn down",
      answer: "look up: search for, give up: surrender, turn down: reject or decrease volume"
    },
    21: {
      title: "Subjuntivo",
      description: "Traduce usando el subjuntivo: 'Es importante que estudies todos los días'",
      answer: "It is important that you study every day"
    },
    22: {
      title: "Modales Perfectos",
      description: "Traduce: 'Deberías haber estudiado más para el examen'",
      answer: "You should have studied more for the exam"
    },
    23: {
      title: "Inversión",
      description: "Reescribe usando inversión: 'I had never seen such a beautiful sunset before'",
      answer: "Never had I seen such a beautiful sunset before"
    },
    24: {
      title: "Cleft Sentences",
      description: "Transforma en una cleft sentence: 'John broke the window'",
      answer: "It was John who broke the window"
    },
    25: {
      title: "Expresiones Avanzadas",
      description: "Explica y traduce: 'To be in hot water'",
      answer: "To be in trouble / Estar en problemas"
    }
  };

  let currentChallengeId = 1;

  function showChallengeFeedback(isCorrect, correctAnswer) {
    const feedbackModal = document.createElement('div');
    feedbackModal.className = 'feedback-modal';
    
    const content = `
      <div class="feedback-content ${isCorrect ? 'success' : 'error'}">
        <div class="feedback-icon">${isCorrect ? '🎉' : '🤔'}</div>
        <div class="feedback-message">
          ${isCorrect ? 
            '¡Excelente trabajo! ¡Sigamos aprendiendo!' : 
            '¡No te preocupes! La respuesta correcta es:'}
        </div>
        ${!isCorrect ? `
          <div class="feedback-correct-answer">${correctAnswer}</div>
          <div class="feedback-buttons">
            <button class="try-again-button">Intentar de Nuevo</button>
            <button class="close-feedback">Cerrar</button>
          </div>
        ` : `
          <div class="feedback-buttons">
            <button class="next-challenge-button">Siguiente Desafío</button>
          </div>
        `}
      </div>
    `;
    
    feedbackModal.innerHTML = content;
    document.body.appendChild(feedbackModal);

    const tryAgainButton = feedbackModal.querySelector('.try-again-button');
    const closeFeedback = feedbackModal.querySelector('.close-feedback');
    const nextChallengeButton = feedbackModal.querySelector('.next-challenge-button');

    if (tryAgainButton) {
      tryAgainButton.addEventListener('click', () => {
        feedbackModal.remove();
        const userAnswer = document.getElementById('user-answer');
        userAnswer.value = '';
        userAnswer.focus();
      });
    }

    if (closeFeedback) {
      closeFeedback.addEventListener('click', () => {
        feedbackModal.remove();
      });
    }

    if (nextChallengeButton) {
      nextChallengeButton.addEventListener('click', () => {
        feedbackModal.remove();
        const nextChallengeId = parseInt(currentChallengeId) + 1;
        const nextChallenge = document.querySelector(`.open-challenge[data-challenge="${nextChallengeId}"]`);
        if (nextChallenge) {
          nextChallenge.click();
        }
      });
    }

    // Close modal when clicking outside
    feedbackModal.addEventListener('click', (e) => {
      if (e.target === feedbackModal) {
        feedbackModal.remove();
      }
    });
  }

  // Challenge modal functionality
  const modal = document.querySelector('.modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalResult = document.getElementById('modal-result');
  const closeButton = document.querySelector('.close-button');
  const userAnswer = document.getElementById('user-answer');
  const submitAnswer = document.getElementById('submit-answer');

  // Open challenge modal
  document.querySelectorAll('.open-challenge').forEach(button => {
    button.addEventListener('click', () => {
      currentChallengeId = button.getAttribute('data-challenge');
      const challenge = challenges[currentChallengeId];
      
      if (challenge) {
        modalTitle.textContent = challenge.title;
        modalDescription.textContent = challenge.description;
        userAnswer.value = '';
        modalResult.textContent = '';
        modal.style.display = 'block';
      }
    });
  });

  // Close modal functionality
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Update submit answer functionality
  if (submitAnswer) {
    submitAnswer.addEventListener('click', () => {
      const challengeId = currentChallengeId;
      const challenge = challenges[challengeId];
      
      if (challenge) {
        const isCorrect = userAnswer.value.trim().toLowerCase() === challenge.answer.toLowerCase();
        showChallengeFeedback(isCorrect, challenge.answer);
      }
    });
  }

  // Info Modal Functionality
  const infoButton = document.getElementById('info-button');
  const infoModal = document.getElementById('info-modal');
  const infoCloseButton = document.querySelector('.info-close-button');

  if (infoButton && infoModal && infoCloseButton) {
    infoButton.addEventListener('click', () => {
      infoModal.style.display = 'block';
    });

    infoCloseButton.addEventListener('click', () => {
      infoModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === infoModal) {
        infoModal.style.display = 'none';
      }
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const dropdowns = document.querySelectorAll('.dropdown');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Handle dropdown clicks on mobile
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
  });
});