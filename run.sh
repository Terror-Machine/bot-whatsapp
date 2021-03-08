rm ./node_modules/@open-wa/wa-automate/dist/api/Client.js
rm ./node_modules/@open-wa/wa-automate/dist/lib/wapi.js
rm ./node_modules/node-gtts/index.js
cp ./nomod/Client.js ./node_modules/@open-wa/wa-automate/dist/api/Client.js
cp ./nomod/wapi.js ./node_modules/@open-wa/wa-automate/dist/lib/wapi.js
cp ./nomod/index.js ./node_modules/node-gtts/index.js
