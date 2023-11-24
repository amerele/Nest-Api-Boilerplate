module.exports = {
  apps: [
    {
      name: 'GeParty',
      script: 'dist/main.js',
      watch: false,
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'temp', '.git'],
      max_memory_restart: '4G',
      env: {
        NODE_PORT: '5001',
        NODE_ENV: 'staging',
        DB_HOST: '',
        DB_PORT: '',
        DB_USER: '',
        DB_PASSWORD: '',
        DB_NAME: '',
      },
    },
  ],
};
