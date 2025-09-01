# 🚘 Car Rental Application – Owner Portal (Frontend)

## 📌 Overview

The **Owner Portal** is the **dedicated frontend** for car owners in the Car Rental Application ecosystem.
It provides owners with a **role-specific dashboard** where they can:

* Register cars for rental
* Manage availability
* Track bookings
* Update rental statuses

This portal is **separate from the customer-facing frontend**, ensuring a clean **RBAC (Role-Based Access Control)** structure. Owners can manage their cars securely and efficiently with an interface built on **React, Redux, and Tailwind CSS**.

---

## ✨ Features

### 🔐 Authentication & Security

* Owner **Signup** and **Login** with JWT-based session handling
* **Protected routes** – Only logged-in owners can access the dashboard
* Local storage integration for tokens and auto-logout on expiry

---

### 🚗 Car Management

* **Register a Car**

  * Enter details like maker, model, type, year of purchase, transmission, fuel type, seats, price per day, location, etc.
  * Upload car images using ImageKit integration through the backend
* **Delete Registered Cars** – Remove cars no longer available for rental
* **View All Cars Registered** – Interactive dashboard showing all cars owned with key details
* **Update Availability Status** – Toggle cars between "Available" and "Unavailable" in real time

---

### 📑 Rental Management

* **Booking Overview** – See all rental requests/bookings for owner’s cars
* **Update Rental Status** – Change the status of a booking (e.g., Ongoing, Completed, Cancelled) to keep track of car usage

---

### 🤖 AI Integration (via Backend APIs)

* **Auto-Generated Car Descriptions**

  * When registering a car, owners can generate a **short, optimized description** using AI
  * Helps improve listing appeal and saves time

---

## 🛠 Tech Stack

* **React.js** – Component-based library for building dynamic UI
* **Redux Toolkit** – Efficient global state management for authentication, cars, and bookings
* **Tailwind CSS** – Utility-first CSS for a modern, responsive, and clean interface
* **Axios** – For API communication with backend services
* **React Router DOM** – Smooth navigation across dashboard pages

---

## 🚀 Summary

The **Owner Portal frontend** empowers car owners with a **dedicated management interface**.
It provides:

* **Seamless integration** with backend APIs
* **AI-powered assistance** for better car listings
* **Secure authentication**
* **Real-time management** of cars and rentals

This separation of concerns ensures that owners have their **own professional-grade portal**, distinct from the customer side, making the system **scalable, secure, and user-friendly**.

---
