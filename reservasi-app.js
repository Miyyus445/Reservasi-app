(function() {
    "use strict";

    const form = document.querySelector('#form-reservasi');
    const inputNama = document.querySelector('#nama');
    const inputEmail = document.querySelector('#email');
    const selectEvent = document.querySelector('#event');
    const notification = document.querySelector('#form-notification');
    const resetBtn =document.querySelector('#reset-btn');
    const clearAllBtn = document.querySelector('#clear-all-btn');
    const listContainer = document.querySelector('#participant-list-container');
    const totalBadge = document.querySelector('#total-badge');

    let pesertaList = [];

    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = 'form-notification show ' + type;
    }

    function hideNotification() {
        notification.classList.remove('show', 'success', 'error');
        notification.textContent = '';
    }

    function renderDaftarPeserta() {
        listContainer.innerHTML = '';

        if (pesertaList.length === 0) {
            listContainer.innerHTML = '<p class="empty-message">Belum ada peserta yang mendaftar</p>';
        } else {
            const listWrapper = document.createElement('div');
            listWrapper.className = 'participant-list';

            pesertaList.forEach((peserta, index) => {
                const item = document.createElement('div');
                item.className = 'participant-item';

                item.innerHTML = `
                    <div class="participant-info">
                        <p><strong>${index + 1}. ${peserta.nama}</strong></p>
                        <p>${peserta.email}</p>
                        <p><strong>Event:</strong> ${peserta.event}</p>
                        <p><strong>Daftar:</strong> ${peserta.tanggal}</p>
                    </div>
                    <div class="participant-actions">
                        <button class="btn-small-danger btn-hapus">Hapus</button>
                    </div>
                `;

                const btnHapus = item.querySelector('.btn-hapus');
                btnHapus.addEventListener('click', function() {
                    pesertaList.splice(index, 1);
                    renderDaftarPeserta();
                    hideNotification();
                });

                listWrapper.appendChild(item);
            });

            listContainer.appendChild(listWrapper);
        }

        totalBadge.textContent = `Jumlah Peserta: ${pesertaList.length}`;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nama = inputNama.value.trim();
        const email = inputEmail.value.trim();
        const eventPilihan = selectEvent.value;

        if (nama === '' || email === '' || eventPilihan === '') {
            showNotification('⚠️ Nama, email, dan pilihan event wajib diisi!', 'error');
            return;
        }

        const opsiTanggal = {day: 'numeric', month: 'long', year: 'numeric' };
        const tanggalDaftar = new Date().toLocaleDateString('id-ID', opsiTanggal);

        pesertaList.push({
            nama: nama,
            email: email,
            event: eventPilihan,
            tanggal: tanggalDaftar
        });

        renderDaftarPeserta();
        showNotification('✅ Pendaftaran berhasil!', 'success');

        inputNama.value = '';
        inputEmail.value = '';
        selectEvent.value = '';
        inputNama.focus();
    });

    resetBtn.addEventListener('click', function() {
        inputNama.value = '';
        inputEmail.value = '';
        selectEvent.value = '';
        hideNotification();
        inputNama.focus();
    });

    clearAllBtn.addEventListener('click', function() {
        if (pesertaList.length === 0) return;

        if (confirm('Apakah Anda yakin ingin menghapus semua daftar peserta?')) {
            pesertaList = [];
            renderDaftarPeserta();
            hideNotification();
        }
    });

    renderDaftarPeserta();

})();