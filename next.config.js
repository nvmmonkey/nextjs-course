const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongoAPI: "zAQ12bTECDBmh95B",
        mongodb_database: "users-dev",
      },
    };
  }

  return {
    env: {
      mongoAPI: "zAQ12bTECDBmh95B",
      mongodb_database: "users",
    },
  };
};
