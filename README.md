# Local Event Helper

Local Event Helper is a web platform that connects event organizers with local service providers.
The project is built with a Laravel REST API backend and a React frontend.

This repository contains:
- `backend`: Laravel API, authentication, business logic, database migrations
- `frontend`: React application (Vite + TypeScript)
- `diagrams`: architecture/design diagrams

## 1. Project Goal

The application helps three roles:
- Organizer: create and manage events, tasks, budget, provider bookings, messaging
- Provider: manage services, booking requests, availability, messaging
- Admin: platform overview, moderation, user status management

## 2. Tech Stack

### Backend
- Laravel 12
- Postgresql

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Laravel Echo + Pusher JS client (for Reverb)

## 3. Main Features

### Organizer
- Login / profile access
- Event CRUD
- Provider search by category/location
- Add provider to event via booking request
- Event tasks CRUD
- Event budget create/update/delete
- Internal chat with providers

### Provider
- Login / profile access
- Service CRUD
- Receive and answer booking requests (confirm/decline)
- Manage availability dates
- Read review metrics
- Internal chat with organizers

### Admin
- Platform statistics dashboard
- User list
- Ban / unban users
- Event moderation (status updates)
- Activity logs and review moderation endpoints

