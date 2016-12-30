mkdir -p dist &&
cat \
  website/app/init.jsx \
  website/app/concept.jsx \
  website/app/documentation.jsx \
  website/app/footer.jsx \
  website/app/header.jsx \
  website/app/home.jsx \
  website/app/icons.jsx \
  website/app/modal.jsx \
  website/app/tutorial.jsx \
  website/app/index.jsx \
  | ./node_modules/.bin/babel --presets=es2015,react > dist/index.js &&
./node_modules/.bin/node-sass website/styles/index.scss -o dist &&
cp website/index.html dist &&
cp -r website/public/* dist
