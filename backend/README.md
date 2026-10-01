# MOCIFY Backend Foundation v1

This folder defines the first server-side foundation for MOCIFY, MOCIFY Business and Admin.

## Architecture

We start as one modular backend inside the existing Next.js application. Domains are kept separate so Payments, Risk or Licensing can later become independent services without redesigning the data model.

Domains:
- Identity & Accounts
- Artists
- Music Catalogue
- Subscriptions
- Payments
- Payouts
- Licensing / MOCIFY Business
- Risk Engine
- Admin & RBAC
- Audit
- Security / Emergency controls

## Security rules

- The browser never authorizes sensitive actions.
- Admin authorization is enforced server-side.
- SUPER_ADMIN is the initial owner role; additional roles are supported by the schema.
- Sensitive admin actions will require fresh MFA when authentication is connected.
- Secrets stay in local/production environment variables and are never committed.
- Financial and security actions create audit events.
- Public MOCIFY IDs are references; internal UUIDs are the database primary keys.
- Public IDs are permanent and must never be reused.
- Kill switches are server-side state, not frontend buttons.

## Public ID namespaces

- USR = user/account
- LST = listener profile
- ART = artist
- TRK = track
- BUS = business
- PAY = incoming payment
- OUT = payout
- LIC = license
- RC = risk case
- AUD = audit event

Example: `ART-000001` remains a human-friendly reference while the record itself has an internal UUID.

## Local development target

PostgreSQL is the database target. The first database is development-only and contains fictitious data. Do not put real customer, bank, identity or payment data into the local seed database.

The schema in `database/schema.sql` is deliberately plain PostgreSQL for Foundation v1. This avoids coupling the architecture to an ORM before the development Mac's Node/runtime compatibility is verified. An ORM/data-access layer can be added on top without changing these domain boundaries.
