# UNI.BUY - Campus Marketplace App

A React Native marketplace app for university students to buy and sell items on campus.

## Features

✅ **Image Upload** - Upload up to 5 photos when posting listings
✅ **Search & Filters** - Real-time search with category, condition, and price filters
✅ **Messaging** - In-app chat to communicate with buyers/sellers
✅ **Authentication Flow** - Phone verification with OTP
✅ **Listings** - Browse 120+ mock listings across 8 categories

## Tech Stack

- **React Native** with Expo
- **Expo Router** for navigation
- **TypeScript** for type safety
- **expo-image** for optimized images
- **AsyncStorage** for local data persistence

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
app/
├── (tabs)/          # Main tab navigation
│   ├── index.tsx    # Home feed
│   ├── messages.tsx # Messages list
│   ├── profile.tsx  # User profile
│   └── sell.tsx     # Post listing
├── auth/            # Authentication screens
├── chat/[id].tsx    # Individual chat
├── listing/[id].tsx # Listing details
└── ...

constants/
├── mockData.ts      # Mock data (users, listings, conversations)
├── colors.ts        # Color palette
└── fonts.ts         # Typography

utils/
└── searchListings.ts # Search & filter logic

components/
├── auth/            # Auth components
└── shared/          # Reusable components
```

## Key Features Implementation

### Image Upload
- Uses `expo-image-picker` for photo selection
- 5-photo limit with preview
- Optimized with expo-image

### Search
- Real-time filtering by keyword, category, condition, price
- Recent searches stored in AsyncStorage
- Pure, testable search utility

### Messaging
- Full chat UI with message bubbles
- 10 mock conversations with message history
- Keyboard-aware input
- Navigate from listing → contact → chat

## Development

### Best Practices Applied
- ✅ expo-image instead of React Native Image
- ✅ Pressable instead of TouchableOpacity
- ✅ useCallback for stable callbacks
- ✅ useMemo for derived values
- ✅ React.memo for list items
- ✅ Minimal state management

### Mock Data
All data is currently mocked in `constants/mockData.ts`:
- 120 listings across 8 categories
- 15 mock users
- 10 conversations with full message history

## Next Steps

### Backend Integration
1. Replace mock data with API calls
2. Implement real-time messaging (WebSocket/Firebase)
3. Add image upload to cloud storage
4. Implement user authentication
5. Add push notifications

### Additional Features
1. Mark messages as read
2. Typing indicators
3. Image messages in chat
4. Voice messages
5. Block/report users
6. Payment integration

## Documentation

See `IMPLEMENTATION_COMPLETE.md` for detailed implementation notes.

## License

MIT

## Contact

For questions or support, please open an issue.
