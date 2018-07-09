import { Sets } from '@/Models/Sets';
import { settings } from '@/settings';

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
    return `${toId(species.substr(0, h).toLowerCase())}-${toId(species.substr(h + 1))}`;
};

export function getPokemonImage(mset: Sets, shiny?: boolean) {
    if (!mset)
        return '';
    if (!mset.species)
        return '';
    if (mset.has_custom) {
        return `${settings.domain}/api/custom/${mset.id}`;
    }
    return `https://play.pokemonshowdown.com/sprites/xyani${(mset.shiny && '-shiny') || ''}/${getNormalizedUniqueName(mset.species)}.gif`;
}

export function setToString(mset: Sets): string {
    let res = '';
    if (mset.name)
        res += `${mset.name} (${mset.species})`;
    else
        res += mset.species;
    if (mset.gender && mset.gender != '')
        res += ` (${mset.gender})`;
    if (mset.item && mset.item != '')
        res += ` @ ${mset.item}`;
    res += `\nAbility: ${mset.ability}\n`;
    if (mset.level && mset.level != 100)
        res += `Level: ${mset.level}\n`;
    if (mset.shiny && mset.shiny !== 0)
        res += 'Shiny: Yes\n';

    if (mset.happiness !== undefined && mset.happiness !== null && mset.happiness! < 255)
        res += `Happiness: ${mset.happiness}\n`;
    let buildstr = (t: string, f: number = 0) => ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe']
        .filter(s => mset[`${s.toLowerCase()}_${t}`] != f)
        .map(s => mset[`${s.toLowerCase()}_${t}`] + ' ' + s)
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
        .map(d => 'move_' + d)
        .filter(n => mset[n])
        .map(n => '- ' + mset[n])
        .join('\n');

    return res;
}

export let avatarLink = (avatar: string) => {
    let a = avatar;
    a = a.substr(+(a[0] == "#"));
    return `https://play.pokemonshowdown.com/sprites/trainers/${a}.png`;
}