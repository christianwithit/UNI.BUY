# 🧪 Authentication Testing Guide

## ✅ TASK 2 Complete - Ready to Test!

All authentication screens have been integrated with Supabase. Follow this guide to test the complete authentication flow.

---

## 📋 Pre-Test Checklist

Before testing, verify:
1. ✅ Supabase database schema is created (all 9 tables)
2. ✅ Phone authentication is enabled in Supabase
3. ✅ Test phone number is configured: `256771234567=123456`
4. ✅ Expo app is running: `npm start`

---

## 🧪 Test Scenarios

### Test 1: New User Sign Up

**Goal**: Create a new account from scratch

1. **Start the app** (should land on splash screen)
2. **Tap "Get Started"** or equivalent
3. **Enter phone number**: 
   - Try: `0771234567` (app will format to `+256771234567`)
   - Or: `771234567`
   - Or: `256771234567`
4. **Tap "Send code"**
   - ✅ Should see loading indicator
   - ✅ Should navigate to OTP screen
5. **Enter OTP**: `123456`
   - ✅ Should auto-verify when 6th digit is entered
   - ✅ Should check if profile exists
   - ✅ New user → should go to setup screen
6. **Select university** from dropdown
7. **Tap "Start browsing"**
   - ✅ Should create profile in database
   - ✅ Should navigate to main app (tabs)
8. **Verify in Supabase**:
   - Go to Table Editor → `profiles`
   - Should see your new profile with the selected university

---

### Test 2: Existing User Login

**Goal**: Log in with an account that already has a profile

1. **Complete Test 1 first** (or have an existing profile in database)
2. **Logout**: Go to Settings → Logout
3. **Log back in**:
   - Enter same phone number: `0771234567`
   - Enter OTP: `123456`
4. **Expected behavior**:
   - ✅ Should skip setup screen
   - ✅ Should go directly to main app
   - ✅ Should load your profile data from database

---

### Test 3: Invalid OTP

**Goal**: Test error handling for wrong OTP

1. **Enter phone number**: `0771234567`
2. **Enter wrong OTP**: `000000`
3. **Expected behavior**:
   - ✅ Should show error message
   - ✅ Should allow retry without going back
   - ❌ Should NOT navigate to next screen

---

### Test 4: Resend OTP

**Goal**: Test OTP resend functionality

1. **Enter phone number**: `0771234567`
2. **Wait for timer** to reach 0 (or note current behavior)
3. **Tap "Resend code"**
4. **Expected behavior**:
   - ✅ Should reset timer to 59 seconds
   - ✅ Should show success message
   - ✅ Should clear OTP input

---

### Test 5: Profile Data Loading

**Goal**: Verify CurrentUserContext loads real data

1. **Login successfully**
2. **Go to Profile tab**
3. **Expected behavior**:
   - ✅ Should show your actual name from database
   - ✅ Should show your university
   - ✅ Should show your phone number

---

### Test 6: Logout

**Goal**: Test sign out functionality

1. **Go to Settings**
2. **Tap "Logout"**
3. **Confirm logout**
4. **Expected behavior**:
   - ✅ Should show confirmation alert
   - ✅ Should sign out of Supabase
   - ✅ Should navigate to splash screen
   - ✅ Re-opening app should require login

---

## 🐛 Troubleshooting

### "Failed to send code"
- **Check**: Phone auth is enabled in Supabase
- **Check**: Test phone number is configured correctly (no `+` prefix)
- **Check**: Twilio credentials are entered (if using real SMS)

### "Incorrect code"
- **Check**: Using test number `256771234567` with OTP `123456`
- **Check**: OTP hasn't expired (60 seconds)

### "Failed to create profile"
- **Check**: `profiles` table exists in database
- **Check**: RLS policies allow INSERT for authenticated users
- **Check**: No duplicate profile with same ID

### "No user logged in" / Context issues
- **Check**: CurrentUserProvider wraps your app in `_layout.tsx`
- **Check**: User completed auth flow successfully
- **Try**: Restart Expo dev server

### App stuck on loading screen
- **Check**: Supabase URL and ANON KEY are correct in `.env`
- **Check**: Metro bundler is running
- **Try**: Clear cache: `npm start -- --clear`

---

## 📸 Expected UI Flow

```
┌─────────────┐
│ Splash      │
│ Screen      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Phone       │
│ Entry       │  ← Enter: 0771234567
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ OTP         │
│ Verification│  ← Enter: 123456
└──────┬──────┘
       │
       ├─── Existing User ──→ Main App (Tabs)
       │
       └─── New User ──────→ Setup Screen ─→ Main App (Tabs)
```

---

## ✅ Success Criteria

Authentication is working correctly if:
1. ✅ Can sign up with test phone number
2. ✅ Can enter OTP and verify successfully
3. ✅ Profile is created in Supabase database
4. ✅ Can navigate to main app after signup
5. ✅ Can logout and login again
6. ✅ Existing users skip setup screen
7. ✅ Profile data loads correctly in app
8. ✅ Zero TypeScript errors
9. ✅ No console errors during auth flow

---

## 🔍 Debugging in Supabase

### Check if user was created:
1. Go to **Authentication** → **Users**
2. Should see user with phone number `+256771234567`

### Check if profile was created:
1. Go to **Table Editor** → **profiles**
2. Should see profile row with matching user ID

### Check RLS policies:
1. Go to **Authentication** → **Policies**
2. Verify policies exist for `profiles` table

---

## 🎯 Next Steps After Testing

Once authentication works:
- ✅ **TASK 2 Complete!**
- Move to **TASK 3**: Replace mock data with real Supabase queries
- Start with home feed listings

---

## 📝 Notes

- Test phone numbers bypass real SMS sending
- OTP is always `123456` for test numbers
- Profile name defaults to "User" (can edit in profile screen later)
- Real production numbers require Twilio credits
