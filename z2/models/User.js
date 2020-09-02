module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
  User.associate = (db) => {
    User.hasMany(db.todos, {
      foreignKey: "todoId",
    });
  };
  return User;
};
