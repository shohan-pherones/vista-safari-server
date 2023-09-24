# Vista Safari

## Introduction

Vista Safari is a comprehensive travel booking and exploration platform that allows users to discover exciting travel destinations, book tour packages, and manage their travel experiences. Whether you're an adventurous traveler or an administrator overseeing travel operations, Vista Safari has the features you need to make your travel dreams come true.

## Features

- View Locations: Users can explore various travel destinations.
- Tour Details: Upon selecting a location, users can view tour dates and package prices.
- Book Tour Packages: Users can easily book tour packages for themselves.
- Limited Seat Availability: Each tour package has a maximum seat limit.
- Booking and Seat Deduction: Booking a seat deducted from available seats.
- Fully Booked Tours: If all seats are booked, the package becomes unavailable.
- User Dashboard: Users have a dashboard to manage bookings.
- Manual Booking Cancellation: Users can manually cancel their bookings.
- Admin Control: Admins manage users, bookings, tours, and more.
- Manual Tour Date Control: Admins can manually set and adjust tour dates.

## Technologies

- Express.js
- Node.js
- MongoDB
- Mongoose
- TypeScript
- JSON Web Tokens (JWT) for authentication

## Models

### User

| Field        | Type               |
| ------------ | ------------------ |
| Bookings     | Booking[]          |
| Payments     | Payment[]          |
| Name         | String             |
| Email        | String             |
| Password     | String             |
| Address      | String             |
| Phone number | String             |
| Role         | Enum [user, admin] |

### Location

| Field        | Type          |
| ------------ | ------------- |
| Name         | String        |
| Image        | String        |
| Spots        | Spot[]        |
| Resorts      | Resort[]      |
| Restaurants  | Restaurant[]  |
| TourPackages | TourPackage[] |

### Spot

| Field    | Type   |
| -------- | ------ |
| Name     | String |
| Image    | String |
| Location | {}     |

### Resort

| Field    | Type   |
| -------- | ------ |
| Name     | String |
| Image    | String |
| Location | {}     |

### Restaurant

| Field    | Type   |
| -------- | ------ |
| Name     | String |
| Image    | String |
| Location | {}     |

### TourPackage

| Field         | Type      |
| ------------- | --------- |
| Name          | String    |
| Date          | String    |
| Price         | Number    |
| Limit         | Number    |
| AvailableSeat | Number    |
| Location      | {}        |
| Transport     | String    |
| Bookings      | Booking[] |

### Booking

| Field       | Type   |
| ----------- | ------ |
| User        | {}     |
| TourPackage | {}     |
| Payment     | {}     |
| Seats       | Number |

## API Routes

| SL No. | HTTP Verb | Endpoint                                    | Description                                  | Permission |
| ------ | --------- | ------------------------------------------- | -------------------------------------------- | ---------- |
| 1      | POST      | /api/users/register                         | Register user                                | Public     |
| 2      | POST      | /api/users/login                            | Login existing user                          | Public     |
| 3      | GET       | /api/users                                  | Get all users                                | Admin      |
| 4      | GET       | /api/users/:id                              | Get a specific user                          | User       |
| 5      | PUT       | /api/users/:id                              | Update specific user's info                  | User       |
| 6      | DELETE    | /api/users/:id                              | Delete specific user                         | User       |
| 7      | POST      | /api/locations                              | Add location                                 | Admin      |
| 8      | PUT       | /api/locations/:id                          | Update specific location                     | Admin      |
| 9      | DELETE    | /api/locations/:id                          | Delete specific location                     | Admin      |
| 10     | GET       | /api/locations                              | Get all locations                            | Public     |
| 11     | GET       | /api/locations/:id                          | Get specific location                        | Public     |
| 12     | POST      | /api/locations/:id/spots                    | Add location spot                            | Admin      |
| 13     | PUT       | /api/locations/:id/spots/:sid               | Update specific location spot                | Admin      |
| 14     | DELETE    | /api/locations/:id/spots/:sid               | Delete specific location spot                | Admin      |
| 15     | GET       | /api/locations/:id/spots                    | Get specific location's all spots            | Public     |
| 16     | GET       | /api/locations/:id/spots/:sid               | Get specific location's specific spot        | Public     |
| 17     | POST      | /api/locations/:id/resorts                  | Add location resort                          | Admin      |
| 18     | PUT       | /api/locations/:id/resorts/:rid             | Update specific location resort              | Admin      |
| 19     | DELETE    | /api/locations/:id/resorts/:rid             | Delete specific location resort              | Admin      |
| 20     | GET       | /api/locations/:id/resorts                  | Get specific location's all resorts          | Public     |
| 21     | GET       | /api/locations/:id/resorts/:rid             | Get specific location's specific resort      | Public     |
| 22     | POST      | /api/locations/:id/restaurants              | Add location restaurant                      | Admin      |
| 23     | PUT       | /api/locations/:id/restaurants/:rid         | Update specific location restaurant          | Admin      |
| 24     | DELETE    | /api/locations/:id/restaurants/:rid         | Delete specific location restaurant          | Admin      |
| 25     | GET       | /api/locations/:id/restaurants              | Get specific location's all restaurants      | Public     |
| 26     | GET       | /api/locations/:id/restaurants/:rid         | Get specific location's specific restaurant  | Public     |
| 27     | POST      | /api/locations/:id/tour_packages            | Add location TourPackage                     | Admin      |
| 28     | PUT       | /api/locations/:id/tour_packages/:tid       | Update specific location TourPackage         | Admin      |
| 29     | DELETE    | /api/locations/:id/tour_packages/:tid       | Delete specific location TourPackage         | Admin      |
| 30     | GET       | /api/locations/:id/tour_packages            | Get specific location's all TourPackage      | Public     |
| 31     | GET       | /api/locations/:id/tour_packages/:tid       | Get specific location's specific TourPackage | Public     |
| 32     | GET       | /api/bookings                               | Get all bookings                             | Admin      |
| 33     | GET       | /api/bookings/users/:uid/                   | Get all bookings for specific user           | User       |
| 34     | POST      | /api/bookings/users/:uid/tour_packages/:tid |
| 35     | DELETE    | /api/bookings/:bid/users/:uid               | Delete a booking for specific user           | User       |
| 36     | GET       | /api/bookings/:bid/users/:uid               | Get specific bookings for specific user      | User       |

## Installation

1. Clone this repository.
2. Create an `.env` file with the following variables:
   - `MONGO_URI` (Your MongoDB connection URI)
   - `JWT_SECRET` (A secret key for JWT token generation)
3. Run `yarn` to install project dependencies.
4. Start the development server with `yarn dev`.

## Conclusion

Vista Safari is your gateway to unforgettable travel experiences. Whether you're a user eager to explore new destinations or an admin managing the travel platform, Vista Safari provides the tools and features you need. Start your journey with Vista Safari today.
