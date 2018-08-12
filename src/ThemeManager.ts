import { root } from '@/main';
import Waifu from '@/components/Waifu.vue';

export type themeProps = ['oof', 'content', 'highlight', 'text'];
export type themeProp = themeProps[number];

let themes: { [key: string]: { [k in themeProp]: string } } = {
  Light: {
    oof: '#ececec',
    content: '#ffffff',
    highlight: '#cccccc',
    text: '#2c3e4f'
  },
  Dark: {
    oof: '#000813',
    content: '#002558',
    highlight: '#2a4d7d',
    text: '#c1c1c1'
  },
};

export let loadedTheme = JSON.parse(JSON.stringify(themes.Light));

let inited: boolean = false;

export function getCurrentTheme() {
  return localStorage.getItem('theme') || 'Light';
}

export function getCurrentWaifu() {
  return localStorage.getItem('waifuurl') || 'None';
}

export function getCurrentWaifuName() {
  return localStorage.getItem('waifuname') || 'None';
}

function reloadTheme() {
  let bodys = document.body.style;
  for (let i in loadedTheme) {
    let p: themeProp = i as themeProp;
    bodys.setProperty('--' + i, loadedTheme[p]);
  }
}

export function loadTheme(params: { [k in themeProp]: string } | string) {
  let themename: string;
  if (typeof params === 'string') {
    themename = params;
    if (params == 'Custom') {
      params = JSON.parse(localStorage.getItem('custom')!);
    } else {
      params = themes[params];
      if (!params)
        return;
    }
  } else
    themename = 'Custom';
  if (typeof params === 'string')
    return;
  for (let i in params) {
    let p: themeProp = i as themeProp;
    loadedTheme[p] = params[p];
  }
  if (themename == 'Custom') {
    localStorage.setItem('custom', JSON.stringify(params));
  }
  reloadTheme();
  localStorage.setItem('theme', themename);
}

export function loadWaifu(url: string) {
  let wc = root.$children[0].$refs['waifu'] as Waifu;
  wc.$data.img = url;
  localStorage.setItem('waifuurl', url);
}

export function init() {
  if (inited)
    return;
  loadTheme(getCurrentTheme());
  loadWaifu(getCurrentWaifu());
  inited = true;
}

