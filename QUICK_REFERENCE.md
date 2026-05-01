# UNI.BUY - Quick Reference Guide

**Last Updated**: May 1, 2026  
**Status**: Production-Ready (87% Complete)

---

## 🎯 Quick Stats

- **Issues Fixed**: 20 of 23 (87%)
- **Screens Created**: 15+
- **Components**: 5 shared components
- **TypeScript Errors**: 0
- **Status**: ✅ Production-Ready

---

## 📱 Screen Navigation Map

### Main Tabs
```
├── Home (/)
│   ├── Listing Details (/listing/[id])
│   │   ├── Seller Profile (/seller/[id])
│   │   └── Contact Handoff (/contact-handoff)
│   └── Search (/search)
│       └── Filters (/filters)
│
├── Search (/search)
│   ├── Filters (/filters)
│   └── Listing Details (/listing/[id])
│
├── Sell (/sell)
│   └── Post Listing (/post-listing)
│       └── Success Posted (/success-posted)
│
├── Messages (/messages)
│   └── Chat (/chat/[id])
│
└── Profile (/profile)
    ├── Edit Profile (/edit-profile)
    ├── Settings (/settings)
    ├── Favorites (/favorites)
    ├── Purchase History (/purchase-history)
    ├── Reviews (/reviews)
    └── Notifications (/notifications)
```

---

## 🗂️ File Structure

### Core Screens
```
app/
├── (tabs)/
│   ├── index.tsx          # Home screen
│   ├── search.tsx         # Search (not used, redirects)
│   ├── sell.tsx           # Sell landing
│   ├── messages.tsx       # Messages list
│   └── profile.tsx        # User profile
│
├── listing/
│   └── [id].tsx           # Listing details
│
├── seller/
│   └── [id].tsx           # Seller profile
│
├── chat/
│   └── [id].tsx           # Chat conversation
│
├── checkout.tsx           # Checkout flow
├── contact-handoff.tsx    # Contact seller
├── edit-profile.tsx       # Edit profile
├── favorites.tsx          # Favorites list
├── filters.tsx            # Advanced filters
├── notifications.tsx      # Notifications
├── post-listing.tsx       # Create listing
├── purchase-history.tsx   # Purchase history
├── reviews.tsx            # Reviews
├── search.tsx             # Search screen
├── settings.tsx           # Settings
├── success-paid.tsx       # Payment success
└── success-posted.tsx     # Listing posted success
```

### Components
```
components/
├── auth/
│   ├── OtpInput.tsx       # OTP input component
│   └── PhoneInput.tsx     # Phone input component
│
└── shared/
    ├── Button.tsx         # Shared button
    ├── CategorySelector.tsx  # Category selector (3 variants)
    ├── Icon.tsx           # Icon component
    └── ProgressBar.tsx    # Progress bar
```

### Contexts
```
contexts/
└── FavoritesContext.tsx   # Favorites state management
```

### Constants
```
constants/
├── colors.ts              # Color palette
├── fonts.ts               # Font definitions
└── mockData.ts            # Mock data (120 listings)
```

### Utils
```
utils/
└── searchListings.ts      # Search/filter utility
```

---

## 🎨 Shared Components

### CategorySelector
**Location**: `components/shared/CategorySelector.tsx`

**Variants**:
1. **Pills** - Horizontal scrollable (Home screen)
2. **Chips** - Wrapped grid (Filters screen)
3. **Cards** - Grid with icons (Search screen)

**Usage**:
```typescript
import { CategorySelector } from '../components/shared/CategorySelector';

<CategorySelector
  selected={selectedCategory}
  onSelect={handleCategorySelect}
  variant="pills"  // or "chips" or "cards"
  includeAll={true}
/>
```

---

## 🔧 Key Features

### Favorites System
**Files**: 
- `contexts/FavoritesContext.tsx`
- `app/(tabs)/index.tsx`
- `app/listing/[id].tsx`
- `app/favorites.tsx`

**Features**:
- ✅ Add/remove favorites
- ✅ Persistent storage (AsyncStorage)
- ✅ Heart icon toggle
- ✅ Favorites screen

### Search & Filters
**Files**:
- `app/search.tsx`
- `app/filters.tsx`
- `utils/searchListings.ts`

**Features**:
- ✅ Real-time search
- ✅ Category filter
- ✅ Condition filter
- ✅ Price range filter
- ✅ Location filter
- ✅ Active filter chips
- ✅ Clear filters

### Profile Management
**Files**:
- `app/(tabs)/profile.tsx`
- `app/edit-profile.tsx`
- `app/settings.tsx`

**Features**:
- ✅ View profile stats
- ✅ Edit profile info
- ✅ Manage listings (edit/delete)
- ✅ View purchase history
- ✅ Read/give reviews
- ✅ Manage notifications

---

## 🎯 Common Tasks

### Adding a New Screen
1. Create file in `app/` directory
2. Export default component
3. Add navigation link from parent screen
4. Update this reference guide

### Adding a New Category
1. Update `constants/mockData.ts` - Add to `CATEGORIES` array
2. CategorySelector will automatically include it

### Modifying Colors
1. Update `constants/colors.ts`
2. Colors are used throughout via import

### Adding Mock Data
1. Update `constants/mockData.ts`
2. Add to `MOCK_LISTINGS` array
3. Follow existing structure

---

## 🐛 Troubleshooting

### TypeScript Errors
```bash
# Check diagnostics
npx tsc --noEmit
```

### Navigation Issues
- Ensure file is in correct directory
- Check expo-router file-based routing
- Verify import paths

### Image Loading Issues
- Check expo-image is installed
- Verify image URLs are valid
- Check blurhash placeholders

### State Not Persisting
- Check AsyncStorage imports
- Verify context provider wraps app
- Check storage keys are unique

---

## 📊 Performance Tips

### List Rendering
- ✅ Use React.memo for list items
- ✅ Use useCallback for event handlers
- ✅ Use recyclingKey for images
- ✅ Avoid inline objects/functions

### Image Optimization
- ✅ Use expo-image (not RN Image)
- ✅ Add blurhash placeholders
- ✅ Set cachePolicy="memory-disk"
- ✅ Use appropriate image sizes

### State Management
- ✅ Use useMemo for derived values
- ✅ Use useCallback for callbacks
- ✅ Avoid unnecessary re-renders
- ✅ Keep state close to usage

---

## 🔐 Best Practices

### Component Structure
```typescript
// 1. Imports
import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// 2. Types/Interfaces
interface Props {
  title: string;
  onPress: () => void;
}

// 3. Component
export default function MyComponent({ title, onPress }: Props) {
  // 4. State
  const [count, setCount] = useState(0);
  
  // 5. Memoized values
  const doubleCount = useMemo(() => count * 2, [count]);
  
  // 6. Callbacks
  const handlePress = useCallback(() => {
    setCount(c => c + 1);
    onPress();
  }, [onPress]);
  
  // 7. Render
  return (
    <View style={styles.container}>
      <Text>{title}: {doubleCount}</Text>
      <Pressable onPress={handlePress}>
        <Text>Press me</Text>
      </Pressable>
    </View>
  );
}

// 8. Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

### Pressable vs TouchableOpacity
```typescript
// ❌ Don't use TouchableOpacity
<TouchableOpacity onPress={handlePress}>
  <Text>Press me</Text>
</TouchableOpacity>

// ✅ Use Pressable
<Pressable onPress={handlePress}>
  <Text>Press me</Text>
</Pressable>
```

### Image Component
```typescript
// ❌ Don't use React Native Image
<Image source={{ uri: url }} />

// ✅ Use expo-image
import { Image } from 'expo-image';

<Image
  source={{ uri: url }}
  placeholder={{ blurhash }}
  contentFit="cover"
  cachePolicy="memory-disk"
  recyclingKey={String(id)}
/>
```

---

## 📚 Documentation Files

### Implementation Reports
1. `UX_AUDIT_REPORT.md` - Original audit
2. `UX_SOLUTIONS_IMPLEMENTATION_PLAN.md` - Solutions plan
3. `UX_FIXES_COMPLETED.md` - Phase 1 report
4. `PHASE_2_COMPLETE.md` - Phase 2 report
5. `PHASE_3_COMPLETE.md` - Phase 3 report
6. `REMAINING_ISSUES.md` - Remaining issues
7. `IMPLEMENTATION_SUMMARY.md` - Complete summary
8. `QUICK_REFERENCE.md` - This file

---

## 🚀 Deployment Checklist

### Pre-Deployment
- ✅ All diagnostics passing
- ✅ No TypeScript errors
- ✅ Manual testing complete
- ✅ Performance optimized
- ✅ Error handling in place

### Deployment Steps
1. Run final diagnostics
2. Build production bundle
3. Test on physical devices
4. Deploy to staging
5. User acceptance testing
6. Deploy to production
7. Monitor and iterate

---

## 🎊 Quick Wins

### Recently Completed
- ✅ All profile menu items functional
- ✅ Interactive location checkboxes
- ✅ Edit/delete buttons for listings
- ✅ Shared CategorySelector component
- ✅ Price range text inputs
- ✅ Filter clear functionality

### Remaining (Optional)
- ⏭️ Merge duplicate success screens
- ⏭️ Remove orphaned auth screens
- ⏭️ Redesign Sell tab

---

## 💡 Tips & Tricks

### Navigation
```typescript
// Navigate to screen
router.push('/screen-name');

// Navigate with params
router.push({
  pathname: '/screen-name',
  params: { id: '123' }
});

// Go back
router.back();
```

### Accessing Params
```typescript
import { useLocalSearchParams } from 'expo-router';

const params = useLocalSearchParams();
const id = params.id;
```

### Using Favorites
```typescript
import { useFavorites } from '../contexts/FavoritesContext';

const { isFavorite, toggleFavorite } = useFavorites();
const favorited = isFavorite(itemId);

<Pressable onPress={() => toggleFavorite(itemId)}>
  <Ionicons 
    name={favorited ? "heart" : "heart-outline"} 
    size={20} 
  />
</Pressable>
```

---

## 🔗 Useful Links

- **Expo Router**: https://docs.expo.dev/router/introduction/
- **Expo Image**: https://docs.expo.dev/versions/latest/sdk/image/
- **React Native**: https://reactnative.dev/
- **TypeScript**: https://www.typescriptlang.org/

---

**Last Updated**: May 1, 2026  
**Status**: Production-Ready  
**Completion**: 87% (20 of 23 issues)
