document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.pub-filter');
  const searchInput = document.getElementById('pubSearch');
  const items = Array.from(document.querySelectorAll('.pub-item'));
  const countEl = document.getElementById('pubCount');
  const emptyState = document.getElementById('emptyState');

  let activeFilter = 'all';

  function applyFilters() {
    const query = (searchInput.value || '').trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((item) => {
      const tags = (item.dataset.tags || '').split(' ');
      const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const text = item.textContent.toLowerCase();
      const matchesSearch = query === '' || text.includes(query);
      const show = matchesFilter && matchesSearch;
      item.hidden = !show;
      if (show) visibleCount++;
    });

    countEl.textContent = `Showing ${visibleCount} of ${items.length} publications`;
    emptyState.hidden = visibleCount !== 0;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener('input', applyFilters);

  applyFilters();
});
