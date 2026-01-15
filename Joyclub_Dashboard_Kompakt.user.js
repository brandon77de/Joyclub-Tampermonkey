// ==UserScript==
// @name         Joyclub Dashboard Kompakt
// @namespace    http://tampermonkey.net/
// @version      1.16
// @description  Kompakte Dashboard-Ansicht für Joyclub – Textabstand unten entfernt, Cards zentriert, Hover-Effekt
// @match        *://*.joyclub.de/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const css = `
    /* Überschrift ausblenden */
    .dashboard-title { display: none !important; }

    /* Container für Cards */
    .dashboard-content {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important; /* Cards zentriert */
        align-items: flex-start !important;
        gap: 6px !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    /* Einzelne Cards kompakt */
    .dashboard-content j-card {
        width: 110px !important;
        margin: 2px !important;
        padding: 6px 4px 4px 4px !important;
        background-color: #1c1c1c !important;
        border-radius: 8px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: flex-start !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease-in-out !important;
    }

    /* Text unter Icon */
    .dashboard-content j-card .text {
        font-size: 12px !important;
        line-height: 1.2em !important;
        text-align: center;
        white-space: normal !important;
        overflow: visible !important;
        text-overflow: unset !important;
        color: #fff !important;
        margin-bottom: 0 !important; /* Abstand unten entfernt */
        padding-top: 1px !important;
    }

    /* Hover-Effekt */
    .dashboard-content j-card:hover {
        transform: scale(1.02) !important;
        background-color: #262626 !important;
        box-shadow: 0 0 4px rgba(255, 255, 255, 0.12) !important;
        cursor: pointer !important;
    }

    /* Media Query für kleine Bildschirme */
    @media screen and (max-width: 480px) {
        .dashboard-content j-card { width: 90px !important; }
        .dashboard-content j-card .text { font-size: 10px !important; }
    }
    `;

    GM_addStyle(css);
})();
