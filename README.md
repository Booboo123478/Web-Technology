# Home Services Booking Web Application

## Technologies utilisées

- Backend : Java 21, Spring Boot 3.4.3  
- Frontend : HTML, CSS, JavaScript, Bootstrap (servi via Nginx)  
- Stockage : fichiers JSON  
- Conteneurisation : Docker & Docker Compose  

## Installation et lancement

### 1. Compiler et packager le backend
```mvn clean package```

### 2. Lancer les conteneurs Docker
```docker compose up -d```

### 3. Accéder à l’application
Frontend Local : http://localhost:8080/odm
Frontend Serveur : https://corta-web-tech.ordredumalt.com/