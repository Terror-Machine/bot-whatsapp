const { create, Client, ev, decryptMedia } = require('@open-wa/wa-automate')
const mime = require('mime-types');
const fs = require('fs');
const uaOverride = 'WhatsApp/2.16.352 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15';
const tosBlockGuaranteed = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/79.0.3945.88 Safari/537.36";
const ON_DEATH = require('death');
let globalClient = Client;
const express = require('express')

const app = express()
app.use(express.json({
    limit: '200mb'
  })
)

const PORT = 8081;

ON_DEATH(async function(signal, err) {
  console.log('killing session');
  if (globalClient) await globalClient.kill();
})


ev.on('qr.**', async(qrcode, sessionId) => {
  const imageBuffer = Buffer.from(qrcode.replace('data:image/png;base64,', ''), 'base64');
  fs.writeFileSync(`qr_code${sessionId?'_'+sessionId:''}.png`, imageBuffer);
});

ev.on('**', async(data, sessionId, namespace) => {
  console.log("\n----------")
  console.log('EV', data, sessionId, namespace)
  console.log("----------")
})

ev.on('sessionData.**', async(sessionData, sessionId) => {
  console.log("\n----------")
  console.log('sessionData', sessionId, sessionData)
  console.log("----------")
})

ev.on('sessionDataBase64.**', async(sessionData, sessionId) => {
  console.log("\n----------")
  console.log('sessionData', sessionId, sessionData)
  console.log("----------")
})

async function start(client= Client) {
  app.use(client.middleware(true));

  app.listen(PORT, function() {
    console.log(`\n• Listening on port ${PORT}!`);
  });

  globalClient = client;
  console.log('starting');
  const me = await client.getMe();
  console.log("start -> me", me);
  client.onAck((c = any) => console.log(c.id, c.body, c.ack));
  client.onAddedToGroup(newGroup => console.log('Added to new Group', newGroup.id));
  client.onIncomingCall(call => console.log('newcall', call));
  const prods = await client.getBusinessProfilesProducts(me.wid)
  console.log(prods)
  client.onStateChanged(state => {
    console.log('statechanged', state)
    if (state === "CONFLICT" || state === "UNLAUNCHED") client.forceRefocus();
  });
  client.onAnyMessage(message => {
    console.log(message.type)
    if (message.body === 'DELETE') client.deleteMessage(message.from, message.id, false)
  });
  client.onMessage(async message => {
    try {
      const isConnected = await client.isConnected();
      console.log("TCL: start -> isConnected", isConnected)
      console.log(message.body, message.id);
      if (message.mimetype) {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        let mediaData;
        mediaData = await decryptMedia(message, uaOverride);
        await client.sendImageAsSticker(message.from, `data:${message.mimetype};base64,${mediaData.toString('base64')}`)
      } else if (message.type === "location") {
        if (message.shareDuration) console.log('This user has started sharing their live location', message.author || message.from)
        console.log("TCL: location -> message", message.lat, message.lng, message.loc)
        await client.sendLocation(message.from, `${message.lat}`, `${message.lng}`, `Youre are at ${message.loc}`)
      } else {
      }
    } catch (error) {
      console.log("TCL: start -> error", error)
    }
  });
}

create({
    sessionId: 'customer-support',
    useChrome: true,
    headless: true,
    restartOnCrash: start,
    throwErrorOnTosBlock: true,
    qrTimeout: 40,
    authTimeout: 40,
    killProcessOnBrowserClose: true,
    autoRefresh: true,
    qrRefreshS: 15,
    safeMode: true,
  })
  .then(async client => await start(client))
  .catch(e => {
    console.log('Error', e.message);
  });