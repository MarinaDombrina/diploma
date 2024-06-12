import 'dotenv/config';
import fetch from 'node-fetch';

import { XMLParser } from 'fast-xml-parser';
import ColorLog from './service/color-log.js';
import boot from './boot.js';
import FileManager from './service/file-manager.js';

boot();

ColorLog.info('Перед получением данных из sitemap.xml');
const response = await fetch(process.env.SITE_URL + '/pub/media/sitemap.xml');


ColorLog.info('Получили файл, парсим его');
const parser = new XMLParser();
let parsedSitemap = parser.parse(await response.text());

const result = {
    categories: [],
    products: [],
    cms: [],
    '404': [],
};

ColorLog.info('Агрегируем ссылки по типам: cms, категории, продукты');

const sitemapRows = parsedSitemap.urlset.url || []

const priorityMap = {
    '0.2': 'cms',
    '0.5': 'categories',
    '1.0': 'products',
    '1': 'products',
}

sitemapRows.forEach(rowObj => {
    const priority = `${rowObj.priority}`;
    const pageType = priorityMap[priority];
    if (pageType) {
        result[pageType].push(rowObj.loc);
    }
});

const firstCategories = result.categories.slice(0, 5);
const firstProducts = result.products.slice(0, 5);
const firstCmsPages = result.cms.slice(0, 2);


ColorLog.info('Добавляем 404е');

const urlsFor404 = firstCategories.concat(firstProducts.concat(firstCmsPages));
urlsFor404.forEach(url => {
    result['404'].push(url + '404specific');
})

const fileManager = new FileManager();

const filePath = '/fixtures/' + 'urls.json';
ColorLog.info(`Перед записью в ${filePath}`);
fileManager.write(fileManager.getRootDir() + filePath, JSON.stringify(result));
