document.addEventListener("DOMContentLoaded", () => {
  const btnConfirmar = document.getElementById("confirmar");
  const btnCancelar = document.getElementById("cancelar");
  const mensajeFinal = document.getElementById("mensaje-final");

btnConfirmar.addEventListener("click", () => {
    mensajeFinal.textContent = "Pedido confirmado ✅";
    window.location.href = 'JugaryReseña.html'; 
  });

  
btnCancelar.addEventListener("click", () => {
    window.history.back();
  });
});