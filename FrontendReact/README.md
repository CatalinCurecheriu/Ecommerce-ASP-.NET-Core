# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# E-commerce ASP.NET Core

Un progetto completo per un'applicazione di e-commerce sviluppata utilizzando **ASP.NET Core**. Questo progetto è progettato per offrire funzionalità di base per la gestione di prodotti, ordini e carrelli, con una struttura scalabile e facilmente espandibile.

---

## **Caratteristiche principali**

- **Gestione prodotti**: CRUD completo (creazione, lettura, aggiornamento, eliminazione) dei prodotti.
- **Gestione ordini**: Aggiunta, visualizzazione e aggiornamento degli ordini.
- **Carrello della spesa**: Funzionalità di base per aggiungere prodotti al carrello e calcolare il totale.
- **Interfaccia moderna**: Progettata con Blazor per una UI dinamica e reattiva.
- **Database**: Utilizzo di Entity Framework Core con supporto per SQL Server.
- **API REST**: Endpoints per interagire con le funzionalità principali del sistema.

---

## **Struttura del progetto**

Il progetto segue una struttura modulare:

- **Controllers**: Gestione delle richieste HTTP.
- **Data**: Configurazione del contesto database (`ECommerceContext`).
- **Interfaces**: Interfacce per l'accesso ai dati e alle logiche aziendali.
- **Models**: Definizione delle entità come `Product`, `Order`, `Cart`.
- **Repository**: Implementazione delle interfacce per accedere ai dati.

---

## **Tecnologie utilizzate**

- **Back-end**: ASP.NET Core 6
- **Database**: SQL Server
- **Front-end**: Blazor
- **ORM**: Entity Framework Core
- **Test API**: Postman
- **Versionamento**: Git e GitHub

---

## **Prerequisiti**

Assicurati di avere installato:

- [Visual Studio 2022](https://visualstudio.microsoft.com/) (con il carico di lavoro .NET Core)
- [SQL Server](https://www.microsoft.com/it-it/sql-server/sql-server-downloads)
- [Node.js](https://nodejs.org/) (se necessario per la parte front-end React/JS)
- [Git](https://git-scm.com/)

---

## **Guida all'installazione**

1. **Clona il repository**

   ```bash
   git clone https://github.com/CatalinCurecheriu/Ecommerce-ASP-.NET-Core.git
   cd Ecommerce-ASP-.NET-Core
   ```

2. **Configura il database**

   - Apri `appsettings.json`.
   - Modifica la stringa di connessione `DefaultConnection` con le tue credenziali SQL Server.

     ```json
     "ConnectionStrings": {
         "DefaultConnection": "Server=TUO_SERVER;Database=ECommerceDb;Trusted_Connection=True;"
     }
     ```

3. **Esegui le migrazioni**

   ```bash
   dotnet ef database update
   ```

4. **Avvia l'applicazione**

   ```bash
   dotnet run
   ```

   L'app sarà disponibile su `https://localhost:5001`.

---

## **API Endpoints**

### **Prodotti**
- `GET /api/products` - Ottieni tutti i prodotti
- `GET /api/products/{id}` - Ottieni un prodotto specifico
- `POST /api/products` - Aggiungi un nuovo prodotto
- `PUT /api/products/{id}` - Aggiorna un prodotto
- `DELETE /api/products/{id}` - Elimina un prodotto

### **Ordini**
- `GET /api/orders` - Ottieni tutti gli ordini
- `POST /api/orders` - Crea un nuovo ordine

---

## **Contributi**

Contributi, issue e richieste di funzionalità sono i benvenuti! Sentiti libero di aprire un [issue](https://github.com/CatalinCurecheriu/Ecommerce-ASP-.NET-Core/issues) o inviare una pull request.

---

## **Licenza**

Questo progetto è distribuito sotto la licenza MIT. Consulta il file [LICENSE](LICENSE) per maggiori dettagli.

---

## **Autore**

Catalin Curecheriu  
[GitHub Profile](https://github.com/CatalinCurecheriu)
