# UNI.BUY Project Structure

## Active Files (Expo Router)

### App Directory (File-based Routing)
```
app/
├── _layout.tsx              # Root layout with SafeAreaProvider
├── index.tsx                # Entry point - session check & redirect
├── auth/                    # Authentication flow
│   ├── _layout.tsx          # Auth stack navigator
│   ├── splash.tsx           # Welcome screen
│   ├── phone.tsx            # Phone number entry
│   ├── otp.tsx              # OTP verification (code: 123456)
│   ├── profile.tsx          # Profile creation (new users)
│   └── setup.tsx            # University & location setup
└── (tabs)/                  # Main app tabs
    ├── _layout.tsx          # Bottom tab navigator
    ├── index.tsx            # Home feed
    ├── sell.tsx             # Sell tab
    ├── messages.tsx         # Messages tab
    └── profile.tsx          # Profile tab
```

### Components
```
components/
├── auth/
│   ├── PhoneInput.tsx       # Uganda phone input (+256)
│   └── OtpInput.tsx         # 6-digit OTP input
└── shared/
    ├── Button.tsx           # Reusable button
    └── ProgressBar.tsx      # Animated progress bar
```

### Constants
```
constants/
├── colors.ts                # Color tokens
└── fonts.ts                 # Font references
```

### Configuration
```
app.json                     # Expo configuration
package.json                 # Dependencies (main: "expo-router/entry")
tsconfig.json                # TypeScript config
metro.config.js              # Metro bundler config
babel.config.js              # Babel config
```

## Legacy Files (Not Used)

The `src/` directory contains old screens from the previous React Navigation setup. These are NOT used by the current Expo Router implementation:

```
src/
├── screens/                 # Old screens (not used)
├── components/              # Old components (not used)
├── navigation/              # Old navigation (removed)
├── styles/                  # Old styles (not used)
└── utils/                   # Old utilities (not used)
```

**Note:** The `src/` folder can be deleted or kept as reference. The active app only uses files in the `app/`, `components/`, and `constants/` directories.

## Running the App

```bash
npm start                    # Start Expo dev server
npm run android              # Run on Android
npm run ios                  # Run on iOS
```

## Key Files

- **Entry Point:** `app/index.tsx` (checks session, redirects to auth or tabs)
- **Auth Flow:** `app/auth/*` (5 screens)
- **Main App:** `app/(tabs)/*` (4 tab screens)
- **Colors:** `constants/colors.ts` (all color tokens)

## Documentation

- `AUTH_FLOW_README.md` - Complete technical documentation
- `QUICK_START.md` - Quick testing guide
- `README.md` - Project overview
