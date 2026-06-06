# UNI.BUY Supabase Setup Guide

## Step 1: Run the Database Schema

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `schema.sql` and paste it into the editor
5. Click **Run** to execute the SQL

This will create:
- ✅ All 9 tables (profiles, categories, listings, favorites, conversations, messages, reviews, notifications)
- ✅ Row Level Security (RLS) policies for all tables
- ✅ 8 pre-seeded categories
- ✅ Indexes for performance
- ✅ Triggers for auto-updating timestamps

## Step 2: Create Storage Buckets

### Create listing-images bucket:
1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Name: `listing-images`
4. **Public bucket**: ✅ Enabled
5. Click **Create bucket**

### Create avatars bucket:
1. Click **New bucket** again
2. Name: `avatars`
3. **Public bucket**: ✅ Enabled
4. Click **Create bucket**

### Configure Storage Policies:

For **listing-images** bucket:
1. Click on the `listing-images` bucket
2. Go to **Policies** tab
3. Click **New Policy** and add these policies:

**SELECT (View images):**
```sql
CREATE POLICY "Anyone can view listing images"
ON storage.objects FOR SELECT
USING (bucket_id = 'listing-images');
```

**INSERT (Upload images):**
```sql
CREATE POLICY "Authenticated users can upload listing images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'listing-images' AND auth.role() = 'authenticated');
```

**DELETE (Remove images):**
```sql
CREATE POLICY "Users can delete their own listing images"
ON storage.objects FOR DELETE
USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

For **avatars** bucket:
Repeat the same process with these policies:

**SELECT:**
```sql
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');
```

**INSERT:**
```sql
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
```

**DELETE:**
```sql
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Step 3: Enable Phone Authentication

1. Go to **Authentication** > **Providers** in the left sidebar
2. Find **Phone** in the list
3. Toggle it **ON**
4. Configure your SMS provider (Twilio recommended for Uganda):
   - Add your Twilio credentials
   - Or use Supabase's built-in provider for testing
5. Click **Save**

## Step 4: Enable Realtime

For real-time messaging to work:

1. Go to **Database** > **Replication** in the left sidebar
2. Find the **messages** table
3. Toggle **Realtime** to **ON**
4. Find the **conversations** table
5. Toggle **Realtime** to **ON**
6. Click **Save**

## Step 5: Verify Setup

Run this query in the SQL Editor to verify everything is set up:

```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check categories are seeded
SELECT * FROM categories;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

You should see:
- 9 tables listed
- 8 categories (Phones, Laptops, TVs, etc.)
- All tables with `rowsecurity = true`

## Troubleshooting

### Phone Auth Not Working
- Ensure you've enabled Phone provider in Authentication settings
- For Uganda numbers, format must be: +256XXXXXXXXX (E.164 format)
- Check Twilio credentials if using Twilio

### Storage Upload Fails
- Verify buckets are set to **Public**
- Check storage policies are created correctly
- Ensure user is authenticated before upload

### RLS Blocking Queries
- Check that policies are created for the table
- Verify user is authenticated (check `auth.uid()`)
- Use Supabase Dashboard > Table Editor to test queries

## Next Steps

After completing this setup:
1. The app will be ready to integrate with Supabase
2. Test phone authentication with a real Uganda number
3. Create a test listing to verify storage uploads
4. Test real-time messaging between two accounts

## Database Schema Overview

```
profiles (user data)
  ↓
listings (items for sale)
  ↓
favorites (user's saved listings)
  ↓
conversations (chat threads)
  ↓
messages (individual messages)
  ↓
reviews (seller ratings)
  ↓
notifications (user alerts)

categories (product categories - seeded)
```
