# cat website/components/init.jsx website/components/general/**/*.jsx website/components/route_handlers/**/*.jsx website/routes/index.jsx > dist/1.jsx
mkdir -p dist &&
node-sass website/styles/index.scss -o dist
