💊 Pharmacy Inventory Manager
🧭 Introduction
Pharmacy Inventory Manager is a full-stack web application built with C# (.NET) and React. It helps pharmacy staff manage their medication inventory, suppliers, and restock records efficiently. The app enables authenticated users to track stock levels, recent restocks, and medications nearing expiration — all from a streamlined dashboard.

🎯 Purpose & Motivation
Pharmacies are responsible for maintaining accurate medication inventories, ensuring proper supplier tracking, and preventing expired drugs from remaining in circulation. Many small or local pharmacies still rely on spreadsheets or paper logs to manage this data, which can lead to costly mistakes.

The Pharmacy Inventory Manager was built to:

Provide a centralized, secure inventory system

Improve visibility into supply levels and restock history

Prevent medication waste through expiration alerts

Help pharmacy staff focus on patient care rather than paperwork

🛠️ How Does the Application Work?
✨ Key Features
Authentication: Only registered users can manage inventory

Dashboard (Home View):

See number of medications and total pill count

View recent restocks and upcoming expirations

Medication Management:

Create, edit, and delete medications

Link medications to suppliers

Supplier Management:

Create, edit, and delete suppliers

Restock Management:

Log medication restocks with quantity and supplier info

User Profile:

View email and username

Update account password

🎥 Optional: Add a short Loom video or GIF showing the dashboard and create/edit flows here

🧱 How Was the Application Developed?
Frontend:

React

React Router

Fetch API

Context/localStorage for token handling

Backend:

ASP.NET Core Web API

Entity Framework Core

SQL Server for persistent storage

Identity Framework for user authentication and password management

Database:

One-to-many: Users → Medications, Suppliers, RestockLogs

Many-to-many: Medications ↔ Suppliers

Seed data used for testing and development

💻 How to Install & Run the Application
Prerequisites
.NET 6 SDK

Node.js and npm

SQL Server (Express or local)

Backend Setup
bash
Copy
Edit
cd PharmacyInventoryManager.API
dotnet restore
dotnet ef database update
dotnet run
Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start
The app should open at http://localhost:3000 and connect to the backend API at https://localhost:5001 (or your configured port).

🧗 Difficulties & Challenges Faced
EF Core Many-to-Many Configuration: Setting up a composite key and relationship for the MedicationSupplier join table required careful Fluent API configuration.

Authentication Integration: Coordinating token-based auth between the frontend and backend took time to troubleshoot, especially handling invalid sessions.

Data Relationships in Forms: Populating dropdowns with existing suppliers/medications and handling IDs cleanly in state was an early frontend hurdle.

Expiring Medication Logic: Creating a clean way to filter and sort soon-to-expire medications on the dashboard took trial and error with date logic.
