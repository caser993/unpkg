import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import MainApp from '../client/main/App.js';
import MainTemplate from '../templates/MainTemplate.js';
import getScripts from '../utils/getScripts.js';
import { createElement, createHTML } from '../utils/markup.js';

const doctype = '<!DOCTYPE html>';
const globalURLs =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
    ? {
        '@emotion/react': '/@emotion/react@11.10.5/dist/emotion-react.umd.min.js',
        react: '/react@18.2.0/umd/react.production.min.js',
        'react-dom': '/react-dom@18.2.0/umd/react-dom.production.min.js'
      }
    : {
        '@emotion/react': '/@emotion/react@11.10.5/dist/emotion-react.umd.min.js',
        react: '/react@18.2.0/umd/react.development.js',
        'react-dom': '/react-dom@18.2.0/umd/react-dom.development.js'
      };

export default function serveMainPage(req, res) {
  const content = createHTML(renderToString(createElement(MainApp)));
  const elements = getScripts('main', 'iife', globalURLs);

  const html =
    doctype +
    renderToStaticMarkup(createElement(MainTemplate, { content, elements }));

  res
    .set({
      'Cache-Control': 'public, max-age=14400', // 4 hours
      'Cache-Tag': 'main'
    })
    .send(html);
}
