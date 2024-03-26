import { Request, Response, NextFunction } from 'express';
import * as cheerio from 'cheerio';
import { latest, populer, recommendation, sidebarComponent } from '../utils/scrapping';
import type { ResBody, Populer, Scrapping, Latest } from '../type';
const scrappingController = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = populer + latest + recommendation + sidebarComponent;
    const $ = cheerio.load(data);

    const bixbox_I = $('.bixbox.bbnofrm')[0];
    let article = $(bixbox_I).find('article');

    const vPopuler: Populer[] = [];
    article.each((i, element) => {
      const img = $(element).find('img').attr('src') ?? '';
      const title = $(element).find('.egghead .eggtitle').text().trim();
      const type = $(element).find('.egghead .eggmeta .eggtype').text().trim();
      const episode = $(element).find('.egghead .eggmeta .eggepisode').text().trim();
      let anime = $(element).find('.bsx a').attr('href') ?? '';
      if (anime) {
        anime = anime.replace('https://oploverz.news', '');
      }

      vPopuler.push({
        title,
        img,
        type,
        episode,
        anime,
      });
    });

    const bixbox_II = $('.bixbox.bbnofrm')[1];
    article = $(bixbox_II).find('article');

    const vLatest: Latest[] = [];
    article.each((i, element) => {
      const hotbadge = $(element).find('.thumb .hotbadge').html();
      const type = $(element).find('.typez').text().trim();
      const img = $(element).find('img').attr('src') ?? '';
      const episode = $(element).find('.bt .epx').text().trim();
      const title = $(element).find('.inf a').attr('title') ?? '';
      let anime = $(element).find('.thumb a').attr('href') ?? '';
      if (anime) {
        anime = anime.replace('https://oploverz.news', '');
      }
      let ul = $(element).find('.inf ul').html() ?? '';
      ul = ul.replace(/https:\/\/oploverz\.news/g, '');
      const score = $(element).find('.upscore .scr').text().trim();

      vLatest.push({
        title,
        img,
        type,
        episode,
        anime,
        hotbadge: !!hotbadge,
        ul,
        score,
      });
    });

    const bixbox_III = $('.bixbox.bbnofrm')[2];
    const genre = $(bixbox_III).find('.series-gen .nav-tabs li');

    const vGenre: string[] = [];
    genre.each((i, element) => {
      const v = $(element).find('a').text().trim();
      vGenre.push(v);
    });

    const tab = $(bixbox_III).find('.series-gen .listupd .tab-pane');

    const vRecommendation: Scrapping['recommendation'] = {};
    tab.each((i, element) => {
      vRecommendation[i] = [];
      const list = $(element).find('article');
      list.each((_, elmt) => {
        let anime = $(elmt).find('a').attr('href') ?? '';
        if (anime) {
          anime = anime.replace('https://oploverz.news', '');
        }
        const isCompleted = $(elmt).find('.limit .status.Completed').html();
        const type = $(elmt).find('.limit .typez').text().trim();
        const image = $(elmt).find('.limit img').attr('src') ?? '';
        const epx = $(elmt).find('.limit .bt .epx').text().trim();
        const title = $(elmt).find('.tt h2').text().trim();

        vRecommendation[i].push({
          anime,
          isCompleted: !!isCompleted,
          type,
          image,
          title,
          epx,
        });
      });
    });

    const sidebar = $('#sidebar');
    const filter = $(sidebar).find('form .filter.dropdown');

    const genereType: Scrapping['filter']['type'] = [];
    const vList: Scrapping['filter']['list'] = {};

    filter.each((i, element) => {
      const name = $(element).find('button').text().trim();
      genereType.push(name);

      const li = $(element).find('ul li');
      vList[name] = [];
      li.each((x, list) => {
        const vL = $(list).find('label').text().trim();
        vList[name].push(vL);
      });
    });

    const resBody: ResBody<Scrapping> = {
      message: 'success',
      data: {
        populer: vPopuler,
        latest: vLatest,
        genre: vGenre,
        recommendation: vRecommendation,
        filter: {
          list: vList,
          type: genereType,
        },
      },
    };
    res.send(resBody);
  } catch (error) {
    next(error);
  }
};

export default scrappingController;
