// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import * as cheerio from 'cheerio';

import type { NextApiRequest, NextApiResponse } from 'next';

type RekomendasiAnime = {
  title: string;
  genre: string[];
  date: string;
  file?: string;
  link?: string;
};
type AnimePopuler = {
  link?: string;
  img?: string;
  type: string;
  score: string;
  title: string;
  status: string;
};
type KomikPopuler = {
  link?: string;
  img?: string;
  title: string;
  status: string;
};
export type Anime = {
  img?: string;
  link?: string;
  title: string;
  episode: string;
  postBy: string;
  realese?: string;
};
export type DataHome = {
  rekomendasiAnime: RekomendasiAnime[];
  animePopuler: AnimePopuler[];
  komikPopuler: KomikPopuler[];
  newAnime: Anime[];
  batchAnime: Anime[];
  animeMovie: AnimePopuler[];
};

let expire: number;
let dataFetch: DataHome = <DataHome>{};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataHome>) {
  try {
    if (expire > new Date().getTime()) {
      res.send(dataFetch);
      return;
    }

    const { data } = await axios.get('https://samehadaku.mom/');
    const $ = cheerio.load(data);

    const result: DataHome = {
      rekomendasiAnime: [],
      animePopuler: [],
      komikPopuler: [],
      newAnime: [],
      batchAnime: [],
      animeMovie: [],
    };

    const widgetseries = $('.widgetseries ul li');
    widgetseries.each((i, element) => {
      const imgseries = $(element).find('.imgseries a img').attr('src');
      const lftinfo = $(element).find('.lftinfo');
      lftinfo.each((_, lt) => {
        const link = $(lt).find('a.series').attr('href');
        const title = $(lt).find('h2').text();
        const date = $(lt).find('span:last-child').text();
        const genre: string[] = [];
        $(lt)
          .find('span a')
          .each((_, g) => {
            genre.push($(g).text());
          });

        result.rekomendasiAnime.push({ title, genre, date, file: imgseries, link });
      });
    });

    const animePopuler = $('div.animeterpopulerdisamehadaku');
    let animposx = $(animePopuler).find('.animposx');
    animposx.each((i, element) => {
      const link = $(element).find('a').attr('href');
      const img = $(element).find('div.content-thumb img.anmsa').attr('src');
      const type = $(element).find('div.content-thumb div.type').text().trim();
      const score = $(element).find('div.content-thumb div.score').text().trim();
      const title = $(element).find('div.data div.title').text().trim();
      const status = $(element).find('div.data div.type').text().trim();
      result.animePopuler.push({ link, img, type: type, score, title, status });
    });

    const komikPopuler = $('div.komikterpopuler');
    animposx = $(komikPopuler).find('.animposx');
    animposx.each((i, element) => {
      const link = $(element).find('a').attr('href');
      const img = $(element).find('div.content-thumb img').attr('src');
      const title = $(element).find('div.data div.title').text().trim();
      const status = $(element).find('div.data div.type').text().trim();
      result.komikPopuler.push({ link, img, title, status });
    });

    let newAnime = $('div.post-show ul');
    let listNew = $(newAnime).find('li');
    listNew.each((i, item) => {
      const img = $(item).find('.thumb img').attr('src');
      const title = $(item).find('h2.entry-title').text().trim();
      const episode = $(item).find('author').eq(0).text().trim();
      const postBy = $(item).find('author').eq(1).text().trim();
      const realese = $(item).find('span').eq(2).html();
      const link = $(item).find('.thumb a').attr('href');

      result.newAnime.push({ img, title, episode, postBy, realese: realese ? realese.trim() : undefined, link });
    });
    newAnime = $('div.post-show ul').eq(1);
    listNew = $(newAnime).find('li');
    listNew.each((i, item) => {
      const img = $(item).find('.thumb img').attr('src');
      const title = $(item).find('h2.entry-title').text().trim();
      const episode = $(item).find('author').eq(0).text().trim();
      const postBy = $(item).find('author').eq(1).text().trim();
      const realese = $(item).find('span').eq(2).html();
      const link = $(item).find('.thumb a').attr('href');

      result.batchAnime.push({ img, title, episode, postBy, realese: realese ? realese.trim() : undefined, link });
    });

    const nontonmovieanime = $('div.nontonmovieanime');
    animposx = $(nontonmovieanime).find('.animposx');
    animposx.each((i, element) => {
      const link = $(element).find('a').attr('href');
      const img = $(element).find('div.content-thumb img.anmsa').attr('src');
      const type = $(element).find('div.content-thumb div.type').text().trim();
      const score = $(element).find('div.content-thumb div.score').text().trim();
      const title = $(element).find('div.data div.title').text().trim();
      const status = $(element).find('div.data div.type').text().trim();
      result.animeMovie.push({ link, img, type: type, score, title, status });
    });

    expire = new Date().getTime() + 5 * 60 * 60 * 1000;
    dataFetch = result;
    res.status(200).json(result);
  } catch (error) {
    const e = error as Error;
    console.log(e.message);
  }
}
