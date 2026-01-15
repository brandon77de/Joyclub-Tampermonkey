// ==UserScript==
// @name         Joyclub Gender & Name Colorizer
// @namespace    http://tampermonkey.net/
// @version      7.0
// @description  Färbt Namen und Icons in allen Joyclub-Ansichten
// @author       Gemini
// @match        *://*.joyclub.de/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

const colorMap = {
        "1": "dodgerblue",     // MANN
        "2": "mediumseagreen", // FRAU
        "3": "orange",         // PAAR (M/F)
        "4": "limegreen",      // PAAR (Frau/Frau)
        "5": "cadetblue",      // PAAR (Mann/Mann)
        "6": "orchid",         // TRANS
        "7": "indianred",    // NON-BINARY
        "8": "peru",           // NON-BINARY
        "9": "yellow",         // PAAR (Non-Binary/Frau)
        "10": "white",         // 
        "11": "blue",          // PAAR (Non-Binary/Non-Binary)
        "23": "red"            // PAAR (Mann/Transmann)
  // ...
    };

    function applyStyles(icon, color) {
        // 1. ICON FÄRBEN (Shadow DOM des Icons)
        if (icon.shadowRoot) {
            const svgElements = icon.shadowRoot.querySelectorAll('svg');
            svgElements.forEach(svg => {
                svg.style.setProperty('fill', color, 'important');
                svg.style.setProperty('color', color, 'important');
                svg.querySelectorAll('path').forEach(p => p.style.setProperty('fill', color, 'important'));
            });
        }

        // 2. NAMEN FÄRBEN

        // STRATEGIE A: Suchergebnisse (j-member-card mit Shadow DOM)
        const card = icon.closest('j-member-card');
        if (card && card.shadowRoot) {
            const nameEl = card.shadowRoot.querySelector('.j-member-card__user-name');
            if (nameEl) {
                nameEl.style.setProperty('color', color, 'important');
                nameEl.style.setProperty('font-weight', 'bold', 'important');
            }
        }

        // STRATEGIE B: Listenansicht / Messenger (Name steht oft in <strong> vor dem Icon)
        // Wir suchen im gleichen Container nach einem <strong> oder einer Namensklasse
        const container = icon.closest('.date_info, .user_info, .media-content, .content');
        if (container) {
            const nameEl = container.querySelector('strong, .j-member-card__user-name, .nickname');
            if (nameEl) {
                nameEl.style.setProperty('color', color, 'important');
                nameEl.style.setProperty('font-weight', 'bold', 'important');
            }
        }
    }

    function scan(root) {
        const icons = root.querySelectorAll('j-gender-icon');
        icons.forEach(icon => {
            const gender = icon.getAttribute('universal-gender');
            if (colorMap[gender]) {
                applyStyles(icon, colorMap[gender]);
            }
        });

        // Rekursiv in Shadow DOMs abtauchen
        const all = root.querySelectorAll('*');
        all.forEach(el => {
            if (el.shadowRoot) scan(el.shadowRoot);
        });
    }

    const run = () => scan(document);
    const observer = new MutationObserver(run);
    observer.observe(document.body, { childList: true, subtree: true });

    setInterval(run, 2000); // Sicherheit für verzögertes Laden
    run();
})();
