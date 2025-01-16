import React from 'react';
import ReactDOM from 'react-dom/client'; // Ważne, aby importować z 'react-dom/client'
import './index.css'; // Stylizacja
import App from './App'; // Komponent główny

// Znalezienie kontenera (div) o id 'root' w pliku public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderowanie aplikacji w tym kontenerze
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
