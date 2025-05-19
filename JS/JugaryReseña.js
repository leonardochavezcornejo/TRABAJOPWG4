let selectedRating = 0;

    function changeMainImage(img) {
      document.querySelectorAll('#thumbnails img').forEach(el => el.classList.remove('selected'));
      img.classList.add('selected');
      document.getElementById('mainImage').src = img.src;
    }

    function rateGame(rating) {
      selectedRating = rating;
      const stars = document.querySelectorAll('.star');
      stars.forEach((star, index) => {
        if(index < rating) {
          star.textContent = '★';
          star.classList.add('selected');
        } else {
          star.textContent = '☆';
          star.classList.remove('selected');
        }
      });
    }

    function submitReview() {
      const name = document.getElementById('userName').value.trim();
      const comment = document.getElementById('userComment').value.trim();

      if(!name || !comment || selectedRating === 0) {
        alert('Por favor, completa tu nombre, comentario y valoración.');
        return;
      }

      const reviewDiv = document.getElementById('gameReviews');
      const newReview = document.createElement('p');
      newReview.innerHTML = `<strong>${name}:</strong> ${comment} <br> Valoración: ${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}`;
      reviewDiv.appendChild(newReview);

      document.getElementById('userName').value = '';
      document.getElementById('userComment').value = '';
      rateGame(0);
      selectedRating = 0;
    }

    function mostrarMensajeCarga() {
    const mensaje = document.getElementById("mensajeCarga");
    mensaje.style.display = "block";
}