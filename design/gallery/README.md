# Gallery source images

Put JPG, PNG, WebP or AVIF photographs in this folder. Run `npm run gallery` to update the running preview, or restart `npm run dev`. Production builds prepare the images automatically.

Files are sorted by filename; numeric prefixes control order. Optimized WebP copies go to `public/images/gallery`, and the generated manifest is `app/gallery-images.json`. Originals stay here and are not served to visitors. The fullscreen viewer uses the optimized image at its full available resolution.
