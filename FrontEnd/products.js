const products = [
	{
		id: 'tee',
		name: 'Essential Oversized Tee',
		price: 1890,
		image: './images/product-tee.jpg',
		alt: 'Essential Oversized Tee by VOID District',
		category: 'tees',
		badge: 'BESTSELLER',
		subtitle: 'Everyday essentials. Elevated.',
		description: 'A clean oversized tee designed for everyday comfort and effortless streetwear style.',
		details: 'Soft everyday fabric, relaxed silhouette, and an easy-to-style minimal look.',
		fit: 'Oversized fit. Choose your usual size for a relaxed look or size down for a closer fit.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'chest', label: 'CHEST (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
				{ key: 'shoulder', label: 'SHOULDER (CM)' },
			],
			measurements: [
				{ size: 'S', chest: 96, length: 68, shoulder: 44 },
				{ size: 'M', chest: 102, length: 71, shoulder: 46 },
				{ size: 'L', chest: 108, length: 74, shoulder: 48 },
				{ size: 'XL', chest: 114, length: 77, shoulder: 50 },
			],
		},

		reviews: [
			{
				name: 'Ahmed R.',
				rating: 5,
				date: 'Sample review',
				title: 'Great everyday fit',
				comment: 'The relaxed fit and minimal design make this an easy everyday choice.',
			},
			{
				name: 'Usman K.',
				rating: 4,
				date: 'Sample review',
				title: 'Clean and comfortable',
				comment: 'A simple streetwear essential that works well with different outfits.',
			},
		],
	},

	{
		id: 'hoodie',
		name: 'District Hoodie',
		price: 3490,
		image: './images/product-hoodie.jpg',
		alt: 'District Hoodie by VOID District',
		category: 'hoodies',
		badge: 'DISTRICT PICK',
		subtitle: 'Comfort built for the streets.',
		description: 'A versatile hoodie with a relaxed silhouette for comfortable everyday layering.',
		details: 'A casual streetwear staple designed for layering, daily wear, and cooler days.',
		fit: 'Relaxed fit. Choose your usual size for a comfortable streetwear silhouette.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'chest', label: 'CHEST (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
				{ key: 'shoulder', label: 'SHOULDER (CM)' },
			],
			measurements: [
				{ size: 'S', chest: 102, length: 66, shoulder: 46 },
				{ size: 'M', chest: 108, length: 69, shoulder: 48 },
				{ size: 'L', chest: 114, length: 72, shoulder: 50 },
				{ size: 'XL', chest: 120, length: 75, shoulder: 52 },
			],
		},

		reviews: [
			{
				name: 'Hamza A.',
				rating: 5,
				date: 'Sample review',
				title: 'Easy to layer',
				comment: 'A versatile hoodie style that pairs well with everyday streetwear.',
			},
			{
				name: 'Bilal S.',
				rating: 4,
				date: 'Sample review',
				title: 'Relaxed style',
				comment: 'The relaxed shape gives it a casual look for daily outfits.',
			},
		],
	},

	{
		id: 'cargos',
		name: 'Utility Cargo Pants',
		price: 2990,
		image: './images/product-cargos.jpg',
		alt: 'Utility Cargo Pants by VOID District',
		category: 'bottoms',
		badge: 'UTILITY STYLE',
		subtitle: 'Function meets streetwear.',
		description: 'Utility-inspired cargo pants designed to bring a practical edge to everyday streetwear.',
		details: 'A versatile bottom with a utility-inspired look that pairs with tees, hoodies, and sneakers.',
		fit: 'Check the waist measurements before choosing your size. Fit can vary depending on styling preference.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'waist', label: 'WAIST (CM)' },
				{ key: 'hip', label: 'HIP (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
			],
			measurements: [
				{ size: 'S', waist: 76, hip: 98, length: 100 },
				{ size: 'M', waist: 81, hip: 103, length: 102 },
				{ size: 'L', waist: 86, hip: 108, length: 104 },
				{ size: 'XL', waist: 91, hip: 113, length: 106 },
			],
		},

		reviews: [
			{
				name: 'Daniyal M.',
				rating: 5,
				date: 'Sample review',
				title: 'Versatile streetwear',
				comment: 'The utility-inspired look works well with simple tees and sneakers.',
			},
			{
				name: 'Saad H.',
				rating: 4,
				date: 'Sample review',
				title: 'Good everyday styling',
				comment: 'A useful style option for building casual streetwear outfits.',
			},
		],
	},

	{
		id: 'graphic-tee',
		name: 'District Graphic Tee',
		price: 2190,
		image: './images/product-graphic-tee.jpg',
		alt: 'District Graphic Tee by VOID District',
		category: 'tees',
		badge: 'GRAPHIC SERIES',
		subtitle: 'Make your style speak.',
		description: 'A graphic tee designed to add a bold visual element to your everyday streetwear rotation.',
		details: 'A statement-making casual tee that works with cargos, denim, and layered outfits.',
		fit: 'Relaxed fit. Check the size guide to choose the fit that suits your preference.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'chest', label: 'CHEST (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
				{ key: 'shoulder', label: 'SHOULDER (CM)' },
			],
			measurements: [
				{ size: 'S', chest: 96, length: 68, shoulder: 44 },
				{ size: 'M', chest: 102, length: 71, shoulder: 46 },
				{ size: 'L', chest: 108, length: 74, shoulder: 48 },
				{ size: 'XL', chest: 114, length: 77, shoulder: 50 },
			],
		},

		reviews: [
			{
				name: 'Ali Z.',
				rating: 5,
				date: 'Sample review',
				title: 'Bold casual look',
				comment: 'An easy way to add a graphic element to a simple everyday outfit.',
			},
			{
				name: 'Hassan T.',
				rating: 4,
				date: 'Sample review',
				title: 'Easy to style',
				comment: 'Pairs well with cargos and other casual streetwear pieces.',
			},
		],
	},

	// ==========================================
	// SIX NEW PRODUCTS
	// ==========================================

	{
		id: 'core-boxy-tee',
		name: 'Core Boxy Tee',
		price: 1990,
		image: './images/core-boxy-tee.webp',
		alt: 'Core Boxy Tee by VOID District',
		category: 'tees',
		badge: 'JUST DROPPED',
		subtitle: 'Clean lines. Bold fit.',
		description: 'An oversized black boxy tee with a minimal streetwear silhouette.',
		details: 'A versatile black tee designed for everyday styling and relaxed layering.',
		fit: 'Boxy oversized fit. Check the illustrative size guide before choosing.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'chest', label: 'CHEST (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
				{ key: 'shoulder', label: 'SHOULDER (CM)' },
			],
			measurements: [
				{ size: 'S', chest: 96, length: 68, shoulder: 44 },
				{ size: 'M', chest: 102, length: 71, shoulder: 46 },
				{ size: 'L', chest: 108, length: 74, shoulder: 48 },
				{ size: 'XL', chest: 114, length: 77, shoulder: 50 },
			],
		},

		reviews: [
			{
				name: 'Demo Customer 01',
				rating: 5,
				date: 'Sample review',
				title: 'Clean oversized look',
				comment:
					'The boxy silhouette gives this tee a modern streetwear feel. It pairs nicely with relaxed cargos.',
			},
			{
				name: 'Demo Customer 02',
				rating: 4,
				date: 'Sample review',
				title: 'Minimal everyday style',
				comment: 'A simple black tee concept with a versatile fit and a clean, understated look.',
			},
		],
	},

	{
		id: 'washed-graphic-tee',
		name: 'Washed Graphic Tee',
		price: 2390,
		image: './images/washed-graphic-tee.webp',
		alt: 'Washed Graphic Tee by VOID District',
		category: 'tees',
		badge: 'GRAPHIC SERIES',
		subtitle: 'Washed texture. Graphic attitude.',
		description: 'A charcoal washed oversized tee with a statement back graphic.',
		details: 'A bold graphic tee designed to complement minimal cargos and sneakers.',
		fit: 'Relaxed oversized fit. Check the illustrative size guide before choosing.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'chest', label: 'CHEST (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
				{ key: 'shoulder', label: 'SHOULDER (CM)' },
			],
			measurements: [
				{ size: 'S', chest: 96, length: 68, shoulder: 44 },
				{ size: 'M', chest: 102, length: 71, shoulder: 46 },
				{ size: 'L', chest: 108, length: 74, shoulder: 48 },
				{ size: 'XL', chest: 114, length: 77, shoulder: 50 },
			],
		},

		reviews: [
			{
				name: 'Demo Customer 01',
				rating: 5,
				date: 'Sample review',
				title: 'Standout graphic design',
				comment: 'The washed charcoal appearance and graphic detailing create a bold streetwear aesthetic.',
			},
			{
				name: 'Demo Customer 02',
				rating: 4,
				date: 'Sample review',
				title: 'Great casual styling',
				comment: 'The vintage-inspired finish works well with neutral pants and everyday sneakers.',
			},
		],
	},

	{
		id: 'essential-pullover-hoodie',
		name: 'Essential Pullover Hoodie',
		price: 3690,
		image: './images/essential-pullover-hoodie.webp',
		alt: 'Essential Pullover Hoodie by VOID District',
		category: 'hoodies',
		badge: 'JUST DROPPED',
		subtitle: 'Everyday comfort, redefined.',
		description: 'A relaxed grey pullover hoodie for everyday streetwear layering.',
		details: 'An easy-to-style pullover silhouette with a neutral grey finish.',
		fit: 'Relaxed fit. Check the illustrative size guide before choosing.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'chest', label: 'CHEST (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
				{ key: 'shoulder', label: 'SHOULDER (CM)' },
			],
			measurements: [
				{ size: 'S', chest: 102, length: 66, shoulder: 46 },
				{ size: 'M', chest: 108, length: 69, shoulder: 48 },
				{ size: 'L', chest: 114, length: 72, shoulder: 50 },
				{ size: 'XL', chest: 120, length: 75, shoulder: 52 },
			],
		},

		reviews: [
			{
				name: 'Demo Customer 01',
				rating: 5,
				date: 'Sample review',
				title: 'Versatile hoodie design',
				comment: 'The neutral grey color makes this hoodie easy to style with different streetwear outfits.',
			},
			{
				name: 'Demo Customer 02',
				rating: 4,
				date: 'Sample review',
				title: 'Relaxed everyday look',
				comment: 'The relaxed silhouette creates a casual layering option for cooler days.',
			},
		],
	},

	{
		id: 'district-zip-hoodie',
		name: 'District Zip Hoodie',
		price: 3990,
		image: './images/district-zip-hoodie.webp',
		alt: 'District Zip Hoodie by VOID District',
		category: 'hoodies',
		badge: 'DISTRICT PICK',
		subtitle: 'Layer your own way.',
		description: 'A black zip-front hoodie with a relaxed everyday silhouette.',
		details: 'A versatile zip-up layering piece that works over tees and cargos.',
		fit: 'Relaxed fit. Check the illustrative size guide before choosing.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'chest', label: 'CHEST (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
				{ key: 'shoulder', label: 'SHOULDER (CM)' },
			],
			measurements: [
				{ size: 'S', chest: 102, length: 66, shoulder: 46 },
				{ size: 'M', chest: 108, length: 69, shoulder: 48 },
				{ size: 'L', chest: 114, length: 72, shoulder: 50 },
				{ size: 'XL', chest: 120, length: 75, shoulder: 52 },
			],
		},

		reviews: [
			{
				name: 'Demo Customer 01',
				rating: 5,
				date: 'Sample review',
				title: 'Classic zip-up style',
				comment: 'The black zip-front design offers a versatile look that works with tees and cargos.',
			},
			{
				name: 'Demo Customer 02',
				rating: 4,
				date: 'Sample review',
				title: 'Easy layering piece',
				comment: 'A minimal zip hoodie concept that fits naturally into a casual streetwear wardrobe.',
			},
		],
	},

	{
		id: 'relaxed-utility-cargo',
		name: 'Relaxed Utility Cargo',
		price: 3190,
		image: './images/relaxed-utility-cargo.webp',
		alt: 'Relaxed Utility Cargo by VOID District',
		category: 'bottoms',
		badge: 'UTILITY STYLE',
		subtitle: 'Made to move.',
		description: 'Olive utility cargo pants with a relaxed silhouette and pocket detailing.',
		details: 'A utility-inspired streetwear bottom that pairs with oversized tees.',
		fit: 'Relaxed cargo fit. Check the illustrative waist guide before choosing.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'waist', label: 'WAIST (CM)' },
				{ key: 'hip', label: 'HIP (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
			],
			measurements: [
				{ size: 'S', waist: 76, hip: 98, length: 100 },
				{ size: 'M', waist: 81, hip: 103, length: 102 },
				{ size: 'L', waist: 86, hip: 108, length: 104 },
				{ size: 'XL', waist: 91, hip: 113, length: 106 },
			],
		},

		reviews: [
			{
				name: 'Demo Customer 01',
				rating: 5,
				date: 'Sample review',
				title: 'Utility-inspired style',
				comment:
					'The olive color and cargo pocket detailing give these pants a distinctive streetwear appearance.',
			},
			{
				name: 'Demo Customer 02',
				rating: 4,
				date: 'Sample review',
				title: 'Relaxed streetwear look',
				comment: 'The relaxed silhouette pairs well with oversized tees and simple sneakers.',
			},
		],
	},

	{
		id: 'urban-wide-leg-cargo',
		name: 'Urban Wide-Leg Cargo',
		price: 3490,
		image: './images/urban-wide-leg-cargo.webp',
		alt: 'Urban Wide-Leg Cargo by VOID District',
		category: 'bottoms',
		badge: 'JUST DROPPED',
		subtitle: 'Room to move.',
		description: 'Beige wide-leg cargo pants designed for relaxed everyday streetwear.',
		details: 'A neutral-toned cargo silhouette with roomy legs and utility details.',
		fit: 'Wide-leg fit. Check the illustrative waist guide before choosing.',
		sizes: ['S', 'M', 'L', 'XL'],

		sizeGuide: {
			columns: [
				{ key: 'size', label: 'SIZE' },
				{ key: 'waist', label: 'WAIST (CM)' },
				{ key: 'hip', label: 'HIP (CM)' },
				{ key: 'length', label: 'LENGTH (CM)' },
			],
			measurements: [
				{ size: 'S', waist: 76, hip: 98, length: 100 },
				{ size: 'M', waist: 81, hip: 103, length: 102 },
				{ size: 'L', waist: 86, hip: 108, length: 104 },
				{ size: 'XL', waist: 91, hip: 113, length: 106 },
			],
		},

		reviews: [
			{
				name: 'Demo Customer 01',
				rating: 5,
				date: 'Sample review',
				title: 'Modern wide-leg silhouette',
				comment: 'The roomy shape and beige color create a clean, contemporary streetwear look.',
			},
			{
				name: 'Demo Customer 02',
				rating: 4,
				date: 'Sample review',
				title: 'Easy neutral styling',
				comment: 'The neutral tone works especially well with black tees and oversized hoodies.',
			},
		],
	},
];
