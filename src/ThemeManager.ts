let themes: any = {
  Light: {
    oof: '#ececec',
    content: '#ffffff',
    highlight: '#cccccc',
    overlay: '#ececec',
    text: '#2c3e4f'
  }, 
  Dark: {
    oof: '#000813',
    content: '#002558',
    highlight: '#2a4d7d',
    overlay: '#000099',
    text: '#c1c1c1'
  }, 
};

let inited: boolean = false;

export function getCurrentTheme() {
  return localStorage.getItem('theme') || 'Light';
}

export function loadTheme(name: string) {
  let bodys = document.body.style;
  for (let i in themes[name])
    bodys.setProperty('--' + i, themes[name][i]);
  localStorage.setItem('theme', name);
}

export function init() {
  if (inited)
    return;
  loadTheme(getCurrentTheme());
  inited = true;
}

