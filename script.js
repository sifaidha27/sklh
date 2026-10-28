/* ========================================
   1. MENU NAVIGASI RESPONSIF
======================================== */

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
            );
        });

        // Menutup menu setelah tautan dipilih.
        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Buka menu navigasi");
            });
        });

        // Menutup menu dengan tombol Escape.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Buka menu navigasi");
            }
        });

        // Menutup menu saat kembali ke tampilan desktop.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 700) {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Buka menu navigasi");
            }
        });
    }

    /* ========================================
       2. TAHUN FOOTER OTOMATIS
    ======================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* ========================================
       3. NAVIGASI AKTIF
    ======================================== */

    const sections = document.querySelectorAll("main section[id]");
    const allNavLinks = document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

    function updateActiveNavigation() {
        let currentSection = "";
        const scrollPosition = window.scrollY + 130;

        sections.forEach(function (section) {
            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        allNavLinks.forEach(function (link) {
            const targetId = link.getAttribute("href").slice(1);

            if (targetId === currentSection) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation, {
        passive: true
    });

    updateActiveNavigation();

    /* ========================================
       4. PEMERIKSAAN TAUTAN INTERNAL
    ======================================== */

    // Memeriksa tautan ke bagian yang tersedia:
    // Beranda, Profil, Program, Pendaftaran, dan Kontak.

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();
                return;
            }

            const target = document.getElementById(href.slice(1));

            if (!target) {
                event.preventDefault();
                console.warn("Bagian tujuan tidak ditemukan:", href);
            }
        });
    });
});
