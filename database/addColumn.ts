import { DataTypes } from 'sequelize';

import sequelize from '../server/utils/sequelize';

const syncDb = async () => {
  const query = sequelize.getQueryInterface();
  try {
    console.log();
    console.log(`success add new column`);
    console.log();
  } catch (error) {
    const e = error as Error;
    console.log(error);
    console.log(`------------------- ${e.message} -------------------`);
    console.log();
  }
};

syncDb();
