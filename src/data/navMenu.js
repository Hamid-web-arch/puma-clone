export const navItems = [
  { slug: 'back-to-school', label: 'Back To School' },
  { slug: 'women', label: 'Women' },
  { slug: 'men', label: 'Men' },
  { slug: 'kids', label: 'Kids' },
  { slug: 'lifestyle', label: 'Lifestyle' },
  { slug: 'sport', label: 'Sport' },
  { slug: 'sale', label: 'Sale' },
]

export const navDropdowns = {
  women: {
    sections: [
      {
        links: [
          { label: 'Launch Calendar' },
          { label: 'New Arrivals' },
          { label: 'Best Sellers' },
          { label: 'Back to School', highlight: 'gold' },
          { label: 'Summer Shop' },
          { label: 'Everyday Flex' },
          { label: 'Hyrox' },
          { label: 'Running Shoe Finder' },
          { label: "Shop All Women's" },
          { label: 'SALE', highlight: 'red' },
        ],
      },
      {
        heading: 'Shoes',
        links: ['Speedcat', 'Lifestyle', 'Suede', 'Low Profile', 'White Shoes', 'Platform', 'Ballerinas', 'Running', 'Training & Gym', 'Basketball', 'Motorsport', 'Soccer', 'Boots & Mids', 'Slides & Sandals', 'All Shoes'],
      },
      {
        heading: 'Clothing',
        links: ['T-Shirts & Tops', 'Pants', 'Dresses & Skirts', 'Matching Sets', 'Hoodies & Sweatshirts', 'Leggings', 'Shorts', 'Jackets & Outerwear', 'Tracksuits', 'Sports Bras', 'Loungewear', 'Jerseys', 'All Clothing'],
      },
      {
        heading: 'Accessories',
        links: ['Bags & Backpacks', 'Hats & Beanies', 'Socks', 'Sports Equipment'],
      },
      {
        heading: 'Sports',
        links: ['Running', 'Training & Gym', 'Soccer', 'Yoga', 'Basketball', 'Motorsport', 'Golf'],
      },
    ],
  },
  men: {
    sections: [
      {
        links: [
          { label: 'Launch Calendar' },
          { label: 'New Arrivals' },
          { label: 'Best Sellers' },
          { label: 'Back to School', highlight: 'gold' },
          { label: 'Summer Shop' },
          { label: 'Hyrox' },
          { label: 'Running Shoe Finder' },
          { label: "Shop All Men's" },
          { label: 'SALE', highlight: 'red' },
        ],
      },
      {
        heading: 'Shoes',
        links: ['Speedcat', 'Lifestyle', 'Suede', 'Low Profile', 'White Shoes', 'Running', 'Basketball', 'Training & Gym', 'Motorsport', 'Soccer Cleats', 'Boots & Mids', 'Slides & Sandals', 'All Shoes'],
      },
      {
        heading: 'Clothing',
        links: ['T-Shirts & Tops', 'Pants', 'Hoodies & Sweatshirts', 'Shorts', 'Jackets & Outerwear', 'Tracksuits', 'Jerseys', 'Polos', 'Matching Sets', 'Loungewear', 'All Clothing'],
      },
      {
        heading: 'Accessories',
        links: ['Hats & Beanies', 'Bags & Backpacks', 'Sports Equipment', 'Socks & Underwear'],
      },
      {
        heading: 'Sports',
        links: ['Basketball', 'Running', 'Training & Gym', 'Motorsport', 'Soccer', 'Golf'],
      },
    ],
  },
  kids: {
    sections: [
      {
        links: [
          { label: 'New Arrivals' },
          { label: 'Best Sellers' },
          { label: 'Back to School', highlight: 'gold' },
          { label: 'Summer Shop' },
          { label: 'Paw Patrol' },
          { label: 'Speedcat' },
          { label: 'Mini Me Styles' },
          { label: 'Shop All Kids' },
          { label: 'SALE', highlight: 'red' },
        ],
      },
      {
        heading: 'Shoes',
        links: ['Babies & Toddlers (Size 4 - 10)', 'Little Kids (Size 10.5 - 3.5)', 'Big Kids (Size 4 - 7)', 'Speedcat', 'Lifestyle Shoes', 'Boots & Mids', 'Easy On & Off Shoes', 'All Shoes'],
      },
      {
        heading: 'Clothing',
        links: ['Babies & Toddlers (Size 0M - 4T)', 'Little Kids (Size 5 - 7)', 'Big Kids (Size S - XL)', 'Matching Sets', 'Hoodies & Sweatshirts', 'Pants & Shorts', 'T-Shirts & Tops', 'All Clothing'],
      },
      {
        heading: 'Accessories',
        links: ['Hats & Beanies', 'Bags & Backpacks', 'Socks', 'All Accessories'],
      },
      {
        heading: 'Sports',
        links: ['Basketball', 'Soccer', 'Jerseys', 'Running', 'Motorsport', 'All Sports'],
      },
    ],
  },
  lifestyle: {
    sections: [
      {
        heading: 'SELECT Collections',
        links: ['Launch Calendar', 'Best Sellers', { label: 'Back to School', highlight: 'gold' }, 'Summer Shop', 'Butter Yellow + More', 'Ballerinas'],
      },
      {
        heading: 'Shoes',
        links: ['Low Profile', 'Suede', 'Speedcat', 'Mostro', 'H-Street', 'Palermo'],
      },
      {
        heading: 'Clothing',
        links: ['Future PUMA Archive', 'PUMAtech', 'T7 Collection', 'Graphic Tops'],
      },
      {
        heading: 'Collaborations',
        links: ['CODA', 'DORA THE EXPLORER', 'HYROX', 'KIDSUPER', 'LAFRANCÉ', 'PAW PATROL', 'SAYSKY', 'TRANSFORMERS', 'Shop All Collaborations'],
      },
    ],
  },
  sport: {
    sections: [
      {
        heading: 'Soccer',
        links: ['Soccer Cleats & Shoes', 'Soccer Clothing', 'Soccer Balls & Accessories', 'Soccer Jerseys', 'Personalized Soccer Jerseys', 'Manchester City', 'AC Milan', 'Borussia Dortmund', 'C.F. Monterrey', 'Pumas UNAM', 'Shop All Soccer'],
      },
      {
        heading: 'Running',
        links: ['Running Shoes', 'Running Clothing', 'Running Accessories', 'Race Day', 'Road Running', 'Trail Running', 'Running Shoe Finder', 'Shop All Running'],
      },
      {
        heading: 'Basketball',
        links: ['Basketball Shoes', 'Basketball Clothing', 'Tyrese Haliburton', 'LaMelo Ball', 'Shop All Basketball'],
      },
      {
        heading: 'Motorsport',
        links: ['Motorsport Shoes', 'Motorsport Clothing', 'Motorsport Accessories', 'Formula 1®', 'Aston Martin ARAMCO F1® Team', 'Scuderia Ferrari', 'BMW M Motorsport', 'McLaren Racing', 'Porsche', 'Shop All Motorsport'],
      },
      {
        heading: 'More Sports',
        links: ['Training', 'Training Shoes', 'Training Clothing', 'Training Accessories', 'Hyrox', 'Yoga', 'Shop All Training', 'Golf'],
      },
    ],
  },
  sale: {
    sections: [
      {
        heading: 'New to Sale',
        links: ['Fall Essentials', 'Tee Deals', 'Final Sale', { label: 'SALE', highlight: 'red' }],
      },
      {
        heading: 'Women',
        links: ['Shoes', 'Clothing', 'Accessories', "Shop All Women's Sale"],
      },
      {
        heading: 'Men',
        links: ['Shoes', 'Clothing', 'Accessories', "Shop All Men's Sale"],
      },
      {
        heading: 'Kids',
        links: ['Shoes', 'Clothing', 'Accessories', "Shop All Kids' Sale"],
      },
      {
        heading: 'Sports',
        links: ['Motorsport', 'Basketball', 'Running & Training', 'Soccer', 'Shop All Sports Sale'],
      },
    ],
  },
}
