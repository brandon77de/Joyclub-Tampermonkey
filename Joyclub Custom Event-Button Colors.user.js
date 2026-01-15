Joyclub Dashboard Kompakt// ==UserScript==
// @name         Joyclub Custom Event-Button Colors
// @namespace    https://joyclub.de/
// @version      1.2
// @description  Colors for Anmeldung / Warteliste and reliable bookmark ring
// @match        *://*.joyclub.de/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /********************
     * CSS STYLES
     ********************/
    const css = `
/* 1) ANGMELDET → dark green */
j-button[variant="secondary"][href*="#tr_event_anmeldung_information"],
j-button.link_to_tab[variant="secondary"][href="#tr_event_anmeldung_information"] {
  background-color: #0f6d2f !important;
  color: #fff !important;
  border-color: #0d5e28 !important;
  border-radius: 8px !important;
}
j-button[variant="secondary"][href*="#tr_event_anmeldung_information"] *,
j-button.link_to_tab[variant="secondary"][href="#tr_event_anmeldung_information"] * {
  color: #fff !important;
  fill: currentColor !important;
}

/* 2) AUF DER WARTELISTE → orange */
j-button[variant="secondary"][href*="#jetzt_anmelden"],
j-button.link_to_tab[variant="secondary"][href="#jetzt_anmelden"] {
  background-color: #d97706 !important;
  color: #fff !important;
  border-color: #b45309 !important;
  border-radius: 8px !important;
}
j-button[variant="secondary"][href*="#jetzt_anmelden"] *,
j-button.link_to_tab[variant="secondary"][href="#jetzt_anmelden"] * {
  color: #fff !important;
  fill: currentColor !important;
}

/* Hover polish */
j-button[variant="secondary"][href*="#tr_event_anmeldung_information"]:hover,
j-button.link_to_tab[variant="secondary"][href="#tr_event_anmeldung_information"]:hover,
j-button[variant="secondary"][href*="#jetzt_anmelden"]:hover,
j-button.link_to_tab[variant="secondary"][href="#jetzt_anmelden"]:hover {
  filter: brightness(0.95) !important;
}
`;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);


    /********************
     * BOOKMARK RING FIX (Shadow DOM safe)
     ********************/
    const RING = "inset 0 0 0 4px #0f6d2f";

    function applyBookmarkRing() {
        document.querySelectorAll(
            'j-button[title="Veranstaltung nicht mehr merken."]'
        ).forEach(jbtn => {
            if (!jbtn.shadowRoot) return;

            const innerBtn = jbtn.shadowRoot.querySelector("button");
            if (!innerBtn) return;

            innerBtn.style.boxShadow = RING;
            innerBtn.style.borderRadius = "8px";
        });

        // Safety cleanup
        document.querySelectorAll("j-button").forEach(jbtn => {
            if (
                jbtn.getAttribute("title") !== "Veranstaltung nicht mehr merken." &&
                jbtn.shadowRoot
            ) {
                const innerBtn = jbtn.shadowRoot.querySelector("button");
                if (innerBtn && innerBtn.style.boxShadow === RING) {
                    innerBtn.style.boxShadow = "";
                }
            }
        });
    }

    applyBookmarkRing();

    const observer = new MutationObserver(() => {
        applyBookmarkRing();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
