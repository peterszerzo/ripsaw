mkdir -p gh-pages &&
cat \
  website/app/init.jsx \
  website/app/concept.jsx \
  website/app/footer.jsx \
  website/app/header.jsx \
  website/app/home.jsx \
  website/app/icons.jsx \
  website/app/modal.jsx \
  website/app/tutorial.jsx \
  website/app/index.jsx \
  | ./node_modules/.bin/babel --presets=es2015,react > gh-pages/index.js &&
./node_modules/.bin/node-sass website/styles/index.scss -o gh-pages &&
cp website/index.html gh-pages &&
cp -r website/public/* gh-pages
