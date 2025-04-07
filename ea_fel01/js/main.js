////////////////////////////////////////////////////////////////////////////////
// Táblázat + Chart.js + OOJS menü
////////////////////////////////////////////////////////////////////////////////
let flowers;

if (
  document.body.id === 'tablazat' ||
  document.body.id === 'chartjs' ||
  document.body.id === 'oojs'
) {
  // Minta adatokkal seed-eljük a táblázatot betöltéskor
  // https://webtrack.ballseed.com/catalogsearch
  flowers = [
    { name: 'Amazon Neon Cherry', color: 'Bíbor', quantity: '300', plantDate: '2024-09-10', freezeTemp: -6.7 },
    { name: 'Sweet White', color: 'Fehér', quantity: '100', plantDate: '2024-10-15', freezeTemp: -17.8 },
    { name: 'Sweet White', color: 'Fehér', quantity: '50', plantDate: '2024-11-03', freezeTemp: -17.8 },
    { name: 'Sweet Deep Pink Maxine', color: 'Rózsaszín', quantity: '100', plantDate: '2024-10-19', freezeTemp: -17.8 },
    { name: 'Dianthus Carmen Purple', color: 'Lila', quantity: '200', plantDate: '2024-09-10', freezeTemp: -11.1 },
    { name: 'Dianthus Carmen Purple', color: 'Lila', quantity: '50', plantDate: '2024-09-13', freezeTemp: -11.1 },
    { name: 'Sweet Black Cherry', color: 'Sötét vörös', quantity: '400', plantDate: '2024-09-10', freezeTemp: -17.8 },
  ];
}

////////////////////////////////////////////////////////////////////////////////
// Táblázat + Chart.js menü
////////////////////////////////////////////////////////////////////////////////

let tableBody;
let headers;
let renderTable;

if (
  document.body.id === 'tablazat' ||
  document.body.id === 'chartjs'
) {
  tableBody = document.querySelector('#flowerList tbody');
  headers = document.querySelectorAll('#flowerList thead th');

  renderTable = () => {
    tableBody.innerHTML = '';
    flowers.forEach((flower, index) => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${flower.name}</td>
        <td>${flower.color}</td>
        <td>${flower.freezeTemp}</td>
        <td>${flower.quantity}</td>
        <td>${flower.plantDate}</td>
      </td>`;
      if (document.body.id === 'tablazat') {
        row.innerHTML += `
          <td>
            <button class='edit-btn' data-index='${index}'>Szerkeszt</button>
            <button class='delete-btn' data-index='${index}'>Törlés</button>
          </td>`;
      }
    });
  };

  document.addEventListener('DOMContentLoaded', renderTable);
}

////////////////////////////////////////////////////////////////////////////////
// Táblázat menü
////////////////////////////////////////////////////////////////////////////////
if (document.body.id === 'tablazat') {
  let selectedIndex = null;

  const form = document.querySelector('form');

  const getInputValue = id => document.getElementById(id)?.value.trim();

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formData = readFormData();
      if (selectedIndex === null) {
        insertNewRecord(formData);
      } else {
        updateRecord(formData);
      }
      resetForm();
    }
  };

  const readFormData = () => ({
    name: getInputValue('name'),
    color: getInputValue('color'),
    freezeTemp: document.getElementById('freezeTemp').value,
    quantity: document.getElementById('quantity').value,
    plantDate: document.getElementById('plantDate').value
  });

  const insertNewRecord = (data) => {
    flowers.push(data);
    renderTable();
  };

  const resetForm = () => {
    ['name', 'color', 'freezeTemp', 'quantity', 'plantDate'].forEach(id => {
      const element = document.getElementById(id);
      if (element) element.value = '';
    });
    selectedIndex = null;
  };

  const onEdit = (index) => {
    const flower = flowers[index];
    document.getElementById('name').value = flower.name;
    document.getElementById('color').value = flower.color;
    document.getElementById('freezeTemp').value = flower.freezeTemp;
    document.getElementById('quantity').value = flower.quantity;
    document.getElementById('plantDate').value = flower.plantDate;
    selectedIndex = index;
  };

  const updateRecord = (formData) => {
    flowers[selectedIndex] = formData;
    renderTable();
  };

  const onDelete = (index) => {
    if (confirm('Biztosan törölni szeretné ezt a rekordot?')) {
      flowers.splice(index, 1);
      resetForm();
      renderTable();
    }
  };

  const validate = () => {
    let isValid = true;

    const name = getInputValue('name');
    const color = getInputValue('color');
    const freezeTemp = getInputValue('freezeTemp');
    const quantity = document.getElementById('quantity').value;
    const plantDate = document.getElementById('plantDate').value;

    const toggleValidation = (id, condition) => {
      document.getElementById(id)?.classList.toggle('hide', condition);
      if (!condition) isValid = false;
    };

    toggleValidation('nameValidationError', name.length >= 3 && name.length <= 30);
    toggleValidation('colorValidationError', color !== '');
    toggleValidation('freezeTempValidationError', freezeTemp !== '');
    toggleValidation('quantityValidationError', quantity > 0);
    toggleValidation('dateValidationError', plantDate !== '');

    return isValid;
  };

  const sortTable = (columnIndex) => {
    const columnKey = ['name', 'color', 'freezeTemp', 'quantity', 'plantDate'][columnIndex];
    flowers.sort((a, b) => {
      const valA = a[columnKey];
      const valB = b[columnKey];
      // Ezen oszlopoknál a leginkább fagyérzékeny növényre
      // és a legtöbb elültetett tőszámra vagyunk kíváncsiak elől!
      if (columnKey === 'freezeTemp' || columnKey === 'quantity') {
        return parseFloat(valB) - parseFloat(valA);
      }
      return valA.localeCompare(valB, 'hu', { numeric: true });
    });
    renderTable();
  };

  const nameFilter = document.getElementById('nameFilter');
  const colorFilter = document.getElementById('colorFilter');
  const freezeTempFilter = document.getElementById('freezeTempFilter');
  const quantityFilter = document.getElementById('quantityFilter');
  const plantDateFilter = document.getElementById('plantDateFilter');

  const filterTable = () => {
    const nameQuery = nameFilter.value.toLowerCase();
    const colorQuery = colorFilter.value.toLowerCase();
    const freezeTempQuery = freezeTempFilter.value.toLowerCase();
    const quantityQuery = quantityFilter.value;
    const plantDateQuery = plantDateFilter.value;
    tableBody.innerHTML = '';
    flowers.forEach((flower, index) => {
      if (
        (flower.name.toLowerCase().includes(nameQuery)) &&
        (flower.color.toLowerCase().includes(colorQuery)) &&
        (flower.freezeTemp.toString().includes(freezeTempQuery)) &&
        (flower.quantity.toString().includes(quantityQuery)) &&
        (flower.plantDate.includes(plantDateQuery))
      ) {
        const row = tableBody.insertRow();
        row.innerHTML = `
          <td>${flower.name}</td>
          <td>${flower.color}</td>
          <td>${flower.freezeTemp}</td>
          <td>${flower.quantity}</td>
          <td>${flower.plantDate}</td>
          <td>
            <button class='edit-btn' data-index='${index}'>Szerkeszt</button>
            <button class='delete-btn' data-index='${index}'>Törlés</button>
          </td>`;
      }
    });
  };

  const updateFilterInputs = () => {
    const filterInputs = [nameFilter, colorFilter, freezeTempFilter, quantityFilter, plantDateFilter];
    const activeInput = filterInputs.find(input => input.value.trim() !== '');
    if (activeInput) {
      filterInputs.forEach(input => {
        input.disabled = (input !== activeInput);
      });
    } else {
      filterInputs.forEach(input => input.disabled = false);
    }
  };

  // Event Listeners

  nameFilter.addEventListener('input', () => {
    filterTable();
    updateFilterInputs();
  });
  colorFilter.addEventListener('input', () => {
    filterTable();
    updateFilterInputs();
  });
  freezeTempFilter.addEventListener('input', () => {
    filterTable();
    updateFilterInputs();
  });
  quantityFilter.addEventListener('input', () => {
    filterTable();
    updateFilterInputs();
  });
  plantDateFilter.addEventListener('input', () => {
    filterTable();
    updateFilterInputs();
  });

  form.addEventListener('submit', onFormSubmit);
  tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
      const index = e.target.dataset.index;
      onEdit(index);
    }
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.dataset.index;
      onDelete(index);
    }
  });

  headers.forEach((th, index) => {
    if (index < 5) {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => sortTable(index));
    }
  });
}

////////////////////////////////////////////////////////////////////////////////
// HTML5 menü
////////////////////////////////////////////////////////////////////////////////
if (document.body.id === 'html5') {
  // Web Storage példa

  const saveButton = document.getElementById('saveFlower');
  const loadButton = document.getElementById('loadFlower');
  const storageOutput = document.getElementById('storageOutput');
  const flowerData = { name: "Törökszegfű", description: "Gyönyörű, illatos virág." };

  saveButton.addEventListener('click', () => {
    localStorage.setItem('torokszegfu', JSON.stringify(flowerData));
    storageOutput.textContent = "A törökszegfű adatai elmentve.";
  });

  loadButton.addEventListener('click', () => {
    const data = localStorage.getItem('torokszegfu');
    storageOutput.textContent = data
      ? `Név: ${JSON.parse(data).name}, Leírás: ${JSON.parse(data).description}`
      : "Nincs mentett adat.";
  });

  // Web Workers példa

  const startWorkerBtn = document.getElementById('startWorker');
  const workerOutput = document.getElementById('workerOutput');

  startWorkerBtn.addEventListener('click', () => {
    if (window.Worker) {
      const workerCode = `
        self.addEventListener('message', e => {
          setTimeout(() => {
            self.postMessage("Worker: A törökszegfű egy áttelelő virág, mely anyák napja körül érik. Termesztésének nehézsége a korai időzítés.");
          }, 1000);
        });
      `;
      const blob = new Blob([workerCode], { type: "application/javascript" });
      const worker = new Worker(URL.createObjectURL(blob));
      worker.addEventListener('message', e => {
        workerOutput.textContent = e.data;
      });
      worker.postMessage("start");
    } else {
      workerOutput.textContent = "Web Worker nem támogatott.";
    }
  });

  // Server-Sent Events (SSE) példa

  const sseMessages = document.getElementById('sseMessages');
  if (window.EventSource) {
    const source = new EventSource('/sse.php');
    source.onmessage = e => {
      const msgDiv = document.createElement('div');
      msgDiv.textContent = e.data;
      sseMessages.appendChild(msgDiv);
    };
    source.onerror = () => {
      sseMessages.textContent = "SSE hiba vagy nincs kapcsolat.";
    };
  } else {
    sseMessages.textContent = "EventSource nem támogatott.";
  }

  // Geolocation API példa (async/await használatával)

  const getLocationBtn = document.getElementById('getLocationBtn');
  const geoOutput = document.getElementById('geoOutput');

  const getCurrentPositionAsync = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  getLocationBtn.addEventListener('click', async () => {
    if (navigator.geolocation) {
      try {
        const position = await getCurrentPositionAsync();
        geoOutput.textContent = `Szélesség: ${position.coords.latitude}, Hosszúság: ${position.coords.longitude}`;
      } catch (error) {
        geoOutput.textContent = `Hiba: ${error.message}`;
      }
    } else {
      geoOutput.textContent = "Geolocation API nem támogatott.";
    }
  });

  // Drag and Drop API példa

  const dragFlower = document.getElementById('dragFlower');
  const dropZone = document.getElementById('dropZone');

  dragFlower.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', 'Törökszegfű');
  });

  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    dropZone.textContent = `Elkapva: ${data}`;
  });

  // Canvas példa

  const canvas = document.getElementById('flowerCanvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // Virág középpontja
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(150, 100, 10, 0, Math.PI * 2);
    ctx.fill();
    // Szirmok
    ctx.fillStyle = 'pink';
    for (let i = 0; i < 8; i++) {
      const angle = i * (Math.PI / 4);
      const x = 150 + Math.cos(angle) * 30;
      const y = 100 + Math.sin(angle) * 30;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    }
    // Felirat: Törökszegfű
    ctx.fillStyle = 'black';
    ctx.font = '16px sans-serif';
    ctx.fillText("Törökszegfű", 110, 190);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Chart.js menü
////////////////////////////////////////////////////////////////////////////////
if (document.body.id === 'chartjs') {
  // Adatok csoportosítása a virág nevére (összeadva a quantity értékeket)
  const aggregatedData = {};
  flowers.forEach(flower => {
    const qty = parseInt(flower.quantity, 10);
    if (aggregatedData[flower.name]) {
      aggregatedData[flower.name] += qty;
    } else {
      aggregatedData[flower.name] = qty;
    }
  });

  const labels = Object.keys(aggregatedData);
  const data = Object.values(aggregatedData);

  const ctx = document.getElementById('plantingChart').getContext('2d');

  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Ültetett tőszám',
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
}

////////////////////////////////////////////////////////////////////////////////
// OOJS menü
////////////////////////////////////////////////////////////////////////////////
if (document.body.id === 'oojs') {
  class Flower {
    constructor({ name, color, quantity, plantDate, freezeTemp }) {
      this.name = name;
      this.color = color;
      this.quantity = quantity;
      this.plantDate = plantDate;
      this.freezeTemp = freezeTemp;
    }

    render(target) {
      const div = document.createElement('div');
      div.classList.add('flower-card');
      div.innerHTML = `
        <h3>${this.name}</h3>
        <p><strong>Szín:</strong> ${this.color}</p>
        <p><strong>Mennyiség:</strong> ${this.quantity} db</p>
        <p><strong>Fagytűrés:</strong> ${this.freezeTemp} °C</p>
      `;
      target.appendChild(div);
    }
  }

  class SpecialFlower extends Flower {
    constructor(data) {
      super(data);
      this.specialNote = data.freezeTemp < -15 ? 'Különösen fagytűrő fajta' : false;
    }

    render(target) {
      super.render(target);
      if (this.specialNote) {
        const lastCard = target.lastChild;
        const special = document.createElement('p');
        special.classList.add('special-note');
        special.innerHTML = `<strong class="speciality">Különlegesség:</strong> ${this.specialNote}`;
        lastCard.appendChild(special);
      }
    }
  }

  function sortFlowers(flowers) {
    const seenNames = new Set();
    const uniqueFlowers = flowers.filter(flowerData => {
      if (!seenNames.has(flowerData.name)) {
        seenNames.add(flowerData.name);
        return true;
      }
      return false;
    });
    return uniqueFlowers.sort((a, b) => a.name.localeCompare(b.name, 'hu'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.querySelector('#content');
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    contentDiv.appendChild(cardContainer);

    const sortedFlowers = sortFlowers(flowers);

    sortedFlowers.forEach(flowerData => {
      const flower = new SpecialFlower(flowerData);
      flower.render(cardContainer);
    });
  });
}
