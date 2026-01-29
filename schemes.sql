USE agrosphere_db;
INSERT INTO schemes (title, description, eligibility, benefits, region, crops, created_at)
VALUES
(
 'PM Kisan Samman Nidhi',
 'Income support scheme for farmers',
 'Small and marginal farmers',
 '₹6000 per year',
 'All',
 'All',
 NOW()
),
(
 'Soil Health Card Scheme',
 'Provides soil testing and fertilizer recommendations',
 'All farmers',
 'Free soil testing',
 'All',
 'All',
 NOW()
),
(
 'Pradhan Mantri Fasal Bima Yojana',
 'Crop insurance scheme',
 'Farmers growing notified crops',
 'Insurance coverage',
 'All',
 'Rice,Wheat',
 NOW()
);
