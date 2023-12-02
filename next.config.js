module.exports = {
  images: {
    domains: [], // Empty array allows images from any domain (not recommended for security reasons)
  },
};

// postcss.config.js
module.exports = {
  plugins: {
    // Enable CSS Nesting plugin before Tailwind CSS
    'postcss-nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
  },
};