# Boho Acoustics

## Consultation Workflow

The consultation form now uses Firebase Cloud Functions for a single server-side flow:

- Stores submission in Firestore (`consultations` collection)
- Sends internal notification to `hello@bohoacoustic.com`
- Sends confirmation email to the submitting user
- Sends uploaded PDF as email attachment to both emails

Firebase Storage is not used in this flow.

## One-Time Setup

1. Install functions dependencies:

```bash
cd functions
npm install
```

2. Set required SMTP secrets (Resend SMTP):

```bash
firebase functions:secrets:set RESEND_SMTP_USER
firebase functions:secrets:set RESEND_SMTP_PASS
```

3. Optional params (defaults are already configured).

Create `functions/.env.boho-acoustics` if you want to override:

- `MAIL_TO=hello@bohoacoustic.com`
- `MAIL_FROM=Boho Acoustics <noreply@bohoacoustic.com>`

Use Firebase parameter overrides if you want custom runtime values for:

- `MAIL_TO` (default: `hello@bohoacoustic.com`)
- `MAIL_FROM` (default: `Boho Acoustics <noreply@bohoacoustic.com>`)

## Deploy

```bash
firebase deploy --only functions,firestore:rules,hosting --project boho-acoustics
```
