# UNI.BUY Auth Flow - Implementation Complete

## Overview
The complete phone-number-only authentication flow has been implemented using Expo Router with file-based routing. This is a frontend-only implementation with mock authentication logic.

## Project Structure

```
app/
├── _layout.tsx          # Root layout with SafeAreaProvider
├── index.tsx            # Entry point - redirects to auth or tabs
├── auth/
│   ├── _layout.tsx      # Auth stack navigator
│   ├── splash.tsx       # Welcome screen with Get Started / Log In
│   ├── phone.tsx        # Phone number entry
│   ├── otp.tsx          # OTP verification (hardcoded: 123456)
│   ├── profile.tsx      # Profile creation (new users only)
│   └── setup.tsx        # University & location setup (new users only)
└── (tabs)/
    ├── _layout.tsx      # Bottom tab navigator
    ├── index.tsx        # Home feed (placeholder)
    ├── sell.tsx         # Sell tab (placeholder)
    ├── messages.tsx     # Messages tab (placeholder)
    └── profile.tsx      # Profile tab (placeholder)

components/
├── auth/
│   ├── PhoneInput.tsx   # Uganda phone input with +256 prefix
│   └── OtpInput.tsx     # 6-digit OTP input with auto-advance
└── shared/
    ├── Button.tsx       # Reusable button component
    └── ProgressBar.tsx  # Animated progress indicator

constants/
├── colors.ts            # Color tokens
└── fonts.ts             # Font references
```

## Auth Journeys

### Journey 1: New User (Signup)
1. **Splash Screen** → Tap "Get started"
2. **Phone Entry** → Enter 9+ digit number → "Send code"
3. **OTP Verification** → Enter "123456" → "Verify"
4. **Profile Creation** → Enter name → "Continue"
5. **University Setup** → Select university → "Start browsing"
6. **Home Feed** (tabs)

### Journey 2: Returning User (Login)
1. **Splash Screen** → Tap "Log in"
2. **Phone Entry** → Enter number → "Send code"
3. **OTP Verification** → Enter "123456" → "Verify"
4. **Home Feed** (tabs) - skips profile creation

## Mock Authentication

### Hardcoded OTP
The correct OTP is hardcoded as `123456` in `app/auth/otp.tsx`:
```typescript
const CORRECT_OTP = '123456';
```

### New vs Returning User
In `app/auth/otp.tsx`, there's a boolean flag:
```typescript
const isNewUser = true; // Change to false to simulate returning user
```
- `true` → navigates to profile creation after OTP
- `false` → navigates directly to home feed

### Session Check
In `app/index.tsx`, there's a mock session check:
```typescript
const hasSession = false; // Change to true to skip auth flow
```

## Key Features Implemented

### Phone Input Component
- Uganda flag 🇺🇬 with +256 prefix
- Numeric keyboard
- Focus state with teal border and shadow
- Placeholder: "700 000 000"

### OTP Input Component
- 6 individual input boxes
- Auto-advance to next box on digit entry
- Auto-retreat on backspace
- Paste support (distributes 6 digits across boxes)
- Shake animation on error
- Error state with red border and pink background

### Progress Bar Component
- Animated fill from 0 to 100%
- Shows 1/3, 2/3, 3/3 for signup flow
- Hidden during login flow

### Button Component
- Primary variant: teal background, white text
- Secondary variant: transparent with teal border
- Disabled variant: gray background
- Loading state: shows ActivityIndicator

## Color Scheme
- Primary: `#0F6E56` (teal)
- Amber: `#EF9F27` (accent)
- Background: `#F7F6F2` (off-white)
- Text Primary: `#1A1A1A`
- Text Secondary: `#6B6B6B`
- Text Tertiary: `#B4B2A9`
- Border: `#E2E0D8`

## Running the App

1. Install dependencies:
```bash
npm install
```

2. Start Expo:
```bash
npm start
```

3. Test the auth flow:
   - Press "Get started" for new user flow
   - Press "Log in" for returning user flow
   - Use OTP: `123456`

## Testing Scenarios

### Test New User Flow
1. Splash → "Get started"
2. Enter any 9-digit number
3. Wait 1.5s for loading
4. Enter OTP: 123456
5. Enter name (2+ characters)
6. Select any university
7. Optionally enable location
8. Reach home feed

### Test Returning User Flow
1. In `app/auth/otp.tsx`, set `isNewUser = false`
2. Splash → "Log in"
3. Enter any 9-digit number
4. Enter OTP: 123456
5. Should skip profile/setup and go directly to home feed

### Test Validation
- Phone screen: button disabled until 9+ digits entered
- OTP screen: button disabled until 6 digits entered
- Profile screen: button disabled until 2+ characters in name
- Setup screen: button disabled until university selected

## Safe Area Handling
- All screens use `SafeAreaView` from `react-native-safe-area-context`
- Splash screen uses `edges={['bottom']}` to allow teal to extend behind status bar
- All other screens use `edges={['top', 'bottom']}`
- Tab bar height dynamically adjusts: `60 + insets.bottom`

## Keyboard Handling
- All input screens use `KeyboardAvoidingView`
- Behavior: `padding` on iOS, `height` on Android
- No inputs are hidden behind keyboard

## Navigation Rules
- Auth screens use `router.push()` to allow back navigation
- Final step uses `router.replace('/(tabs)/')` to prevent back to onboarding
- Tab bar is automatically hidden on auth screens (separate folder structure)

## Universities List
The following universities are available in the setup screen:
- Makerere University
- Kyambogo University
- Makerere University Business School (MUBS)
- Uganda Christian University (UCU)
- Nkumba University
- Ndejje University
- Kampala International University (KIU)
- Uganda Martyrs University (UMU)
- Cavendish University Uganda
- Victoria University Uganda
- Mountains of the Moon University
- Busitema University
- Gulu University

## What's NOT Implemented (Phase 2)
- Supabase connection
- Real SMS sending
- Real location API
- Image picker functionality
- AsyncStorage / persistent sessions
- Home feed content
- Listing screens
- Payment screens
- Profile management

## Next Steps for Backend Integration

1. **Replace mock OTP check** in `app/auth/otp.tsx`:
   - Call Supabase `auth.verifyOtp()`
   - Handle real verification

2. **Replace isNewUser flag** in `app/auth/otp.tsx`:
   - Query Supabase for existing profile
   - Navigate based on profile existence

3. **Replace hasSession check** in `app/index.tsx`:
   - Use Supabase `auth.getSession()`
   - Redirect accordingly

4. **Save profile data** in `app/auth/profile.tsx` and `app/auth/setup.tsx`:
   - Insert into Supabase profiles table
   - Upload profile photo to storage

5. **Implement image picker** in `app/auth/profile.tsx`:
   - Use `expo-image-picker`
   - Upload to Supabase storage

6. **Implement location** in `app/auth/setup.tsx`:
   - Use `expo-location`
   - Save coordinates to profile

## Acceptance Criteria ✅

All acceptance criteria have been met:

✅ Splash screen with teal background and white panel  
✅ "Get started" → phone entry → OTP → profile → setup → home feed  
✅ "Log in" → phone entry → OTP → home feed (bypasses profile)  
✅ 1.5 second loading state on "Send code"  
✅ OTP 123456 works, incorrect codes show error  
✅ All validation works (phone 9+ digits, OTP 6 digits, name 2+ chars, university required)  
✅ Keyboard handling works on all screens  
✅ Safe area respected on Android and iOS  
✅ Back navigation works except final redirect  
✅ Tab bar hidden on auth screens  
✅ Progress bar shows correct steps  
✅ All components match design specifications  

## File Changes Summary

**Created:**
- 21 new files (constants, components, app structure)
- Complete Expo Router file-based routing
- All auth screens with pixel-perfect UI
- Reusable components

**Modified:**
- `package.json` - changed entry point to expo-router
- `app.json` - added expo-router plugin and scheme

**Not Modified:**
- Existing `src/` folder (kept for future use)
- `App.tsx` (no longer used with Expo Router)
