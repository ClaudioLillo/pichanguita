import fs from 'fs';
import path from 'path';

const download = async (url: string, destination: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`No se pudo descargar la imagen ${url}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(destination, buffer);
    console.log('imagen guardada');
}

const pokemonIds = [];

// for (let i = 1025; i < 1026; i++) {
//     pokemonIds.push(`${i}`)
// }

const galarian: Record<string, { id: number; name: string }> = {
    "110": {
        "id": 110,
        "name": "Weezing"
    },
    "263": {
        "id": 263,
        "name": "Zigzagoon"
    },
    "264": {
        "id": 264,
        "name": "Linoone"
    },
    "52": {
        "id": 52,
        "name": "Meowth"
    },
    "554": {
        "id": 554,
        "name": "Darumaka"
    },
    "555": {
        "id": 555,
        "name": "Darmanitan"
    },
    "618": {
        "id": 618,
        "name": "Stunfisk"
    },
    "79": {
        "id": 79,
        "name": "Slowpoke"
    },
    "83": {
        "id": 83,
        "name": "Farfetch’d"
    },
    "862": {
        "id": 862,
        "name": "Obstagoon"
    },
    "863": {
        "id": 863,
        "name": "Perrserker"
    },
    "865": {
        "id": 865,
        "name": "Sirfetch’d"
    },
    "866": {
        "id": 866,
        "name": "Mr. Rime"
    },
    "867": {
        "id": 867,
        "name": "Runerigus"
    }
}

for (const p in galarian) {
    pokemonIds.push(p)
}

for (const id of pokemonIds) {
    let prefix = "";
    if (Number(id) < 10) {
        prefix = "00"
    } else if (Number(id) < 100) {
        prefix = "0"
    }
    const url = `https://db.pokemongohub.net/images/official/full/${prefix}${id}_galar.webp`;
    const destination = path.resolve(`images/galarian/${id}.webp`);
    console.log(id);
    download(url, destination);
}

