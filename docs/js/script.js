document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const mainHeader = document.querySelector('.main-header'); // For å endre header-stil ved åpning
    const body = document.body; // For å legge til/fjerne body.alt-page klasse
    
    // Opprett et overlay-element hvis det ikke finnes
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        mainHeader.classList.toggle('menu-open'); // Legger til klasse for å endre headerens bakgrunn
        body.classList.toggle('no-scroll'); // Hindrer scrolling når menyen er åpen
    }

    navToggle.addEventListener('click', toggleMenu);

    overlay.addEventListener('click', toggleMenu); // Lukk meny ved klikk utenfor

    // Lukk menyen når en navigasjonslenke klikkes (valgfritt)
    mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Håndter endring av skjermstørrelse for å tilbakestille menyen
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767 && mainNav.classList.contains('active')) {
            toggleMenu(); // Lukk menyen hvis vinduet er større enn mobilbredde
        }
    });

    // Fiks fargen på burger-ikonet basert på body-klassen ved last
    function updateBurgerIconColor() {
        if (body.classList.contains('alt-page')) {
            navToggle.querySelectorAll('.icon-bar').forEach(bar => {
                bar.style.backgroundColor = 'var(--color-primary)';
            });
        } else {
            navToggle.querySelectorAll('.icon-bar').forEach(bar => {
                bar.style.backgroundColor = 'var(--color-white)';
            });
        }
    }

    // Oppdater fargen ved lasting av siden
    updateBurgerIconColor();

    // Observer body for endringer i 'alt-page' klassen (om du bytter sider uten full refresh)
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                updateBurgerIconColor();
            }
        });
    });

    observer.observe(body, { attributes: true });
});