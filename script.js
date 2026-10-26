

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", function () {
            nav.classList.toggle("open");
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
            });
        });
    }


    /* =====================================================
       COPY EMAIL
    ===================================================== */

    const copyBtn = document.getElementById("copy");

    if (copyBtn) {

        copyBtn.addEventListener("click", function () {

            const email = "shinymais05@gmail.com";

            if (navigator.clipboard) {

                navigator.clipboard.writeText(email)
                    .then(function () {

                        copyBtn.textContent = "Copied ✓";

                        setTimeout(function () {
                            copyBtn.textContent = "Copy email";
                        }, 1500);

                    })
                    .catch(function () {
                        alert("My email is: " + email);
                    });

            } else {
                alert("My email is: " + email);
            }

        });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document.querySelectorAll("img").forEach(function (img) {

        img.addEventListener("error", function () {

            console.warn(
                "Image could not be loaded:",
                img.src
            );

            img.style.opacity = "0.35";

        });

    });


    /* =====================================================
       CLICK-TO-VIEW IMAGES
       
       This targets:
       - Certificates
       - Aria's Cafe evidence
       - EduKids evidence
       - Project images
       - Other portfolio images
    ===================================================== */

    const clickableImages = document.querySelectorAll(`
        .certificate-image img,
        .evidence img,
        .evidence-item img,
        .project-art img,
        .slots img
    `);

    clickableImages.forEach(function (img) {

        img.style.cursor = "zoom-in";

        img.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            openImage(img.src, img.alt);

        });

    });


    /* =====================================================
       CREATE IMAGE MODAL
    ===================================================== */

    createImageModal();

});


/* =========================================================
   CREATE IMAGE MODAL
========================================================= */

function createImageModal() {

    if (document.getElementById("imageModal")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "imageModal";

    modal.innerHTML = `
        <div class="image-modal-content">

            <button
                class="image-modal-close"
                id="imageModalClose"
                aria-label="Close image"
            >
                &times;
            </button>

            <img
                id="expandedImage"
                src=""
                alt="Expanded portfolio image"
            >

            <div class="image-modal-hint">
                Click outside the image or press ESC to close
            </div>

        </div>
    `;

    document.body.appendChild(modal);


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    const closeBtn = document.getElementById("imageModalClose");

    if (closeBtn) {

        closeBtn.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            closeImage();

        });

    }


    /* =====================================================
       CLOSE WHEN CLICKING MODAL BACKGROUND
    ===================================================== */

    modal.addEventListener("click", function (event) {

        if (
            event.target === modal ||
            event.target.classList.contains("image-modal-content")
        ) {
            closeImage();
        }

    });


    /* =====================================================
       PREVENT IMAGE FROM CLOSING MODAL
    ===================================================== */

    const expandedImage =
        document.getElementById("expandedImage");

    if (expandedImage) {

        expandedImage.addEventListener("click", function (event) {

            event.stopPropagation();

        });

    }

}


/* =========================================================
   OPEN IMAGE
========================================================= */

function openImage(imageSrc, imageAlt) {

    const modal = document.getElementById("imageModal");
    const expandedImage = document.getElementById("expandedImage");

    if (!modal || !expandedImage) {
        return;
    }


    /* Set image */

    expandedImage.src = imageSrc;
    expandedImage.alt = imageAlt || "Expanded portfolio image";


    /* Show modal */

    modal.classList.add("show");

    document.body.classList.add("modal-open");


    /* Prevent page scrolling */

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE IMAGE
========================================================= */

function closeImage() {

    const modal = document.getElementById("imageModal");
    const expandedImage = document.getElementById("expandedImage");

    if (!modal) {
        return;
    }


    /* Hide modal */

    modal.classList.remove("show");

    document.body.classList.remove("modal-open");

    document.body.style.overflow = "";


    /* Clear image after animation */

    if (expandedImage) {

        setTimeout(function () {
            expandedImage.src = "";
        }, 250);

    }

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeImage();
    }

})

/* =====================================================
   RESUME IMAGE VIEWER
===================================================== */

const resumeImages =
    document.querySelectorAll(".resume-image img");

resumeImages.forEach(function (img) {

    img.style.cursor = "zoom-in";

    img.addEventListener("click", function () {
        openImage(img.src);
    });

});

