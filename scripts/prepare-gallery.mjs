import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const source = path.resolve('design/gallery');
const output = path.resolve('public/images/gallery');
await mkdir(output, {recursive:true});
const files = (await readdir(source)).filter(name=>/\.(png|jpe?g|webp|avif)$/i.test(name)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
const mobileSource = path.join(source, 'mobile');
const mobileOutput = path.join(output, 'mobile');
await mkdir(mobileOutput, {recursive:true});
const mobileFiles = await readdir(mobileSource).catch(error => { if (error.code === 'ENOENT') return []; throw error; });
for (const name of mobileFiles.filter(name => /\.(png|jpe?g|webp|avif)$/i.test(name))) {
 await sharp(path.join(mobileSource,name)).rotate().webp({quality:93,effort:5}).toFile(path.join(mobileOutput,name.replace(/\.[^.]+$/, '')+'.webp'));
}
const photos = [];
for (const name of files) {
 const filename = name.replace(/\.[^.]+$/, '')+'.webp';
 await sharp(path.join(source,name)).rotate().resize({width:2400,withoutEnlargement:true}).webp({quality:88,effort:5}).toFile(path.join(output,filename));
 const alt = name.replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]/g,' ').replace(/toilet/i,'bathroom');
 photos.push({mobileSrc:mobileFiles.includes(name)?'/images/gallery/mobile/'+filename:undefined,src:'/images/gallery/'+filename,alt:alt.charAt(0).toUpperCase()+alt.slice(1)});
}
await writeFile('app/gallery-images.json', JSON.stringify(photos,null,2)+'\n');
console.log(`Prepared ${photos.length} gallery photographs.`);
