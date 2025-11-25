import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

export const firebaseConfig = {
    apiKey: "AIzaSyBt16B6FnPwft82OEkPA-dnBwIlNt1RsqU",
    authDomain: "beyond-test-4c87a.firebaseapp.com",
    projectId: "beyond-test-4c87a",
    storageBucket: "beyond-test-4c87a.firebasestorage.app",
    messagingSenderId: "467835877240",
    appId: "1:467835877240:web:4184e988595eacc45cba8d",
    measurementId: "G-JRQY3VC9WT"
};

export const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

export function logFirebaseConnection() {
    console.log(
        `[Firebase] Conexão ativa: app "${firebaseApp.name}" (Project ID: ${firebaseConfig.projectId})`
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const testButton = document.getElementById('firebase-test-btn');
    if (testButton) {
        testButton.addEventListener('click', logFirebaseConnection);
    }
    console.log('[Firebase] SDK carregado via CDN e app inicializado.');
});

window.firebaseApp = firebaseApp;
window.testFirebaseConnection = logFirebaseConnection;
