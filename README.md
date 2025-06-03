# Home Services Booking Web Application

## Technologies utilisées

- Backend : Java 21, Spring Boot 3.4.3  
- Frontend : HTML, CSS, JavaScript, Bootstrap (servi via Nginx)  
- Stockage : fichiers JSON  
- Conteneurisation : Docker & Docker Compose  

## Installation et lancement

### 1. Compiler et packager le backend
```bash
mvn clean package
```

### 2. Lancer les conteneurs Docker
```bash
docker compose up
```

### 3. Accéder à l’application
Frontend Local : http://localhost:8080/
Frontend Serveur : https://corta-web-tech.ordredumalt.com/