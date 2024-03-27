import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';

import type { AnimeScraping } from '../type';
import sequelize from '../utils/sequelize';

type CreationAttributes = Optional<AnimeScraping, 'date'>;
interface instance extends Model<AnimeScraping, CreationAttributes>, AnimeScraping {
  createdAt?: Date;
  updatedAt?: Date;
}

const animeScrapingModel = sequelize.define<instance>(
  'anime_scraping',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUIDV4,
      defaultValue: UUIDV4,
    },
    json: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    query: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(),
    },
  },
  { freezeTableName: true },
);

export default animeScrapingModel;
