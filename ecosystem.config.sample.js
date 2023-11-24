module.exports = {
  apps: [
    {
      name: 'PROMO-Backend',
      script: 'dist/main.js',
      watch: false,
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'temp', '.git'],
      max_memory_restart: '4G',
      env: {
        NODE_PORT: '5001',
        NODE_ENV: 'staging',
        DB_HOST: '192.168.80.19',
        DB_PORT: '5432',
        DB_USER: 'pricemet',
        DB_PASSWORD: 'Pr#142536@M3t',
        DB_NAME: 'Varejo',
      },
    },
  ],
};
