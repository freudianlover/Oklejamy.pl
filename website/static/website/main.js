// Czekamy aż cała strona się załaduje
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Pobieramy elementy Lightboxa z HTML
    // --- ZAKTUALIZOWANA CZĘŚĆ 1: LIGHTBOX GALERIA ---
    const modal = document.getElementById("lightbox");
    const modalImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("caption");
    const counterText = document.getElementById("image-counter");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // Zmienne do przechowywania stanu aktualnej galerii
    let currentGallery = [];
    let currentIndex = 0;

    // Pobieramy wszystkie KAFELKI projektów
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // 1. Znajdź wszystkie ukryte adresy zdjęć w tym konkretnym kafelku
            const dataSpans = this.querySelectorAll('.gallery-data span');
            
            // 2. Przekonwertuj je na tablicę (array) adresów URL
            currentGallery = Array.from(dataSpans).map(span => span.getAttribute('data-src'));
            
            // 3. Ustaw początkowy indeks na 0 (okładka)
            currentIndex = 0;
            
            // 4. Pobierz tytuł (z nakładki overlay)
            const title = this.querySelector('.overlay span').innerText;
            captionText.innerHTML = title;

            // 5. Pokaż okno i pierwsze zdjęcie
            modal.style.display = "block";
            updateLightbox();
        });
    });

    // Funkcja aktualizująca zdjęcie w oknie
    function updateLightbox() {
        modalImg.src = currentGallery[currentIndex];
        counterText.innerText = `Zdjęcie ${currentIndex + 1} z ${currentGallery.length}`;
        
        // Ukryj strzałki, jeśli galeria ma tylko 1 zdjęcie
        if (currentGallery.length <= 1) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        } else {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        }
    }

    // Kliknięcie w Nastepne
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Zapobiega zamknięciu tła przy klikaniu strzałki
        currentIndex = (currentIndex + 1) % currentGallery.length; // Zapętlanie galerii
        updateLightbox();
    });

    // Kliknięcie w Poprzednie
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; // Zapętlanie w tył
        updateLightbox();
    });

    // Zamykanie okna
    closeBtn.onclick = function() { modal.style.display = "none"; }
    modal.addEventListener('click', function(event) {
        if (event.target === modal) { modal.style.display = "none"; }
    });

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
          // --- CZĘŚĆ 3: HAMBURGER MENU ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li a");

    if (hamburger) {
    // Kliknięcie w hamburgera wysuwa/chowa menu i animuje ikonę w X
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // ŚWIETNY UX: Zamykanie menu po kliknięciu w dowolny link!
    // Gdy klient kliknie "Oferta", strona zjedzie w dół, a menu samo się schowa.
    links.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
    }
});
