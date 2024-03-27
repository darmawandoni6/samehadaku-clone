import { DataTypes, Model, UUIDV4 } from 'sequelize';

import type { AnimeScraping } from '../type';
import sequelize from '../utils/sequelize';

interface instance extends Model<AnimeScraping>, AnimeScraping {
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
  },
  { freezeTableName: true },
);

export default animeScrapingModel;
