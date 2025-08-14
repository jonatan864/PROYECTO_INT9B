  const cantidadInput = document.getElementById('cantidad');
  const incrementarBtn = document.getElementById('incrementar');
  const decrementarBtn = document.getElementById('decrementar');

  incrementarBtn.addEventListener('click', () => {
    cantidadInput.value = parseInt(cantidadInput.value) + 1;
  });

  decrementarBtn.addEventListener('click', () => {
    let current = parseInt(cantidadInput.value);
    if (current > 1) {
      cantidadInput.value = current - 1;
    }
  });

