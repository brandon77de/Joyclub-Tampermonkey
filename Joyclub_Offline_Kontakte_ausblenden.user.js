// ==UserScript==
// @name         Joyclub: Offline Kontakte ausblenden
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Filtert Offline-Kontakte aus Listen
// @author       Gemini
// @match        *://*.joyclub.de/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const filter = () => {
        // Alle Avatar-Container finden
        const avatars = document.querySelectorAll('j-avatar');

        avatars.forEach(avatar => {
            // Shadow Root prüfen (wichtig für Joyclub)
            const shadow = avatar.shadowRoot;
            if (!shadow) return;

            // Das Image-Element im Shadow DOM finden, das den Status-Punkt hält
            const avatarImage = shadow.querySelector('j-avatar-image');
            if (!avatarImage) return;

            const status = avatarImage.getAttribute('status');
            const listItem = avatar.closest('j-list-item');

            if (listItem) {
                if (status === 'offline') {
                    // Verstecken
                    if (listItem.style.display !== 'none') {
                        listItem.style.setProperty('display', 'none', 'important');
                    }
                } else {
                    // Anzeigen (online oder away)
                    if (listItem.style.display === 'none') {
                        listItem.style.setProperty('display', '', '');
                    }
                }
            }
        });
    };

    // Beobachtet die Seite auf dynamisches Nachladen beim Scrollen
    const observer = new MutationObserver((mutations) => {
        filter();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Sofort ausführen
    filter();
})();
