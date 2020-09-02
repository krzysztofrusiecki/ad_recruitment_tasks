module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    checked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return Todo;
};
