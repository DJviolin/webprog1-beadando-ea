////////////////////////////////////////////////////////////////////////////////
// Ajax menü
////////////////////////////////////////////////////////////////////////////////
if (document.body.id === 'ajax') {
  const code = 'XXXA2J3wfg764'; // Saját Neptun kód + választott kód
  const url = 'http://gamf.nhely.hu/ajax2/';

  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
    }
  }

  async function readData() {
    const data = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `code=${code}&op=read`
    }).then(response => response.json());

    let content = '<h2>Adatok</h2>';

    if (data.list.length === 0) {
      content += 'Ezen kód azonosító számára még nincs adat a szerveren. Kérjük hozzon létre legalább egy rekordot!';
    } else {
      let heightSum = 0;
      let maxHeight = 0;

      data.list.forEach(row => {
        content += `<p>ID: ${row.id}, Név: ${row.name}, Magasság: ${row.height}, Testsúly: ${row.weight}</p>`;
        const height = parseFloat(row.height);
        heightSum += height;
        if (height > maxHeight) maxHeight = height;
      });

      const avgHeight = (heightSum / data.list.length).toFixed(2);

      content += `
        <h2>Statisztika magasságokról</h2>
        <p><strong>Összeg:</strong> ${heightSum}<br />
        <strong>Átlag:</strong> ${avgHeight}<br />
        <strong>Legnagyobb:</strong> ${maxHeight}</p>
      `;
    }

    document.getElementById('ajaxContent').innerHTML = content;
  }

  async function getDataForId() {
    const idInput = document.getElementById('id').value.trim();
    if (!idInput || isNaN(idInput)) {
      alert('Adjon meg egy érvényes numerikus ID-et!');
      return;
    }

    const id = parseInt(idInput);

    const data = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `code=${code}&op=read`
    }).then(response => response.json());

    const record = data.list.find(item => parseInt(item.id) === id);

    try {
      if (!record) {
        throw new ValidationError('Nem található adat a megadott ID-hez.');
      }
    } catch (error) {
      error instanceof ValidationError
        ? alert(error.message)
        : console.error('An unexpected error occurred:', error);
      return;
    }

    document.getElementById('name').value = record.name;
    document.getElementById('height').value = record.height;
    document.getElementById('weight').value = record.weight;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const operation = formData.get('operation');
    const id = formData.get('id').trim();
    const name = formData.get('name').trim();
    const height = formData.get('height').trim();
    const weight = formData.get('weight').trim();

    if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
      alert('Név, magasság, súly kötelező és legfeljebb 30 karakter lehet!');
      return;
    }
    if (operation === 'update' && (!id || isNaN(id))) {
      alert('Frissítéshez érvényes ID szükséges!');
      return;
    }

    const params = new URLSearchParams({ code, op: operation });
    if (operation !== 'create') {
      params.append('id', id);
    }
    params.append('name', name);
    params.append('height', height);
    params.append('weight', weight);

    const result = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: params.toString()
    }).then(response => response.text());

    alert(result > 0
      ? `${operation} művelet sikeres!`
      : `${operation} művelet NEM sikeres!`
    );

    event.target.reset();
    await readData();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ajaxForm').addEventListener('submit', handleSubmit);
    document.getElementById('getDataForId').addEventListener('click', getDataForId);
    readData();
  });
}
