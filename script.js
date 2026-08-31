const COMMENTS_PER_PAGE = 10;
let currentArticleId = null;
let currentPage = 1;

function openPhotoPopup(src) {
    const overlay = document.getElementById('photoPopupOverlay');
    const img = document.getElementById('photoPopupImg');
    img.src = src;
    overlay.classList.add('active');
  }
  
  function closePhotoPopup(event) {
    document.getElementById('photoPopupOverlay').classList.remove('active');
  }
  
  function openCommentsPopup(event, count) {
    event.preventDefault();
    const overlay = document.getElementById('commentsPopupOverlay');
    const body = document.getElementById('commentsPopupBody');
  
    body.innerHTML = `<p class="f-13">${count} commentaires — à venir.</p>`;
    overlay.classList.add('active');
  }
  
  function closeCommentsPopup(event) {
    document.getElementById('commentsPopupOverlay').classList.remove('active');
  }


 

function openPhotoPopup(src) {
  const overlay = document.getElementById('photoPopupOverlay');
  const img = document.getElementById('photoPopupImg');
  img.src = src;
  overlay.classList.add('active');
}

function closePhotoPopup(event) {
  document.getElementById('photoPopupOverlay').classList.remove('active');
}

function openCommentsPopup(event, articleId) {
  event.preventDefault();
  currentArticleId = articleId;
  currentPage = 1;
  renderComments();
  document.getElementById('commentsPopupOverlay').classList.add('active');
}

function closeCommentsPopup(event) {
  document.getElementById('commentsPopupOverlay').classList.remove('active');
}

function renderComments() {
  const body = document.getElementById('commentsPopupBody');
  const all = commentsData[currentArticleId] || [];
  const totalPages = Math.max(1, Math.ceil(all.length / COMMENTS_PER_PAGE));
  const start = (currentPage - 1) * COMMENTS_PER_PAGE;
  const pageItems = all.slice(start, start + COMMENTS_PER_PAGE);

  let html = '';

  if (pageItems.length === 0) {
    html += `<p class="f-13">Aucun commentaire pour le moment.</p>`;
  } else {
    pageItems.forEach(c => {
        const sexClass = c.sex === 'male' ? 'pseudo-male' : c.sex === 'female' ? 'pseudo-female' : '';
        html += `
          <div class="comment-item">
            <figure class="comment-avatar">
              <img src="${c.avatar || '/img/default-avatar.jpg'}" alt="${c.pseudo}" />
            </figure>
            <div class="comment-body">
              <p class="comment-header">
                <span class="boldy ${sexClass}">${c.pseudo}</span>, Posté le <span class="boldy">${c.date}</span>
              </p>
              <p class="f-13 comment-text">${c.text}</p>
            </div>
          </div>
        `;
      });
  }

  html += `
    <div class="comments-pagination">
      <a href="#" class="${currentPage <= 1 ? 'disabled' : ''}" onclick="changePage(event, -1)">&laquo; Précédent</a>
      <span class="f-12">Page ${currentPage} / ${totalPages}</span>
      <a href="#" class="${currentPage >= totalPages ? 'disabled' : ''}" onclick="changePage(event, 1)">Suivant &raquo;</a>
    </div>
  `;

  body.innerHTML = html;
}
function changePage(event, delta) {
  event.preventDefault();
  const all = commentsData[currentArticleId] || [];
  const totalPages = Math.max(1, Math.ceil(all.length / COMMENTS_PER_PAGE));
  const next = currentPage + delta;
  if (next < 1 || next > totalPages) return;
  currentPage = next;
  renderComments();
}