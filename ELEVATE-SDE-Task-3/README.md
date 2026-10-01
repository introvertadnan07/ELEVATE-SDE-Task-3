@'

\# CredVault — Certificate Issuing \& Verification Platform



Backend API for the CredVault Certificate Issuing \& Verification Platform.



\## Project Overview



CredVault Backend handles certificate requests, application tracking, certificate verification, and admin management.



\### Features



\- Submit certificate applications

\- Generate unique Application IDs

\- Track application status

\- Admin login with JWT authentication

\- View applications

\- Approve applications

\- Reject applications

\- Generate Certificate IDs

\- Verify certificates

\- View certificates

\- Revoke certificates



\## Technologies Used



\### Backend

\- Node.js

\- Express.js

\- JavaScript



\### Database

\- MongoDB

\- MongoDB Atlas

\- Mongoose



\### Authentication \& Security

\- JWT

\- bcryptjs

\- CORS

\- dotenv



\## Database Models



\### Applications

\- applicationId

\- name

\- phone

\- gender

\- city

\- state

\- status

\- submittedAt



Statuses:

\- Pending

\- Approved

\- Rejected



\### Certificates

\- certificateId

\- applicationId

\- issuedOn

\- status



Statuses:

\- Valid

\- Revoked



\### Admins

\- username

\- password



Admin passwords are stored using bcrypt hashing.



\## API Endpoints



\### Public APIs



\#### Create Application

POST `/api/applications`



\#### Track Application

GET `/api/applications/track/:applicationId`



\#### Verify Certificate

GET `/api/certificates/verify/:certificateId`



\### Admin APIs



\#### Admin Login

POST `/api/admin/login`



\#### Get Applications

GET `/api/admin/applications`



\#### Approve Application

PATCH `/api/admin/applications/:applicationId/approve`



\#### Reject Application

PATCH `/api/admin/applications/:applicationId/reject`



\#### Get Certificates

GET `/api/admin/certificates`



\#### Revoke Certificate

GET `/api/admin/certificates/:certificateId/revoke`



Protected admin endpoints require:



`Authorization: Bearer <JWT\_TOKEN>`



\## Installation



```bash

npm install

