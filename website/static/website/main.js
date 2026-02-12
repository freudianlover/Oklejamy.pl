// Czekamy aż cała strona się załaduje
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Pobieramy elementy Lightboxa z HTML
    var modal = document.getElementById("lightbox");
    var modalImg = document.getElementById("lightbox-img");
    var captionText = document.getElementById("caption");
    var closeBtn = document.getElementsByClassName("close-btn")[0];

    // --- CZĘŚĆ 2: MODAL DLA USŁUG ---

    // Pobieramy elementy modala usług
    const serviceModal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalIcon = document.getElementById('modal-icon');
    const closeServiceBtn = document.querySelector('.close-service-btn');

    // Pobieramy wszystkie karty usług
    const serviceCards = document.querySelectorAll('.service-card');

    // Dodajemy obsługę kliknięcia dla każdej karty
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // 1. Pobieramy dane z atrybutów data- (które dodaliśmy w HTML)
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const iconSrc = this.getAttribute('data-icon');

            // 2. Wypełniamy modal tymi danymi
            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            
            if (iconSrc) {
                modalIcon.src = iconSrc;
                modalIcon.style.display = 'block';
            } else {
                modalIcon.style.display = 'none';
            }

            // 3. Pokazujemy modal (zmieniamy styl display na flex, żeby wyśrodkować)
            serviceModal.style.display = 'flex';
        });
    });

    // Funkcja zamykania modala usług
    function closeService() {
        serviceModal.style.display = 'none';
    }

    // Kliknięcie w X
    if (closeServiceBtn) {
        closeServiceBtn.addEventListener('click', closeService);
    }

    // Kliknięcie w tło modala (żeby zamknąć)
    window.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            closeService();
        }
    });
    
    // Funkcja globalna do przycisku "Zamów usługę"
    window.closeServiceModal = closeService;
    // 2. Pobieramy wszystkie obrazki z sekcji portfolio
    // Szukamy tylko obrazków wewnątrz klasy .portfolio-item
    var images = document.querySelectorAll('.portfolio-item img');

    // 3. Dodajemy "nasłuchiwanie" kliknięcia dla każdego obrazka
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block"; // Pokaż czarne tło
            modalImg.src = this.src;       // Skopiuj źródło zdjęcia do okna
            
            // Pobieramy podpis z nakładki (overlay)
            // img -> rodzic (portfolio-item) -> dziecko (.overlay) -> tekst
            var title = this.nextElementSibling.innerText; 
            captionText.innerHTML = title;
        });
    });

    // 4. Funkcja zamykania po kliknięciu w X
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 5. Funkcja zamykania po kliknięciu w czarne tło (obok zdjęcia)
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
