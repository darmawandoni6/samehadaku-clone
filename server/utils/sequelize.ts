import { Sequelize } from 'sequelize';

const db = process.env.DATABASE ?? 'local';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `./sqlite/${db}.sqlite3`,
});

export default sequelize;
