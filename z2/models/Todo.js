module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    checked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    deadline: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  Todo.associate = (db) => {
    Todo.belongsTo(db.users, {
      foreignKey: "userId",
    });
  };
  return Todo;
};
