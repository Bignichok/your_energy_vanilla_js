export class Pagination {
  constructor({ container, totalPages, onPageChange }) {
    this.container = container;
    this.totalPages = totalPages;
    this.onPageChange = onPageChange;
    this.currentPage = 1;
    this.render();
  }

  render() {
    this.container.innerHTML = '';

    if (this.totalPages < 1) return;

    let paginationHTML = '';

    const createButtonMarkup = (
      label,
      page,
      isActive = false,
      isDisabled = false,
      arrowButton
    ) => {
      const classes = [];
      isActive && classes.push('active');
      arrowButton && classes.push('arrow-button');
      return `<button 
                  class="${classes.join(' ')}" 
                  ${isDisabled ? 'disabled' : ''}
                  data-page="${page}">
                  ${label}
                </button>`;
    };

    if (this.totalPages > 3) {
      // Add << and < buttons
      paginationHTML += createButtonMarkup(
        '<<',
        1,
        false,
        this.currentPage === 1,
        true
      );
      paginationHTML += createButtonMarkup(
        '<',
        this.currentPage - 1,
        false,
        this.currentPage === 1,
        true
      );
    }

    // Determine page range
    let startPage, endPage;
    if (this.totalPages <= 5) {
      startPage = 1;
      endPage = this.totalPages;
    } else if (this.currentPage <= 3) {
      startPage = 1;
      endPage = 4;
    } else if (this.currentPage >= this.totalPages - 2) {
      startPage = this.totalPages - 3;
      endPage = this.totalPages;
    } else {
      startPage = this.currentPage - 1;
      endPage = this.currentPage + 1;
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      paginationHTML += createButtonMarkup(1, 1);
      if (startPage > 2) paginationHTML += '<span class="ellipsis">...</span>';
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += createButtonMarkup(i, i, i === this.currentPage);
    }

    // Add last page and ellipsis if needed
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1)
        paginationHTML += '<span class="ellipsis">...</span>';
      paginationHTML += createButtonMarkup(this.totalPages, this.totalPages);
    }

    if (this.totalPages > 3) {
      // Add > and >> buttons
      paginationHTML += createButtonMarkup(
        '>',
        this.currentPage + 1,
        false,
        this.currentPage === this.totalPages,
        true
      );
      paginationHTML += createButtonMarkup(
        '>>',
        this.totalPages,
        false,
        this.currentPage === this.totalPages,
        true
      );
    }

    this.container.innerHTML = paginationHTML;

    // Attach event listeners for page buttons
    this.container.querySelectorAll('button[data-page]').forEach(button => {
      const page = parseInt(button.getAttribute('data-page'), 10);
      button.addEventListener('click', () => this.goToPage(page));
    });
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.onPageChange(page);
    this.render();
  }

  setTotalPages(totalPages) {
    if (this.totalPages !== totalPages) {
      this.totalPages = totalPages;
      this.render();
    }
  }
}
