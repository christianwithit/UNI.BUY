-- Seed Test Data for UNI.BUY
-- Run this in Supabase SQL Editor to add test listings

-- Insert test listings for user: 6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4

INSERT INTO listings (title, description, price, condition, status, category_id, seller_id, university, images, created_at) VALUES
('iPhone 13 Pro Max', 'Excellent condition, barely used. 256GB, Pacific Blue. Comes with original box and charger.', 2500000, 'Like New', 'Active', 1, '6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4', 'Makerere University', ARRAY['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800'], NOW() - INTERVAL '2 days'),

('MacBook Pro M1', '2020 MacBook Pro with M1 chip. 16GB RAM, 512GB SSD. Perfect for coding and design work.', 4800000, 'Good', 'Active', 2, '6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4', 'Makerere University', ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'], NOW() - INTERVAL '5 days'),

('Samsung Galaxy S23', 'Brand new, still in box. 256GB Phantom Black. Never opened.', 2800000, 'New', 'Active', 1, '6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4', 'Makerere University', ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'], NOW() - INTERVAL '1 day'),

('AirPods Pro 2nd Gen', 'Barely used, like new condition. Active noise cancellation works perfectly.', 380000, 'Like New', 'Active', 5, '6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4', 'Makerere University', ARRAY['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800'], NOW() - INTERVAL '3 days'),

('Sony PlayStation 5', 'PS5 with 2 controllers and 3 games. Excellent condition, hardly used.', 2200000, 'Like New', 'Active', 8, '6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4', 'Makerere University', ARRAY['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800'], NOW() - INTERVAL '4 days'),

('iPad Air 2022', 'iPad Air 5th generation, 64GB WiFi, Blue. Perfect for students.', 1850000, 'Good', 'Active', 4, '6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4', 'Makerere University', ARRAY['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'], NOW() - INTERVAL '6 days'),

('Dell XPS 15 Laptop', 'High-performance laptop. Intel i7, 16GB RAM, 1TB SSD. Great for engineering students.', 3200000, 'Good', 'Active', 2, '6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4', 'Makerere University', ARRAY['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'], NOW() - INTERVAL '7 days'),

('Canon EOS R6', 'Professional mirrorless camera with 24-105mm lens. Barely used.', 6500000, 'Like New', 'Active', 7, '6a85ba7d-26f7-4299-8f29-4c0a0a31a6b4', 'Makerere University', ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'], NOW() - INTERVAL '8 days');

-- Verify insertion
SELECT 
  l.id,
  l.title,
  l.price,
  c.name as category,
  p.name as seller,
  l.created_at
FROM listings l
JOIN profiles p ON l.seller_id = p.id
JOIN categories c ON l.category_id = c.id
ORDER BY l.created_at DESC;
