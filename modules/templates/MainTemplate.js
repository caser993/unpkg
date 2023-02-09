import PropTypes from 'prop-types';

import encodeJSONForScript from '../utils/encodeJSONForScript.js';
import {
  createElement as e,
  createHTML as h,
  createScript as x
} from '../utils/markup.js';

const promiseShim =
  'window.Promise || document.write(\'\\x3Cscript src="/es6-promise@4.2.5/dist/es6-promise.min.js">\\x3C/script>\\x3Cscript>ES6Promise.polyfill()\\x3C/script>\')';

const fetchShim =
  'window.fetch || document.write(\'\\x3Cscript src="/whatwg-fetch@3.0.0/dist/fetch.umd.js">\\x3C/script>\')';

export default function MainTemplate({
  title = 'UNPKG',
  description = 'The CDN for everything on npm',
  favicon = '/favicon.ico',
  data,
  content = h(''),
  elements = []
}) {
  const GTAG_MEASUREMENT_ID = process.env.GTAG_MEASUREMENT_ID || '';

  return e(
    'html',
    { lang: 'en' },
    e(
      'head',
      null,
      // Global site tag (gtag.js) - Google Analytics
      !GTAG_MEASUREMENT_ID ? null : x(`var s = document.createElement('script');
s.async = 'true';
s.src='https://www.googletagmanager.com/gtag/js?id=${GTAG_MEASUREMENT_ID}';
document.head.append(s);
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());gtag('config', '${GTAG_MEASUREMENT_ID}');`),
      e('meta', { charSet: 'utf-8' }),
      e('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1' }),
      description && e('meta', { name: 'description', content: description }),
      e('meta', {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,maximum-scale=1'
      }),
      e('meta', { name: 'timestamp', content: new Date().toISOString() }),
      favicon && e('link', { rel: 'shortcut icon', href: favicon }),
      e('title', null, title),
      x(promiseShim),
      x(fetchShim),
      data && x(`window.__DATA__ = ${encodeJSONForScript(data)}`)
    ),
    e(
      'body',
      null,
      e('div', { id: 'root', dangerouslySetInnerHTML: content }),
      ...elements
    )
  );
}

if (process.env.NODE_ENV !== 'production') {
  const htmlType = PropTypes.shape({
    __html: PropTypes.string
  });

  MainTemplate.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    favicon: PropTypes.string,
    data: PropTypes.any,
    content: htmlType,
    elements: PropTypes.arrayOf(PropTypes.node)
  };
}
