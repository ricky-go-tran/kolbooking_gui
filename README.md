# KOLSBOOKING
*KOLSBooking - Connecting User And KOLS*
## Introduction
The KOL Booking Website, a platform designed to facilitate the booking of Key Opinion Leaders (KOLs) for various advertising campaigns. This README provides an overview of the website's features and the roles involved.

## Feature 
- [x] Authentication (Google authentication)
- [x] Admin: profile
- [x] Admin: User management
- [x] Admin: Job management
- [x] KOL: profile
- [x] KOL: statictiscal
- [x] KOL: calendar (crud, google calendar sync)
- [x] KOL: Job(apply, handle, finish)
- [x] KOL: bookmark (mark/unmark)
- [x] User: Job (new job, booking, cancel)
- [x] User: payment 
- [x] All: newfeed, search KOL

## Technologies 
- Rails 7
- Devise, Pundit, Rolify for Authentication and Authorization
- Active Storage for file managent
- Action cable for realtime BE
- Background Job (Sidekiq)

## Entity Relationship Diagram 
![image](https://github.com/ricky-go-tran/KOLSBOOKING/assets/136413699/a52a1cc4-95c9-4bc7-8b8c-cfe82041e228)

## How To Use? 
- **Step 1:** Download source


  ![image](https://github.com/ricky-go-tran/BookingDoctor/assets/136413699/a782fe31-928c-44c6-a2c4-66a8b409a8df)
  

- **Step 2:** Install ruby ​​and rails environment. (Tutorial: https://www.tutorialspoint.com/ruby-on-rails/rails-installation.htm)
- **Step 3:** Prepare a stripe account, webhook,key. (Stripe: https://stripe.com/)
- **Step 4:** Prepare postgresql
  
  - With local: [https://www.postgresql.org/](https://www.postgresql.org/download/)https://www.postgresql.org/download/
  - Or use host
- **Step 5:** Run `bundle install` to install all denpendencies
- **Step 6:**  With local database config can config in  config/database.yml

  
![image](https://github.com/ricky-go-tran/BookingDoctor/assets/136413699/34076b62-4334-4319-a147-23497d126bb2)

- **Step 7:** Delete old cretials and add new file with following content:
   `secret_key_base: ((value))
    postgres_host: ((value))
    database_name: ((value))
    postgres_user: ((value))
    postgres_password: ((value))
    stripe_publishable_key:((value))
    stripe_secret_key: ((value))
    email_password: ((value))`  
-  **Step 8:** Create database `rails db:create`
-  **Step 9:** Migrate database `rails db:migrate` but not following default. Use migrate up each file in order to avoid foreign key errors
![BookingDoctor (1)](https://github.com/ricky-go-tran/BookingDoctor/assets/136413699/a7ac1aa1-a487-4137-ab31-5e94bf055e9f)
 
- **Step 10:** Run seed file
- **Step 11:** Run `rails server`


