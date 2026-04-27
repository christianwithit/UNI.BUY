# Quick Start Guide - UNI.BUY Auth Flow

## Installation

```bash
npm install
```

## Run the App

```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Test Credentials

**OTP Code:** `123456`

Any other 6-digit code will show an error.

## Test Flows

### 1. New User Signup
1. Tap **"Get started"**
2. Enter any phone number (e.g., `700 123 456`)
3. Tap **"Send code"** (wait 1.5s)
4. Enter OTP: `123456`
5. Tap **"Verify"**
6. Enter your name (e.g., `John Kato`)
7. Tap **"Continue"**
8. Select a university from the list
9. Optionally tap **"Allow location access"**
10. Tap **"Start browsing"**
11. You're now on the home feed!

### 2. Returning User Login
1. Tap **"Log in"**
2. Enter any phone number
3. Tap **"Send code"** (wait 1.5s)
4. Enter OTP: `123456`
5. Tap **"Verify"**
6. You're now on the home feed! (skipped profile creation)

**Note:** To test returning user flow, you need to change `isNewUser = false` in `app/auth/otp.tsx` line 18.

## Validation Tests

### Phone Entry
- Button is **disabled** (gray) until you enter 9+ digits
- Button becomes **active** (teal) when valid

### OTP Entry
- Button is **disabled** until all 6 boxes are filled
- Entering wrong code shows red error message
- Boxes shake on error
- Timer counts down from 0:59
- "Resend code" becomes active at 0:00

### Profile Creation
- Button is **disabled** until name has 2+ characters
- Photo selection is optional (placeholder only)

### University Setup
- Button is **disabled** until university is selected
- Location is optional

## Keyboard Behavior

All screens properly handle the keyboard:
- Inputs are never hidden
- Keyboard dismisses when tapping outside
- Return key behavior works correctly

## Back Navigation

- You can go back on any auth screen
- After completing setup, you **cannot** go back to onboarding
- This is intentional to prevent users from re-entering the flow

## Switching Between Flows

To test different scenarios, modify these files:

### Test Returning User (Skip Profile Creation)
**File:** `app/auth/otp.tsx`  
**Line:** 18  
**Change:** `const isNewUser = false;`

### Skip Auth Entirely (Go Straight to Home)
**File:** `app/index.tsx`  
**Line:** 7  
**Change:** `const hasSession = true;`

## Troubleshooting

### "Unable to resolve module"
```bash
npm install
npx expo start --clear
```

### Metro bundler issues
```bash
npm run reset
```

### TypeScript errors
The project uses TypeScript. All files should have no errors. Run:
```bash
npx tsc --noEmit
```

## Project Structure

```
app/
├── auth/          # All authentication screens
│   ├── splash.tsx
│   ├── phone.tsx
│   ├── otp.tsx
│   ├── profile.tsx
│   └── setup.tsx
└── (tabs)/        # Main app tabs (placeholders)
    ├── index.tsx  # Home
    ├── sell.tsx
    ├── messages.tsx
    └── profile.tsx
```

## What's Next?

This is a **frontend-only** implementation. The next phase will add:
- Supabase authentication
- Real SMS OTP sending
- Profile data persistence
- Image upload
- Location services
- Home feed content

For now, enjoy testing the complete auth flow with mock data!
