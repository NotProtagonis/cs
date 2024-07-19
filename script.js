function showForm(formId) {
    document.getElementById('formMutasiMasuk').style.display = 'none';
    document.getElementById('formMutasiKeluar').style.display = 'none';
    
    document.getElementById(formId).style.display = 'block';
    
    document.getElementById('linkMutasiMasuk').classList.remove('active');
    document.getElementById('linkMutasiKeluar').classList.remove('active');
    
    if (formId === 'formMutasiMasuk') {
      document.getElementById('linkMutasiMasuk').classList.add('active');
    } else {
      document.getElementById('linkMutasiKeluar').classList.add('active');
    }
  }
  
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      const sheetName = this.getAttribute('data-sheet');
      formData.append('sheetName', sheetName);
      document.getElementById('loadingSpinner').style.display = 'block';
  
      fetch('https://script.google.com/macros/s/AKfycbwGQu1rBBLdXRCoAbj7kF1U8UgGXj7zzbxlohQrumgv/exec', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(data => {
          document.getElementById('loadingSpinner').style.display = 'none';
          alert(data);
          this.reset();
        })
        .catch(error => {
          document.getElementById('loadingSpinner').style.display = 'none';
          alert('Error: ' + error.message);
        });
    });
  });
  