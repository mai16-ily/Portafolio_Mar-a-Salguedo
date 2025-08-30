
document.addEventListener('DOMContentLoaded', function () {
  // ===== MENÚ HAMBURGUESA RESPONSIVE =====
  const hamburgerMenu = document.createElement('div');
  hamburgerMenu.className = 'hamburger-menu';
  hamburgerMenu.innerHTML = '<span></span><span></span><span></span>';

  const header = document.querySelector('header');
  const nav = document.querySelector('nav');

  // Insertar el menú hamburguesa en el header
  header.insertBefore(hamburgerMenu, nav);

  // Event listener para el menú hamburguesa
  hamburgerMenu.addEventListener('click', function () {
    nav.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });

  // ===== VALIDACIÓN DE FORMULARIO EN TIEMPO REAL =====
  const contactForm = document.querySelector('.contact-form form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Error
  function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');

    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    formGroup.classList.add('error');
  }

  // Limpiar error
  function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
      errorElement.textContent = '';
    }

    formGroup.classList.remove('error');
  }

  // Validación en tiempo real para el nombre
  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim().length < 3) {
      showError(nameInput, 'El nombre debe tener al menos 3 caracteres');
    } else {
      clearError(nameInput);
    }
  });

  // Validación en tiempo real para el email
  emailInput.addEventListener('input', function () {
    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Por favor, introduce un email válido');
    } else {
      clearError(emailInput);
    }
  });

  // Validación en tiempo real para el asunto
  subjectInput.addEventListener('input', function () {
    if (subjectInput.value.trim().length < 5) {
      showError(subjectInput, 'El asunto debe tener al menos 5 caracteres');
    } else {
      clearError(subjectInput);
    }
  });

  // Validación en tiempo real para el mensaje
  messageInput.addEventListener('input', function () {
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'El mensaje debe tener al menos 10 caracteres');
    } else {
      clearError(messageInput);
    }
  });

  // Validación al enviar el formulario
  contactForm.addEventListener('submit', function (event) {
    let hasErrors = false;

    // Validar nombre
    if (nameInput.value.trim().length < 3) {
      showError(nameInput, 'El nombre debe tener al menos 3 caracteres');
      hasErrors = true;
    }

    // Validar email
    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Por favor, introduce un email válido');
      hasErrors = true;
    }

    // Validar asunto
    if (subjectInput.value.trim().length < 5) {
      showError(subjectInput, 'El asunto debe tener al menos 5 caracteres');
      hasErrors = true;
    }

    // Validar mensaje
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'El mensaje debe tener al menos 10 caracteres');
      hasErrors = true;
    }

    // Si hay errores, prevenir el envío del formulario
    if (hasErrors) {
      event.preventDefault();
    } else {
      // Mostrar mensaje de éxito (opcional)
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Enviando mensaje...';
      contactForm.appendChild(successMessage);


    }
  });

  // ===== MANIPULACIÓN DEL DOM Y EFECTOS VISUALES =====


  const sections = document.querySelectorAll('section');

  function checkScroll() {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
  }


  checkScroll();

  // Event listener para el scroll
  window.addEventListener('scroll', checkScroll);

  // Contador para las habilidades
  const skillBars = document.querySelectorAll('.skill-bar');
  let animated = false;

  // Animación de habilidades
  function animateSkills() {
    if (animated) return;

    const skillsSection = document.getElementById('habilidades');
    const sectionTop = skillsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight * 0.75) {
      skillBars.forEach(bar => {
        const originalWidth = bar.style.width || bar.getAttribute('style')?.match(/width:\s*([^;"]*)/)?.[1] || '0%';
        bar.style.width = '0';

        setTimeout(() => {

          bar.style.transition = 'width 1s ease-in-out';
          bar.style.width = originalWidth;
        }, 200);
      });

      animated = true;
    }
  }


  // Verificar posición inicial para las habilidades
  animateSkills();

  // Event listener para animar las habilidades al hacer scroll
  window.addEventListener('scroll', animateSkills);

  // Efecto hover para las tarjetas de proyectos
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.querySelector('.project-image').style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', function () {
      this.querySelector('.project-image').style.transform = 'scale(1)';
    });
  });

  // Botón para volver arriba
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);

  // Mostrar/ocultar botón según la posición del scroll
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  // Event listener para el botón de volver arriba
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Cambiar el color del header al hacer scroll
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});