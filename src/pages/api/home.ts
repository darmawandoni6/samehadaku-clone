// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { filter, html } from '@assets/test';
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
  const result: DataHome = {
    rekomendasiAnime: [],
    animePopuler: [],
    komikPopuler: [],
    newAnime: [],
    batchAnime: [],
    animeMovie: [],
  };
  try {
    // if (expire > new Date().getTime()) {
    //   res.send(dataFetch);
    //   return;
    // }

    // const { data } = await axios.get('https://oploverz.news/');

    const data = filter;
    const $ = cheerio.load(data);

    const quickfilter = $('.quickfilter');

    const dd = $(quickfilter).find('.filter.dropdown');

    const txt = {};

    dd.each((i, element) => {
      const ul = $(element).find('.dropdown-menu li');
      console.log({ i });
      txt[i] = [];

      ul.each((_, element) => {
        const list = $(element).find('label').text().trim();
        // console.log(list);
        txt[i].push(list);
      });
    });

    console.log(txt);

    // const postBody = $('.postbody');

    // const section = $(postBody).find('.bixbox.bbnofrm');

    // const popularToday = $(section[0]).find('.listupd.normal .excstf article');
    // popularToday.each((i, element) => {
    //   // const img = $(element).find('img').attr('src');
    //   // console.log({ img });

    //   const link = $(element).find('a').attr('href');
    //   const img = $(element).find('img').attr('src');
    //   const type = $(element).find('.eggtype.TV').text().trim();
    //   const score = '0';
    //   const title = $(element).find('.eggtitle').text().trim();
    //   const status = '';
    //   result.animePopuler.push({ link, img, type: type, score, title, status });
    // });

    res.status(200).json(result);
  } catch (error) {
    const e = error as Error;
    res.status(200).json(result);
    console.log({ error: e.message });
  }
}
