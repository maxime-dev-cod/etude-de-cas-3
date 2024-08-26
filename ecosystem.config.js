module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      error_file: "./logs/err.log", // Fichier de log pour les erreurs
      max_memory_restart: "200M",   // Limitation de la mémoire à 200 Mo
      instances: 3,                 // Définition du nombre d'instances à 3
      exec_mode: "cluster",         // Mode cluster pour exécuter les instances en parallèle
    },
  ],
};
