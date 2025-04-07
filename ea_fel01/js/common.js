const siteData = {
  fooldal: {
    id: 'fooldal',
    title: 'Főoldal',
    href: './index.html'
  },
  tablazat: {
    id: 'tablazat',
    title: 'Táblázat',
    href: './tablazat.html'
  },
  html5: {
    id: 'html5',
    title: 'HTML5',
    href: './html5.html'
  },
  chartjs: {
    id: 'chartjs',
    title: 'Chart.js',
    href: './chartjs.html'
  },
  ajax: {
    id: 'ajax',
    title: 'Ajax',
    href: './ajax.html'
  },
  oojs: {
    id: 'oojs',
    title: 'OOJS',
    href: './oojs.html'
  }
};

const footerText = 'Lantos István - XXA2J3';

const currentId = document.body.id;
const currentPage = siteData[currentId];

const renderTitle = () => {
  const titleElement = document.querySelector('head title');
  if (titleElement && currentPage?.title) {
    titleElement.textContent = currentPage.title;
  }
};

const renderNav = () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.innerHTML = `
      <ul>
        ${Object.values(siteData).map(({ id, title, href }) => `
          <li>
            <a href='${href}' ${id === currentId ? 'class=\'active\'' : ''}>${title}</a>
          </li>
        `).join('')}
      </ul>
    `;
  }
};

const renderAside = () => {
  const asideH2 = document.querySelector('aside h2');
  if (asideH2 && currentPage?.title) {
    asideH2.textContent = currentPage.title;
  }
};

const renderFooter = () => {
  const footer = document.querySelector('footer');
  if (footer) footer.textContent = footerText;
};

document.addEventListener('DOMContentLoaded', () => {
  renderTitle();
  renderNav();
  renderAside();
  renderFooter();
});
