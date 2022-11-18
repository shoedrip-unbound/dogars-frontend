/* eslint-disable  */

import { Sets, Moves } from '@/Models/Sets';
import { settings } from '@/settings';
import { get2DSpriteEnabled } from './ThemeManager';

export let toId = (text: any) => {
    // this is a duplicate of Dex.getId, for performance reasons
    if (text && text.id) {
        text = text.id;
    } else if (text && text.userid) {
        text = text.userid;
    }
    if (typeof text !== 'string' && typeof text !== 'number') return '';
    return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '');
};

let getNormalizedUniqueName = (species: string) => {
    let h = species.indexOf('-');
    if (h == -1)
        return toId(species);
    if (species.toLowerCase() == "kommo-o")
        return "kommoo";
    return `${toId(species.substr(0, h).toLowerCase())}-${toId(species.substr(h + 1))}`;
};

let testimg = (url: string) => {
    return new Promise((res, rej) => {
        let img = new Image();
        img.onload = res;
        img.onerror = rej;
        img.src = url;
    });
}

export const faves: number[] = JSON.parse(localStorage.getItem('faves') || '[]');

export let isSetFave = (id: number) => {
    console.log(faves, id);
    return faves.includes(id);
}

export let saveFaves = () => {
    localStorage.setItem('faves', JSON.stringify(faves));
}

let image_exists = async (url: string) => {
    try {
        await testimg(url);
        return true;
    } catch {
        return false;
    }
}

export async function getPokemonImage(mset: Sets, shiny?: boolean) {
    if (!mset)
        return '';
    if (!mset.species)
        return '';
    const customurl = `${settings.domain}/api/custom/${mset.id}`;
    if (mset.has_custom || await image_exists(customurl))
        return customurl;
    const sprite2d = `https://play.pokemonshowdown.com/sprites/gen5ani${(mset.shiny && '-shiny') || ''}/${getNormalizedUniqueName(mset.species)}.gif`;
    const sprite3d = `https://play.pokemonshowdown.com/sprites/xyani${(mset.shiny && '-shiny') || ''}/${getNormalizedUniqueName(mset.species)}.gif`;
    const [m, a] = get2DSpriteEnabled() ? [sprite2d, sprite3d] : [sprite3d, sprite2d];
    if (await image_exists(m))
        return m;
    if (await image_exists(a))
        return a;
    return `https://play.pokemonshowdown.com/sprites/dex${(mset.shiny && '-shiny') || ''}/${getNormalizedUniqueName(mset.species)}.gif`;
}

export function setToString(mset: Sets): string {
    let res = '';
    if (mset.name)
        res += `${mset.name} (${mset.species})`;
    else
        res += mset.species;
    if (mset.gender && mset.gender != '' && mset.gender != 'N')
        res += ` (${mset.gender})`;
    if (mset.item && mset.item != '')
        res += ` @ ${mset.item}`;
    res += `\nAbility: ${mset.ability}\n`;
    if (mset.level && mset.level != 100)
        res += `Level: ${mset.level}\n`;
    if (mset.shiny)
        res += 'Shiny: Yes\n';

    if (mset.happiness !== undefined && mset.happiness !== null && mset.happiness! < 255)
        res += `Happiness: ${mset.happiness}\n`;
    let buildstr = (t: string, f: number = 0) => ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe']
        .filter(s => mset[`${s.toLowerCase()}_${t}` as keyof Sets] != f)
        .map(s => mset[`${s.toLowerCase()}_${t}` as keyof Sets] + ' ' + s)
        .join(' / ');

    let evstr = buildstr('ev');
    let ivstr = buildstr('iv', 31);
    if (evstr != '')
        res += `EVs: ${evstr}\n`;
    let neutral = ['Serious', 'Bashful', 'Docile', 'Hardy', 'Quirky'];
    let nature = neutral.some(n => n == mset.nature);
    if (mset.nature && !nature)
        res += `${mset.nature} Nature\n`;
    if (ivstr != '')
        res += `IVs: ${ivstr}\n`;
    res += [1, 2, 3, 4]
        .map(d => 'move_' + d as keyof Moves)
        .filter(n => mset[n])
        .map(n => `- ${mset[n]}`)
        .join('\n');

    return res;
}

export let avatarLink = (avatar: string) => {
    let a = avatar;
    a = a.substr(+(a[0] == "#"));
    return `https://play.pokemonshowdown.com/sprites/trainers/${a}.png`;
}