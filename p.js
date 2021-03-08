async function fnBots(fn = new Client()) {
  /*
  cron.schedule("0 0 0 * * *", async() => {
    let chatsb = await fn.getAllChats()
    let chats = await fn.getAllChatIds()
    let arrOfGroups = chatsb.filter(x => x.isGroup && !(isWhite(x.contact.id)))
    let arrOfGroupsxxx = chatsb.filter(x => x.isGroup && (isWhite(x.contact.id)))
    let chatsny = chats.filter(x => !(isWhite(x)))
    for (let groupIds of arrOfGroups) {
      let groupId = groupIds.contact.id
      if (!groupIds.isReadOnly) {
        await fn.sendText(groupId, `Maaf, bot melakukan pembersihan group harian :D`).then(() => {
          fn.deleteChat(groupId)
          fn.leaveGroup(groupId)
        }).catch(() => {
          fn.deleteChat(groupId)
          fn.leaveGroup(groupId)
        })
      } else {
        fn.deleteChat(groupId)
        fn.leaveGroup(groupId)
      }
    }
    for (let chats of chatsny) {
      await fn.deleteChat(chats)
    }
    for (let groupIds of arrOfGroupsxxx) {
      let groupId = groupIds.contact.id
      if (!groupIds.isReadOnly) {
        fn.clearChat(groupId)
      } else {
        fn.clearChat(groupId)
      }
    }
    console.log(color('~> [INFO] Deleted all chats'));
  });
  */
  cron.schedule("* * * * * *", async function () {
    fs.writeJSONSync('./db/' + pukimaki + '.levels.json', levels)
  })
  cron.schedule("0 0 21 * * *", function () {
    let meki = []
    for (let i of xc) {
      let asu = {
        id: i.id,
        limit: '∞'
      }
      meki.push(asu)
    }
    x4.limit = meki
    xi.limitgame = meki
    dumpLimitGame()
    dumpLimit()
    var xsa = new os_spawn();
    xsa.execCommand(pukimak).catch(err => {
      console.log("os >>>", err);
    })
  })
  console.log('---------------------------------------------------------------------------')
  console.log(color(figlet.textSync('FN BOTS WA', {
    horizontalLayout: 'full',
    verticalLayout: 'full'
  })))
  console.log('---------------------------------------------------------------------------')
  if (isRestart) {
    restartAwal(fn);
  }
  fn.onStateChanged(function (state) {
    if (state === "CONFLICT") return fn.forceRefocus()
  });
  fn.onMessage(async(message) => {
    try {
      await arfine(fn, message, false)
    } catch (error) {
      console.log(error.message)
    }
    fn.getAmountOfLoadedMessages()
    .then((msg) => {
      if (msg >= 4000) {
        fn.sendText('6281286118629@c.us', `Loaded message reach ${msg}, cutting message cache...`)
        fn.cutMsgCache()
        fn.cutMsgCache()
        fn.cutMsgCache()
        fn.cutMsgCache()
        fn.cutMsgCache()
        fn.cutMsgCache()
      }
    })
    try {
      await coligai(fn, message)
    } catch (error) {
      console.log(error.message)
    }
  });
  fn.onAddedToGroup(async(chat) => {
      if (isWhite(chat.id) && (chat.isAnnounceGrpRestrict == false)) return fn.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih telah mengundang ${BotName} kedalam grup ini, untuk menjaga agar bot tidak keluar otomatis, silakan hubungi creator.`)
      if (mtcState === false) {
        const groups = await fn.getAllGroups()
        if (groups.length > groupLimit) {
          if (chat.isAnnounceGrpRestrict == false) fn.sendText(chat.id, 'Maaf, Batas group yang dapat bot tampung sudah penuh')
          await fn.leaveGroup(chat.id)
          await fn.deleteChat(chat.id)
        } else {
          if (chat.groupMetadata.participants.length < memberLimit) {
            if (chat.isAnnounceGrpRestrict == false) fn.sendText(chat.id, `Maaf, BOT keluar jika member group tidak melebihi ${memberLimit} orang`)
            await fn.leaveGroup(chat.id)
            await fn.deleteChat(chat.id)
          } else {
            if (chat.isAnnounceGrpRestrict == false) fn.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih telah mengundang ${BotName} kedalam grup ini, untuk menjaga agar bot tidak keluar otomatis, silakan hubungi creator.`)
          }
        }
      } else {
        if (chat.isAnnounceGrpRestrict == false) fn.sendText(chat.id, 'Bot sedang maintenance. coba lain hari atau hubungi creator')
        await fn.leaveGroup(chat.id)
        await fn.deleteChat(chat.id)
      }
  })
  /*
  fn.onGlobalParicipantsChanged(async(participantChangedEventModel) => {
    const istrue = x9.welcome.includes(participantChangedEventModel.chat)
    if (participantChangedEventModel.action == 'add' && istrue) {
      const isWelkom = participantChangedEventModel.chat
      if (xh.welcomemessage.hasOwnProperty(isWelkom)) {
        const gChat = await fn.getChatById(isWelkom)
        const {
          name
        } = gChat
        const pepe = await fn.getProfilePicFromServer(participantChangedEventModel.who)
        let capt = `Selamat datang di Grup *${name}*\n`
        capt += `Hai @${participantChangedEventModel.who.replace('@c.us','')}\n\n`
        if (pepe == '' || pepe == undefined) {
          await fn.sendFileFromUrlWithMention(isWelkom, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', capt+xh.welcomemessage[isWelkom])
        } else {
          await fn.sendFileFromUrlWithMention(isWelkom, pepe, 'profile.jpg', capt+xh.welcomemessage[isWelkom])
        }
      } else {
        const gChat = await fn.getChatById(isWelkom)
        const {
          name
        } = gChat
        const pepe = await fn.getProfilePicFromServer(participantChangedEventModel.who)
        let capt = `Selamat datang di Grup *${name}*\n`
        capt += `Hai @${participantChangedEventModel.who.replace('@c.us','')}\n\n`
        capt += `*INTRO DULU YA*\n`
        capt += `Nama:\n`
        capt += `Umur:\n`
        capt += `Askot:\n`
        capt += `Cewe/Cowo?:\n`
        capt += `Status:\n`
        capt += `Instagram:\n\n`
        capt += `Selamat Bergabung Dan Semoga Betah Disini.\n`
        capt += `Jangan Lupa Baca Deskripsi GRUP!\n`
        capt += `Ketik .rules untuk T&C BOT!`
        if (pepe == '' || pepe == undefined) {
          await fn.sendFileFromUrlWithMention(isWelkom, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', capt)
        } else {
          await fn.sendFileFromUrlWithMention(isWelkom, pepe, 'profile.jpg', capt)
        }
      }
    }
  })
  */
  fn.onIncomingCall(async(call) => {
    if (!x8.mutelist.includes(call.peerJid)) {
      x8.mutelist.push(call.peerJid)
      dumpMute()
    }
    if (!x8.muted.includes(call.peerJid)) {
      x8.muted.push(call.peerJid)
      dumpMute()
    }
    await fn.sendText(call.peerJid, '*CALL = BLOCK!*\nAkun ini hanya akun bot! tidak bisa menerima panggilan! dan *TIDAK BISA DIUNBLOCK!!*').then(() => {
      fn.clearChat(call.peerJid)
      fn.deleteChat(call.peerJid)
      fn.contactBlock(call.peerJid)
    })
  });
}

const coligai = async(fn, message) => {
  let id = message.chatId
  if (!message.quotedMsg) return
  if (!/^Berapa hasil dari/i.test(message.quotedMsg.body)) return
  if (!(message.chatId in gamematematika)) return fn.reply(message.chatId, 'Soal itu telah berakhir', message.id)
  const iscoli = message.quotedMsgObj.id.includes(gamematematika[id][0])
  if (iscoli) {
    let math = gamematematika[id][1]
    if (message.body == math.result ) {
      fn.reply(message.chatId, `*Jawaban Benar!*\nSelamat anda mendapatkan ${math.bonus} point`, message.id)
      addBal(message.sender.id, math.bonus)
      clearTimeout(gamematematika[id][3])
      delete gamematematika[id]
    } else {
      if (--gamematematika[id][2] == 0) {
        fn.reply(message.chatId, `*Kesempatan habis!*\nJawaban: *${math.result}*`, message.id)
        clearTimeout(gamematematika[id][3])
        delete gamematematika[id]
      } else fn.reply(message.chatId, `*Jawaban Salah!*\nMasih ada ${gamematematika[id][2]} kesempatan`, message.id)
    }
  }
}

const arfine = async(fn, message, asu) => {
  silent = false;
  origin = false;
  if (asu) {
    suggested = true
  } else {
    suggested = false
  }
  try {
    if (changer && !fromMe) {
      jancokasuceleng()
      if (isCount(serial)) return
      counthit(serial)
      if (mimetype == 'audio/ogg; codecs=opus') {
        console.log(mimetype)
        const filename = `./database/datab.ogg`;
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        await fs.writeFile(filename, mediaData, function (err) {
          if (err) {
            return console.log(err);
          }
          fn.sendText(from, 'sedang memproses audio')
        })
        await sleep(5000)
        var xsa = new os_spawn();
        xsa.execCommand('python3 pyo.py').then(res => {
          fn.sendFile(from, './database/pepek.mp3', 'pepek.mp3', id)
        }).catch(err => {
          console.log("os >>>", err);
        })
      } else if (mimetype == 'audio/mpeg') {
        const filename = `./database/database.mp3`;
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        await fs.writeFileSync(filename, mediaData, function (err) {
          if (err) {
            return console.log(err);
          }
          fn.sendText(from, 'sedang memproses audio')
        })
        await sleep(5000)
        var xsa = new os_spawn();
        xsa.execCommand('python3 pyd.py').then(res => {
          fn.sendFile(from, './database/pepek.mp3', 'pepek.mp3', id)
        }).catch(err => {
          console.log("os >>>", err);
        })
      }
    }
    const blockNumber = await fn.getBlockedIds()
    const botNumber = await fn.getHostNumber() + '@c.us'
    const groupId = isGroupMsg ? chat.groupMetadata.id : ''
    const groupAdmins = isGroupMsg ? await fn.getGroupAdmins(groupId) : ''
    const groupMembers = isGroupMsg ? await fn.getGroupMembersId(groupId) : ''
    const isGroupAdmins = groupAdmins.includes(serial) || false
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
    const isBanned = x8.mutelist.includes(serial)
    const mtcState = settings.mtc
    const processTime = now => moments.duration(now - moment(t * 1000)).asSeconds()
    const time = moment().format('LTS')
    const timen = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
    const reply = (teks) => {
      fn.reply(message.chatId, teks, message.id).then(() => fn.sendSeen(message.from))
    }
    const sendText = (teks) => {
      fn.sendText(message.chatId, teks).then(() => fn.sendSeen(message.from))
    }
    const sendRawWebpAsSticker = async (x) => {
      fn.sendRawWebpAsSticker(message.chatId, x).then(() => fn.sendSeen(message.from))
    }
    if (isGroupMsg) {
      for (let ment of mentionedJidList) {
        if (checkAfkUser(chatId, ment, xg)) {
          const getId = getAfkId(chatId, ment, xg)
          const getReason = getAfkReason(chatId, getId, xg)
          const getTime = getAfkTime(chatId, getId, xg)
          let tx = `┌ ❏ AFK : MODE\n`
          tx += `│ ├ PLEASE!! DONT DISTURB!!\n`
          tx += `│ ├ SINCE : ${getTime}\n`
          tx += `└ └ REASON : ${getReason}`
          await reply(tx)
        }
      }
      if (checkAfkUser(chatId, serial, xg) && !isCmd) {
        xg.splice(getAfkPosition(chatId, serial, xg), 1)
        fs.writeJSONSync('db/' + pukimaki + '.afk.json', xg, {
          spaces: 2
        })
        await sendText(`*${pushname}* telah kembali dari AFK! Selamat datang ~`)
      }
    }

    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
    if ((body || '').startsWith('.return ')) {
      if (!isSadmin) return
      let type = Function
      if (/await/.test(body)) type = AsyncFunction
      var m = message
      let func = new type(
        'print', 
        'fn', 
        'm',
        'type',
        'id',
        'from',
        'to',
        't',
        'timestamp',
        'author',
        'sender',
        'isGroupMsg',
        'chat',
        'chatId',
        'caption',
        'duration',
        'isMedia',
        'mimetype',
        'quotedMsg',
        'quotedParticipant',
        'quotedMsgObj',
        'mentionedJidList',
        'fromMe',
        'body', 
        'require', 
        !/^return /.test(body.slice(8)) && body.slice(8).split('\n').length === 1 ? 'return ' + body.slice(8) : body.slice(8))
      let output
      try {
        output = func((...args) => {
          reply(util.format(...args))
        }, fn, m, type, id, from, to, t, timestamp, author, sender, isGroupMsg, chat, chatId, caption, duration, isMedia, mimetype, quotedMsg, quotedParticipant, quotedMsgObj, mentionedJidList, fromMe, body, require, text => text.replace(/^(async function|function|async).+\(.+?\).+{/, `case 'command':`).replace(/this\.(text|url|args)/g, (_, text) => {
          switch (text) {
          case 'text':
            return "args.join(' ')"
            break
          case 'args':
            return "args"
            break
          case 'url':
            return "args[0]"
            break
          default:
            return _
          }
        }).replace(/}$/, '    break'))
        reply(util.format(output))
      } catch (e) {
        reply(util.format(e))
      }
    }
    let cms = []
    if (txt.startsWith(settings.rname) || txt.startsWith(settings.sname)) {
      jancokasuceleng()
      addXp(serial)
      if (isCount(serial)) return
      counthit(serial)
      if (txt.includes("r:")) {
        let cy = txt.split("r:");
        let tet = cy[1];
        let co = tet.split(" ");
        let nums = co[0];
        tet = tet.replace(nums, "");
        txt = tet.trim();
        nums = parseInt(nums);
        nums -= 1;
        toId = mygroup[nums].id;
      }
      cms = await mycmd(await getTxt(txt));
    }
    suggestWord = cms
    if ((txt.startsWith(settings.rname) || txt.startsWith(settings.sname)) && counter <= 4) {
      counter++;
      const usr = serial
      if (recentcmd.has(usr) || sban.has(usr)) {
        if (!(fspamm.has(usr) || (sban.has(usr)))) {
          reply(`*hei ${pushname} you are on cooldown!*`);
          fspamm.add(usr);
        } else if (!(sban.has(usr))) {
          fn.sendTextWithMentions(toId, `*Hei @${serial}*\n*COMMAND SPAM DETECTED*\n*Command banned for 15 minutes*`);
          sban.add(usr);
        }
      } else {
        for (let aa of cms) {
          if (!isGroupMsg) console.log(color('[EXEC]', 'yellow'), time, color(msgs(aa.toString())), 'from', color(pushname))
          if (isGroupMsg) console.log(color('[EXEC]', 'yellow'), time, color(msgs(aa.toString())), 'from', color(pushname), 'in', color(formattedTitle))
          txt = aa;
          if (isMuted(chatId) && !mtcState && banChat() && !isBanned || isSadmin || master || vip || premium || (isWhiteList(chatId) && !isBanned)) {
            if (isSadmin || master) {
              ctype = "owner"
              } else if (getComs(txt, "set")) {
                let huu = "- Bot Config:\n";
                if (settings.autocorrect == "off") {
                  huu += "\n{0} Auto Correct".format("\u2694")
                } else {
                  huu += "\n{0} Auto Correct : {1}".format("\u2699", settings.autocorrect)
                }
                if (settings.autojoin) {
                  huu += "\n{0} autojoin".format("\u2699")
                } else {
                  huu += "\n{0} autojoin".format("\u2694")
                }
                if (settings.chatbot) {
                  huu += "\n{0} Chatbot".format("\u2699")
                } else {
                  huu += "\n{0} Chatbot".format("\u2694")
                }
                if (mekimeki) {
                  huu += "\n{0} mimic".format("\u2699")
                } else {
                  huu += "\n{0} mimic".format("\u2694")
                }
                if (changer) {
                  huu += "\n{0} voice changer".format("\u2699")
                } else {
                  huu += "\n{0} voice changer".format("\u2694")
                }
                if (settings.banChats) {
                  huu += "\n{0} Idle".format("\u2699")
                } else {
                  huu += "\n{0} Idle".format("\u2694")
                }
                if (settings.mtc) {
                  huu += "\n{0} Maintenance".format("\u2699")
                } else {
                  huu += "\n{0} Maintenance".format("\u2694")
                }
                huu += "\n\n" + autocommand
                dumpSet();
                reply(huu)
              } else if (getComs(txt, 'status')) {
                let itel = []
                for (let i in xa.premium) {
                  itel.push(xa.premium[i])
                }
                const loadedMsg = await fn.getAmountOfLoadedMessages()
                const chatIds = await fn.getAllChatIds()
                const groups = await fn.getAllGroups()
                const mek = await fn.iAmAdmin()
                const kem = x4.limit
                const k = InitUser.master
                const m = settings.whitelist
                const f = x8.mutelist
                const ko = blockNumber
                const status = await fn.getStatus(botNumber)
                const Me = await fn.getMe()
                let a = `*Nama*: ` + Me.pushname + `\n`
                a += `*Sisa baterai*: ` + Me.battery + `%\n`
                a += `*Chat belum terbaca*: ${loadedMsg} \n`
                a += `*Chat Grup*: ${groups.length} \n`
                a += `*Chat Pribadi*: ${chatIds.length - groups.length} \n`
                a += `*Jumlah Chat*: ${chatIds.length}\n`
                a += `*Mempunyai owner*: ${k.length} orang\n`
                a += `*Menjadi admin di*: ${mek.length} group\n`
                a += `*Jumlah premium*: ${itel.length} orang\n`
                a += `*Jumlah whitelist*: ${m.length} group\n`
                a += `*Jumlah blocklist*: ${ko.length} orang\n`
                a += `*Jumlah mutelist*: ${f.length} orang\n`
                a += `*Sedang digunakan oleh*: ${kem.length} orang hari ini\n`
                a += `*Konsumsi RAM*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\n`
                a += `*Status*: \n` + status.status + `\n\n`
                a += autocommand
                await fn.sendFile(toId, `./media/fotobot.jpeg`, 'mypict.jpg', a)
                break
              } 
              if (getPrefix(txt, 'rwhite')) {
                if (args.length === 0) return
                if (args.length === 1) return
                const anu = args[0]
                const link = args[1]
                if (link.match(/(chat.whatsapp.com)/gi)) {
                  const log = await fn.inviteInfo(link)
                  if (log == "401") return reply('Link group tidak valid, atau bot pernah dikick! jika bot dikick, maka tidak bisa masuk kembali lewat link!')
                  if (isSadmin || master) {
                    await fn.joinGroupViaLink(link).then(async() => {
                      if (chat.isAnnounceGrpRestrict == false) fn.sendText(log.id, `Halo warga grup ${log.subject}\nTerimakasih telah mengundang ${BotName} kedalam grup ini. ketik *.rules* untuk mengetahui peraturan bot ini.`)
                    })
                    await reply('Berhasil join ke group via link!')
                    if (!xf.whitelist.hasOwnProperty(log.id)) {
                      xf.whitelist[log.id] = {
                        "id": log.id,
                        "nama": anu
                      };
                      dumpWhite();
                      reply('done add to whitelist')
                    } else {
                      reply('sudah ada di list')
                    }
                    if (isWhite(log.id)) return
                    settings.whitelist.push(log.id)
                    dumpSet()
                  } else {
                    let group = await fn.getAllGroups()
                    if (group.length > groupLimit) {
                      return reply('Maaf, Batas group yang dapat bot tampung sudah penuh')
                    } else {
                      if (log.size < memberLimit && !master) {
                        return reply('Group target tidak memiliki member melebihi ' + memberLimit + '\nBot tidak bisa masuk ke grup untuk trial akses, silakan hubungi creator.')
                      } else {
                        await fn.joinGroupViaLink(link).then(async() => {
                          if (chat.isAnnounceGrpRestrict == false) fn.sendTextWithMentions(log.id, "Halo warga grup " + log.subject + "\n\nTerimakasih telah mengundang " + BotName + " kedalam grup ini\njangan lupa ketik *.rules* untuk mengetahui peraturan penggunaan bot, dan untuk menjaga agar bot tidak keluar otomatis, @" + log.owner.replace(/@c.us/, "") + " atau @" + serial.replace(/@c.us/, "") + " silakan hubungi creator.")
                          await reply('Berhasil join ke group via link!')
                          limitAdd(serial)
                          await fn.sendTextWithMentions(settings.sAdmin, "@" + serial.replace(/@c.us/, "") + " telah mengundang bot kedalam grup " + log.subject)
                          await fn.sendContact(settings.admin, serial)
                        })
                      }
                    }
                  }
                } else {
                  reply('kasih link yang bener dong kak!')
                }
              } 
              else if (getPrefix(txt, 'trial')) {
                if (args.length === 0) return
                if (isLimit(serial) && !args.length <= 2) return
                const link = args[0]
                if (link.match(/(chat.whatsapp.com)/gi)) {
                  const log = await fn.inviteInfo(link)
                  if (log == "401") return reply('Link group tidak valid, atau bot pernah dikick! jika bot dikick, maka tidak bisa masuk kembali lewat link!')
                  await fn.joinGroupViaLink(link).then(async() => {
                    if (chat.isAnnounceGrpRestrict == false) fn.sendText(log.id, `Halo warga grup ${log.subject}\nTerimakasih telah mengundang ${BotName} kedalam grup ini. ketik *.rules* untuk mengetahui peraturan bot ini.`)
                  })
                  await reply('Berhasil join ke group via link!')
                  reply(`${log.id}`)
                } else {
                  reply('kasih link yang bener dong kak!')
                }
              }
              if (getComs(txt, 'leaveall')) {
                let groups = await fn.getAllGroups()
                let arrOfGroup = []
                for (let index of groups) {
                  arrOfGroup.push(index.groupMetadata.id._serialized)
                }
                let arrOfGroups = arrOfGroup.filter(x => !isWhite(x))
                for (let groupId of arrOfGroups) {
                  if (!chat.isAnnounceGrpRestrict) {
                    await fn.sendText(groupId, `Jika ingin bot tetap stay di group, admin silakan hubungi creator atau owner`).then(async() => {
                      fn.deleteChat(groupId)
                      fn.leaveGroup(groupId)
                    })
                  } else {
                    await fn.leaveGroup(groupId)
                    await fn.deleteChat(groupId)
                  }
                }
                reply('sukses leave non whitelist group')
              } else if (getComs(txt, 'clearall')) {
                let chatsb = await fn.getAllChats()
                let chats = await fn.getAllChatIds()
                let arrOfGroups = chatsb.filter(x => x.isGroup && !(isWhite(x.contact.id)))
                let arrOfGroupsxxx = chatsb.filter(x => x.isGroup && (isWhite(x.contact.id)))
                let chatsny = chats.filter(x => !(isWhite(x)))
                for (let groupIds of arrOfGroups) {
                  let groupId = groupIds.contact.id
                  if (!groupIds.isReadOnly) {
                    await fn.sendText(groupId, `Maaf, bot melakukan pembersihan group harian :D`).then(() => {
                      fn.deleteChat(groupId)
                      fn.leaveGroup(groupId)
                    }).catch(() => {
                      fn.deleteChat(groupId)
                      fn.leaveGroup(groupId)
                    })
                  } else {
                    fn.deleteChat(groupId)
                    fn.leaveGroup(groupId)
                  }
                }
                for (let chats of chatsny) {
                  await fn.deleteChat(chats)
                }
                for (let groupIds of arrOfGroupsxxx) {
                  let groupId = groupIds.contact.id
                  if (!groupIds.isReadOnly) {
                    fn.clearChat(groupId)
                    console.log('clearchatbot')
                  } else {
                    fn.clearChat(groupId)
                  }
                }
                reply('sukses!')
              } 
              if (getPrefix(txt, 'broadcast')) {
                let msg = arg
                if (quotedMsg) {
                  const filename = `${t}.${mime.extension(quotedMsgObj.mimetype)}`
                  const mediaData = await decryptMedia(quotedMsgObj);
                  const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
                  let groups = await fn.getAllGroups()
                  let arrOfGroup = []
                  for (let index of groups) {
                    arrOfGroup.push(index.groupMetadata.id._serialized)
                  }
                  for (let groupId of arrOfGroup) {
                    if (!chat.isAnnounceGrpRestrict) {
                      await fn.sendFile(groupId, imageBase64, filename, `[ ${BotName} Broadcast ]\n\n${msg}`).then(() => console.log(`success resend ${mimetype}`))
                    }
                  }
                  reply('Broadcast Success!')
                } else if (isMedia) {
                  const filename = `${t}.${mime.extension(mimetype)}`
                  const mediaData = await decryptMedia(message);
                  const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                  let groups = await fn.getAllGroups()
                  let arrOfGroup = []
                  for (let index of groups) {
                    arrOfGroup.push(index.groupMetadata.id._serialized)
                  }
                  for (let groupId of arrOfGroup) {
                    if (!chat.isAnnounceGrpRestrict) {
                      await fn.sendFile(groupId, imageBase64, filename, `[ ${BotName} Broadcast ]\n\n${msg}`).then(() => console.log(`success resend ${mimetype}`))
                    }
                  }
                  reply('Broadcast Success!')
                } else {
                  let groups = await fn.getAllGroups()
                  let arrOfGroup = []
                  for (let index of groups) {
                    arrOfGroup.push(index.groupMetadata.id._serialized)
                  }
                  for (let groupId of arrOfGroup) {
                    if (!chat.isAnnounceGrpRestrict) {
                      await fn.sendText(groupId, `[ ${BotName} Broadcast ]\n\n${msg}`)
                    }
                  }
                  reply('Broadcast Success!')
                }
              } else if (getComs(txt, 'setprofilepic')) {
                if (isMedia) {
                  const mediaData = await decryptMedia(message)
                  const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                  await fn.setProfilePic(imageBase64).then(() => reply('sukses change profile'))
                } else if (quotedMsg && quotedMsg.type == 'image') {
                  const mediaData = await decryptMedia(quotedMsg)
                  const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                  await fn.setProfilePic(imageBase64).then(() => reply('sukses change profile'))
                }
              } else if (getPrefix(txt, 'cloneprofile')) {
                if (quotedMsg) {
                  const jancok = await fn.getContact(quotedParticipant)
                    .then(async function (response) {
                      return new Promise((resolve) => {
                        const {
                          id,
                          name,
                          shortName,
                          pushname,
                          formattedName
                        } = response
                        const jancok = pushname
                        resolve(jancok)
                      })
                    })
                    .catch(async function (error) {
                      console.log(error);
                    })
                  const pic = await fn.getProfilePicFromServer(quotedParticipant)
                  const status = await fn.getStatus(quotedParticipant)
                  if (pic == undefined) {
                    var pfp = errorurl
                  } else {
                    var pfp = pic
                  }
                  const response = await axios({
                    method: "get",
                    url: pfp,
                    headers: {
                      'DNT': 1,
                      'Upgrade-Insecure-Requests': 1
                    },
                    responseType: 'arraybuffer'
                  })
                  const dUrl = "data:" + response.headers['content-type'] + ";base64," + Buffer.from(response.data, 'binary').toString('base64')
                  await fn.setMyName(jancok)
                  await fn.setMyStatus(status.status)
                  await fn.setProfilePic(dUrl)
                  reply('sukses clone profile')
                  limitAdd(serial)
                } else {
                  if (!isGroupMsg) return reply('Maaf, perintah ini hanya dapat dipakai didalam grup!')
                  if (mentionedJidList.length === 0) return await reply('Maaf, format pesan salah.')
                  if (mentionedJidList.length >= 2) return await reply('Maaf, perintah ini hanya dapat digunakan kepada 1 user.')
                  const jancok = await fn.getContact(mentionedJidList[0])
                    .then(async function (response) {
                      return new Promise((resolve) => {
                        const {
                          id,
                          name,
                          shortName,
                          pushname,
                          formattedName
                        } = response
                        const jancok = pushname
                        resolve(jancok)
                      })
                    })
                    .catch(async function (error) {
                      console.log(error);
                    })
                  const pic = await fn.getProfilePicFromServer(mentionedJidList[0])
                  const status = await fn.getStatus(mentionedJidList[0])
                  if (pic == undefined) {
                    var pfp = errorurl
                  } else {
                    var pfp = pic
                  }
                  const response = await axios({
                    method: "get",
                    url: pfp,
                    headers: {
                      'DNT': 1,
                      'Upgrade-Insecure-Requests': 1
                    },
                    responseType: 'arraybuffer'
                  })
                  const dUrl = "data:" + response.headers['content-type'] + ";base64," + Buffer.from(response.data, 'binary').toString('base64')
                  await fn.setMyName(jancok)
                  await fn.setMyStatus(status.status)
                  await fn.setProfilePic(dUrl)
                  reply('sukses clone profile')
                  limitAdd(serial)
                }
              } 
              if (getPrefix(txt, 'addsticker')) {
	              if (!quotedMsg) reply('Maaf, perintah harus mereply target!')
	              if (quotedMsgObj.type === 'image') {
	                const add = arg
	                const mediaData = await decryptMedia(quotedMsg);
	                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
	                x6.sticker[add] = imageBase64
	                dumpsticker()
	                reply("sticker added.")
	              } else {
	                reply('hanya bisa menyimpan gambar!')
	              }
	            } else if (getPrefix(txt, "delsticker")) {
	              let cui = txt.split(" ");
	              let alt = cui[1].trim();
	              if (x6.sticker.hasOwnProperty(alt)) {
	                delete x6.sticker[alt]
	                dumpsticker()
	                reply("sticker deleted.")
	              } else {
	                reply("tidak ada didalam database bot.")
	              }
	            } else if (getPrefix(txt, 'addaudio')) {
	              if (!quotedMsg) reply('Maaf, perintah harus mereply target!')
	              if (quotedMsgObj.mimetype == 'audio/ogg; codecs=opus') {
	                const add = arg
	                const filename = `./database/${add}.${mime.extension(quotedMsgObj.mimetype)}`;
	                const mediaData = await decryptMedia(quotedMsg);
	                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
	                await fs.writeFile(filename, mediaData, function (err) {
	                  if (err) {
	                    return console.log(err);
	                  }
	                })
	                x2.video[add] = filename
	                dumpVideo()
	                reply("audio added.")
	              } else if (quotedMsgObj.mimetype == 'audio/mpeg') {
	                const add = arg
	                const filename = `./database/${add}.${mime.extension(quotedMsgObj.mimetype)}`;
	                const mediaData = await decryptMedia(quotedMsg);
	                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
	                await fs.writeFile(filename, mediaData, function (err) {
	                  if (err) {
	                    return console.log(err);
	                  }
	                })
	                x2.video[add] = filename
	                dumpVideo()
	                reply("audio added.")
	              } else {
	                reply('hanya bisa reply!')
	              }
	            } else if (getPrefix(txt, "delaudio")) {
	              let cui = txt.split(" ");
	              let alt = cui[1].trim();
	              if (x2.video.hasOwnProperty(alt)) {
	                delete x2.video[alt]
	                dumpVideo()
	                reply("audio deleted.")
	              } else {
	                reply("tidak ada didalam database bot.")
	              }
	            } 
		          if (getComs(txt, 'addwhitelist')) {
	              if (isWhite(chatId)) return reply('Sudah ada di whitelist')
	              settings.whitelist.push(chatId)
	              dumpSet()
	              reply('Success!')
	            } else if (getComs(txt, 'delwhitelist')) {
	              if (!(isWhite(chatId))) return reply('tidak ada di whitelist')
	              let index = settings.whitelist.indexOf(chatId);
	              settings.whitelist.splice(index, 1)
	              dumpSet()
	              reply('Success!')
	            } 
            }
            if (isSadmin || master || vip) {
              ctype = "vip"
              if (getComs(txt, "checkvip")) {
                const cekExp = ms(getVIPexpired(serial, xc) - Date.now())
                await fn.sendReplyWithMentions(toId, `「 *VIP EXPIRE* 」\n\n➸ *ID*: @${serial.replace('@c.us','')}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
              } else if (getPrefix(txt, 'sgift')) {
                if (quotedMsg) {
                  const a = args[0]
                  if (parseInt(a) > 50) return reply('tidak bisa memberi lebih dari 25!')
                  const b = quotedParticipant
                  for (let i of x4.limit) {
                    if (i['id'] == b) {
                      i['limit'] = parseInt(a)
                      dumpLimit()
                    }
                  }
                  fn.sendTextWithMentions(toId, `sukses gift limit menjadi ${a} kepada @${b.replace('@c.us','')}`)
                } else {
                  const a = args[0]
                  if (parseInt(a) > 50) return reply('tidak bisa memberi lebih dari 25!')
                  const b = mentionedJidList[0]
                  for (let i of x4.limit) {
                    if (i['id'] == b) {
                      i['limit'] = parseInt(a)
                      dumpLimit()
                    }
                  }
                  fn.sendTextWithMentions(toId, `sukses gift limit menjadi ${a} kepada @${b.replace('@c.us','')}`)
                }
              } else if (getComs(txt, 'meadmin')) {
                if (!isBotGroupAdmins) return await reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                if (groupAdmins.includes(serial)) return await reply('Maaf, user tersebut sudah menjadi admin.')
                await fn.promoteParticipant(groupId, serial)
                await fn.sendTextWithMentions(toId, `done add @${serial.replace('@c.us', '')} to admin.`)
              } else if (getPrefix(txt, "climit")) {
                var found = false
                const xxx = mentionedJidList[0]
                for (let lmt of x4.limit) {
                  if (lmt['id'] === xxx) {
                    reply(`sisa credit penggunaan bot anda adalah: *${lmt['limit']}*`)
                    found = true
                  }
                }
                if (found === false) return reply('XXX')
              } else if (getPrefix(txt, 'block')) {
                if (quotedMsg) {
                  await fn.contactBlock(quotedParticipant)
                  reply('done block target')
                } else {
                  if (mentionedJidList.length === 0) return reply('Maaf, format pesan salah.')
                  for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await reply('Gagal, dia pakai cheat')
                    await fn.contactBlock(mentionedJidList[i])
                  }
                  reply('done block target')
                }
              } else if (getPrefix(txt, 'unblock')) {
                if (quotedMsg) {
                  await fn.contactUnblock(quotedParticipant)
                  reply('done unblock target')
                } else {
                  if (mentionedJidList.length === 0) return reply('Maaf, format pesan salah.')
                  for (let i = 0; i < mentionedJidList.length; i++) {
                    await fn.contactUnblock(mentionedJidList[i])
                  }
                  reply('done unblock target')
                }
              }

              //--------------i-tech--------------//
              if (getComs(txt, 'baguet')) {
                if (isGroupMsg) {
                  reply('Hayo nyari apa? Lagi sange ya? ketauan kan lo? Makanya di PM aja 😜')
                } else {
                  const urlss = 'https://api.i-tech.id/anim/baguette?key=' + apikkk
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const ll = pp.result
                  await fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
                }
              } else if (getComs(txt, 'dva')) {
                if (isGroupMsg) {
                  reply('Hayo nyari apa? Lagi sange ya? ketauan kan lo? Makanya di PM aja 😜')
                } else {
                  const urlss = 'https://api.i-tech.id/anim/dva?key=' + apikkk
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const ll = pp.result
                  await fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
                }
              } else if (getComs(txt, 'nsfw')) {
                if (isGroupMsg) {
                  reply('Hayo nyari apa? Lagi sange ya? ketauan kan lo? Makanya di PM aja 😜')
                } else {
                  const urlss = 'https://api.i-tech.id/anim/nsfwneko?key=' + apikkk
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const ll = pp.result
                  await fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
                }
              } else if (getComs(txt, 'yuri')) {
                if (isGroupMsg) {
                  reply('Hayo nyari apa? Lagi sange ya? ketauan kan lo? Makanya di PM aja 😜')
                } else {
                  const urlss = 'https://api.i-tech.id/anim/yuri?key=' + apikkk
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const ll = pp.result
                  await fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
                }
              } else if (getComs(txt, 'trap')) {
                if (isGroupMsg) {
                  reply('Hayo nyari apa? Lagi sange ya? ketauan kan lo? Makanya di PM aja 😜')
                } else {
                  const urlss = 'https://api.i-tech.id/anim/trap?key=' + apikkk
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const ll = pp.result
                  await fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
                }
              } else if (getComs(txt, 'hentai')) {
                if (isGroupMsg) {
                  reply('Hayo nyari apa? Lagi sange ya? ketauan kan lo? Makanya di PM aja ??')
                } else {
                  const urlss = 'https://api.i-tech.id/anim/hentai?key=' + apikkk
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const ll = pp.result
                  await fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
                }
              }
              //--------------i-tech--------------//

              if (getPrefix(txt, 'fetish')) {
                if (isGroupMsg) {
                  reply('Hayo nyari apa? Lagi sange ya? ketauan kan lo? Makanya di PM aja 😜')
                } else {
                  if (args[0] === 'armpits') {
                    armpits()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'feets') {
                    feets()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'thighs') {
                    thighs()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'booty') {
                    booty()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'boobs') {
                    boobs()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'necks') {
                    necks()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'belly') {
                    belly()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'side') {
                    sideboobs()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'ahegao') {
                    ahegao()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  } else if (args[0] === 'BDSM') {
                    BDSM()
                      .then(({
                        subreddit,
                        title,
                        url,
                        author
                      }) => {
                        fn.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag : #${subreddit}\nAuthor : ${author}`, null, null, true)
                      })
                      .catch((err) => console.error(err))
                  }
                }
              }

              if (getPrefix(txt, 'tubenude')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                if (args.length === 0) return
                const query_ = arg
                const urls = `https://api.vhtear.com/xxxsearch?query=` + query_ + `&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result.data
                let dat = "*TubeNude Search*"
                for (var ia = 0; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). title: ` + cok[ia].title + "\n     duration: " + cok[ia].duration + "\n     url: " + cok[ia].url
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getPrefix(txt, 'tubedl')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                const url = args[0]
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/xxxdownload?link=' + url + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result.urlVideo
                for (let i of cok) {
                  if (i['quality'] == '480') {
                    await fn.sendFileFromUrl(toId, i["videoUrl"], BotName + '.mp4', autocommand, id)
                    break
                  }
                }
                limitAdd(serial)
              } else if (getPrefix(txt, 'nekosearch')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                if (args.length === 0) return
                const query_ = arg
                const urls = `https://api.vhtear.com/nekosearch?query=` + query_ + `&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result
                let dat = "*Nekopoi Search*"
                for (var ia = 1; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). title: ` + cok[ia].title + "\n     detail: " + cok[ia].detail
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getComs(txt, 'nekohentai')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                const urls = `https://api.vhtear.com/nekohentai&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result
                let dat = "*Nekopoi Hentai*"
                for (var ia = 1; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). ` + cok[ia].title + cok[ia].url +"\n"+ cok[ia].detail
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getComs(txt, 'neko3d')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                const urls = `https://api.vhtear.com/neko3d&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result
                let dat = "*Nekopoi 3D*"
                for (var ia = 1; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). ` + cok[ia].title +"\n"+ cok[ia].url +"\n"+ cok[ia].description
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getComs(txt, 'nekojavcosplay')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                const urls = `https://api.vhtear.com/nekojavcosplay&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result
                let dat = "*Nekopoi JAV COSPLAY*"
                for (var ia = 1; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). ` + cok[ia].title +"\n    "+ cok[ia].url +"\n    "+ cok[ia].detail
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getComs(txt, 'nekoupdate')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                const urls = `https://api.vhtear.com/nekonewepisode&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result
                let dat = "*Nekopoi UPDATE*"
                for (var ia = 1; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). Title: ` + cok[ia].title +"\n    Url: "+ cok[ia].url +"\n    Date: "+ cok[ia].date
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getComs(txt, 'nekojavupdate')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                const urls = `https://api.vhtear.com/nekojavlist&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result
                let dat = "*Nekopoi JAV*"
                for (var ia = 1; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). Title: ` + cok[ia].title +"\n    Url: "+ cok[ia].url +"\n    Seri: "+ cok[ia].seri
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getComs(txt, 'anoboy')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                const urls = `https://api.vhtear.com/ongoinganoboy&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result
                let dat = "*Anoboy Update*"
                for (var ia = 1; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). Title: ` + cok[ia].title +"\n    Url: "+ cok[ia].url
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getPrefix(txt, 'nhentai-search')) {
                if (isLimit(serial)) return
                limitAdd(serial)
                if (args.length === 0) return
                const query_ = arg
                const urls = `https://api.vhtear.com/nhentaisearch?query=` + query_ + `&apikey=` + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                const cok = json.result.doujins
                let dat = "*Nhentai Search*"
                for (var ia = 1; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). title: ` + cok[ia].title + "\n     id: " + cok[ia].id
                }
                dat += "\n\n"+autocommand
                reply(dat)
                limitAdd(serial) 
              } else if (getPrefix(txt, 'nhentai-download')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                const url = args[0]
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/nhentaipdfdownload?query=' + url + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                await fn.sendFileFromUrl(toId, cok.pdf_file, cok.title + '.pdf', autocommand, id)
                limitAdd(serial)
              } else if (getComs(txt, 'random cersex')) {
                if (isLimit(serial)) return
                const urlss = 'https://api.vhtear.com/cerita_sex&apikey='+Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                reply(pp.result.judul+pp.result.cerita).catch((err) => console.log(err))
                limitAdd(serial)
              }

              if (getPrefix(txt, 'find')) {
                const a = mentionedJidList[0]
                const b = await fn.getCommonGroups(a)
                let list = ''
                for (let c of b) {
                  list += `${c.formattedTitle}\n`
                }
                fn.sendReplyWithMentions(from, `return finding with:\n@${a.replace('@c.us', '')}\n\n${list}`, id)
              }
            }
            if (isSadmin || master || vip || premium) {
              ctype = "premium"
              if (getComs(txt, "checkpremium")) {
                const cekExp = ms(getPremiumExpired(serial, xa) - Date.now())
                await fn.sendReplyWithMentions(toId, `「 *PREMIUM EXPIRE* 」\n\n➸ *ID*: @${serial.replace('@c.us', '')}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
              } else if (getPrefix(txt, 'image')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                const query = arg
                if (query.includes('jilboob') || query.includes('Kontol') || query.includes('Payudara') || query.includes('Pentil') || query.includes('Open BO') || query.includes('VCS') || query.includes('Anal') || query.includes('Ass') || query.includes('Lesbi') || query.includes('NSFW') || query.includes('SEX') || query.includes('Gay') || query.includes('69') || query.includes('Boob') || query.includes('Creampie') || query.includes('Nhentai') || query.includes('Bigtit') || query.includes('JAV') || query.includes('Pussy') || query.includes('Bokep') || query.includes('Tetek') || query.includes('Memek') || query.includes('Meki') || query.includes('Bugil') || query.includes('Bokong') || query.includes('Hentai') || query.includes('Toge') || query.includes('Toket') || query.includes('Colmek') || query.includes('Sange')) return reply('gaboleh nyari yang beginian cil, nanti dimarahin emak!')
                if (query.includes('Jilboob') || query.includes('kontol') || query.includes('payudara') || query.includes('pentil') || query.includes('open bo') || query.includes('vcs') || query.includes('anal') || query.includes('ass') || query.includes('lesbi') || query.includes('nsfw') || query.includes('sex') || query.includes('gay') || query.includes('69') || query.includes('boob') || query.includes('creampie') || query.includes('nhentai') || query.includes('bigtit') || query.includes('jav') || query.includes('pussy') || query.includes('bokep') || query.includes('tetek') || query.includes('memek') || query.includes('meki') || query.includes('bugil') || query.includes('bokong') || query.includes('hentai') || query.includes('toge') || query.includes('toket') || query.includes('colmek') || query.includes('sange')) return reply('gaboleh nyari yang beginian cil, nanti dimarahin emak!')
                const urlss = 'https://api.vhtear.com/googleimg?query=' + query + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = shuffle(pp.result.result_search)
                for (var ia = 1; ia < cok.length; ia++) {
                  await fn.sendFileFromUrl(toId, `${cok[ia]}`, 'google.jpg', autocommand)
                  if (ia === 3) break;
                }
                limitAdd(serial)
              } else if (getPrefix(txt, 'joox')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                const query = arg
                try {
                  const urlss = 'https://api.vhtear.com/music?query=' + query + '&apikey=' + Premapikey
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const cok = pp.result
                  let dat = "*JOOX MUSIC*\n"
                  for (var iu = 0; iu < cok.length; iu++) {
                    dat += "\n*_Title_*: " + cok[iu].judul
                    dat += "\n*_Artis_*: " + cok[iu].penyanyi
                    dat += "\n*_Duration_*: " + cok[iu].duration
                    dat += "\n*_Size_*: " + cok[iu].filesize
                    dat += "\n\n*Follow: instagram.com/wa.bot untuk update info bot dan reset limit*"
                    await fn.sendFileFromUrl(toId, `${cok[iu].linkImg}`, 'joox.jpg', dat, id)
                    await fn.sendFileFromUrl(toId, `${cok[iu].linkMp3}`, `${t}` + '.mp3', id)
                  }
                  limitAdd(serial)
                } catch (err) {
                  return console.log(err.message)
                }
              } else if (getPrefix(txt, 'ytplay')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                const query = args[0]
                const apikey = 'fn'
                const urlss = 'https://rest.farzain.com/api/yt_download.php?id=' + query + '&apikey=' + apikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const ll = pp.urls
                for (let i of ll) {
                  if (i['ext'] == 'm4a') {
                    await fn.sendFileFromUrl(toId, i["id"], pp.title + '.m4a', id)
                    break
                  }
                }
                limitAdd(serial)
              } else if (getPrefix(txt, 'video')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                let a = args[0]
                if (args[0].includes('http://www.youtube.com/watch?v=')) {
                  a = args[0].replace('http://www.youtube.com/watch?v=', 'https://youtu.be/')
                } else if (args[0].includes('http://youtube.com/watch?v=')) {
                  a = args[0].replace('http://www.youtube.com/watch?v=', 'https://youtu.be/')
                } else if (args[0].includes('https://www.youtube.com/watch?v=')) {
                  a = args[0].replace('https://www.youtube.com/watch?v=', 'https://youtu.be/')
                } else if (args[0].includes('https://youtube.com/watch?v=')) {
                  a = args[0].replace('https://www.youtube.com/watch?v=', 'https://youtu.be/')
                }
                const urlss = 'https://api.vhtear.com/ytdl?link=' + a + '&apikey=' + Premapikey
                try {
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const ll = pp.result.UrlVideo
                  try {
                    await fn.sendFileFromUrl(toId, ll, pp.result.title + '.mp4', autocommand, id)
                    limitAdd(serial)
                  } catch (err) {
                    reply('maaf link tersebut tidak bisa didownload')
                  }
                } catch (err) {
                  reply('error!')
                }
                
              }
              if (getPrefix(txt, 'spotify')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                reply('sedang mencari lagu. tunggu sebentar....')
                if (args.length >= 10) return
                const lagu = arg;
                const r = await yts(lagu)
                const videos = r.videos.slice(0, 1)
                videos.forEach(function (v) {
                  const idasa = `${ v.videoId }`
                  const link = `${ v.url }`
                  const title = `${ v.title }`
                  const seconds = `${ v.seconds }`
                  if (seconds < 3000) {
                    var YD = new YoutubeMp3Downloader({
                      "ffmpegPath": "/usr/bin/ffmpeg",
                      "outputPath": "./media",
                      "youtubeVideoQuality": "highestaudio",
                      "queueParallelism": 100,
                      "progressTimeout": 2000,
                      "allowWebm": false,
                      "outputOptions": ["-af", "silenceremove=1:0:-50dB"]
                    });
                    YD.download(idasa)
                    YD.on("finished", async function (err, data) {
                      await fs.copyFile(data.file, './media/k2.mp3').then(() => {
                        fn.sendFile(toId, './media/k2.mp3', `${data.file}.mp3`, autocommand, id).catch((err) => console.log(err))
                        limitAdd(serial)
                      })
                    })
                    YD.on("error", function (error) {
                      console.log('ERROR YTMP3', error);
                    })
                  } else {
                    reply('Maaf, Judul lagu tidak ditemukan atau Durasi terlalu panjang')
                  }
                })
              } else if (getPrefix(txt, 'music')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                reply('sedang mencari lagu. tunggu sebentar....')
                if (args.length >= 10) return
                const lagu = arg;
                const r = await yts(lagu)
                const videos = r.videos.slice(0, 1)
                videos.forEach(function (v) {
                  const idasa = `${ v.videoId }`
                  const link = `${ v.url }`
                  const title = `${ v.title }`
                  const seconds = `${ v.seconds }`
                  if (seconds < 3000) {
                    var YD = new YoutubeMp3Downloader({
                      "ffmpegPath": "/usr/bin/ffmpeg",
                      "outputPath": "./media",
                      "youtubeVideoQuality": "highestaudio",
                      "queueParallelism": 100,
                      "progressTimeout": 2000,
                      "allowWebm": false,
                      "outputOptions": ["-af", "silenceremove=1:0:-50dB"]
                    });
                    YD.download(idasa)
                    YD.on("finished", async function (err, data) {
                      await fs.copyFile(data.file, './media/k3.mp3').then(() => {
                        fn.sendFileFromUrl(toId, `${data.thumbnail}`, 'joox.jpg', `*Title: ${data.title}*\n*ID: ${data.videoId}*\n*URL: ${data.youtubeUrl}*\n\n\n` + autocommand, id).catch((err) => console.log(err))
                        fn.sendFile(toId, './media/k3.mp3', `${data.file}.mp3`, autocommand, id).catch((err) => console.log(err))
                        limitAdd(serial)
                      })
                    })
                    YD.on("error", function (error) {
                      console.log('ERROR YTMP3', error);
                    })
                  } else {
                    reply('Maaf, Judul lagu tidak ditemukan atau Durasi terlalu panjang')
                  }
                })
              }
              if (getPrefix(txt, 'audio') || getPrefix(txt, 'ytmp3')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                if (args.length >= 1) {
                  let url = args[0]
                  var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                  if (!videoid) {
                    return reply("Maaf, url yang anda berikan tidak valid");
                  }
                  reply('sedang memproses url')
                  fs.access('./media/' + videoid[1] + '.mp3', (err) => {
                    if (!err) {
                      fn.sendFile(toId, './media/' + videoid[1] + '.mp3', `${videoid[1]}.mp3`, id)
                      limitAdd(serial);
                    } else {
                      async function ytmp3() {
                        ytdl.getInfo(videoid[1]).then(info => {
                          if (info.videoDetails.lengthSeconds > 1000) {
                            reply("Videonya terlalu panjang gan, coba yang lain :v")
                          } else {
                            let stream = ytdl(videoid[1], {
                              quality: 'highestaudio',
                              requestOptions: {
                                headers: {
                                  cookie: ytCookie,
                                  'x-youtube-identity-token': ytIdentity
                                }
                              }
                            })
                            stream.on('error', () => {
                              reply('Video tidak valid/sedang error')
                            })
                            ffmpeg(stream)
                              .audioCodec('libmp3lame')
                              .addOutputOptions('-qscale:a 5')
                              .save(`./media/${videoid[1]}.mp3`)
                              .on('end', () => {
                                reply(`*YTDownloader*\n\n➤ Judul : ${info.videoDetails.title}\n➤ Durasi : ${moments.duration(info.videoDetails.lengthSeconds, 'second').format('hh:mm:ss')}`)
                                fn.sendFile(toId, './media/' + videoid[1] + '.mp3', `${videoid[1]}.mp3`, 'Sukses!', id)
                              });
                            limitAdd(serial);
                          }
                        }).catch(() => {
                          reply('Video tidak valid/sedang error')
                        })
                      }
                      ytmp3();
                    }
                  })
                }
              } else if (getPrefix(txt, 'ytmp4') || getPrefix(txt, 'ytvideo')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                var videoid = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (videoid != null) {} else {
                  return reply("Videonya gavalid gan.");
                }
                fs.access('./media/' + videoid[1] + '.mp4', (err) => {
                  if (!err) {
                    reply('sedang memproses url')
                    fn.sendFile(toId, `./media/${videoid[1]}.mp4`, 'hasil.mp4', autocommand, id);
                    limitAdd(serial)
                  } else {
                    ytdl.getInfo(videoid[0]).then(async info => {
                      if (info.videoDetails.lengthSeconds > 1000) {
                        const aaa = await shortener(info.formats[0].url)
                        reply("terlalu panjang.. kamu bisa download manual dengan klik link dibawah ini\n\n" + aaa)
                      } else {
                        const asu = ytdl(videoid[0], {
                          quality: '18',
                          requestOptions: {
                            headers: {
                              cookie: ytCookie,
                              'x-youtube-identity-token': ytIdentity
                            }
                          }
                        })
                        asu.on('error', () => {
                          reply('link tidak ada/tidak valid!')
                        })
                        ffmpeg(asu)
                          .addOutputOptions('-vcodec', 'h264', '-acodec', 'aac')
                          .save(`./media/${videoid[1]}.mp4`)
                          .on('end', () => {
                            fn.sendFile(toId, `./video/${videoid[1]}.mp4`, 'hasil.mp4', `*YTDownloader*\n\n➤ Judul : ${info.videoDetails.title}\n➤ Durasi : ${moments.duration(info.videoDetails.lengthSeconds, 'second').format('hh:mm:ss')}\n\n` + autocommand, id);
                            limitAdd(serial)
                          })
                      }
                    }).catch(() => {
                      reply('link tidak ada/tidak valid!')
                    })
                  }
                })
              } else if (getPrefix(txt, 'ytsearch')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                reply('sedang mencari lagu. tunggu sebentar....')
                if (args.length >= 10) return
                const lagu = arg;
                const r = await yts(lagu)
                const cok = r.videos.slice(0, 10)
                let dat = "*Youtube Search*"
                for (var a = 1; a < cok.length; a++) {
                  if (a === 6) break;
                  let no = a
                  let mam = cok[a].title.substring(0, 20)
                  dat += `\n\n*${a}*).` + " " + mam + "\n     ID: " + cok[a].videoId + "\n     URL: " + cok[a].url + "\n     Durasi: " + cok[a].timestamp + "\n     Desc: " + cok[a].description
                }
                dat += "\n\n*to download audio*: " + settings.sname + "ytplay < ID >"
                dat += "\n*to download video*: " + settings.sname + "ytvideo < URL >"
                reply(dat)
                limitAdd(serial)
              } else if (getPrefix(txt, 'play')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                reply('sedang mencari lagu. tunggu sebentar....')
                if (args.length >= 10) return
                const lagu = arg;
                const r = await yts(lagu)
                const cok = r.videos.slice(0, 10)
                let dat = "*Youtube Search*"
                for (var a = 1; a < cok.length; a++) {
                  if (a === 6) break;
                  let no = a
                  let mam = cok[a].title.substring(0, 20)
                  dat += `\n\n*${a}*).` + " " + mam + "\n     ID: " + cok[a].videoId + "\n     URL: " + cok[a].url + "\n     Durasi: " + cok[a].timestamp + "\n     Desc: " + cok[a].description
                }
                dat += "\n\n*to download audio*: " + settings.sname + "ytplay < ID >"
                dat += "\n*to download video*: " + settings.sname + "ytvideo < URL >"
                reply(dat)
                limitAdd(serial)
              } else if (getPrefix(txt, 'twtdl') || getPrefix(txt, 'twitdl') || getPrefix(txt, 'twitterdl')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                const url = args[0]
                await reply('*Scraping Metadata...*')
                twitter(url).then(async(videoMeta) => {
                  try {
                    if (videoMeta.type == 'video') {
                      const content = videoMeta.variants.filter(x => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                      await fn.sendFileFromUrl(toId, content[0].url, 'TwitterVideo.mp4', autocommand).catch((err) => console.log(err))
                    } else if (videoMeta.type == 'photo') {
                      for (let i = 0; i < videoMeta.variants.length; i++) {
                        await fn.sendFileFromUrl(toId, videoMeta.variants[i], videoMeta.variants[i].split('/media/')[1], autocommand, id).catch((err) => console.log(err))
                        limitAdd(serial)
                      }
                    }
                  } catch (err) {
                    return reply('Error, ' + err)
                  }
                }).catch(() => {
                  return reply('Maaf, link tidak valid atau tidak ada video di link yang kamu kirim')
                })
              } else if (getPrefix(txt, 'tiktokdl')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                const url = args[0]
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/tiktokdl?link=' + url + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                await fn.sendFileFromUrl(toId, `${cok.video}`, BotName + '.mp4', autocommand)
                limitAdd(serial)
              } else if (getPrefix(txt, 'facebook')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                const url = args[0]
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/fbdl?link=' + url + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                await fn.sendFileFromUrl(toId, `${cok.VideoUrl}`, BotName + '.mp4', autocommand)
                limitAdd(serial)
              } else if (getPrefix(txt, 'magernulis')) {
                if (isLimit(serial)) return
                const text = quotedMsg ? quotedMsgObj.body.replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n') : body.slice(12).replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n')
                let lineBreaks = matchGroup.matchAll(text, /\n/gi)
                try {
                  const {
                    spawn
                  } = require('child_process')
                  const nulis = async(word, id) => {
                    const text = wrap1(word, {
                      width: 60
                    })
                    spawn('convert', [
                        './image/template.jpg',
                        '-font',
                        './fonts/IndieFlower-Regular.ttf',
                        '-size',
                        '700x960',
                        '-pointsize',
                        '25',
                        '-interline-spacing',
                        '1',
                        '-annotate',
                        '+170+220',
                        text,
                        `./image/${id}.jpg`
                      ])
                      .on('close', function () {
                        fn.sendImage(from, `./image/${id}.jpg`, 'nulis.jpg', autocommand, id)
                        fs.unlink(`./image/${id}.jpg`).then(() => {})
                      })
                  }
                  if (lineBreaks.length >= 19) {
                    if (lineBreaks.length <= 19) {
                      await nulis(text, id)
                      limitAdd(serial)
                    } else if (lineBreaks.length <= 38) {
                      let udud12 = text.substring(0, lineBreaks[19].index)
                      await nulis(udud12, id + '-1')
                      let udud23 = text.substring(lineBreaks[19].index, lineBreaks[lineBreaks.length - 1].index)
                      await nulis(udud23, id + '-2')
                      limitAdd(serial)
                    } else {
                      return reply('Maaf, jumlah garis baru melebihi 2 lembar')
                    }
                  } else if (text.length > 1055) {
                    if (text.length <= 1055) {
                      await nulis(text, id)
                      limitAdd(serial)
                    } else if (text.length <= 2110) {
                      let udud12 = text.substring(0, 1055)
                      await nulis(udud12, id + '-1')
                      let udud23 = text.substring(1056, 2110)
                      await nulis(udud23, id + '-2')
                      limitAdd(serial)
                    } else {
                      return reply('Maaf, jumlah kata melebihi 2 lembar')
                    }
                  } else {
                    await nulis(text, id)
                    limitAdd(serial)
                  }
                } catch (error) {
                  console.log(error)
                }
              } else if (getPrefix(txt, 'igprofile') || getPrefix(txt, 'igstalk')) {
                if (isLimit(serial)) return
                if (!args.length >= 1) return
                let usrname = args[0]
                if (!usrname) return
                if (usrname.substr(0, 1) == '@') {
                  usrname = usrname.replace('@', '');
                }
                const urlss = 'https://api.vhtear.com/igprofile?query='+usrname+'&apikey='+Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                let x = "Nama Lengkap: "+cok.full_name
                x += "\nFollowing: "+cok.follow
                x += "\nFollowers: "+cok.follower
                x += "\nPrivate: "+cok.is_private
                x += "\nJumlah Post: "+cok.post_count
                x += "\nusername: "+cok.username
                x += "\nBiografi: "+cok.biography
                reply(x)
                limitAdd(serial)
              } else if (getPrefix(txt, 'igstory')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                if (args.length >= 3) return
                const query = arg
                const barang = query.split(" ")
                const hasil = barang[0]
                const value = Number(barang[1])
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/igstory?query=' + hasil + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result.story.itemlist
                if (barang.length == 1) {
                  let dat = "*Instagram Story*"
                  for (var ia = 0; ia < cok.length; ia++) {
                    let no = ia
                    const urlssa = await shortener(cok[ia].urlDownload)
                    dat += `\n\n*${ia}*). Type: ` + cok[ia].type + "\n     URL: " + urlssa
                  }
                  dat += "\n\n*to download story*: " + settings.sname + "igstory " + hasil + " *nomor*"
                  reply(dat)
                  limitAdd(serial)
                } else if (barang.length == 2) {
                  if (cok[value].type === 'video') {
                    await fn.sendFileFromUrl(toId, `${cok[value].urlDownload}`, 'google.mp4', autocommand)
                    limitAdd(serial)
                  }
                  if (cok[value].type === 'image') {
                    await fn.sendFileFromUrl(toId, `${cok[value].urlDownload}`, 'google.jpg', autocommand)
                    limitAdd(serial)
                  }
                }
              } else if (getPrefix(txt, 'igpost')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                if (args.length > 2) return
                const url = args[0]
                if (!url.includes('instagram.com')) return reply('Maaf, link yang kamu kirim tidak valid.')
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/instadl?link=' + url + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result.post
                const coks = pp.result.caption
                for (var ia = 0; ia < cok.length; ia++) {
                  if (cok[ia].type === 'video') {
                    await fn.sendFileFromUrl(toId, `${cok[ia].urlDownload}`, 'google.mp4', `Deskripsi: ` + coks + `\n\n` + autocommand)
                  }
                  if (cok[ia].type === 'image') {
                    await fn.sendFileFromUrl(toId, `${cok[ia].urlDownload}`, 'google.jpg', `Deskripsi: ` + coks + `\n\n` + autocommand)
                  }
                }
                limitAdd(serial)
              } else if (getPrefix(txt, 'igtv')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                if (args.length > 2) return
                const url = args.length !== 0 ? args[0] : ''
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/igtv?query=' + url + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result.igTv
                for (var ia = 0; ia < cok.length; ia++) {
                  await fn.sendFileFromUrl(toId, `${cok[ia].urlVideo}`, 'google.mp4', `Deskripsi: ` + cok[ia].caption)
                }
                limitAdd(serial)
              } else if (getPrefix(txt, 'ighastag')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                if (args.length >= 3) return
                const query = arg
                const barang = query.split(" ")
                const hasil = barang[0]
                const value = Number(barang[1])
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/ighastag?query=' + hasil + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result.data
                if (barang.length == 1) {
                  let dat = "*Instagram Hastag*"
                  for (var ia = 0; ia < cok.length; ia++) {
                    let no = ia
                    dat += `\n\n*${ia}*). username: ` + cok[ia].owner_username + "\n     desc: " + cok[ia].caption
                  }
                  dat += "\n\n*to download hastag*: " + settings.sname + "ighastag " + hasil + " *nomor*"
                  reply(dat)
                  limitAdd(serial)
                } else if (barang.length == 2) {
                  const kk = cok[value].post
                  for (var ia = 0; ia < kk.length; ia++) {
                    if (kk[ia].type === 'video') {
                      await fn.sendFileFromUrl(toId, `${kk[ia].urlDownload}`, 'google.mp4', cok[value].caption + `\n\n` + autocommand)
                    }
                    if (kk[ia].type === 'image') {
                      await fn.sendFileFromUrl(toId, `${kk[ia].urlDownload}`, 'google.jpg', cok[value].caption + `\n\n` + autocommand)
                    }
                  }
                  limitAdd(serial)
                }
              } else if (getPrefix(txt, 'ighighlight')) {
                if (isLimit(serial)) return
                if (args.length === 0) return
                if (args.length >= 3) return
                var itel = []
                var amer = []
                const query = arg
                const barang = query.split(" ")
                const hasil = barang[0]
                const value = Number(barang[1]) - 1
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/ighighlight?query=' + hasil + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result.highlight
                let no = 0
                let dat = "*Instagram Highlight*\n"
                for (var prop in cok) {
                  itel.push(cok[prop]);
                  amer.push(prop);
                  no += 1
                  dat += `\n*${no}*.` + " " + prop + " " + cok[prop].itemcount + "-item"
                }
                if (barang.length == 1) {
                  dat += "\n\n*to download highlight*: " + settings.sname + "ighighlight " + hasil + " *nomor*"
                  reply(dat)
                  limitAdd(serial)
                }
                if (barang.length == 2) {
                  let dat = "*Detail Highlight:" + amer[value] + "*"
                  dat += "\n*Username*: " + itel[value].owner_username
                  dat += "\n\n*" + BotName + "*"
                  reply(dat)
                  const mek = itel[value].item.itemlist
                  for (var ia = 0; ia < itel[value].item.itemlist.length; ia++) {
                    if (mek[ia].type === 'video') {
                      await fn.sendFileFromUrl(toId, `${mek[ia].urlDownload}`, 'google.mp4', autocommand)
                    }
                    if (mek[ia].type === 'image') {
                      await fn.sendFileFromUrl(toId, `${mek[ia].urlDownload}`, 'google.jpg', autocommand)
                    }
                  }
                  limitAdd(serial)
                }
              } else if (getPrefix(txt, "addcontact")) {
                if (isLimit(serial)) return
                if (quotedMsg && quotedMsgObj.type == 'chat') {
                  const x = arg
                  x3.contact[x] = quotedParticipant.replace('@c.us', '')
                  dumpContact()
                  reply("contact list added.")
                  limitAdd(serial)
                } else {
                  const kata1 = arg.replace(' |', '|').split('|')[0]
                  const kata2 = arg.replace('| ', '|').split('|')[1]
                  x3.contact[kata1] = kata2
                  dumpContact()
                  reply("contact list added.")
                  limitAdd(serial)
                }
              } else if (getPrefix(txt, "delcontact")) {
                if (isLimit(serial)) return
                let alt = arg
                if (x3.contact.hasOwnProperty(alt)) {
                  delete x3.contact[alt]
                  dumpContact()
                  reply("contact list deleted.")
                  limitAdd(serial)
                } else {
                  reply("tidak ada didalam database bot.")
                }
              } else if (getPrefix(txt, "addchat")) {
                if (isLimit(serial)) return
                if (quotedMsg && quotedMsgObj.type == 'chat') {
                  const x = arg
                  if (quotedMsgObj.body.includes('chat.whatsapp.com') || quotedMsgObj.body.includes('instagram.com')) return reply('jangan malah buat iklan kak! mau diblok?')
                  x5.chat[x] = quotedMsgObj.body
                  dumpChat()
                  reply("chat list added.")
                  limitAdd(serial)
                } else {
                  const kata1 = arg.replace(' |', '|').split('|')[0]
                  const kata2 = arg.replace('| ', '|').split('|')[1]
                  if (kata2.includes('chat.whatsapp.com') || kata2.includes('instagram.com')) return reply('jangan malah buat iklan kak! mau diblok?')
                  x5.chat[kata1] = kata2
                  dumpChat()
                  reply("chat list added.")
                  limitAdd(serial)
                }
              } else if (getPrefix(txt, "delchat")) {
                let alt = arg
                if (x5.chat.hasOwnProperty(alt)) {
                  delete x5.chat[alt]
                  dumpChat()
                  reply("chat list deleted.")
                  limitAdd(serial)
                } else {
                  reply("tidak ada didalam database bot.")
                }
              } else if (getPrefix(txt, 'addimage')) {
                if (isLimit(serial)) return
                if (!quotedMsg) reply('Maaf, perintah harus mereply target!')
                const add = arg
                if (add.includes('chat.whatsapp.com') || add.includes('instagram.com')) return reply('jangan malah buat iklan kak! mau diblok?')
                const filename = `./database/${add}.${mime.extension(quotedMsgObj.mimetype)}`;
                const mediaData = await decryptMedia(quotedMsg);
                await fs.writeFile(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                })
                x1.image[add] = filename
                dumpImage()
                reply("image added.")
                limitAdd(serial)
              } else if (getPrefix(txt, "delimage")) {
                if (isLimit(serial)) return
                let alt = arg
                if (x1.image.hasOwnProperty(alt)) {
                  delete x1.image[alt]
                  dumpImage()
                  reply("image deleted.")
                  limitAdd(serial)
                } else {
                  reply("tidak ada didalam database bot.")
                }
              } else if (getComs(txt, "mute") && isMuted(chatId) == true) {
                x8.muted.push(chatId)
                dumpMute()
                reply('```Bot telah di mute pada chat ini!```')
              } else if (getComs(txt, "unmute") && isMuted(chatId) == false) {
                let index = x8.muted.indexOf(chatId);
                x8.muted.splice(index, 1)
                dumpMute()
                reply(`Bot telah di unmute!`)
              } else if (getComs(txt, 'only admin on') || getComs(txt, 'tutup') || getComs(txt, 'close')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                await fn.setGroupToAdminsOnly(toId, true)
              } else if (getComs(txt, 'only admin off') || getComs(txt, 'buka') || getComs(txt, 'open')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                await fn.setGroupToAdminsOnly(toId, false)
              } else if (getComs(txt, 'edit group on') || getComs(txt, 'lock')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                await fn.setGroupEditToAdminsOnly(toId, true)
              } else if (getComs(txt, 'edit group off') || getComs(txt, 'unlock')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                await fn.setGroupEditToAdminsOnly(toId, false)
              } else if (getPrefix(txt, 'asupan')) {
                if (isLimit(serial)) return
                const orang = arg
                if (args.length === 0) {
                  const query = ['hotgirlsummer', 'hotgirlasian', 'tiktokhot', 'tiktokhotgirls', 'cewekcantikindo', 'notnot8', 'btralice', 'girlsday']
                  await reply('*Scraping Metadata...*')
                  const urlss = 'https://api.vhtear.com/ighastag?query=' + randomChoice(query) + '&apikey=' + Premapikey
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const cok = shuffle(pp.result.data)
                  for (var i = 0; i < cok.length; i++) {
                    for (let a of cok[i].post) {
                      if (a.type === 'video') {
                        await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                      }
                      if (a.type === 'image') {
                        await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                      }
                    }
                    if (i === 0) break;
                  }
                  limitAdd(serial)
                } else if (args.length === 1) {
                  await reply('*Scraping Metadata...*')
                  const urlss = 'https://api.vhtear.com/ighastag?query=' + orang + '&apikey=' + Premapikey
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const cok = shuffle(pp.result.data)
                  for (var i = 0; i < cok.length; i++) {
                    for (let a of cok[i].post) {
                      if (a.type === 'video') {
                        await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                      }
                      if (a.type === 'image') {
                        await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                      }
                    }
                    if (i === 0) break;
                  }
                  limitAdd(serial)
                }
              } else if (getComs(txt, 'mood booster')) {
                if (isLimit(serial)) return
                const query = ['exo', 'bts', 'btsjimin', 'btsjungkook', 'btstaehyung', 'btsnamjoon', 'sehun']
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/ighastag?query=' + randomChoice(query) + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = shuffle(pp.result.data)
                for (var i = 0; i < cok.length; i++) {
                  for (let a of cok[i].post) {
                    if (a.type === 'video') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                    }
                    if (a.type === 'image') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                    }
                  }
                  if (i === 0) break;
                }
                limitAdd(serial)
              } else if (getComs(txt, 'food')) {
                if (isLimit(serial)) return
                const query = ['makanan', 'videomakanan', 'makananenak', 'mukbang', 'mukbangasmr', 'mukbangvideo']
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/ighastag?query=' + randomChoice(query) + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = shuffle(pp.result.data)
                for (var i = 0; i < cok.length; i++) {
                  for (let a of cok[i].post) {
                    if (a.type === 'video') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                    }
                    if (a.type === 'image') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                    }
                  }
                  if (i === 0) break;
                }
                limitAdd(serial)
              } else if (getComs(txt, 'galau')) {
                if (isLimit(serial)) return
                const query = ['storygalau', 'quotesgalau', 'galaustory', 'statusgalau', 'katagalau', 'musikgalau']
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/ighastag?query=' + randomChoice(query) + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = shuffle(pp.result.data)
                for (var i = 0; i < cok.length; i++) {
                  for (let a of cok[i].post) {
                    if (a.type === 'video') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                    }
                    if (a.type === 'image') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                    }
                  }
                  if (i === 0) break;
                }
                limitAdd(serial)
              } else if (getPrefix(txt, 'ptl')) {
                if (isLimit(serial)) return
                const orang = arg
                if (args.length === 0) {
                  const query = ['hotgirlsummer', 'hotgirlasian', 'tiktokhot', 'tiktokhotgirls', 'cewekcantikindo', 'notnot8', 'btralice', 'girlsday']
                  await reply('*Scraping Metadata...*')
                  const urlss = 'https://api.vhtear.com/ighastag?query=' + randomChoice(query) + '&apikey=' + Premapikey
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const cok = shuffle(pp.result.data)
                  for (var i = 0; i < cok.length; i++) {
                    for (let a of cok[i].post) {
                      if (a.type === 'video') {
                        await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                      }
                      if (a.type === 'image') {
                        await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                      }
                    }
                    if (i === 0) break;
                  }
                  limitAdd(serial)
                } else if (args.length === 1) {
                  await reply('*Scraping Metadata...*')
                  const urlss = 'https://api.vhtear.com/ighastag?query=' + orang + '&apikey=' + Premapikey
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const cok = shuffle(pp.result.data)
                  for (var i = 0; i < cok.length; i++) {
                    for (let a of cok[i].post) {
                      if (a.type === 'video') {
                        await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                      }
                      if (a.type === 'image') {
                        await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                      }
                    }
                    if (i === 0) break;
                  }
                  limitAdd(serial)
                }
              } else if (getPrefix(aa, 'svideo')) {
                if (isLimit(serial)) return
                const query = arg
                const urlss = 'https://api.vhtear.com/youtube?query=' + query + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                for (var a = 0; a < cok.length; a++) {
                  const ssss = 'https://api.vhtear.com/ytdl?link=' + cok[a].urlyt + '&apikey=' + Premapikey
                  const response = await fetch(ssss)
                  const pl = await response.json()
                  const ll = pl.result.UrlVideo
                  const urx = await shortener(ll)
                  await fn.sendFileFromUrl(from, urx, pl.result.title + '.mp4', autocommand, id)
                  limitAdd(serial)
                  if (a === 0) break;
                }
              }
              /*
              if (getPrefix(aa, 'music') || getPrefix(aa, 'spotify')) {
                  if (isLimit(serial)) return
                  const query = arg
                  const urlss = 'https://api.vhtear.com/youtube?query=' + query + '&apikey=' + Premapikey
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const cok = pp.result
                  for (var a = 0; a < cok.length; a++) {
                      const ssss = 'https://api.vhtear.com/ytdl?link=' + cok[a].urlyt + '&apikey=' + Premapikey
                      const response = await fetch(ssss)
                      const pl = await response.json()
                      const ll = pl.result.UrlMp3
                      const urx = await shortener(ll)
                      await fn.sendFileFromUrl(from, urx, pl.result.title+'.mp3', autocommand, id)
                      limitAdd(serial)
                      if (a === 0) break;
                  }
              }
              */
              if (getPrefix(txt, 'welcome')) {
                if (isGroupMsg) {
                  if (args.length === 2) return reply('hanya tersedia /welcome on atau /welcome off')
                  if (args[0].toLowerCase() === 'on') {
                    if (!x9.welcome.includes(toId)) {
                      reply('sedang megaktifkan mode welcome, tunggu 1 menit')
                      x9.welcome.push(toId)
                      dumpWelcome()
                      await sleep(1000)
                      var xsa = new os_spawn();
                      xsa.execCommand(pukimak).then(res => {}).catch(err => {
                        console.log(err);
                      })
                    } else {
                      reply('Sudah aktif')
                    }
                  } else if (args[0].toLowerCase() === 'off') {
                    if (x9.welcome.includes(toId)) {
                      await reply('sedang mematikan mode welcome, tunggu 1 menit')
                      let index = x9.welcome.indexOf(toId);
                      x9.welcome.splice(index, 1)
                      await dumpWelcome()
                      await sleep(1000)
                      var xsa = new os_spawn();
                      xsa.execCommand(pukimak).then(res => {}).catch(err => {
                        console.log(err);
                      })
                    } else {
                      reply('Tidak aktif')
                    }
                  } else {
                    reply('pilih /welcome on untuk mengaktifkan atau /welcome off menonaktifkan')
                  }
                } else {
                  reply('hanya bisa digunakan didalam grup')

                }
              }
              if (getPrefix(txt, "messagewelcome")) {
                if (isGroupMsg) {
                  if (quotedMsg && quotedMsgObj.type == 'chat') {
                    xh.welcomemessage[toId] = quotedMsgObj.body
                    dumpMessageWelcom()
                    reply("message welcome updated.")
                    limitAdd(serial)
                  } else {
                    const kata = arg
                    xh.welcomemessage[toId] = kata
                    dumpMessageWelcom()
                    reply("message welcome updated.")
                    limitAdd(serial)
                  }
                } else {
                  return reply('hanya bisa digunakan didalam grup!')
                }
              } 
              if (getPrefix(txt, 'filter')) {
                if (isGroupMsg) {
                  if (args.length === 2) return reply('hanya tersedia /filter on atau /filter off')
                  if (args[0].toLowerCase() === 'on') {
                    if (!xd.filter.includes(toId)) {
                      reply('sedang megaktifkan mode filter, tunggu 1 menit')
                      xd.filter.push(toId)
                      dumpFilter()
                      await sleep(1000)
                      var xsa = new os_spawn();
                      xsa.execCommand(pukimak).then(res => {}).catch(err => {
                        console.log("os >>>", err);
                      })
                    } else {
                      reply('Sudah aktif')
                    }
                  } else if (args[0].toLowerCase() === 'off') {
                    if (xd.filter.includes(toId)) {
                      await reply('sedang mematikan mode filter, tunggu 1 menit')
                      let index = xd.filter.indexOf(toId);
                      xd.filter.splice(index, 1)
                      await dumpFilter()
                      await sleep(1000)
                      var xsa = new os_spawn();
                      xsa.execCommand(pukimak).then(res => {}).catch(err => {
                        console.log("os >>>", err);
                      })
                    } else {
                      reply('Tidak aktif')
                    }
                  } else {
                    reply('pilih /filter on untuk mengaktifkan atau /filter off menonaktifkan')
                  }
                } else {
                  reply('hanya bisa digunakan didalam grup')

                }
              }
              if (getPrefix(txt, 'simi')) {
                if (isGroupMsg) {
                  if (args.length === 2) return reply('hanya tersedia /simi on atau /simi off')
                  if (args[0].toLowerCase() === 'on') {
                    if (!xe.simi.includes(toId)) {
                      reply('sedang megaktifkan mode simi, tunggu 1 menit')
                      xe.simi.push(toId)
                      dumpSimi()
                      await sleep(1000)
                      var xsa = new os_spawn();
                      xsa.execCommand(pukimak).then(res => {}).catch(err => {
                        console.log("os >>>", err);
                      })
                    } else {
                      reply('Sudah aktif')
                    }
                  } else if (args[0].toLowerCase() === 'off') {
                    if (xe.simi.includes(toId)) {
                      await reply('sedang mematikan mode simi, tunggu 1 menit')
                      let index = xe.simi.indexOf(toId);
                      xe.simi.splice(index, 1)
                      await dumpSimi()
                      await sleep(1000)
                      var xsa = new os_spawn();
                      xsa.execCommand(pukimak).then(res => {}).catch(err => {
                        console.log("os >>>", err);
                      })
                    } else {
                      reply('Tidak aktif')
                    }
                  } else {
                    reply('pilih /simi on untuk mengaktifkan atau /simi off menonaktifkan')
                  }
                } else {
                  reply('hanya bisa digunakan didalam grup')

                }
              }
	            if (getPrefix(txt, 'readmore')) {
	              let [ l, r ] = args.join` `.split`|`
	              if (!l) l = ''
	              if (!r) r = ''
	              const more = String.fromCharCode(8206)
	              const readMore = more.repeat(4001)
	              reply(l+readMore+r)
	            }
            }
            if (isSadmin || master || vip || premium || isGroupAdmins) {
              ctype = "manage"
              if (getPrefix(txt, 'kick')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                if (quotedMsg) {
                  await fn.removeParticipant(groupId, quotedParticipant)
                  reply('done kick target')
                } else {
                  if (mentionedJidList.length === 0) return reply('Maaf, format pesan salah.')
                  for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await reply('Gagal, dia pake cheat')
                    if (InitUser.master.includes(mentionedJidList[i])) return await reply('Gagal, dia pake cheat')
                    await fn.removeParticipant(groupId, mentionedJidList[i])
                  }
                  reply('done kick target')
                }
              } else if (getPrefix(txt, "ban")) {
                if (quotedMsg) {
                  if (x8.mutelist.includes(quotedParticipant) == false) {
                    x8.mutelist.push(quotedParticipant)
                    dumpMute()
                  }
                  if (x8.muted.includes(quotedParticipant) == false) {
                    x8.muted.push(quotedParticipant)
                    dumpMute()
                  }
                } else {
                  if (mentionedJidList.length === 0) return reply('Maaf, format pesan salah.')
                  if (mentiones.length != 0) {
                    for (let men of mentiones) {
                      if (groupAdmins.includes(men)) return await reply('Gagal, dia pakai cheat')
                      if (x8.mutelist.includes(men) == false) {
                        x8.mutelist.push(men)
                        dumpMute()
                      }
                      if (x8.muted.includes(men) == false) {
                        x8.muted.push(men)
                        dumpMute()
                      }
                    }
                  }
                }
                reply("User added to mutelist")
              } else if (getPrefix(txt, "unban")) {
                if (quotedMsg) {
                  if (x8.mutelist.includes(quotedParticipant)) {
                    x8.mutelist = arrayRemove(x8.mutelist, quotedParticipant)
                    dumpMute()
                  }
                  if (x8.muted.includes(quotedParticipant)) {
                    let index = x8.muted.indexOf(quotedParticipant);
                    x8.muted.splice(index, 1)
                    dumpMute()
                  }
                } else {
                  if (mentionedJidList.length === 0) return reply('Maaf, format pesan salah.')
                  if (mentiones.length != 0) {
                    for (let men of mentiones) {
                      if (x8.mutelist.includes(men)) {
                        x8.mutelist = arrayRemove(x8.mutelist, men)
                        dumpMute()
                      }
                      if (x8.muted.includes(men)) {
                        let index = x8.muted.indexOf(men);
                        x8.muted.splice(index, 1)
                        dumpMute()
                      }
                    }
                  }
                }
                reply("User deleted from mutelist")
              } else if (getPrefix(txt, 'promote')) {
                if (!isBotGroupAdmins) return await reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                if (quotedMsg) {
                  if (groupAdmins.includes(quotedParticipant)) return await reply('Maaf, user tersebut sudah menjadi admin.')
                  if ((getPremiumPosition(serial, xa)) && (getPremiumPosition(quotedParticipant, xa))) {
                    return
                  } else {
                    await fn.promoteParticipant(groupId, quotedParticipant)
                    await fn.sendTextWithMentions(toId, `done add @${quotedParticipant.replace('@c.us', '')} to admin.`)
                  }
                } else {
                  if (mentionedJidList.length === 0) return await reply('Maaf, format pesan salah.')
                  if (mentionedJidList.length >= 2) return await reply('Maaf, perintah ini hanya dapat digunakan kepada 1 user.')
                  if (groupAdmins.includes(mentionedJidList[0])) return await reply('Maaf, user tersebut sudah menjadi admin.')
                  if ((getPremiumPosition(serial, xa)) && (getPremiumPosition(mentionedJidList[0], xa))) {
                    return
                  } else {
                    await fn.promoteParticipant(groupId, mentionedJidList[0])
                    await fn.sendTextWithMentions(toId, `done add @${mentionedJidList[0].replace('@c.us', '')} to admin.`)
                  }
                }
              } else if (getPrefix(txt, 'demote')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                if (quotedMsg) {
                  if (!groupAdmins.includes(quotedParticipant)) return await reply('Maaf, user tersebut tidak menjadi admin.')
                  await fn.demoteParticipant(groupId, quotedParticipant)
                  await fn.sendTextWithMentions(toId, `done remove @${quotedParticipant.replace('@c.us', '')} from admin`)
                } else {
                  if (mentionedJidList.length === 0) return reply('Maaf, format pesan salah.')
                  if (mentionedJidList.length >= 2) return await reply('Maaf, perintah ini hanya dapat digunakan kepada 1 user.')
                  if (!groupAdmins.includes(mentionedJidList[0])) return await reply('Maaf, user tersebut tidak menjadi admin.')
                  await fn.demoteParticipant(groupId, mentionedJidList[0])
                  await fn.sendTextWithMentions(toId, `done remove @${mentionedJidList[0].replace('@c.us', '')} from admin`)
                }
              } else if (getPrefix(txt, 'kill') || getPrefix(txt, 'paws') || getPrefix(txt, 'tendang')) {
                if (quotedMsg) {
                  if (!x8.mutelist.includes(quotedParticipant)) {
                    x8.mutelist.push(quotedParticipant)
                    dumpMute()
                  }
                  if (!x8.muted.includes(quotedParticipant)) {
                    x8.muted.push(quotedParticipant)
                    dumpMute()
                  }
                  await fn.sendTextWithMentions(toId, `akang gendang, mari kita tendang: @${quotedParticipant.replace('@c.us', '')}`).then(() => fn.removeParticipant(groupId, quotedParticipant))
                } else {
                  if (mentionedJidList.length === 0) return reply('Maaf, format pesan salah.')
                  await fn.sendTextWithMentions(toId, `akang gendang, mari kita tendang: @${mentionedJidList[0].replace('@c.us','')}`)
                  await sleep(1000)
                  if (groupAdmins.includes(mentionedJidList[0])) return await reply('Gagal, dia pakai cheat')
                  if (!x8.mutelist.includes(mentionedJidList[0])) {
                    x8.mutelist.push(mentionedJidList[0])
                    dumpMute()
                  }
                  if (!x8.muted.includes(mentionedJidList[0])) {
                    x8.muted.push(mentionedJidList[0])
                    dumpMute()
                  }
                  fn.removeParticipant(groupId, mentionedJidList[0]).then(() => reply('selesai menjalankan perintah'))
                }
              } else if (getComs(txt, 'bye') || getComs(txt, 'leave') || getComs(txt, 'out')) {
                await fn.leaveGroup(groupId).then(() => {
                  fn.deleteChat(groupId)
                })
              } else if (getComs(txt, 'mention') || getComs(txt, 'mentionall') || getComs(txt, 'tagall')) {
                const udud = await fn.getGroupMembersId(from)
                let anu = "📢MENTION MEMBER\n"
                let nom = 1
                for (var i = 0; i < udud.length; i++) {
                  const no = `${nom}`
                  anu += "\n" + no + ". @" + udud[i].replace(/@c.us/, "")
                  nom += 1
                }
                await fn.sendTextWithMentions(toId, anu)
              } else if (getComs(txt, 'setgroupicon') || getComs(txt, 'changegroupicon') || getComs(txt, 'gantippgroup')) {
                if (isMedia) {
                  const mediaData = await decryptMedia(message)
                  const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                  await fn.setGroupIcon(toId, imageBase64)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                  const mediaData = await decryptMedia(quotedMsg)
                  const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                  await fn.setGroupIcon(toId, imageBase64)
                }
              } else if (getComs(txt, 'delete') || getComs(txt, 'unsend') || getComs(txt, 'hapus')) {
                if (!quotedMsg) return reply('Maaf, hanya bisa menghapus pesan dari BOT')
                if (!quotedMsgObj.fromMe) return reply('Maaf, hanya bisa menghapus pesan dari BOT')
                fn.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false).then(() => console.log('success delete message')).catch((err) => console.log(err))
              } else if (getComs(txt, 'cleanse') || getComs(txt, 'kickall') || getComs(txt, 'ratain')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                let groups = await fn.getGroupMembers(toId)
                let arrOfGroup = []
                for (let index of groups) {
                  arrOfGroup.push(index.id)
                }
                let arrOfGroups = arrOfGroup.filter(x => !isSadmin && !master && !vip && !premium && !isGroupAdmins)
                for (let xs of arrOfGroups) {
                  if (!chat.isAnnounceGrpRestrict) {
                    await reply(`Maaf bot sedang pembersihan, silakan chat owner jika ingin masuk kembali.`).then(async() => {
                      await fn.removeParticipant(toId, xs)
                    })
                  } else {
                    await fn.removeParticipant(toId, xs)
                  }
                }
                reply('Succes kick all member')
              } else if (getComs(txt, 'grouplink') || getComs(txt, 'linkgc') || getComs(txt, 'linkgroup')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                const linkcok = await fn.getGroupInviteLink(from)
                await reply(linkcok)
              } else if (getComs(txt, 'revlink') || getComs(txt, 'gantilink') || getComs(txt, 'changegrouplink')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                await fn.revokeGroupInviteLink(groupId)
              } else if (getPrefix(txt, 'notify') || getPrefix(txt, 'announce') || getPrefix(txt, 'ping')) {
                const x = "📢📢 ANNOUNCEMENTS !!!\n\n"+arg
	              const udud = await fn.getGroupMembersId(from)
	              let anu = ""
	              let nom = 1
	              for (var i = 0; i < udud.length; i++) {
	                const no = `${nom}`
	                anu += "\n" + no + ". @" + udud[i].replace(/@c.us/, "")
	                nom += 1
	              }
	              await fn.hideTag(toId, x, anu)
              } else if (getComs(txt, 'groupinfo') || getComs(txt, 'ginfo') || getComs(txt, 'infogroup')) {
                const groupchat = await fn.getChatById(message.chatId)
                const {
                  desc
                } = groupchat.groupMetadata
                const {
                  user
                } = groupchat.groupMetadata.owner
                fn.sendTextWithMentions(toId, `*Nama: ` + formattedTitle + `*\n*Pembuat:* @${user} \n*Description:*\n${desc}`)
              } else if (getPrefix(txt, 'upgname')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                if (isGroupMsg) {
                  const namagrup = body.slice(9)
                  let sebelum = message.chat.formattedTitle
                  let halaman = await fn.getPage()
                  await halaman.evaluate((chatId, subject) =>
                    Store.WapQuery.changeSubject(chatId, subject), groupId, `${namagrup}`)
                  fn.sendTextWithMentions(from, `Nama group telah diubah!\nPelaku: @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
                } else {
                  reply('hanya bisa digunakan di grup')
                }
              } else if (getPrefix(txt, 'upgdesc')) {
                if (!isBotGroupAdmins) return reply('Gagal, silahkan tambahkan bot sebagai admin grup!')
                if (isGroupMsg) {
                  const namagrup = body.slice(9)
                  let sebelum = message.chat.groupMetadata.desc
                  let page = await fn.getPage()
                  let res = await page.evaluate((chatId, description) => {
                    let descId = Store.GroupMetadata.get(chatId).descId;
                    return Store.WapQuery.setGroupDescription(chatId, description, Store.genId(), descId);
                  }, groupId, `${namagrup}`)
                  fn.sendTextWithMentions(from, `Deskripsi group telah diubah!\nPelaku: @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
                } else {
                  reply('hanya bisa digunakan di grup')
                }
              }
            }
            ctype = "media"
            if (getComs(txt, 'commands') || getComs(txt, 'help') || getComs(txt, 'menu')) {
              const k = getDescRank()
              const levela = getLevelFormat(serial)
              let x = []
              for (var a in coms) {
                x.push(a)
              }
              let prefix = settings.rname
              let text = "┌──┤ *𝔽N𝔹𝕆𝕋𝕊*\n"
              text += "├   *BOT ini mendapat sponsor dari :*\n"
              text += "├   *Beli VPS hosting / Dedicated hosting / RDP bulanan, tahunan, Mantab dan Murah.*\n"
              text += "├   *Langsung Order http://bit.ly/order_bang*\n"
              text += "└──┤ *Total Commands: " + x.length + "*\n\n"
              text += "```I N F O R M A T I O N```\n"
              text += "┌   " + prefix + "rules [untuk melihat rules bot]\n"
              text += "├   " + prefix + "donasi [jika kamu ingin donasi]\n"
              text += "├   " + prefix + "creator [info creator]\n"
              text += "├   " + prefix + "sponsor [info sponsor]\n"
              text += "├   " + prefix + "premium [info premium]\n"
              text += "├   " + prefix + "vip [info vip]\n"
              text += "├   " + prefix + "order [untuk order bot]\n"
              text += "├   " + prefix + "stay [untuk stay digrup kamu]\n"
              text += "└   " + prefix + "admin *text* [laporkan kalo ada error bot]\n\n"
              text += "┌─┤ ```Y O U R L E V E L``` \n"
              text += "├   XP: " + levela.xp + "\n"
              text += "├   Role: " + levela.role + "\n"
              text += "├   Balance: $ " + formatin(levela.balance) + "\n"
              text += "└─┤ ```" + `${k.length + 43253}` + " player```\n\n"
              text += "❏  ```G A M E & L E V E L I N G```\n"
              text += "├   " + prefix + "gameshop\n"
              text += "├   " + prefix + "leaderboard\n"
              text += "├   " + prefix + "rank\n"
              text += "├   " + prefix + "level\n"
              text += "├   " + prefix + "mybalance\n"
              text += "├   " + prefix + "score\n"
              text += "├   " + prefix + "game-chop\n"
              text += "├   " + prefix + "game-mine\n"
              text += "├   " + prefix + "game-fish\n"
              text += "├   " + prefix + "game-work\n"
              text += "├   " + prefix + "game-hunt\n"
              text += "├   " + prefix + "game-koin\n"
              text += "├   " + prefix + "game-dadu\n"
              text += "├   " + prefix + "game-caklontong\n"
              text += "├   " + prefix + "game-tebakgambar\n"
              text += "├   " + prefix + "game-family100\n"
              text += "├   " + prefix + "game-tod *truth/dare*\n"
              text += "└   " + prefix + "game-math *noob/easy/medium/hard/extreme*\n\n"
              if (isSadmin) {
                text += "❏  ```" + BotName + " CREATOR```\n"
                text += "├   " + prefix + "maintenance *on/off*\n"
                text += "├   " + prefix + "debug *on/off*\n"
                text += "├   " + prefix + "changer *on/off*\n"
                text += "├   " + prefix + "shutdown\n"
                text += "├   " + prefix + "r\n"
                text += "├   " + prefix + "snap\n"
                text += "├   " + prefix + "exec\n"
                text += "├   " + prefix + "upcoms *oldkeyword* *newkeyword*\n"
                text += "├   " + prefix + "clearcache\n"
                text += "├   " + prefix + "allcommands\n"
                text += "├   " + prefix + "nbc\n"
                text += "├   " + prefix + "wbc\n"
                text += "├   " + prefix + "x apa\n"
                text += "├   " + prefix + "x dimana\n"
                text += "├   " + prefix + "x siapa\n"
                text += "├   " + prefix + "x gimana\n"
                text += "├   " + prefix + "x kapan\n"
                text += "├   " + prefix + "x kenapa\n"
                text += "├   " + prefix + "listbot\n"
                text += "├   " + prefix + "addbot *@tag*\n"
                text += "├   " + prefix + "delbot *@tag*\n"
                text += "├   " + prefix + "resetbot\n"
                text += "├   " + prefix + "listowner\n"
                text += "├   " + prefix + "addowner *@tag*\n"
                text += "├   " + prefix + "delowner *tag*\n"
                text += "├   " + prefix + "spamcall *nomor*\n"
                text += "└   " + prefix + "ubah *jumlah* *@tag*\n\n"
              }
              if (isSadmin || master) {
                text += "❏  ```" + BotName + " OWNER```\n"
                text += "├   " + prefix + "addsticker *nama*\n"
                text += "├   " + prefix + "delsticker *nama*\n"
                text += "├   " + prefix + "addaudio *nama*\n"
                text += "├   " + prefix + "delaudio *nama*\n"
                text += "├   " + prefix + "addwhitelist\n"
                text += "├   " + prefix + "delwhitelist\n"
                text += "├   " + prefix + "mimic *on/off*\n"
                text += "├   " + prefix + "addmimic *@tag*\n"
                text += "├   " + prefix + "delmimic *@tag*\n"
                text += "├   " + prefix + "resetmimic\n"
                text += "├   " + prefix + "listmimic\n"
                text += "├   " + prefix + "speed\n"
                text += "├   " + prefix + "autojoin *on/off*\n"
                text += "├   " + prefix + "banchat *on/off*\n"
                text += "├   " + prefix + "suggest *on/off*\n"
                text += "├   " + prefix + "chatbot *on/off*\n"
                text += "├   " + prefix + "stats\n"
                text += "├   " + prefix + "status\n"
                text += "├   " + prefix + "runtime\n"
                text += "├   " + prefix + "setprofilepic\n"
                text += "├   " + prefix + "upname *namabaru*\n"
                text += "├   " + prefix + "upstatus *statusbaru*\n"
                text += "├   " + prefix + "uprname *rnamebaru*\n"
                text += "├   " + prefix + "upsname *snamebaru*\n"
                text += "├   " + prefix + "set\n"
                text += "├   " + prefix + "mygroup\n"
                text += "├   " + prefix + "leaveall\n"
                text += "├   " + prefix + "clearall\n"
                text += "├   " + prefix + "trial *linkgc*\n"
                text += "├   " + prefix + "broadcast *text* [reply/quote image/video yang mau dibroadcast]\n"
                text += "├   " + prefix + "changememberlimit *jumlah*\n"
                text += "├   " + prefix + "changegrouplimit *jumlah*\n"
                text += "├   " + prefix + "changepremiumlimit *jumlah*\n"
                text += "├   " + prefix + "changelimit *jumlah*\n"
                text += "├   " + prefix + "resetlimitall\n"
                text += "├   " + prefix + "resetin limit *@tag*\n"
                text += "├   " + prefix + "premium list\n"
                text += "├   " + prefix + "premium add *@tag 30d*\n"
                text += "├   " + prefix + "premium del *@tag*\n"
                text += "├   " + prefix + "vip list\n"
                text += "├   " + prefix + "vip add *@tag 30d*\n"
                text += "├   " + prefix + "vip del *@tag*\n"
                text += "├   " + prefix + "listblack\n"
                text += "├   " + prefix + "delblack *nomor*\n"
                text += "├   " + prefix + "delmute *nomor*\n"
                text += "├   " + prefix + "listwhite\n"
                text += "├   " + prefix + "resetwhitelist\n"
                text += "├   " + prefix + "whitelistadd *gid*\n"
                text += "├   " + prefix + "whitelistdel *nomor*\n"
                text += "├   " + prefix + "listblock\n"
                text += "├   " + prefix + "unblockall\n"
                text += "├   " + prefix + "listadmin\n"
                text += "├   " + prefix + "listmute\n"
                text += "├   " + prefix + "silent *@tag*\n"
                text += "└   " + prefix + "unsilent *@tag*\n\n"
              }
              if (isSadmin || master || vip) {
                text += "❏  ```" + BotName + " VIP```\n"
                text += "├   " + prefix + "trap\n"
                text += "├   " + prefix + "hentai\n"
                text += "├   " + prefix + "yuri\n"
                text += "├   " + prefix + "nsfw\n"
                text += "├   " + prefix + "dva\n"
                text += "├   " + prefix + "baguet\n"
                text += "├   " + prefix + "fetish armpits\n"
                text += "├   " + prefix + "fetish feets\n"
                text += "├   " + prefix + "fetish thighs\n"
                text += "├   " + prefix + "fetish booty\n"
                text += "├   " + prefix + "fetish boobs\n"
                text += "├   " + prefix + "fetish necks\n"
                text += "├   " + prefix + "fetish belly\n"
                text += "├   " + prefix + "fetish side\n"
                text += "├   " + prefix + "fetish ahegao\n"
                text += "├   " + prefix + "fetish BDSM\n"
                text += "├   " + prefix + "tubenude *query*\n"
                text += "├   " + prefix + "tubedl *link*\n"
                text += "├   " + prefix + "nekosearch *query*\n"
                text += "├   " + prefix + "nekohentai\n"
                text += "├   " + prefix + "neko3d\n"
                text += "├   " + prefix + "nekojavcosplay\n"
                text += "├   " + prefix + "nekoupdate\n"
                text += "├   " + prefix + "anoboy\n"
                text += "├   " + prefix + "nhentai-search *query*\n"
                text += "├   " + prefix + "nhentai-download *id*\n"
                text += "├   " + prefix + "random cersex\n"
                text += "├   " + prefix + "block *@tag*\n"
                text += "├   " + prefix + "unblock *@tag*\n"
                text += "├   " + prefix + "find *@tag*\n"
                text += "├   " + prefix + "meadmin\n"
                text += "├   " + prefix + "climit *@tag*\n"
                text += "└   " + prefix + "sgift *jumlah @tag*\n\n"
              }
              text += "❏  ```" + BotName + " PREMIUM```\n"
              text += "├   " + prefix + "wmsticker *text1 | text2*\n"
              text += "├   " + prefix + "circlesticker *text1 | text2*\n"
              text += "├   " + prefix + "readmore *text1 | text2*\n"
              text += "├   " + prefix + "twitterdl *url twitter*\n"
              text += "├   " + prefix + "tiktokdl *url tiktok*\n"
              text += "├   " + prefix + "facebook *url facebook*\n"
              text += "├   " + prefix + "igpost *url instagram*\n"
              text += "├   " + prefix + "igprofile *username*\n"
              text += "├   " + prefix + "igstory *username*\n"
              text += "├   " + prefix + "igstory *username number*\n"
              text += "├   " + prefix + "igtv *username*\n"
              text += "├   " + prefix + "ighastag *hastag*\n"
              text += "├   " + prefix + "ighastag *hastag number*\n"
              text += "├   " + prefix + "ighighlight *username*\n"
              text += "├   " + prefix + "ighighlight *username* *number*\n"
              text += "├   " + prefix + "audio *url youtube*\n"
              text += "├   " + prefix + "video *url youtube*\n"
              text += "├   " + prefix + "play *judul - penyanyi*\n"
              text += "├   " + prefix + "ytplay *ID*\n"
              text += "├   " + prefix + "ytvideo *url video*\n"
              text += "├   " + prefix + "music *judul - penyanyi*\n"
              text += "├   " + prefix + "joox *judul - penyanyi*\n"
              text += "├   " + prefix + "spotify *judul - penyanyi*\n"
              text += "├   " + prefix + "ptl\n"
              text += "├   " + prefix + "ptl *query*\n"
              text += "├   " + prefix + "asupan (khusus cowo)\n"
              text += "├   " + prefix + "mood booster (khusus cewe)\n"
              text += "├   " + prefix + "food\n"
              text += "├   " + prefix + "galau\n"
              text += "├   " + prefix + "mute\n"
              text += "├   " + prefix + "unmute\n"
              text += "├   " + prefix + "only admin *on/off*\n"
              text += "├   " + prefix + "edit group *on/off*\n"
              text += "├   " + prefix + "addchat *text1|text2*\n"
              text += "├   " + prefix + "delchat *text1*\n"
              text += "├   " + prefix + "addcontact *nama|6281286112929*\n"
              text += "├   " + prefix + "delcontact *nama*\n"
              text += "├   " + prefix + "addimage *nama*\n"
              text += "├   " + prefix + "delimage *nama*\n"
              text += "├   " + prefix + "welcomemessage *text*\n"
              text += "├   " + prefix + "welcome *on/off* [untuk mode welcome]\n"
              text += "├   " + prefix + "filter *on/off* [untuk mode antispam]\n"
              text += "├   " + prefix + "simi *on/off* [untuk mode simi]\n"
              text += "└   " + prefix + "magernulis *text*\n\n"
              text += "❏  ```" + BotName + " MANAGE GROUP```\n"
              text += "├   " + prefix + "kick *@tag*\n"
              text += "├   " + prefix + "kill *@tag*\n"
              text += "├   " + prefix + "ban *@tag*\n"
              text += "├   " + prefix + "unban *@tag*\n"
              text += "├   " + prefix + "grouplink\n"
              text += "├   " + prefix + "changegrouplink\n"
              text += "├   " + prefix + "promote *@tag*\n"
              text += "├   " + prefix + "demote *@tag*\n"
              text += "├   " + prefix + "mention\n"
              text += "├   " + prefix + "announce *text*\n"
              text += "├   " + prefix + "upgname *name*\n"
              text += "├   " + prefix + "upgdesc *text*\n"
              text += "└   " + prefix + "setgroupicon\n\n"
              text += "❏  ```" + BotName + " FUN```\n"
              text += "├   " + prefix + "alay *text*\n"
              text += "├   " + prefix + "hilih *text*\n"
              text += "├   " + prefix + "namaninja *text*\n"
              text += "├   " + prefix + "umurku *angka tahun lahirmu*\n"
              text += "├   " + prefix + "birthstone *angka bulan lahirmu*\n"
              text += "├   " + prefix + "chinese-zodiac *angka tahun lahirmu*\n"
              text += "├   " + prefix + "gender *nama depanmu*\n"
              text += "├   " + prefix + "artinama *namamu*\n"
              text += "├   " + prefix + "artimimpi *mimpimu*\n"
              text += "├   " + prefix + "weton *namamu tanggal*\n"
              text += "├   " + prefix + "zodiak *horoscope*\n"
              text += "├   " + prefix + "jadian *tanggal-bulan-tahun*\n"
              text += "├   " + prefix + "apakah *pertanyaan*\n"
              text += "├   " + prefix + "persentase *namamu | pasanganmu*\n"
              text += "├   " + prefix + "jodoh *namamu | namanya | selingkuhanmu*\n"
              text += "└   " + prefix + "ramalan *namamu | nama pasanganmu*\n\n"
              text += "❏  ```" + BotName + " AUDIO-MANIPULATION-CREATE```\n"
              text += "├   " + prefix + "voicechanger1 [quote audio/vn yang mau diubah suaranya]\n"
              text += "├   " + prefix + "voicechanger2 [quote audio/vn yang mau diubah suaranya]\n"
              text += "├   " + prefix + "voicechanger3 [quote audio/vn yang mau diubah suaranya]\n"
              text += "├   " + prefix + "toaudio [quote video yang mau dijadikan jadiin audio]\n"
              text += "└   " + prefix + "tts *text*\n\n"
              text += "❏  ```" + BotName + " TEXT-MANIPULATION-CREATE```\n"
              text += "├   " + prefix + "totext [quote image yang mau dijadikan jadiin text]\n"
              text += "├   " + prefix + "text-reverse *text*\n"
              text += "├   " + prefix + "text-zalgo *text*\n"
              text += "├   " + prefix + "text-braille *text*\n"
              text += "├   " + prefix + "text-cursive *text*\n"
              text += "├   " + prefix + "text-emojify *text*\n"
              text += "├   " + prefix + "text-fancy *text*\n"
              text += "├   " + prefix + "text-superscript *text*\n"
              text += "└   " + prefix + "text-brony-talk *text*\n\n"
              text += "❏  ```" + BotName + " IMAGE-MANIPULATION-CREATE```\n"
              text += "├   " + prefix + "decrypt [quote sticker yang mau dijadikan image]\n"
              text += "├   " + prefix + "compress [quote image yang mau diresize kualitas gambarnya]\n"
              text += "├   " + prefix + "enhance [quote image yang mau ditingkatkan kualitas gambarnya]\n"
              text += "├   " + prefix + "inspect [quote image yang mau diinspect detail gambarnya]\n"
              text += "├   " + prefix + "detect [quote image yang mau diinspect detail gambarnya]\n"
              text += "├   " + prefix + "tahta *text*\n"
              text += "├   " + prefix + "quoteit *quotemu | namamu*\n"
              text += "├   " + prefix + "creatememe *text atas | text bawah*\n"
              text += "├   " + prefix + "valentine *nama | nama | @tag @tag*\n"
              text += "├   " + prefix + "text2img *text*\n"
              text += "├   " + prefix + "certificate *nama | event*\n"
              text += "├   " + prefix + "danger *text*\n"
              text += "├   " + prefix + "caution *text*\n"
              text += "├   " + prefix + "license *text*\n"
              text += "├   " + prefix + "subtitle *text*\n"
              text += "├   " + prefix + "alert *text*\n"
              text += "├   " + prefix + "nowplaying *text1 | text2*\n"
              text += "├   " + prefix + "challenge [quote image / tag member yang mau manipulasi]\n"
              text += "├   " + prefix + "blur [quote image / tag member yang mau manipulasi]\n"
              text += "├   " + prefix + "approve [quote image / tag member yang mau manipulasi]\n"
              text += "├   " + prefix + "reject [quote image / tag member yang mau manipulasi]\n"
              text += "├   " + prefix + "mirror [quote image / tag member yang mau manipulasi]\n"
              text += "├   " + prefix + "ghost [quote image / tag member yang mau manipulasi]\n"
              text += "├   " + prefix + "glich [quote image / tag member yang mau manipulasi]\n"
              text += "├   " + prefix + "fisheye [quote image / tag member yang mau manipulasi]\n"
              text += "├   " + prefix + "fspasir *text*\n"
              text += "├   " + prefix + "fscolor *text1 | text2*\n"
              text += "├   " + prefix + "bannerff *text1 | text2*\n"
              text += "├   " + prefix + "logo-ff *hero | namamu*\n"
              text += "├   " + prefix + "logo-ml *hero | namamu*\n"
              text += "├   " + prefix + "fsmissing *text1 | text2 | text3* [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "distort [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "tobecontinue [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "triggered [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "thuglife [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "wasted [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "wanted [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "rainbow [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "facepalm [quote image yang mau manipulasi]\n"
              text += "├   " + prefix + "burn *text*\n"
              text += "└   " + prefix + "fuse *@tag @tag*\n\n"
              text += "❏  ```" + BotName + " STICKER-MANIPULATION-CREATE```\n"
              text += "├   " + prefix + "blackpink *text*\n"
              text += "├   " + prefix + "thunder *text*\n"
              text += "├   " + prefix + "silk *text*\n"
              text += "├   " + prefix + "lovemessage *text*\n"
              text += "├   " + prefix + "party *text*\n"
              text += "├   " + prefix + "glow *text*\n"
              text += "├   " + prefix + "slide *text*\n"
              text += "├   " + prefix + "attp *text*\n"
              text += "├   " + prefix + "ttp *text*\n"
              text += "├   " + prefix + "ttd *text*\n"
              text += "├   " + prefix + "harta *text*\n"
              text += "├   " + prefix + "randomsticker *packname*\n"
              text += "├   " + prefix + "custom *text1 text2 text3*\n"
              text += "├   " + prefix + "mesticker\n"
              text += "├   " + prefix + "getsticker *@tag*\n"
              text += "├   " + prefix + "sticker nobg\n"
              text += "├   " + prefix + "sticker *url*\n"
              text += "├   " + prefix + "sticker [quote pesan/image/video yang mau dijadikan sticker]\n"
              text += "├   " + prefix + "stickermeme *text atas | text bawah*\n"
              text += "├   " + prefix + "gifsticker *url giphy*\n"
              text += "├   " + prefix + "fire [quote image yang mau dijadikan stickerfire]\n"
              text += "├   " + prefix + "lightning [quote image yang mau dijadikan stickerlight]\n"
              text += "├   " + prefix + "googletext *text1|text2|text3*\n"
              text += "├   " + prefix + "glichtext *text1|text2*\n"
              text += "└   " + prefix + "pornlogo *text1|text2*\n\n"
              text += "❏  ```" + BotName + " ANIME```\n"
              text += "├   " + prefix + "jurnalotaku *query*\n"
              text += "├   " + prefix + "hug\n"
              text += "├   " + prefix + "animeneko\n"
              text += "├   " + prefix + "anime\n"
              text += "├   " + prefix + "waifu\n"
              text += "├   " + prefix + "husbu\n"
              text += "├   " + prefix + "loli\n"
              text += "├   " + prefix + "shota\n"
              text += "├   " + prefix + "wait [quote image yang mau diinspect]\n"
              text += "├   " + prefix + "sauce [quote image yang mau detect]\n"
              text += "├   " + prefix + "kusonime *query*\n"
              text += "├   " + prefix + "komiku *query*\n"
              text += "└   " + prefix + "infonime *query*\n\n"
              text += "❏  ```" + BotName + " RANDOM```\n"
              text += "├   " + prefix + "bacot\n"
              text += "├   " + prefix + "meme\n"
              text += "├   " + prefix + "1cak\n"
              text += "├   " + prefix + "quotes\n"
              text += "├   " + prefix + "quotes anime\n"
              text += "├   " + prefix + "quotes bijak\n"
              text += "├   " + prefix + "quotes cinta\n"
              text += "├   " + prefix + "quotes motivasi\n"
              text += "├   " + prefix + "quotes bacot\n"
              text += "├   " + prefix + "random puisi\n"
              text += "├   " + prefix + "random nama cowo\n"
              text += "├   " + prefix + "random nama cewe\n"
              text += "├   " + prefix + "gombal\n"
              text += "├   " + prefix + "pantun\n"
              text += "├   " + prefix + "fakta\n"
              text += "├   " + prefix + "receh\n"
              text += "├   " + prefix + "kpop\n"
              text += "├   " + prefix + "kadar bucin *nama*\n"
              text += "├   " + prefix + "kadar cabul *nama*\n"
              text += "├   " + prefix + "kadar hoki *nama*\n"
              text += "├   " + prefix + "kadar gay *nama*\n"
              text += "├   " + prefix + "kadar kenakalan *nama*\n"
              text += "├   " + prefix + "kadar kegantengan *nama*\n"
              text += "├   " + prefix + "kadar kecantikan *nama*\n"
              text += "├   " + prefix + "kadar kebodohan *nama*\n"
              text += "├   " + prefix + "kadar kepintaran *nama*\n"
              text += "├   " + prefix + "kadar kemalasan *nama*\n"
              text += "└   " + prefix + "kadar kebijaksanaan *nama*\n\n"
              text += "❏  ```" + BotName + " MEDIA```\n"
              text += "├   " + prefix + "image *query*\n"
              text += "├   " + prefix + "pinterest *link*\n"
              text += "├   " + prefix + "maps *kotamu*\n"
              text += "├   " + prefix + "ssweb *link*\n"
              text += "└   " + prefix + "wallpaper *query*\n\n"
              text += "❏  ```" + BotName + " NGAJI```\n"
              text += "├   " + prefix + "alquran\n"
              text += "├   " + prefix + "alquran *nomor*\n"
              text += "├   " + prefix + "random ayat\n"
              text += "├   " + prefix + "info surah *surah*\n"
              text += "├   " + prefix + "surah *surah ayat*\n"
              text += "├   " + prefix + "surah *surah ayat en* (untuk terjemahan bahasa inggris)\n"
              text += "├   " + prefix + "tafsir *surah ayat*\n"
              text += "├   " + prefix + "jadwalshalat *kotamu*\n"
              text += "├   " + prefix + "murottal *surah*\n"
              text += "└   " + prefix + "murottal *surah ayat*\n\n"
              text += "❏  ```" + BotName + " INFO```\n"
              text += "├   " + prefix + "cekresi *kurir* *resi*\n"
              text += "├   " + prefix + "cekongkir *kurir|kota pengirim|kota tujuan*\n"
              text += "├   " + prefix + "cekpln *nomor*\n"
              text += "├   " + prefix + "cekbpjs *nomor*\n"
              text += "├   " + prefix + "cekgas *nomor*\n"
              text += "├   " + prefix + "cekindihome *nomor*\n"
              text += "├   " + prefix + "cekspeedy *nomor*\n"
              text += "├   " + prefix + "tvnow\n"
              text += "├   " + prefix + "jadwaltv *stasiuntv*\n"
              text += "├   " + prefix + "googlesearch *query*\n"
              text += "├   " + prefix + "gplay *query*\n"
              text += "├   " + prefix + "github *query*\n"
              text += "├   " + prefix + "stackoverflow *query*\n"
              text += "├   " + prefix + "tiktokstalk *username*\n"
              text += "├   " + prefix + "twitstalk *username*\n"
              text += "├   " + prefix + "smuleprofile *username*\n"
              text += "├   " + prefix + "smuledl *link*\n"
              text += "├   " + prefix + "corona\n"
              text += "├   " + prefix + "global\n"
              text += "├   " + prefix + "nasional\n"
              text += "├   " + prefix + "provinsi\n"
              text += "├   " + prefix + "provinsi *provinsimu*\n"
              text += "├   " + prefix + "lokasi\n"
              text += "├   " + prefix + "info gempa\n"
              text += "├   " + prefix + "infolokasi *tempat*\n"
              text += "├   " + prefix + "infomotor *type*\n"
              text += "├   " + prefix + "infomobil *type*\n"
              text += "├   " + prefix + "newspaper\n"
              text += "├   " + prefix + "kurs\n"
              text += "├   " + prefix + "chord *query*\n"
              text += "├   " + prefix + "getchord *query*\n"
              text += "├   " + prefix + "mlhero\n"
              text += "├   " + prefix + "detail *hero ml*\n"
              text += "├   " + prefix + "brainly *prmu*\n"
              text += "├   " + prefix + "wikipedia *query*\n"
              text += "├   " + prefix + "kbbi *query*\n"
              text += "├   " + prefix + "resep *nama masakan*\n"
              text += "├   " + prefix + "gsmarena *query*\n"
              text += "├   " + prefix + "shopee *query*\n"
              text += "├   " + prefix + "lk21dl *judul film*\n"
              text += "├   " + prefix + "lirik *judul lagu*\n"
              text += "├   " + prefix + "translate *language | text*\n"
              text += "├   " + prefix + "togel *hongkong/singapore*\n"
              text += "├   " + prefix + "math *1+2/3-4* (hanya bisa kalibataku)\n"
              text += "├   " + prefix + "check-number *@tag*\n"
              text += "└   " + prefix + "distance *kota1 | kota2*\n\n"
              text += "❏  ```" + BotName + " UTILITIES```\n"
              text += "├   " + prefix + "afk\n"
              text += "├   " + prefix + "afk *reason*\n"
              text += "├   " + prefix + "limit\n"
              text += "├   " + prefix + "count\n"
              text += "├   " + prefix + "listchat\n"
              text += "├   " + prefix + "listcontact\n"
              text += "├   " + prefix + "listimage\n"
              text += "├   " + prefix + "me\n"
              text += "├   " + prefix + "mypicture\n"
              text += "├   " + prefix + "gcreator\n"
              text += "├   " + prefix + "gid\n"
              text += "├   " + prefix + "groupinfo\n"
              text += "├   " + prefix + "delete *quote pesan bot mau didelete*\n"
              text += "├   " + prefix + "character-count *text*\n"
              text += "├   " + prefix + "scrabble-score *text*\n"
              text += "├   " + prefix + "getprofile *@tag*\n"
              text += "├   " + prefix + "upbacot *kalimat*\n"
              text += "├   " + prefix + "whois *kalimat*\n"
              text += "└   " + prefix + "number *@tag*"
              await reply(text)
            }
            if (getComs(txt, 'gameshop')) {
              const k = getDescRank()
              const levela = getLevelFormat(serial)
              let x = []
              for (var a in coms) {
                x.push(a)
              }
              let prefix = settings.rname
              let text = "┌─┤ ```Y O U R L E V E L``` \n"
              text += "├   XP: " + levela.xp + "\n"
              text += "├   Role: " + levela.role + "\n"
              text += "├   Balance: $ " + formatin(levela.balance) + "\n"
              text += "└─┤ ```" + `${k.length + 43253}` + " player```\n\n"
              text += "```G A M E S H O P```\n"
              text += "┌   " + prefix + "buylimit 50 [harga: $ 1.500]\n"
              text += "├   " + prefix + "buylimit 100 [harga: $ 3.000]\n"
              text += "├   " + prefix + "buylimit 150 [harga: $ 4.500]\n"
              text += "├   " + prefix + "buylimit 200 [harga: $ 6.000]\n"
              text += "├   " + prefix + "buylimit 250 [harga: $ 7.500]\n"
              text += "├   " + prefix + "buylimit 300 [harga: $ 9.000]\n"
              text += "├   " + prefix + "buylimit 350 [harga: $ 10.500]\n"
              text += "├   " + prefix + "buylimit 400 [harga: $ 12.000]\n"
              text += "├   " + prefix + "buylimit 450 [harga: $ 13.500]\n"
              text += "├   " + prefix + "buylimit 500 [harga: $ 15.000]\n"
              text += "├   " + prefix + "buypremium [harga: $ 100.000.000.000]\n"
              text += "└   " + prefix + "buyvip [harga: $ 100.000.000.000.000]\n\n"
              text += "Note: \n"
              text += "    ~ premium dan vip berlaku 1bulan\n"
              text += "    ~ limit hanya berlaku 1 hari sampai jam 21.00 serta tunduk kepada syarat dan ketentuan penggunaan bot!\n\n"
              text += "ketik " + prefix + "rules untuk syarat dan ketentuan penggunaan bot"
              await reply(text)
            } else if (getPrefix(txt, 'buylimit')) {
              if (args.length >= 1 && args[0] === '50') {
                const random = "1500"
                const a = "50"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '100') {
                const random = "3000"
                const a = "100"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '150') {
                const random = "4500"
                const a = "150"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '200') {
                const random = "6000"
                const a = "200"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '250') {
                const random = "7500"
                const a = "250"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '300') {
                const random = "9000"
                const a = "300"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '350') {
                const random = "10500"
                const a = "350"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '400') {
                const random = "12000"
                const a = "400"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '450') {
                const random = "13500"
                const a = "450"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              } else if (args.length >= 1 && args[0] === '500') {
                const random = "15000"
                const a = "500"
                const b = serial
                let datax = await fn.getProfilePicFromServer(serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                getMyLevel(serial, pushname, datax).then(res => {
                  if (res.balance > parseInt(random)) {
                    for (let i of x4.limit) {
                      if (i['id'] == b) {
                        i['limit'] = parseInt(a)
                        dumpLimit()
                      }
                    }
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan ' + a + ' limit setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                  }
                })
              }
            } else if (getPrefix(txt, 'buypremium')) {
              const random = "100000000000"
              const a = "premium"
              const men = serial
              let datax = await fn.getProfilePicFromServer(serial)
              if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
              getMyLevel(serial, pushname, datax).then(res => {
                if (res.balance > parseInt(random)) {
                  if (!(getPremiumPosition(men, xa))) {
                    addPremiumUser(men, '30d', xa)
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan akses ' + a + ' setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('kamu sudah jadi premium, kamu tidak bisa membeli paket ini')
                  }
                } else {
                  reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                }
              })
            } else if (getPrefix(txt, 'buyvip')) {
              const random = "100000000000000"
              const a = "vip"
              const men = serial
              let datax = await fn.getProfilePicFromServer(serial)
              if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
              getMyLevel(serial, pushname, datax).then(res => {
                if (res.balance > parseInt(random)) {
                  if (!(getVIPposition(men, xc))) {
                    addUserVIP(men, '30d', xc)
                    minBal(serial, random)
                    fn.sendTextWithMentions(from, 'Selamat!!! @' + serial.replace('@c.us', '') + '\nkamu mendapatkan akses ' + a + ' setelah menukarkan point balancemu sebesar $' + formatin(random) + ' dari $' + formatin(res.balance))
                  } else {
                    reply('kamu sudah jadi vip, kamu tidak bisa membeli paket ini')
                  }
                } else {
                  reply('point balancemu tidak cukup untuk membeli. silakan gunakan fnbots game untuk mendapatkan point!')
                }
              })
            } else if (getComs(txt, 'rank') || getComs(txt, 'leaderboard')) {
            	if (!isGroupMsg) return
              if (isLimit(serial)) return
              let hasil = rank()
              fn.sendTextWithMentions(from, hasil)
              limitAdd(serial)
            } else if (getComs(txt, 'score')) {
            	if (!isGroupMsg) return
              if (isLimit(serial)) return
              let hasil = score()
              fn.sendTextWithMentions(from, hasil)
              limitAdd(serial)
            } else if (getComs(txt, 'level')) {
              if (isLimit(serial)) return
              let datax = await fn.getProfilePicFromServer(serial)
              if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
              getMyLevel(serial, pushname, datax).then(res => {
                sharp(res.buffer).resize({
                  width: 655,
                  height: 655,
                  fit: sharp.fit.contain,
                  background: {
                    r: 0,
                    g: 0,
                    b: 0,
                    alpha: 0
                  },
                  withoutEnlargement: true
                }).jpeg().toBuffer().then(buffer => {
                  const formated = `data:image/jpeg;base64,${buffer.toString('base64')}`
                  fn.sendFile(from, formated, 'level.jpg', `ayo tingkatkan levelmu dengan terus menggunakan fnbots!`, id)
                  limitAdd(serial)
                })
              })
            } else if (getComs(txt, 'mybalance')) {
              if (isLimit(serial)) return
              let datax = await fn.getProfilePicFromServer(serial)
              if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
              getMyLevel(serial, pushname, datax).then(res => {
                reply(`Your current balance: $` + formatin(res.balance))
                limitAdd(serial)
              })
            } else if (getComs(txt, 'game-chop')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              const random = Math.floor(Math.random() * (100 - 1) + 1);
              reply('you got $' + random + ' from memotong rumput milik tetangga')
              addBal(serial, random)
              limitAdd(serial)
              limitAddGame(serial)
            } else if (getComs(txt, 'game-mine')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              const random = Math.floor(Math.random() * (100 - 1) + 1);
              reply('you got $' + random + ' from menambang di gua kenikmatan')
              addBal(serial, random)
              limitAdd(serial)
            } else if (getComs(txt, 'game-fish')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              const random = Math.floor(Math.random() * (100 - 1) + 1);
              reply('you got $' + random + ' from memancing di kolam renang')
              addBal(serial, random)
              limitAdd(serial)
            } else if (getComs(txt, 'game-hunt')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              const random = Math.floor(Math.random() * (100 - 1) + 1);
              reply('you got $' + random + ' from berburu janda di pangkalan')
              addBal(serial, random)
              limitAdd(serial)
            } else if (getComs(txt, 'game-work')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              const random = Math.floor(Math.random() * (100 - 1) + 1);
              reply('you got $' + random + ' from nguli bangunan')
              addBal(serial, random)
              limitAdd(serial)
            } else if (getComs(txt, 'game-koin')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              const side = Math.floor(Math.random() * (25 - 1) + 1);
              if (side == 1) {
                fn.sendStickerfromUrl(toId, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', {
                  method: 'get'
                })
                const random = 500
                reply('you got jackpot $' + random + ' from flip coin')
                addBal(serial, random)
                limitAdd(serial)
              } else {
              	await reply('maaf anda belum beruntung')
                limitAdd(serial)
              }
            } else if (getComs(txt, 'game-dadu')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              const dice = Math.floor(Math.random() * 72) + 1
              limitAdd(serial)
              if (dice == 6) {
              	await fn.sendStickerfromUrl(toId, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
                const random = 1500
                reply('you got jackpot $' + random + ' from rolling dice')
                addBal(serial, random)
              } else {
              	const x = Math.floor(Math.random() * 5) + 1
              	reply('hasil kocokan dadu keluar angka '+x+' maaf anda belum beruntung')
              }
            } else if (getComs(txt, 'game-ngelonte')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              const random = Math.floor(Math.random() * (100 - 1) + 1);
              reply('you got $' + random + ' from ngelonte')
              addBal(serial, random)
              limitAdd(serial)
            } else if (getComs(txt, 'game-caklontong')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              try {
                const resp = await axios.get('https://api.vhtear.com/funkuis&apikey=' + Premapikey)
                if (resp.data.error) return reply(resp.data.error)
                const anm2 = `Soal : ${resp.data.result.soal}\nPoin : ${resp.data.result.poin}`
                const jwban = `Jawaban : ${resp.data.result.jawaban}`
                reply(anm2)
                reply(`30 Detik Lagi...`, id)
                await sleep(10000)
                reply(`20 Detik Lagi...`, id)
                await sleep(10000)
                reply(`10 Detik Lagi...`, id)
                await sleep(10000)
                reply(jwban)
                limitAdd(serial)
              } catch (err) {
                reply(err.message)
              }
            } else if (getComs(txt, 'game-tebakgambar')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              try {
                const resp = await axios.get('https://api.vhtear.com/tebakgambar&apikey=' + Premapikey)
                if (resp.data.error) return reply(resp.data.error)
                const jwban = `Jawaban : ${resp.data.result.jawaban}`
                console.log(jwban)
                tebakgambarjawaban = jwban
                await fn.sendFileFromUrlWithMention(from, resp.data.result.soalImg, 'tebakgambar.jpg', '@'+serial.replace('@c.us',''), id)
                reply(`10 Detik Lagi...`, id)
                await sleep(10000)
                reply(`5 Detik Lagi...`, id)
                await sleep(5000)
                reply(jwban)
                limitAdd(serial)
              } catch (err) {
                reply(err.message)
              }
            } else if (getComs(txt, 'game-family100')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              try {
                const resp = await axios.get('https://api.vhtear.com/family100&apikey=' + Premapikey)
                if (resp.data.error) return reply(resp.data.error)
                const anm2 = `${resp.data.result.soal}`
                const jwban = `${resp.data.result.jawaban}`
                const jancok = {
                  soal: `${resp.data.result.soal}`,
                  jawaban: `${resp.data.result.jawaban}`
                }
                gametebakan[toId] = [
                  await fn.reply(toId, `Jawablah soal ini: *${anm2}*`, message.id),
                  jancok, 4,
                  setTimeout(() => {
                    if (gametebakan[toId]) fn.reply(toId, `Waktu habis!\nJawabannya adalah ${jwban}`, gametebakan[toId][0])
                    delete gametebakan[toId]
                  }, 30000)
                ]
                limitAdd(serial)
              } catch (err) {
                reply(err.message)
              }
            } else if (getPrefix(txt, 'game-tod')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return reply('gunakan '+settings.sname+'tod truth atau '+settings.sname+'tod dare')
              if (args.length >= 1 && args[0] === 'truth') {
                fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/truth.txt')
                  .then(res => res.text())
                  .then(body => {
                    let truthx = body.split('\n')
                    let truthz = truthx[Math.floor(Math.random() * truthx.length)]
                    reply(truthz)
                  })
                  .catch((err) => {
                    reply(err)
                  })
              } else if (args.length >= 1 && args[0] === 'dare') {
                fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/dare.txt')
                  .then(res => res.text())
                  .then(body => {
                    let darex = body.split('\n')
                    let darez = darex[Math.floor(Math.random() * darex.length)]
                    reply(darez)
                  })
                  .catch((err) => {
                    reply(err)
                  })
              } 
            } else if (getPrefix(txt, 'game-suit')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              limitAdd(serial)
              if (args.length === 0) return reply('gunakan '+settings.rname+'suit batu atau '+settings.rname+'suit gunting atau '+settings.rname+'suit kertas')
            	const game = ["batu", "gunting", "kertas"]
            	const random = randomChoice(game)
              if (args.length >= 1 && args[0] === 'batu') {
              	if (random == "batu") {
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "kamu seri dengan bot!\n"
              		reply(tx)
              	} else if (random == "kertas") {
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "kamu kalah dari bot!\n"
              		reply(tx)
              	} else if (random == "gunting") {
              		const xxx = Math.floor(Math.random() * (150 - 1) + 1);
		              addBal(serial, xxx)
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "selamat kamu mendapat $"+xxx+" karena menang dari bot!\n"
              		reply(tx)
              	}
              } else if (args.length >= 1 && args[0] === 'gunting') {
              	if (random == "batu") {
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "kamu seri dengan bot!\n"
              		reply(tx)
              	} else if (random == "gunting") {
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "kamu kalah dari bot!\n"
              		reply(tx)
              	} else if (random == "kertas") {
              		const xxx = Math.floor(Math.random() * (150 - 1) + 1);
		              addBal(serial, xxx)
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "selamat kamu mendapat $"+xxx+" karena menang dari bot!\n"
              		reply(tx)
              	}
              } else if (args.length >= 1 && args[0] === 'kertas') {
              	if (random == "kertas") {
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "kamu seri dengan bot!\n"
              		reply(tx)
              	} else if (random == "gunting") {
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "kamu kalah dari bot!\n"
              		reply(tx)
              	} else if (random == "batu") {
              		const xxx = Math.floor(Math.random() * (150 - 1) + 1);
		              addBal(serial, xxx)
              		let tx = "hasil:\n"
              		tx += "bot: "+random+"\n"
              		tx += "selamat kamu mendapat $"+xxx+" karena menang dari bot!\n"
              		reply(tx)
              	}
              } 
            } else if (getPrefix(txt, 'game-math')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial) || isLimitGame(serial)) return
              limitAddGame(serial)
              if (args.length < 1) return reply('Mode: noob | easy | medium | hard | extreme\n\nContoh penggunaan: ' + settings.sname + 'game-math noob')
              let mode = args[0].toLowerCase()
              if (!(mode in modes)) return reply('Mode: noob | easy | medium | hard | extreme\n\nContoh penggunaan: ' + settings.rname + 'game-math noob')
              let id = toId
              if (id in gamematematika) return fn.reply(toId, 'Masih ada soal belum terjawab di chat ini', gamematematika[id][0])
              let math = genMath(mode)
              gamematematika[id] = [
                await fn.reply(toId, `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed()} detik\nPoint Jawaban Benar: ${math.bonus} Point`, message.id),
                math, 4,
                setTimeout(() => {
                  if (gamematematika[id]) fn.reply(toId, `Waktu habis!\nJawabannya adalah ${math.result}`, gamematematika[id][0])
                  delete gamematematika[id]
                }, math.time)
              ]
              limitAdd(serial)
            } else if (getPrefix(txt, 'ngecit')) {
              if (isMediaCooldown(serial)) return
              addCooldown(toId)
              if (isLimit(serial)) return
              if (!isSadmin) return
              const random = parseInt(args[0])
              fn.sendTextWithMentions(from, 'hei @' + serial.replace('@c.us', '') + '\nyou got $' + random + ' hasil dari ngecit')
              addBal(serial, random)
              limitAdd(serial)
            } 
            if (getComs(txt, 'limit')) {
              if (isLimit(serial)) return
              var found = false
              for (let lmt of x4.limit) {
                if (lmt.id === serial) {
                  reply(`sisa credit penggunaan bot anda adalah: *${lmt.limit}*`)
                  found = true
                }
              }
              if (found === false) {
                let obj = {
                  id: `${serial}`,
                  limit: settings.limitCount
                };
                x4.limit.push(obj);
                dumpLimit()
                reply(`sisa credit penggunaan bot anda adalah: ` + settings.limitCount)
              }
            } else if (getComs(txt, 'count')) {
              if (isLimit(serial)) return
              var found = false
              for (let lmt of x7.hitcount) {
                if (lmt.id === serial) {
                  reply(`jumlah penggunaan bot anda adalah: *${lmt.counts}*`)
                  found = true
                }
              }
              if (found === false) {
                let obj = {
                  id: `${serial}`,
                  counts: 0
                };
                x7.hitcount.push(obj);
                dumpCount()
                reply(`jumlah penggunaan bot anda adalah: 0`)
              }
            } else if (getComs(txt, 'random ayat')) {
              if (isLimit(serial)) return
              const response = await axios.get('https://api.quran.sutanlab.id/surah')
              const {
                data
              } = response.data
              nmr = Math.floor(Math.random() * 115);
              maks = data[nmr - 1].numberOfVerses
              ayat = Math.floor(Math.random() * maks) + 1;
              if (!isNaN(nmr)) {
                const responsi2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                const {
                  data
                } = responsi2.data
                var last = function last(array, n) {
                  if (array == null) return void 0;
                  if (n == null) return array[array.length - 1];
                  return array.slice(Math.max(array.length - n, 0));
                };
                bhs = last(argh)
                pesan = ""
                pesan = pesan + data.text.arab + "\n\n"
                if (bhs == "en") {
                  pesan = pesan + data.translation.en
                } else {
                  pesan = pesan + data.translation.id
                }
                pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + ayat + ")"
                reply(pesan)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'info surah')) {
              if (isLimit(serial)) return
              if (args.length === 1) return reply("*Daftar Nomor Surah*\n\n1. Al-Fatihah\n2. Al-Baqarah\n3. Ali ‘Imran\n4. An-Nisa’\n5. Al-Ma’idah\n6. Al-An’am\n7. Al-A’raf\n8. Al-Anfal\n9. At-Taubah\n10. Yunus\n11. Hud\n12. Yusuf\n13. Ar-Ra’d\n14. Ibrahim\n15. Al-Hijr\n16. An-Nahl\n17. Al-Isra’\n18. Al-Kahf\n19. Maryam\n20. Ta Ha\n21. Al-Anbiya\n22. Al-Hajj\n23. Al-Mu’minun\n24. An-Nur\n25. Al-Furqan\n26. Asy-Syu’ara’\n27. An-Naml\n28. Al-Qasas\n29. Al-‘Ankabut\n30. Ar-Rum\n31. Luqman\n32. As-Sajdah\n33. Al-Ahzab\n34. Saba’\n35. Fatir\n36. Ya Sin\n37. As-Saffat\n38. Sad\n39. Az-Zumar\n40. Al-Mu’min\n41. Fussilat\n42. Asy-Syura\n43. Az-Zukhruf\n44. Ad-Dukhan\n45. Al-Jasiyah\n46. Al-Ahqaf\n47. Muhammad\n48. Al-Fath\n49. Al-Hujurat\n50. Qaf\n51. Az-Zariyat\n52. At-Tur\n53. An-Najm\n54. Al-Qamar\n55. Ar-Rahman\n56. Al-Waqi’ah\n57. Al-Hadid\n58. Al-Mujadilah\n59. Al-Hasyr\n60. Al-Mumtahanah\n61. As-Saff\n62. Al-Jumu’ah\n63. Al-Munafiqun\n64. At-Tagabun\n65. At-Talaq\n66. At-Tahrim\n67. Al-Mulk\n68. Al-Qalam\n69. Al-Haqqah\n70. Al-Ma’arij\n71. Nuh\n72. Al-Jinn\n73. Al-Muzzammil\n74. Al-Muddassir\n75. Al-Qiyamah\n76. Al-Insan\n77. Al-Mursalat\n78. An-Naba’\n79. An-Nazi’at\n80. ‘Abasa\n81. At-Takwir\n82. Al-Infitar\n83. Al-Tatfif\n84. Al-Insyiqaq\n85. Al-Buruj\n86. At-Tariq\n87. Al-A’la\n88. Al-Gasyiyah\n89. Al-Fajr\n90. Al-Balad\n91. Asy-Syams\n92. Al-Lail\n93. Ad-Duha\n94. Al-Insyirah\n95. At-Tin\n96. Al-‘Alaq\n97. Al-Qadr\n98. Al-Bayyinah\n99. Az-Zalzalah\n100. Al-‘Adiyat\n101. Al-Qari’ah\n102. At-Takasur\n103. Al-‘Asr\n104. Al-Humazah\n105. Al-Fil\n106. Quraisy\n107. Al-Ma’un\n108. Al-Kausar\n109.Al-Kafirun\n110. An-Nasr\n111. Al-Lahab\n112. Al-Ikhlas\n113. Al-Falaq\n114. An-Nas")
              if (body.length > 11) {
                const respons = await axios.get('https://api.quran.sutanlab.id/surah')
                const {
                  data
                } = respons.data
                const responsi = await axios.get('https://al-quran-8d642.firebaseio.com/data.json')
                var idx = data.findIndex(function (post, index) {
                  if (post.name.transliteration.id.toLowerCase() == argh[2].toLowerCase())
                    return true;
                });
                const audio = responsi.data
                var indx = audio.findIndex(function (post, index) {
                  if (post.nomor == idx)
                    return true;
                });
                var pesan = ""
                pesan = pesan + "Nama : " + data[idx].name.transliteration.id + "\n" + "Asma : " + data[idx].name.short + "\n" + "Arti : " + data[idx].name.translation.id + "\n" + "Jumlah ayat : " + data[idx].numberOfVerses + "\n" + "Nomor surah : " + data[idx].number + "\n" + "Jenis : " + data[idx].revelation.id + "\n" + "Keterangan : " + data[idx].tafsir.id
                reply(pesan)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'surah')) {
              if (isLimit(serial)) return
              if (args.length === 0) return reply(`Bismillah.. Halo *${pushname}*\n\nBerikut adalah menu yang bisa dipakai\n\n*.info surah <nama surah>*\nMenampilkan informasi lengkap mengenai surah tertentu. Contoh penggunan: .info surah al-baqarah\n\n*.surah <nama surah> <ayat>*\nMenampilkan ayat Al-Qur'an tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : .surah al-fatihah 1\n*.surah <nama surah> <ayat> en*\nMenampilkan ayat Al-Qur'an tertentu beserta terjemahannya dalam bahasa Inggris. Contoh penggunaan : .surah al-fatihah 1 en\n\n*.tafsir <nama surah> <ayat>*\nMenampilkan ayat Al-Qur'an tertentu beserta terjemahan dan tafsirnya dalam bahasa Indonesia. Contoh penggunaan : .tafsir al-fatihah 1\n\n*.murottal <nama surah>*\nMenampilkan tautan dari audio surah tertentu. Contoh penggunaan : .murottal al-fatihah\n*.murottal <nama surah> <ayat>*\nMengirim audio surah dan ayat tertentu. Contoh penggunaan : .murottal al-fatihah 1`)
              if (body.length > 6) {
                const response = await axios.get('https://api.quran.sutanlab.id/surah')
                const {
                  data
                } = response.data
                var idx = data.findIndex(function (post, index) {
                  if ((post.name.transliteration.id.toLowerCase() == argh[1].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == argh[1].toLowerCase()))
                    return true;
                });
                nmr = data[idx].number
                if (!isNaN(nmr)) {
                  const responsi2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + argh[2])
                  const {
                    data
                  } = responsi2.data
                  var last = function last(array, n) {
                    if (array == null) return void 0;
                    if (n == null) return array[array.length - 1];
                    return array.slice(Math.max(array.length - n, 0));
                  };
                  bhs = last(argh)
                  pesan = ""
                  pesan = pesan + data.text.arab + "\n\n"
                  if (bhs == "en") {
                    pesan = pesan + data.translation.en
                  } else {
                    pesan = pesan + data.translation.id
                  }
                  pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + argh[2] + ")"
                  reply(pesan)
                  limitAdd(serial)
                }
              }
            } else if (getPrefix(txt, 'tafsir')) {
              if (isLimit(serial)) return
              if (body.length > 7) {
                const respons = await axios.get('https://api.quran.sutanlab.id/surah')
                const {
                  data
                } = respons.data
                var idx = data.findIndex(function (post, index) {
                  if (post.name.transliteration.id.toLowerCase() == argh[1].toLowerCase())
                    return true;
                });
                nmr = data[idx].number
                if (!isNaN(nmr)) {
                  const responsi = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + argh[2])
                  const {
                    data
                  } = responsi.data
                  pesan = ""
                  pesan = pesan + "Tafsir Q.S. " + data.surah.name.transliteration.id + ":" + argh[2] + "\n\n"
                  pesan = pesan + data.text.arab + "\n\n"
                  pesan = pesan + "_" + data.translation.id + "_" + "\n\n" + data.tafsir.id.long
                  reply(pesan)
                  limitAdd(serial)
                }
              }
            } else if (getPrefix(txt, 'murottal')) {
              if (isLimit(serial)) return
              ayat = "ayat"
              bhs = ""
              if (body.length > 9) {
                const response = await axios.get('https://api.quran.sutanlab.id/surah')
                const surah = response.data
                var idx = surah.data.findIndex(function (post, index) {
                  if ((post.name.transliteration.id.toLowerCase() == argh[1].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == argh[1].toLowerCase()))
                    return true;
                });
                nmr = surah.data[idx].number
                if (!isNaN(nmr)) {
                  if (argh.length > 3) {
                    ayat = argh[2]
                  }
                  if (argh.length == 3) {
                    var last = function last(array, n) {
                      if (array == null) return void 0;
                      if (n == null) return array[array.length - 1];
                      return array.slice(Math.max(array.length - n, 0));
                    };
                    ayat = last(argh)
                  }
                  pesan = ""
                  if (isNaN(ayat)) {
                    const responsi2 = await axios.get('https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/' + nmr + '.json')
                    const {
                      name,
                      name_translations,
                      number_of_ayah,
                      number_of_surah,
                      recitations
                    } = responsi2.data
                    pesan = pesan + "Audio Quran Surah ke-" + number_of_surah + " " + name + " (" + name_translations.ar + ") " + "dengan jumlah " + number_of_ayah + " ayat\n"
                    pesan = pesan + "1. Dilantunkan oleh " + recitations[0].name + " :\n    " + recitations[0].audio_url + "\n\n"
                    pesan = pesan + "2. Dilantunkan oleh " + recitations[1].name + " :\n    " + recitations[1].audio_url + "\n\n"
                    pesan = pesan + "3. Dilantunkan oleh " + recitations[2].name + " :\n    " + recitations[2].audio_url + "\n"
                    reply(pesan)
                    limitAdd(serial)
                  } else {
                    const responsi2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                    const {
                      data
                    } = responsi2.data
                    var last = function last(array, n) {
                      if (array == null) return void 0;
                      if (n == null) return array[array.length - 1];
                      return array.slice(Math.max(array.length - n, 0));
                    };
                    bhs = last(argh)
                    pesan = ""
                    pesan = pesan + data.text.arab + "\n\n"
                    if (bhs == "en") {
                      pesan = pesan + data.translation.en
                    } else {
                      pesan = pesan + data.translation.id
                    }
                    pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + argh[2] + ")"
                    await fn.sendFileFromUrl(toId, data.audio.secondary[0])
                    await reply(pesan)
                    limitAdd(serial)
                  }
                }
              }
            } else if (getComs(txt, 'tnc')) {
              let text = `Hi, ${pushname}!\n\n`
              let prefix = settings.rname
              text += "*=================================*\n"
              text += "*BOT ini mendapat sponsor dari :*\n"
              text += "*Beli VPS hosting / Dedicated hosting / RDP bulanan, tahunan, Mantab dan Murah.*\n"
              text += "*Langsung Order http://bit.ly/order_bang*\n"
              text += "*=================================*\n\n"
              text += "Use '" + prefix + "commands' for user guide\n"
              text += "\n*Terms and conditions*\n*Your texts and your whatsapp username will be stored on our servers as long as the bot is active, your data will be erased when the bot goes offline. We do NOT store the images, videos, audio files and documents you send. We will never ask you to sign up or ask you for any of your passwords, OTPs or PINs. Thank you, Have a great day!*"
              text += "\n\n*Bot By: FN*"
              reply(text)
            } else if (getComs(txt, 'snk')) {
              let text = `Hi, ${pushname}!\n\n`
              let prefix = settings.sname
              text += "*=================================*\n"
              text += "*BOT ini mendapat sponsor dari :*\n"
              text += "*Beli VPS hosting / Dedicated hosting / RDP bulanan, tahunan, Mantab dan Murah.*\n"
              text += "*Langsung Order http://bit.ly/order_bang*\n"
              text += "*=================================*\n\n"
              text += "Use '" + prefix + "commands' for user guide\n"
              text += "\n*Terms and conditions*\n*Your texts and your whatsapp username will be stored on our servers as long as the bot is active, your data will be erased when the bot goes offline. We do NOT store the images, videos, audio files and documents you send. We will never ask you to sign up or ask you for any of your passwords, OTPs or PINs. Thank you, Have a great day!*"
              text += "\n\n*Bot By: FN*"
              reply(text)
            } else if (getComs(txt, 'listchat')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const udud = x5.chat
              mychat = udud
              let anu = "Chatbot list:\n"
              let nom = 1
              for (let i in udud) {
                anu += "\n{0}. {1}".format(nom, i)
                nom += 1
              }
              reply(anu)
            } else if (getComs(txt, 'listcontact')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const udud = x3.contact
              let anu = "contact list:\n"
              let nom = 1
              for (let i in udud) {
                anu += "\n{0}. {1}".format(nom, i)
                nom += 1
              }
              reply(anu)
            } else if (getComs(txt, 'listimage')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const udud = x1.image
              let anu = "Image list:\n"
              let nom = 1
              for (let i in udud) {
                anu += "\n{0}. {1}".format(nom, i)
                nom += 1
              }
              reply(anu)
            } else if (getComs(txt, 'liststicker')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const udud = x6.sticker
              let anu = "Sticker list:\n"
              let nom = 1
              for (let i in udud) {
                anu += "\n{0}. {1}".format(nom, i)
                nom += 1
              }
              reply(anu)
            } else if (getComs(txt, 'listaudio')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const udud = x2.video
              let anu = "audio list:\n"
              let nom = 1
              for (let i in udud) {
                anu += "\n{0}. {1}".format(nom, i)
                nom += 1
              }
              reply(anu)
            } else if (getPrefix(txt, 'kbbi')) {
              if (isLimit(serial)) return
              if (args.length > 2) return reply('Maaf, perintah tidak valid')
              const {
                spawn
              } = require('child_process');

              function kbbi(kata) {
                return new Promise((resolve, reject) => {
                  const hasil = spawn('kbbi', [kata])
                  hasil.stdout.setEncoding('utf8')
                  hasil.stdout.on('data', function (data) {
                    return resolve(data.toString())
                  });
                })
              }
              kbbi(args[0]).then(res => {
                reply(res)
                limitAdd(serial)
              }).catch(err => reply(err))
            } else if (getPrefix(txt, 'mbah') || getPrefix(txt, 'googlesearch')) {
              if (isLimit(serial)) return
              var googleQuery = body.slice(6)
              if (googleQuery == undefined || googleQuery == ' ') return
              google({
                query: googleQuery,
                disableConsole: true,
                limit: 2
              }).then(results => {
                let vars = results[0];
                console.log(vars)
                reply(`*Hasil Pencarian Google*\n\nJudul : \n${vars.title}\n\nDeskripsi : \n${vars.snippet}\n\nLink : \n${vars.link}\n\n` + autocommand)
              }).catch(e => {
                console.log(e)
              })
              limitAdd(serial)
            } else if (getPrefix(txt, 'reference') || getPrefix(txt, 'github') || getPrefix(txt, 'stackoverflow')) {
              if (isLimit(serial)) return
              var googleQuery = arg
              if (googleQuery == undefined || googleQuery == ' ') return
              google({
                query: googleQuery,
                disableConsole: true,
                'stackoverflow-github-only': true,
                limit: 2
              }).then(results => {
                let vars = results[0];
                console.log(vars)
                reply(`*Hasil*\n\nJudul : \n${vars.title}\n\nDeskripsi : \n${vars.snippet}\n\nLink : \n${vars.link}\n\n` + autocommand)
              }).catch(e => {
                console.log(e)
              })
              limitAdd(serial)
            } else if (getPrefix(txt, 'quotes')) {
              if (isLimit(serial)) return
              if (args.length === 0) {
                const data = fs.readFileSync('./db/quotes.json');
                const jsonData = JSON.parse(data);
                const randIndex = Math.floor(Math.random() * jsonData.length);
                const randKey = jsonData[randIndex];
                reply(`${randKey.quote} - ${randKey.by}`)
                limitAdd(serial)
              } else if (args.length === 1 && args[0] === 'anime') {
                const data = animeQuotes.randomQuote()
                let xr = `quotes: ${data.quote}\n`
                xr += `anime: ${data.anime}\n`
                xr += `name: ${data.name}`
                reply(xr)
                limitAdd(serial)
              } else if (args.length === 1 && args[0] === 'bijak') {
                await request.get({
                  headers: {
                    'user-agent': 'Mozilla/5.0 (Linux; Android 8.1.0; vivo 1820) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36'
                  },
                  url: 'https://jagokata.com/kata-bijak/acak.html',
                }, function (error, response, body) {
                  let $ = cheerio.load(body);
                  var author = $('a[class="auteurfbnaam"]').contents().first().text();
                  var kata = $('q[class="fbquote"]').contents().first().text();
                  reply(`${kata}\n\n${author}`)
                  limitAdd(serial)
                })
              } else if (args.length === 1 && args[0] === 'cinta') {
                fetch('https://raw.githubusercontent.com/rebahanelite/random/main/quotes.txt')
                  .then(res => res.text())
                  .then(body => {
                    let tod = body.split("\n");
                    let pjr = tod[Math.floor(Math.random() * tod.length)];
                    reply(pjr);
                    limitAdd(serial)
                  });
              } else if (args.length === 1 && args[0] === 'motivasi') {
                fetch('https://raw.githubusercontent.com/rebahanelite/random/main/quotes.txt')
                  .then(res => res.text())
                  .then(body => {
                    let tod = body.split("\n");
                    let pjr = tod[Math.floor(Math.random() * tod.length)];
                    reply(pjr);
                    limitAdd(serial)
                  });
              } else if (args.length === 1 && args[0] === 'bacot') {
                axios.get('http://pesananmaskevin.herokuapp.com/data/quote.php')
                  .then(function (response) {
                    reply(`${response.data}\n\n*${BotName} Bacot*`).catch((err) => console.log(err))
                    limitAdd(serial)
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              }
            } else if (getComs(txt, 'meme')) {
              if (isLimit(serial)) return
              const {
                title,
                url
              } = await fetchMeme()
              await fn.sendFileFromUrl(toId, `${url}`, 'meme.jpg', `${title}\n\n` + autocommand).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getComs(txt, '1cak')) {
              if (isLimit(serial)) return
              const query = ["1cak", "meme rage comic indonesia"]
              const urlss = 'https://api.vhtear.com/googleimg?query=' + randomChoice(query) + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = shuffle(pp.result.result_search)
              for (var ia = 1; ia < cok.length; ia++) {
                await fn.sendFileFromUrl(toId, `${cok[ia]}`, 'google.jpg', autocommand)
                if (ia === 1) break;
              }
              limitAdd(serial)
            } else if (getPrefix(txt, 'togel')) {
              if (isLimit(serial)) return
              if (args.length === 0) {
                try {
                  const urlss = 'https://api.vhtear.com/togel&apikey=' + Premapikey
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const cok = pp.result.hasil
                  let dat = "*Togel / Lottery*\n\n"
                  for (var io = 0; io < cok.length; io++) {
                    let no = io
                    dat += `${no}). ${cok[io].Negara}\n`
                  }
                  dat += "\n\n" + autocommand
                  reply(dat)
                  limitAdd(serial)
                } catch (err) {
                  return console.log('CMD TOGEL ERROR')
                }
              } else {
                try {
                  const query = arg
                  const urlss = 'https://api.vhtear.com/togel&apikey=' + Premapikey
                  const response = await fetch(urlss)
                  const pp = await response.json()
                  const cok = pp.result.hasil
                  let dat = "*Togel / Lottery*\n"
                  for (var io = 0; io < cok.length; io++) {
                    if (query.toUpperCase() == cok[io].Negara) {
                      dat += "\n*_" + cok[io].Negara + "_*:"
                      dat += "\n  ✧ " + cok[io].Senin
                      dat += "\n  ✧ " + cok[io].Selasa
                      dat += "\n  ✧ " + cok[io].Rabu
                      dat += "\n  ✧ " + cok[io].Kamis
                      dat += "\n  ✧ " + cok[io].Jumat
                      dat += "\n  ✧ " + cok[io].Sabtu
                      dat += "\n  ✧ " + cok[io].Minggu
                      dat += "\n\n" + autocommand
                    }
                  }
                  reply(dat)
                  limitAdd(serial)
                } catch (err) {
                  return
                }
              }
            } else if (getPrefix(txt, 'resep')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = arg
              try {
                const urlss = 'https://api.vhtear.com/resepmasakan?query=' + query + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                let dat = "*" + cok.title + "*: \n"
                dat += "\n" + cok.bahan
                dat += "\n" + cok.cara
                dat += "\n\n" + autocommand
                await reply(dat)
                limitAdd(serial)
              } catch (err) {
                return console.log('CMD RESEP ERROR')
              }
            } else if (getPrefix(txt, 'shopee')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = txt.replace('shopee' + " ", "")
              const barang = query.split("|")
              const hasil = barang[0]
              const value = Number(barang[1])
              const urlss = 'https://api.vhtear.com/shopee?query=' + hasil + '&count=10&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.items
              if (barang.length == 1) {
                let dat = "*Shopee Search Product*"
                for (var o = 1; o < cok.length; o++) {
                  let no = o
                  dat += `\n\n*${no}*.` + " " + cok[o].nama + " | *_" + cok[o].harga.replace(" ", "") + "_*"
                }
                dat += "\n\n*To see detail*: " + settings.sname + "shopee " + hasil + "| nomer"
                await reply(dat)
                limitAdd(serial)
              } else if (barang.length == 2) {
                let dat = "*_Detail Product_*\n"
                dat += "\n*" + cok[value].nama + "*"
                dat += "\n*Harga*: " + cok[value].harga.replace(" ", "")
                dat += "\n*Terjual*: " + cok[value].terjual
                dat += "\n*Lokasi*: " + cok[value].shop_location
                dat += "\n*Description*: " + cok[value].description
                dat += "\n*Link*: " + cok[value].link_product
                dat += "\n\n" + autocommand
                await fn.sendFileFromUrl(toId, cok[value].image_cover, 'shopeedetail.jpg', dat)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'tts')) {
              if (isLimit(serial)) return
              if (quotedMsg) {
                dataText = quotedMsg.body
                const ttsId = require('node-gtts')('id')
                if (dataText.length >= 500) return reply('INI NAMANYA SPAM TOLOL, KEPANJANGAN GOBLOK! MIKIR LO OTAK DIPAKE BUKAN BUAT PAJANGAN DOANG. ANJENG EMANG!')
                ttsId.save('./media/resId.mp3', dataText, function () {
                  fn.sendPtt(toId, './media/resId.mp3', message.id)
                  limitAdd(serial)
                })
              } else {
                if (args.length === 0) return
                const ttsId = require('node-gtts')('id')
                const dataText = arg
                if (dataText.length >= 500) return reply('INI NAMANYA SPAM TOLOL, KEPANJANGAN GOBLOK! MIKIR LO OTAK DIPAKE BUKAN BUAT PAJANGAN DOANG. ANJENG EMANG!')
                ttsId.save('./media/resId.mp3', dataText, function () {
                  fn.sendPtt(toId, './media/resId.mp3', message.id)
                  limitAdd(serial)
                })
              }
            } else if (getPrefix(txt, 'image')) {
              if (isSadmin || master || vip || premium) return
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = arg
              if (query.includes('jilboob') || query.includes('Kontol') || query.includes('Payudara') || query.includes('Pentil') || query.includes('Open BO') || query.includes('VCS') || query.includes('Anal') || query.includes('Ass') || query.includes('Lesbi') || query.includes('NSFW') || query.includes('SEX') || query.includes('Gay') || query.includes('69') || query.includes('Boob') || query.includes('Creampie') || query.includes('Nhentai') || query.includes('Bigtit') || query.includes('JAV') || query.includes('Pussy') || query.includes('Bokep') || query.includes('Tetek') || query.includes('Memek') || query.includes('Meki') || query.includes('Bugil') || query.includes('Bokong') || query.includes('Hentai') || query.includes('Toge') || query.includes('Toket') || query.includes('Colmek') || query.includes('Sange')) return reply('gaboleh nyari yang beginian cil, nanti dimarahin emak!')
              if (query.includes('Jilboob') || query.includes('kontol') || query.includes('payudara') || query.includes('pentil') || query.includes('open bo') || query.includes('vcs') || query.includes('anal') || query.includes('ass') || query.includes('lesbi') || query.includes('nsfw') || query.includes('sex') || query.includes('gay') || query.includes('69') || query.includes('boob') || query.includes('creampie') || query.includes('nhentai') || query.includes('bigtit') || query.includes('jav') || query.includes('pussy') || query.includes('bokep') || query.includes('tetek') || query.includes('memek') || query.includes('meki') || query.includes('bugil') || query.includes('bokong') || query.includes('hentai') || query.includes('toge') || query.includes('toket') || query.includes('colmek') || query.includes('sange')) return reply('gaboleh nyari yang beginian cil, nanti dimarahin emak!')
              const urlss = 'https://api.vhtear.com/googleimg?query=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = shuffle(pp.result.result_search)
              for (var ia = 1; ia < cok.length; ia++) {
                await fn.sendFileFromUrl(toId, `${cok[ia]}`, 'google.jpg', autocommand)
                if (ia === 7) break;
              }
              limitcok(serial)
            } else if (getPrefix(txt, 'joox')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = arg
              try {
                const urlss = 'https://api.vhtear.com/music?query=' + query + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                let dat = "*JOOX MUSIC*\n"
                for (var iu = 0; iu < cok.length; iu++) {
                  dat += "\n*_Title_*: " + cok[iu].judul
                  dat += "\n*_Artis_*: " + cok[iu].penyanyi
                  dat += "\n*_Duration_*: " + cok[iu].duration
                  dat += "\n*_Size_*: " + cok[iu].filesize
                  dat += "\n\n" + autocommand
                  await fn.sendFileFromUrl(toId, `${cok[iu].linkImg}`, 'joox.jpg', dat)
                  await fn.sendFileFromUrl(toId, `${cok[iu].linkMp3}`, `${t}` + '.mp3', message.id)
                }
                limitcok(serial)
              } catch (err) {
                return console.log(err.message)
              }
            } else if (getPrefix(txt, 'ytplay')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = args[0]
              const apikey = 'fn'
              const urlss = 'https://rest.farzain.com/api/yt_download.php?id=' + query + '&apikey=' + apikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.urls
              for (let i of ll) {
                if (i['ext'] == 'm4a') {
                  await fn.sendFileFromUrl(toId, i["id"], pp.title + '.m4a', message.id)
                  break
                }
              }
              limitcok(serial)
            } else if (getPrefix(txt, 'video')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = args[0]
              const urlss = 'https://api.vhtear.com/ytdl?link=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result.UrlVideo
              await fn.sendFileFromUrl(toId, ll, 'yt.mp3', autocommand, message.id)
              limitcok(serial)
            }
            if (getPrefix(txt, 'spotify')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              reply('sedang mencari lagu. tunggu sebentar....')
              if (args.length >= 10) return
              const lagu = arg;
              const r = await yts(lagu)
              const videos = r.videos.slice(0, 1)
              videos.forEach(function (v) {
                const idasa = `${ v.videoId }`
                const link = `${ v.url }`
                const title = `${ v.title }`
                const seconds = `${ v.seconds }`
                if (seconds < 3000) {
                  var YD = new YoutubeMp3Downloader({
                    "ffmpegPath": "/usr/bin/ffmpeg",
                    "outputPath": "./media",
                    "youtubeVideoQuality": "highestaudio",
                    "queueParallelism": 100,
                    "progressTimeout": 2000,
                    "allowWebm": false,
                    "outputOptions": ["-af", "silenceremove=1:0:-50dB"]
                  });
                  YD.download(idasa)
                  YD.on("finished", async function (err, data) {
                    await fs.copyFile(data.file, './media/k2.mp3').then(() => {
                      fn.sendFile(toId, './media/k2.mp3', `${data.file}.mp3`, autocommand, message.id).catch((err) => console.log(err))
                      limitcok(serial)
                    })
                  })
                  YD.on("error", function (error) {
                    console.log('ERROR YTMP3', error);
                  })
                } else {
                  reply('Maaf, Judul lagu tidak ditemukan atau Durasi terlalu panjang')
                }
              })
            } else if (getPrefix(txt, 'music')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              reply('sedang mencari lagu. tunggu sebentar....')
              if (args.length >= 10) return
              const lagu = arg;
              const r = await yts(lagu)
              const videos = r.videos.slice(0, 1)
              videos.forEach(function (v) {
                const idasa = `${ v.videoId }`
                const link = `${ v.url }`
                const title = `${ v.title }`
                const seconds = `${ v.seconds }`
                if (seconds < 3000) {
                  var YD = new YoutubeMp3Downloader({
                    "ffmpegPath": "/usr/bin/ffmpeg",
                    "outputPath": "./media",
                    "youtubeVideoQuality": "highestaudio",
                    "queueParallelism": 100,
                    "progressTimeout": 2000,
                    "allowWebm": false,
                    "outputOptions": ["-af", "silenceremove=1:0:-50dB"]
                  });
                  YD.download(idasa)
                  YD.on("finished", async function (err, data) {
                    await fs.copyFile(data.file, './media/k3.mp3').then(() => {
                      fn.sendFileFromUrl(toId, `${data.thumbnail}`, 'joox.jpg', `*Title: ${data.title}*\n*ID: ${data.videoId}*\n*URL: ${data.youtubeUrl}*\n\n\n` + autocommand, id).catch((err) => console.log(err))
                      fn.sendFile(toId, './media/k3.mp3', `${data.file}.mp3`, autocommand, message.id).catch((err) => console.log(err))
                      limitcok(serial)
                    })
                  })
                  YD.on("error", function (error) {
                    console.log('ERROR YTMP3', error);
                  })
                } else {
                  reply('Maaf, Judul lagu tidak ditemukan atau Durasi terlalu panjang')
                }
              })
            }
            if (getPrefix(aa, 'svideo')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = arg
              const urlss = 'https://api.vhtear.com/youtube?query=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              for (var a = 0; a < cok.length; a++) {
                const ssss = 'https://api.vhtear.com/ytdl?link=' + cok[a].urlyt + '&apikey=' + Premapikey
                const response = await fetch(ssss)
                const pl = await response.json()
                const ll = pl.result.UrlVideo
                const urx = await shortener(ll)
                await fn.sendFileFromUrl(toId, urx, pl.result.title + '.mp4', autocommand, id)
                limitcok(serial)
                if (a === 0) break;
              }
            }
            /*
            if (getPrefix(aa, 'music') || getPrefix(aa, 'spotify')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = arg
              const urlss = 'https://api.vhtear.com/youtube?query=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              for (var a = 0; a < cok.length; a++) {
                const ssss = 'https://api.vhtear.com/ytdl?link=' + cok[a].urlyt + '&apikey=' + Premapikey
                const response = await fetch(ssss)
                const pl = await response.json()
                const ll = pl.result.UrlMp3
                const urx = await shortener(ll)
                await fn.sendFileFromUrl(toId, urx, pl.result.title+'.m4a', autocommand, id)
                limitcok(serial)
                if (a === 0) break;
              }
            }
            */
            if (getPrefix(txt, 'audio') || getPrefix(txt, 'ytmp3')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (args.length >= 1) {
                let url = args[0]
                var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (!videoid) {
                  return reply("Maaf, url yang anda berikan tidak valid");
                }
                reply('sedang memproses url')
                fs.access('./media/' + videoid[1] + '.mp3', (err) => {
                  if (!err) {
                    fn.sendFile(toId, './media/' + videoid[1] + '.mp3', `${videoid[1]}.mp3`, id)
                    limitcok(serial);
                  } else {
                    async function ytmp3() {
                      ytdl.getInfo(videoid[1]).then(info => {
                        if (info.videoDetails.lengthSeconds > 1000) {
                          reply("Videonya terlalu panjang gan, coba yang lain :v")
                        } else {
                          let stream = ytdl(videoid[1], {
                            quality: 'highestaudio',
                            requestOptions: {
                              headers: {
                                cookie: ytCookie,
                                'x-youtube-identity-token': ytIdentity
                              }
                            }
                          })
                          stream.on('error', () => {
                            reply('Video tidak valid/sedang error')
                          })
                          ffmpeg(stream)
                            .audioCodec('libmp3lame')
                            .addOutputOptions('-qscale:a 5')
                            .save(`./media/${videoid[1]}.mp3`)
                            .on('end', () => {
                              reply(`*YTDownloader*\n\n➤ Judul : ${info.videoDetails.title}\n➤ Durasi : ${moments.duration(info.videoDetails.lengthSeconds, 'second').format('hh:mm:ss')}`)
                              fn.sendFile(toId, './media/' + videoid[1] + '.mp3', `${videoid[1]}.mp3`, 'Sukses!', id)
                            });
                          limitcok(serial);
                        }
                      }).catch(() => {
                        reply('Video tidak valid/sedang error')
                      })
                    }
                    ytmp3();
                  }
                })
              }
            } else if (getPrefix(txt, 'ytmp4') || getPrefix(txt, 'ytvideo')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              var videoid = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
              if (videoid != null) {} else {
                return reply("Videonya gavalid gan.");
              }
              fs.access('./media/' + videoid[1] + '.mp4', (err) => {
                if (!err) {
                  reply('sedang memproses url')
                  fn.sendFile(toId, `./media/${videoid[1]}.mp4`, 'hasil.mp4', autocommand, id);
                  limitcok(serial)
                } else {
                  ytdl.getInfo(videoid[0]).then(async info => {
                    if (info.videoDetails.lengthSeconds > 1000) {
                      const aaa = await shortener(info.formats[0].url)
                      reply("terlalu panjang.. kamu bisa download manual dengan klik link dibawah ini\n\n" + aaa)
                    } else {
                      const asu = ytdl(videoid[0], {
                        quality: '18',
                        requestOptions: {
                          headers: {
                            cookie: ytCookie,
                            'x-youtube-identity-token': ytIdentity
                          }
                        }
                      })
                      asu.on('error', () => {
                        reply('link tidak ada/tidak valid!')
                      })
                      ffmpeg(asu)
                        .addOutputOptions('-vcodec', 'h264', '-acodec', 'aac')
                        .save(`./media/${videoid[1]}.mp4`)
                        .on('end', () => {
                          fn.sendFile(toId, `./video/${videoid[1]}.mp4`, 'hasil.mp4', `*YTDownloader*\n\n➤ Judul : ${info.videoDetails.title}\n➤ Durasi : ${moments.duration(info.videoDetails.lengthSeconds, 'second').format('hh:mm:ss')}\n\n` + autocommand, id);
                          limitcok(serial)
                        })
                    }
                  }).catch(() => {
                    reply('link tidak ada/tidak valid!')
                  })
                }
              })
            } else if (getPrefix(txt, 'play') || getPrefix(txt, 'ytsearch')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              reply('sedang mencari lagu. tunggu sebentar....')
              if (args.length >= 10) return
              const lagu = arg;
              const r = await yts(lagu)
              const cok = r.videos.slice(0, 10)
              let dat = "*Youtube Search*"
              for (var a = 1; a < cok.length; a++) {
                if (a === 6) break;
                let no = a
                let mam = cok[a].title.substring(0, 20)
                dat += `\n\n*${a}*).` + " " + mam + "\n     ID: " + cok[a].videoId + "\n     URL: " + cok[a].url + "\n     Durasi: " + cok[a].timestamp + "\n     Desc: " + cok[a].description
              }
              dat += "\n\n*to download audio*: " + settings.sname + "ytplay < ID >"
              dat += "\n*to download video*: " + settings.sname + "ytvideo < URL >"
              reply(dat)
              limitAdd(serial)
            } else if (getPrefix(txt, 'twtdl') || getPrefix(txt, 'twitdl') || getPrefix(txt, 'twitterdl')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              const url = args[0]
              await reply('*Scraping Metadata...*')
              twitter(url).then(async(videoMeta) => {
                try {
                  if (videoMeta.type == 'video') {
                    const content = videoMeta.variants.filter(x => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                    await fn.sendFileFromUrl(toId, content[0].url, 'TwitterVideo.mp4', autocommand).catch((err) => console.log(err))
                  } else if (videoMeta.type == 'photo') {
                    for (let i = 0; i < videoMeta.variants.length; i++) {
                      await fn.sendFileFromUrl(toId, videoMeta.variants[i], videoMeta.variants[i].split('/media/')[1], autocommand, message.id).catch((err) => console.log(err))
                    }
                    limitcok(serial)
                  }
                } catch (err) {
                  return reply('Error, ' + err)
                }
              }).catch(() => {
                return reply('Maaf, link tidak valid atau tidak ada video di link yang kamu kirim')
              })
            } else if (getPrefix(txt, 'tiktokdl')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              const url = args[0]
              await reply('*Scraping Metadata...*')
              const urlss = 'https://api.vhtear.com/tiktokdl?link=' + url + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              await fn.sendFileFromUrl(toId, `${cok.video}`, BotName + '.mp4', autocommand)
              limitcok(serial)
            } else if (getPrefix(txt, 'smuledl')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const url = args[0]
              await reply('*Scraping Metadata...*')
              const urlss = 'https://api.vhtear.com/getsmule?link=' + url + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              await fn.sendFileFromUrl(toId, `${cok.url}`, BotName + '.mp3', id)
              limitAdd(serial)
            } else if (getPrefix(txt, 'facebook') || getPrefix(txt, 'fb')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              const url = args[0]
              await reply('*Scraping Metadata...*')
              const urlss = 'https://api.vhtear.com/fbdl?link=' + url + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              await fn.sendFileFromUrl(toId, `${cok.VideoUrl}`, BotName + '.mp4', autocommand)
              limitcok(serial)
            } else if (getPrefix(txt, 'magernulis')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              const text = quotedMsg ? quotedMsgObj.body.replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n') : body.slice(12).replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n')
              let lineBreaks = matchGroup.matchAll(text, /\n/gi)
              try {
                const {
                  spawn
                } = require('child_process')
                const nulis = async(word, id) => {
                  const text = wrap1(word, {
                    width: 60
                  })
                  spawn('convert', [
                      './image/template.jpg',
                      '-font',
                      './fonts/IndieFlower-Regular.ttf',
                      '-size',
                      '700x960',
                      '-pointsize',
                      '25',
                      '-interline-spacing',
                      '1',
                      '-annotate',
                      '+170+220',
                      text,
                      `./image/${id}.jpg`
                    ])
                    .on('close', function () {
                      fn.sendImage(from, `./image/${id}.jpg`, 'nulis.jpg', autocommand, id)
                      fs.unlink(`./image/${id}.jpg`).then(() => {})
                    })
                }
                if (lineBreaks.length >= 19) {
                  if (lineBreaks.length <= 19) {
                    await nulis(text, id)
                    limitcok(serial)
                  } else if (lineBreaks.length <= 38) {
                    let udud12 = text.substring(0, lineBreaks[19].index)
                    await nulis(udud12, id + '-1')
                    let udud23 = text.substring(lineBreaks[19].index, lineBreaks[lineBreaks.length - 1].index)
                    await nulis(udud23, id + '-2')
                    limitcok(serial)
                  } else {
                    return reply('Maaf, jumlah garis baru melebihi 2 lembar')
                  }
                } else if (text.length > 1055) {
                  if (text.length <= 1055) {
                    await nulis(text, id)
                    limitcok(serial)
                  } else if (text.length <= 2110) {
                    let udud12 = text.substring(0, 1055)
                    await nulis(udud12, id + '-1')
                    let udud23 = text.substring(1056, 2110)
                    await nulis(udud23, id + '-2')
                    limitcok(serial)
                  } else {
                    return reply('Maaf, jumlah kata melebihi 2 lembar')
                  }
                } else {
                  await nulis(text, id)
                  limitcok(serial)
                }
              } catch (error) {
                console.log(error)
              }
            } else if (getPrefix(txt, 'igprofile') || getPrefix(txt, 'igstalk')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (!args.length >= 1) return
              let usrname = args[0]
              if (!usrname) return
              if (usrname.substr(0, 1) == '@') {
                usrname = usrname.replace('@', '');
              }
              const urlss = 'https://api.vhtear.com/igprofile?query='+usrname+'&apikey='+Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              let x = "Nama Lengkap: "+cok.full_name
              x += "\nFollowing: "+cok.follow
              x += "\nFollowers: "+cok.follower
              x += "\nPrivate: "+cok.is_private
              x += "\nJumlah Post: "+cok.post_count
              x += "\nusername: "+cok.username
              x += "\nBiografi: "+cok.biography
              reply(x)
              limitAdd(serial)
            } else if (getPrefix(txt, 'igstory')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (args.length >= 3) return
              const query = arg
              const barang = query.split(" ")
              const hasil = barang[0]
              const value = Number(barang[1])
              await reply('*Scraping Metadata...*')
              const urlss = 'https://api.vhtear.com/igstory?query=' + hasil + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.story.itemlist
              if (barang.length == 1) {
                let dat = "*Instagram Story*"
                for (var ia = 0; ia < cok.length; ia++) {
                  let no = ia
                  const urlssa = await shortener(cok[ia].urlDownload)
                  dat += `\n\n*${ia}*). Type: ` + cok[ia].type + "\n     URL: " + urlssa
                }
                dat += "\n\n*to download story*: " + settings.sname + "igstory " + hasil + " *nomor*"
                reply(dat)
                limitcok(serial)
              } else if (barang.length == 2) {
                if (cok[value].type === 'video') {
                  await fn.sendFileFromUrl(toId, `${cok[value].urlDownload}`, 'google.mp4', autocommand)
                  limitcok(serial)
                }
                if (cok[value].type === 'image') {
                  await fn.sendFileFromUrl(toId, `${cok[value].urlDownload}`, 'google.jpg', autocommand)
                  limitcok(serial)
                }
              }
            } else if (getPrefix(txt, 'igpost')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (args.length > 2) return
              const url = args[0]
              if (!url.includes('instagram.com')) return reply('Maaf, link yang kamu kirim tidak valid.')
              await reply('*Scraping Metadata...*')
              const urlss = 'https://api.vhtear.com/instadl?link=' + url + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.post
              const coks = pp.result.caption
              if (coks == null) return coks == BotName
              for (var ia = 0; ia < cok.length; ia++) {
                if (cok[ia].type === 'video') {
                  await fn.sendFileFromUrl(toId, `${cok[ia].urlDownload}`, 'google.mp4', `Deskripsi: ` + coks + `\n\n` + autocommand)
                }
                if (cok[ia].type === 'image') {
                  await fn.sendFileFromUrl(toId, `${cok[ia].urlDownload}`, 'google.jpg', `Deskripsi: ` + coks + `\n\n` + autocommand)
                }
              }
              limitcok(serial)
            } else if (getPrefix(txt, 'igtv')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (args.length > 2) return
              const url = args.length !== 0 ? args[0] : ''
              await reply('*Scraping Metadata...*')
              const urlss = 'https://api.vhtear.com/igtv?query=' + url + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.igTv
              for (var ia = 0; ia < cok.length; ia++) {
                await fn.sendFileFromUrl(toId, `${cok[ia].urlVideo}`, 'google.mp4', `Deskripsi: ` + cok[ia].caption)
              }
              limitcok(serial)
            } else if (getPrefix(txt, 'ighastag')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (args.length >= 3) return
              const query = arg
              const barang = query.split(" ")
              const hasil = barang[0]
              const value = Number(barang[1])
              await reply('*Scraping Metadata...*')
              const urlss = 'https://api.vhtear.com/ighastag?query=' + hasil + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.data
              if (barang.length == 1) {
                let dat = "*Instagram Hastag*"
                for (var ia = 0; ia < cok.length; ia++) {
                  let no = ia
                  dat += `\n\n*${ia}*). username: ` + cok[ia].owner_username + "\n     desc: " + cok[ia].caption
                }
                dat += "\n\n*to download hastag*: " + settings.sname + "ighastag " + hasil + " *nomor*"
                reply(dat)
                limitcok(serial)
              } else if (barang.length == 2) {
                const kk = cok[value].post
                for (var ia = 0; ia < kk.length; ia++) {
                  if (kk[ia].type === 'video') {
                    await fn.sendFileFromUrl(toId, `${kk[ia].urlDownload}`, 'google.mp4', cok[value].caption + `\n\n` + autocommand)
                  }
                  if (kk[ia].type === 'image') {
                    await fn.sendFileFromUrl(toId, `${kk[ia].urlDownload}`, 'google.jpg', cok[value].caption + `\n\n` + autocommand)
                  }
                }
                limitcok(serial)
              }
            } else if (getPrefix(txt, 'ighighlight')) {
              if (isSadmin || master || vip || premium) return
              if (!(isWhiteList(chatId))) return reply('anda terdeteksi sedang menggunakan akses premium, hanya premium user dan whitelist group yang bisa menggunakan akses premium.\nsilakan hubungi owner untuk menggunakan fitur ini. ketik /creator jika ingin berlangganan akses premium.')
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (args.length >= 3) return
              var itel = []
              var amer = []
              const query = arg
              const barang = query.split(" ")
              const hasil = barang[0]
              const value = Number(barang[1]) - 1
              await reply('*Scraping Metadata...*')
              const urlss = 'https://api.vhtear.com/ighighlight?query=' + hasil + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.highlight
              let no = 0
              let dat = "*Instagram Highlight*\n"
              for (var prop in cok) {
                itel.push(cok[prop]);
                amer.push(prop);
                no += 1
                dat += `\n*${no}*.` + " " + prop + " " + cok[prop].itemcount + "-item"
              }
              if (barang.length == 1) {
                dat += "\n\n*to download highlight*: " + settings.sname + "ighighlight " + hasil + " *nomor*"
                reply(dat)
                limitcok(serial)
              }
              if (barang.length == 2) {
                let dat = "*Detail Highlight:" + amer[value] + "*"
                dat += "\n*Username*: " + itel[value].owner_username
                dat += "\n\n*" + BotName + "*"
                reply(dat)
                const mek = itel[value].item.itemlist
                for (var ia = 0; ia < itel[value].item.itemlist.length; ia++) {
                  if (mek[ia].type === 'video') {
                    await fn.sendFileFromUrl(toId, `${mek[ia].urlDownload}`, 'google.mp4', autocommand)
                  }
                  if (mek[ia].type === 'image') {
                    await fn.sendFileFromUrl(toId, `${mek[ia].urlDownload}`, 'google.jpg', autocommand)
                  }
                }
                limitcok(serial)
              }
            } else if (getPrefix(txt, 'ptl')) {
              if (isSadmin || master || vip || premium) return
              if (isLimit(serial)) return
              const orang = arg
              if (args.length === 0) {
                const query = ['hotgirlsummer', 'hotgirlasian', 'tiktokhot', 'tiktokhotgirls', 'cewekcantikindo', 'notnot8', 'btralice', 'girlsday']
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/ighastag?query=' + randomChoice(query) + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = shuffle(pp.result.data)
                for (var i = 0; i < cok.length; i++) {
                  for (let a of cok[i].post) {
                    if (a.type === 'video') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                    }
                    if (a.type === 'image') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                    }
                  }
                  if (i === 0) break;
                }
                limitcok(serial)
              } else if (args.length === 1) {
                await reply('*Scraping Metadata...*')
                const urlss = 'https://api.vhtear.com/ighastag?query=' + orang + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = shuffle(pp.result.data)
                for (var i = 0; i < cok.length; i++) {
                  for (let a of cok[i].post) {
                    if (a.type === 'video') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.mp4', cok[i].caption + `\n\n` + autocommand)
                    }
                    if (a.type === 'image') {
                      await fn.sendFileFromUrl(toId, `${a.urlDownload}`, 'google.jpg', cok[i].caption + `\n\n` + autocommand)
                    }
                  }
                  if (i === 0) break;
                }
                limitcok(serial)
              }
            } else if (getPrefix(txt, 'gsmarena')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = txt.replace('gsmarena' + " ", "")
              const urlss = 'https://api.vhtear.com/gsmarena?query=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              let dat = "*_Detail Gadget_*\n"
              dat += "\n*" + cok.title + "*"
              dat += "\n*Info*: " + cok.spec
              await reply(dat)
              limitAdd(serial)
            } else if (getPrefix(txt, 'alquran')) {
              if (isLimit(serial)) return
              const query = txt.replace('alquran' + "", "")
              const barang = txt.split(" ")
              const value = barang[1]
              const urlss = 'https://api.vhtear.com/quranlist?&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.list
              if (barang.length == 1) {
                let dat = "*Quran List*"
                for (var o = 0; o < cok.length; o++) {
                  let no = o
                  dat += "\n" + cok[no]
                }
                dat += "\n\n*To see detail*: " + settings.sname + "alquran nomer"
                reply(dat)
                limitAdd(serial)
              } else if (barang.length == 2) {
                const urlss = 'https://api.vhtear.com/quran?no=' + value + '&apikey=' + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                let dat = "*_Detail Surah_*:"
                dat += " *" + pp.result.surah + "*"
                dat += "\n" + pp.result.quran.split("1").join("١").split("2").join("٢").split("3").join("٣").split("4").join("٤").split("5").join("٥").split("6").join("٦").split("7").join("٧").split("8").join("٨").split("9").join("٩").split("0").join("٠")
                reply(dat)
                limitAdd(serial)
              }
            } else if (getComs(txt, 'info gempa')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.vhtear.com/infogempa&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result[0]
              let dat = "*BMKG INDONESIA*\n"
              dat += "\n*Kedalaman*: " + cok.Kedalaman
              dat += "\n*Wilayah*: " + cok.Wilayah
              dat += "\n*Potensi*: " + cok.Potensi
              dat += "\n*Magnitude*: " + cok.magnitude
              dat += "\n*Tanggal*: " + cok.Tanggal
              dat += "\n*Jam*: " + cok.Jam
              dat += "\n\n" + autocommand
              reply(dat)
              limitAdd(serial)
            } else if (getComs(txt, 'kurs')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.vhtear.com/kurs&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.Data
              let dat = "*Kurs Rupiah*"
              for (let i in cok) {
                dat += "\n\nMata uang: *" + i + "*\n    *_Jual:_* Rp. " + pp.result.Data[i].Jual + "\n    *_Beli:_* Rp. " + pp.result.Data[i].Beli
              }
              dat += "\n\n" + autocommand
              reply(dat)
              limitAdd(serial)
            } else if (getPrefix(txt, 'creatememe')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              if ((isMedia || isQuotedImage) && args.length >= 1) {
                const top = arg.split('|')[0]
                const bottom = arg.split('|')[1]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await custom(getUrl, top, bottom)
                fn.sendFile(toId, ImageBase64, 'image.png', '', null, true).catch((err) => console.error(err))
                limitAdd(serial)
              } else {
                await reply('Tidak ada gambar!')
              }
            } else if (getPrefix(txt, 'quoteit')) {
              if (isLimit(serial)) return
              if (!quotedMsg) {
                if (args.length === 0) return reply('coba /quoteit aku sayang kamu | fine')
                const top = arg.split('|')[0]
                const bottom = arg.split('|')[1]
                const urlss = 'https://terhambar.com/aw/qts/?kata=' + top + '&author=' + bottom + '&tipe=rain'
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                await fn.sendFileFromUrl(toId, cok, 'google.jpg', autocommand)
                limitAdd(serial)
              } else if (quotedMsg && quotedMsgObj.type === 'chat') {
                if (args.length === 0) return reply('coba /quoteit reply')
                const top = quotedMsg.body
                const bottom = BotName
                const urlss = 'https://terhambar.com/aw/qts/?kata=' + top + '&author=' + bottom + '&tipe=rain'
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result
                fn.sendFileFromUrl(toId, cok, 'google.jpg', autocommand)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'attp') || getPrefix(txt, 'text2animated')) {
              if (isLimit(serial)) return
              await reply('Memproses sticker ...')
              if (quotedMsg) {
                if (quotedMsgObj.type === 'chat') {
                  if (quotedMsg.body.length >= 100) return reply('text terlalu panjang')
                  text = quotedMsg.body
                  const animated = (text) => new Promise((resolve, reject) => {
                    try {
                      canvasx('white', 0, text)
                      canvasx('lime', 1, text)
                      canvasx('red', 2, text)
                      canvasx('blue', 3, text)
                      canvasx('yellow', 4, text)
                      canvasx('aqua', 5, text)
                      canvasx('purple', 6, text)
                      const exec = require('child_process').exec
                      exec('convert -delay 20 -loop 0 ./gif/frames/*.png -scale 512x512 ./gif/ttp.gif', (error, stdout, stderr) => {
                        if (error) rejects(error)
                        const { spawn } = require('child_process')
                        spawn("gif2webp ./gif/ttp.gif -o ./image/ttp.webp")
                        .on('exit', () => {
                          let mediaData = (fs.readFileSync('./image/ttp..webp', {
                            encoding: 'base64'
                          }))
                          fs.unlink('./image/ttp.webp').then(() => {})
                          return resolve(mediaData)
                        })
                      })
                    } catch (error) {
                      return reject(error)
                    }
                  })

                  function canvasx(color, i, text) {
                    fs.writeFileSync('./gif/frames/frame' + i + '.png', text2png(wordWrap(text, 15), randomChoice([{
                      font: '400px Bangers',
                      localFontPath: './fonts/Bangers.ttf',
                      localFontName: 'Bangers',
                      color: color,
                      strokeWidth: 12,
                      strokeColor: 'black',
                      textAlign: 'center',
                      lineSpacing: 30,
                      padding: 300,
                      backgroundColor: 'transparent'
                    }])))
                  }

                  function wordWrap(str, maxWidth) {
                    var newLineStr = "\n";
                    done = false;
                    res = '';
                    while (str.length > maxWidth) {
                      found = false;
                      for (i = maxWidth - 1; i >= 0; i--) {
                        if (testWhite(str.charAt(i))) {
                          res = res + [str.slice(0, i), newLineStr].join('');
                          str = str.slice(i + 1);
                          found = true;
                          break;
                        }
                      }
                      if (!found) {
                        res += [str.slice(0, maxWidth), newLineStr].join('');
                        str = str.slice(maxWidth);
                      }
                    }
                    return res + str;
                  }

                  function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                  }
                  animated(text).then((res) => {
                    sendRawWebpAsSticker(res.toString('base64'))
                    limitAdd(serial)
                  })
                }
              } else {
                if (args.length === 0) return
                if (arg.length >= 100) return reply('text terlalu panjang')
                const text = arg
                const animated = (text) => new Promise((resolve, reject) => {
                  try {
                    canvasx('white', 0, text)
                    canvasx('lime', 1, text)
                    canvasx('red', 2, text)
                    canvasx('blue', 3, text)
                    canvasx('yellow', 4, text)
                    canvasx('aqua', 5, text)
                    canvasx('purple', 6, text)
                    const exec = require('child_process').exec
                    exec('convert -delay 20 -loop 0 ./gif/frames/*.png -scale 512x512 ./gif/ttp.gif', (error, stdout, stderr) => {
                      if (error) rejects(error)
                      exec("gif2webp ./gif/ttp.gif -o ./image/ttp.webp")
                        .on('exit', () => {
                          let mediaData = (fs.readFileSync('./image/ttp.webp', {
                            encoding: 'base64'
                          }))
                          fs.unlink('./image/ttp.webp').then(() => {})
                          return resolve(mediaData)
                        })
                    })
                  } catch (error) {
                    return reject(error)
                  }
                })

                function canvasx(color, i, text) {
                  fs.writeFileSync('./gif/frames/frame' + i + '.png', text2png(wordWrap(text, 15), randomChoice([{
                    font: '400px Bangers',
                    localFontPath: './fonts/Bangers.ttf',
                    localFontName: 'Bangers',
                    color: color,
                    strokeWidth: 12,
                    strokeColor: 'black',
                    textAlign: 'center',
                    lineSpacing: 30,
                    padding: 300,
                    backgroundColor: 'transparent'
                  }])))
                }

                function wordWrap(str, maxWidth) {
                  var newLineStr = "\n";
                  done = false;
                  res = '';
                  while (str.length > maxWidth) {
                    found = false;
                    for (i = maxWidth - 1; i >= 0; i--) {
                      if (testWhite(str.charAt(i))) {
                        res = res + [str.slice(0, i), newLineStr].join('');
                        str = str.slice(i + 1);
                        found = true;
                        break;
                      }
                    }
                    if (!found) {
                      res += [str.slice(0, maxWidth), newLineStr].join('');
                      str = str.slice(maxWidth);
                    }
                  }
                  return res + str;
                }

                function testWhite(x) {
                  var white = new RegExp(/^\s$/);
                  return white.test(x.charAt(0));
                }
                animated(text).then((res) => {
                  sendRawWebpAsSticker(res.toString('base64'))
                  limitAdd(serial)
                })
              }
            } else if (getPrefix(txt, 'ttp')) {
              if (isLimit(serial)) return
              if (quotedMsg) {
                await reply('Memproses sticker ...')
                if (quotedMsgObj.type === 'chat') {
                  if (quotedMsg.body.length >= 30) return reply('text terlalu panjang')
                  query = quotedMsg.body
                  var text = wordWrap(query, 8);

                  function wordWrap(str, maxWidth) {
                    var newLineStr = "\n";
                    done = false;
                    res = '';
                    while (str.length > maxWidth) {
                      found = false;
                      // Inserts new line at first whitespace of the line
                      for (i = maxWidth - 1; i >= 0; i--) {
                        if (testWhite(str.charAt(i))) {
                          res = res + [str.slice(0, i), newLineStr].join('');
                          str = str.slice(i + 1);
                          found = true;
                          break;
                        }
                      }
                      // Inserts new line at maxWidth position, the word is too long to wrap
                      if (!found) {
                        res += [str.slice(0, maxWidth), newLineStr].join('');
                        str = str.slice(maxWidth);
                      }
                    }
                    return res + str;
                  }

                  function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                  }
                  await fn.sendImageAsSticker(toId, text2png(text, randomChoice(ctmp)))
                  limitAdd(serial)
                }
              } else {
                if (args.length === 0) return
                await reply('Memproses sticker ...')
                if (arg.length >= 30) return reply('text terlalu panjang')
                const query = arg
                var text = wordWrap(query, 8);

                function wordWrap(str, maxWidth) {
                  var newLineStr = "\n";
                  done = false;
                  res = '';
                  while (str.length > maxWidth) {
                    found = false;
                    // Inserts new line at first whitespace of the line
                    for (i = maxWidth - 1; i >= 0; i--) {
                      if (testWhite(str.charAt(i))) {
                        res = res + [str.slice(0, i), newLineStr].join('');
                        str = str.slice(i + 1);
                        found = true;
                        break;
                      }
                    }
                    // Inserts new line at maxWidth position, the word is too long to wrap
                    if (!found) {
                      res += [str.slice(0, maxWidth), newLineStr].join('');
                      str = str.slice(maxWidth);
                    }
                  }
                  return res + str;
                }

                function testWhite(x) {
                  var white = new RegExp(/^\s$/);
                  return white.test(x.charAt(0));
                }
                await fn.sendImageAsSticker(toId, text2png(text, randomChoice(ctmp)), message.id)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'ttd')) {
              if (isLimit(serial)) return
              if (quotedMsg) {
                await reply('Memproses sticker ...')
                if (quotedMsgObj.type === 'chat') {
                  const query = quotedMsg.body
                  if (query.length > 50) return reply('Teks kepanjangan :(')
                  var text = wordWrap(query, 8);

                  function wordWrap(str, maxWidth) {
                    var newLineStr = "\n";
                    done = false;
                    res = '';
                    while (str.length > maxWidth) {
                      found = false;
                      for (i = maxWidth - 1; i >= 0; i--) {
                        if (testWhite(str.charAt(i))) {
                          res = res + [str.slice(0, i), newLineStr].join('');
                          str = str.slice(i + 1);
                          found = true;
                          break;
                        }
                      }
                      if (!found) {
                        res += [str.slice(0, maxWidth), newLineStr].join('');
                        str = str.slice(maxWidth);
                      }
                    }
                    return res + str;
                  }

                  function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                  }
                  let mediaData = text2png(text, {
                    font: '500px Robertson-Alternate',
                    localFontPath: './fonts/Robertson-Alternate.ttf',
                    localFontName: 'Robertson-Alternate',
                    color: 'black',
                    textAlign: 'center',
                    lineSpacing: 30,
                    padding: 300,
                    backgroundColor: 'transparent',
                    output: 'buffer'
                  })
                  sharp(mediaData).webp().toBuffer().then(buffer => {
                    mediaData = ''
                    sendRawWebpAsSticker(buffer.toString('base64'))
                  })
                  limitAdd(serial)
                }
              } else {
                if (args.length === 0) return
                await reply('Memproses sticker ...')
                const query = arg
                if (query.length > 50) return reply('Teks kepanjangan :(')
                var text = wordWrap(query, 8);

                function wordWrap(str, maxWidth) {
                  var newLineStr = "\n";
                  done = false;
                  res = '';
                  while (str.length > maxWidth) {
                    found = false;
                    for (i = maxWidth - 1; i >= 0; i--) {
                      if (testWhite(str.charAt(i))) {
                        res = res + [str.slice(0, i), newLineStr].join('');
                        str = str.slice(i + 1);
                        found = true;
                        break;
                      }
                    }
                    if (!found) {
                      res += [str.slice(0, maxWidth), newLineStr].join('');
                      str = str.slice(maxWidth);
                    }
                  }
                  return res + str;
                }

                function testWhite(x) {
                  var white = new RegExp(/^\s$/);
                  return white.test(x.charAt(0));
                }
                let mediaData = text2png(text, {
                  font: '500px Robertson-Alternate',
                  localFontPath: './fonts/Robertson-Alternate.ttf',
                  localFontName: 'Robertson-Alternate',
                  color: 'black',
                  textAlign: 'center',
                  lineSpacing: 30,
                  padding: 300,
                  backgroundColor: 'transparent',
                  output: 'buffer'
                })
                sharp(mediaData).webp().toBuffer().then(buffer => {
                  mediaData = ''
                  sendRawWebpAsSticker(buffer.toString('base64'))
                })
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'text2img')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (arg.length >= 100) return reply('text terlalu panjang')
              const query = arg
              var text = wordWrap(query, 8);

              function wordWrap(str, maxWidth) {
                var newLineStr = "\n";
                done = false;
                res = '';
                while (str.length > maxWidth) {
                  found = false;
                  // Inserts new line at first whitespace of the line
                  for (i = maxWidth - 1; i >= 0; i--) {
                    if (testWhite(str.charAt(i))) {
                      res = res + [str.slice(0, i), newLineStr].join('');
                      str = str.slice(i + 1);
                      found = true;
                      break;
                    }
                  }
                  // Inserts new line at maxWidth position, the word is too long to wrap
                  if (!found) {
                    res += [str.slice(0, maxWidth), newLineStr].join('');
                    str = str.slice(maxWidth);
                  }
                }
                return res + str;
              }

              function testWhite(x) {
                var white = new RegExp(/^\s$/);
                return white.test(x.charAt(0));
              }
              fs.writeFileSync(
                './media/out.png',
                text2png(text, randomChoice(t2img))
              )
              sleep(3000)
              await fn.sendFile(toId, './media/out.png', 'ttyyzz.png', autocommand);
              limitAdd(serial)
            } else if (getPrefix(txt, 'text2sticker')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (arg.length >= 100) return reply('text terlalu panjang')
              const query = arg
              var text = wordWrap(query, 8);

              function wordWrap(str, maxWidth) {
                var newLineStr = "\n";
                done = false;
                res = '';
                while (str.length > maxWidth) {
                  found = false;
                  // Inserts new line at first whitespace of the line
                  for (i = maxWidth - 1; i >= 0; i--) {
                    if (testWhite(str.charAt(i))) {
                      res = res + [str.slice(0, i), newLineStr].join('');
                      str = str.slice(i + 1);
                      found = true;
                      break;
                    }
                  }
                  // Inserts new line at maxWidth position, the word is too long to wrap
                  if (!found) {
                    res += [str.slice(0, maxWidth), newLineStr].join('');
                    str = str.slice(maxWidth);
                  }
                }
                return res + str;
              }

              function testWhite(x) {
                var white = new RegExp(/^\s$/);
                return white.test(x.charAt(0));
              }
              await fn.sendImageAsSticker(toId, text2png(text, randomChoice(ctmp)))
              limitAdd(serial)
            } else if (getPrefix(txt, 'stm') || getPrefix(txt, 'stickermeme') || getPrefix(txt, 'stikermeme')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              if ((isMedia || isQuotedImage) && args.length >= 1) {
                const top = arg.split('|')[0]
                const bottom = arg.split('|')[1]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await custom(getUrl, top, bottom)
                fn.sendSticker(toId, ImageBase64).catch((err) => console.error(err))
                limitAdd(serial)
              } else {
                await reply('Tidak ada gambar!')
              }
            } else if (getPrefix(txt, 'stimov') || getPrefix(txt, 'creategif')) {
              if (isLimit(serial)) return
              if (message.mimetype === 'video/mp4' && message.duration < 10) {
                console.log('stimov')
                const mediaData = await decryptMedia(message)
                const filenamek = `./media/${message.t}.${mime.extension(message.mimetype)}`
                const tokengiphyt = '3qeumijwf6YZSyHsaY2TGKIeXkj00X9C' // giphy sdk
                const tokenGiphy = 'ZaOKJ1spM3b3Xzq7MBtk33to4f2a3fPn' // giphy api
                fs.writeFile(filenamek, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                  var options = {
                    url: 'https://upload.giphy.com/v1/gifs',
                    formData: {
                      api_key: tokenGiphy,
                      file: {
                        value: fs.createReadStream(filenamek),
                        options: {
                          filename: filenamek,
                          contentType: 'image/gif'
                        }
                      }
                    },
                    json: true
                  }
                  request.post(options, async function (e, resp, body) {
                    if (e || resp.statusCode !== 200) {
                      console.log('giphy upload failed: ' + e);
                      reply('gagal upload kak! :[');
                    }
                    let url = 'https://media.giphy.com/media/' + body.data.id + '/giphy-downsized.gif'
                    let urls = 'https://media.giphy.com/media/' + body.data.id + '/source.gif';
                    await reply(url);
                    await sleep(5000)
                    await fn.sendGiphyAsSticker(toId, urls).then(res => {
                      console.log(res)
                    });
                    limitAdd(serial)
                  })
                })
              } else {
                await reply('[Wrong Format !]')
              }
              break
            } else if (getPrefix(txt, 'stiker') || getPrefix(txt, 'sticker') || getPrefix(txt, 'sk') || getPrefix(txt, 'gif') || getPrefix(txt, 'stickergif') || getPrefix(txt, 'gifsticker')) {
              if (isLimit(serial)) return
              const url = arg
              if (isMedia && args.length === 0) {
                await reply('Memproses sticker ...')
                if (mimetype === 'image/gif') {
                  const mediaData = await decryptMedia(message)
                  if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
                  sendGif(id, mediaData).then(res => {
                    sendRawWebpAsSticker(res).catch(() => reply('Maaf, kualitas tidak didukung untuk video tsb'))
                    limitAdd(serial)
                  })
                } else if (mimetype === 'video/mp4') {
                  const mediaData = await decryptMedia(message)
                  if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
                  sendGif(id, mediaData).then(res => {
                    sendRawWebpAsSticker(res).catch(() => reply('Maaf, kualitas tidak didukung untuk video tsb'))
                    limitAdd(serial)
                  })
                } else {
                  decryptMedia(message).then(mediaData => {
                    sharp(mediaData).resize({
                      width: 512,
                      height: 512,
                      fit: sharp.fit.contain,
                      background: {
                        r: 0,
                        g: 0,
                        b: 0,
                        alpha: 0
                      }
                    }).webp().toBuffer().then(buffer => {
                      sendRawWebpAsSticker(buffer.toString('base64'))
                      limitAdd(serial)
                    })
                  })
                  /*
                  const mediaData = await decryptMedia(message)
                  sharp(mediaData).resize({
                    width: 2048,
                    height: 2048,
                    fit: sharp.fit.contain,
                    background: {
                      r: 0,
                      g: 0,
                      b: 0,
                      alpha: 0
                    }
                  }).webp().toBuffer().then(buffer => {
                    sendRawWebpAsSticker(buffer.toString('base64'))
                    limitAdd(serial)
                  })
                  */
                }
              } else if (args[0] === 'nobg') {
                const a = settings.snobg.includes(serial)
                if (a) {
                  await reply('Memproses sticker ...')
                  const mediaData = await decryptMedia(message)
                  const base64img = `data:${mimetype};base64,${mediaData.toString('base64')}`
                  const base64imgnobg = await removebg(base64img)
                  await fn.sendImageAsSticker(toId, base64imgnobg)
                  limitAdd(serial)
                } else {
                  reply('rusak. cuman creator yang bisa akses ini!')
                }
              } else if (args.length === 1) {
                await reply('Memproses sticker ...')
                if (!url.match(isUrl)) {
                  await reply('Maaf, link yang kamu kirim tidak valid.')
                }
                await fn.sendStickerfromUrl(toId, url).then((r) => (!r && r !== undefined) ? reply('Maaf, link yang kamu kirim tidak memuat gambar. [No Image]') : null)
                limitAdd(serial)
              } else if (quotedMsg) {
                await reply('Memproses sticker ...')
                if (quotedMsgObj.type === 'chat') {
                  if (quotedMsg.body.length >= 100) return reply('text terlalu panjang')
                  query = quotedMsg.body
                  var text = wordWrap(query, 8);

                  function wordWrap(str, maxWidth) {
                    var newLineStr = "\n";
                    done = false;
                    res = '';
                    while (str.length > maxWidth) {
                      found = false;
                      // Inserts new line at first whitespace of the line
                      for (i = maxWidth - 1; i >= 0; i--) {
                        if (testWhite(str.charAt(i))) {
                          res = res + [str.slice(0, i), newLineStr].join('');
                          str = str.slice(i + 1);
                          found = true;
                          break;
                        }
                      }
                      // Inserts new line at maxWidth position, the word is too long to wrap
                      if (!found) {
                        res += [str.slice(0, maxWidth), newLineStr].join('');
                        str = str.slice(maxWidth);
                      }
                    }
                    return res + str;
                  }

                  function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                  }
                  await fn.sendImageAsSticker(toId, text2png(text, randomChoice(ctmp)))
                  limitAdd(serial)
                } else if (quotedMsgObj.type === 'image') {
                  decryptMedia(quotedMsg).then(mediaData => {
                    sharp(mediaData).resize({
                      width: 512,
                      height: 512,
                      fit: sharp.fit.contain,
                      background: {
                        r: 0,
                        g: 0,
                        b: 0,
                        alpha: 0
                      }
                    }).webp().toBuffer().then(buffer => {
                      sendRawWebpAsSticker(buffer.toString('base64'))
                      limitAdd(serial)
                    })
                  })
                  /*
                  const mediaData = await decryptMedia(quotedMsg)
                  sharp(mediaData).resize({
                    width: 2048,
                    height: 2048,
                    fit: sharp.fit.contain,
                    background: {
                      r: 0,
                      g: 0,
                      b: 0,
                      alpha: 0
                    }
                  }).webp().toBuffer().then(buffer => {
                    sendRawWebpAsSticker(buffer.toString('base64'))
                    limitAdd(serial)
                  })
                  */
                } else {
                  if (quotedMsgObj.mimetype === 'image/gif') {
                    const mediaData = await decryptMedia(quotedMsg)
                    if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
                    sendGif(id, mediaData).then(res => {
                      sendRawWebpAsSticker(res).catch(() => reply('Maaf, kualitas tidak didukung untuk video tsb'))
                      limitAdd(serial)
                    })
                  } else if (quotedMsgObj.mimetype === 'video/mp4') {
                    const mediaData = await decryptMedia(quotedMsg)
                    if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
                    sendGif(id, mediaData).then(res => {
                      sendRawWebpAsSticker(res).catch(() => reply('Maaf, kualitas tidak didukung untuk video tsb'))
                      limitAdd(serial)
                    })
                  }
                }
              } else {
                await reply('Error!')
              }
            } else if (getPrefix(txt, 'giphy') || getPrefix(txt, 'stickergiphy')) {
              if (isLimit(serial)) return
              const url = args.length !== 0 ? args[0] : ''
              if (args.length !== 1) return reply('Maaf, format pesan salah silahkan periksa menu. [Wrong Format]')
              const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
              const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
              if (isGiphy) {
                const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                if (!getGiphyCode) {
                  return reply('Gagal mengambil kode giphy')
                }
                const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                console.log(giphyCode)
                const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                await fn.sendGiphyAsSticker(toId, smallGifUrl).catch((err) => console.log(err))
                limitAdd(serial)
              } else if (isMediaGiphy) {
                const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4|mov)/, 'gi'))
                if (!gifUrl) {
                  return reply('Gagal mengambil kode giphy')
                }
                const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                await fn.sendGiphyAsSticker(toId, smallGifUrl).catch((err) => console.log(err))
                limitAdd(serial)
              } else {
                await reply('maaf, untuk saat ini sticker gif hanya bisa menggunakan link dari giphy.  [Giphy Only]')
              }
            } else if (getPrefix(txt, 'translate')) {
              if (isLimit(serial)) return
              if (args.length === 0) {
                let tx = 'list language translate\n\n'
                tx += 'auto : Automatic\n'
                tx += 'af : Afrikaans\n'
                tx += 'sq : Albanian\n'
                tx += 'am : Amharic\n'
                tx += 'ar : Arabic\n'
                tx += 'hy : Armenian\n'
                tx += 'az : Azerbaijani\n'
                tx += 'eu : Basque\n'
                tx += 'be : Belarusian\n'
                tx += 'bn : Bengali\n'
                tx += 'bs : Bosnian\n'
                tx += 'bg : Bulgarian\n'
                tx += 'ca : Catalan\n'
                tx += 'ceb : Cebuano\n'
                tx += 'ny : Chichewa\n'
                tx += 'zh : Chinese (Simplified)\n'
                tx += 'zh-cn : Chinese (Simplified)\n'
                tx += 'zh-tw : Chinese (Traditional)\n'
                tx += 'co : Corsican\n'
                tx += 'hr : Croatian\n'
                tx += 'cs : Czech\n'
                tx += 'da : Danish\n'
                tx += 'nl : Dutch\n'
                tx += 'en : English\n'
                tx += 'eo : Esperanto\n'
                tx += 'et : Estonian\n'
                tx += 'tl : Filipino\n'
                tx += 'fi : Finnish\n'
                tx += 'fr : French\n'
                tx += 'fy : Frisian\n'
                tx += 'gl : Galician\n'
                tx += 'ka : Georgian\n'
                tx += 'de : German\n'
                tx += 'el : Greek\n'
                tx += 'gu : Gujarati\n'
                tx += 'ht : Haitian Creole\n'
                tx += 'ha : Hausa\n'
                tx += 'haw : Hawaiian\n'
                tx += 'he : Hebrew\n'
                tx += 'iw : Hebrew\n'
                tx += 'hi : Hindi\n'
                tx += 'hmn : Hmong\n'
                tx += 'hu : Hungarian\n'
                tx += 'is : Icelandic\n'
                tx += 'ig : Igbo\n'
                tx += 'id : Indonesian\n'
                tx += 'ga : Irish\n'
                tx += 'it : Italian\n'
                tx += 'ja : Japanese\n'
                tx += 'jw : Javanese\n'
                tx += 'kn : Kannada\n'
                tx += 'kk : Kazakh\n'
                tx += 'km : Khmer\n'
                tx += 'ko : Korean\n'
                tx += 'ku : Kurdish (Kurmanji)\n'
                tx += 'ky : Kyrgyz\n'
                tx += 'lo : Lao\n'
                tx += 'la : Latin\n'
                tx += 'lv : Latvian\n'
                tx += 'lt : Lithuanian\n'
                tx += 'lb : Luxembourgish\n'
                tx += 'mk : Macedonian\n'
                tx += 'mg : Malagasy\n'
                tx += 'ms : Malay\n'
                tx += 'ml : Malayalam\n'
                tx += 'mt : Maltese\n'
                tx += 'mi : Maori\n'
                tx += 'mr : Marathi\n'
                tx += 'mn : Mongolian\n'
                tx += 'my : Myanmar (Burmese)\n'
                tx += 'ne : Nepali\n'
                tx += 'no : Norwegian\n'
                tx += 'ps : Pashto\n'
                tx += 'fa : Persian\n'
                tx += 'pl : Polish\n'
                tx += 'pt : Portuguese\n'
                tx += 'pa : Punjabi\n'
                tx += 'ro : Romanian\n'
                tx += 'ru : Russian\n'
                tx += 'sm : Samoan\n'
                tx += 'gd : Scots Gaelic\n'
                tx += 'sr : Serbian\n'
                tx += 'st : Sesotho\n'
                tx += 'sn : Shona\n'
                tx += 'sd : Sindhi\n'
                tx += 'si : Sinhala\n'
                tx += 'sk : Slovak\n'
                tx += 'sl : Slovenian\n'
                tx += 'so : Somali\n'
                tx += 'es : Spanish\n'
                tx += 'su : Sundanese\n'
                tx += 'sw : Swahili\n'
                tx += 'sv : Swedish\n'
                tx += 'tg : Tajik\n'
                tx += 'ta : Tamil\n'
                tx += 'te : Telugu\n'
                tx += 'th : Thai\n'
                tx += 'tr : Turkish\n'
                tx += 'uk : Ukrainian\n'
                tx += 'ur : Urdu\n'
                tx += 'uz : Uzbek\n'
                tx += 'vi : Vietnamese\n'
                tx += 'cy : Welsh\n'
                tx += 'xh : Xhosa\n'
                tx += 'yi : Yiddish\n'
                tx += 'yo : Yoruba\n'
                tx += 'zu : Zulu\n\n'
                tx += 'gunakan contoh /translate en|aku sayang kamu'
                reply(tx)
                limitAdd(serial)
              } else if (quotedMsg) {
                dataText = quotedMsg.body
                const as = arg.split('|')[0]
                const jaran = await translatte(dataText, {
                  to: as
                })
                reply("*Google-Translate*\n\n*>* " + jaran.text)
                limitAdd(serial)
              } else {
                const as = arg.split('|')[0]
                const ba = arg.split('|')[1]
                const jaran = await translatte(ba, {
                  to: as
                })
                reply("*Google-Translate*\n\n*>* " + jaran.text)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'persentase')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const as = arg.split('|')[0]
              const ba = arg.split('|')[1]
              const apikey = 'fn'
              const urlss = 'https://rest.farzain.com/api/jodoh.php?id=' + as + '-' + ba + '&apikey=' + apikey
              const response = await fetch(urlss)
              const cok = await response.json()
              reply(`*${cok.result}*`).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'jodoh')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const as = arg.split('|')[0]
              const ba = arg.split('|')[1]
              const cot = arg.split('|')[2]
              const apikey = 'fn'
              const urlss = 'https://rest.farzain.com/api/jodoh.php?id=' + as + '-' + ba + '-' + cot + '&apikey=' + apikey
              const response = await fetch(urlss)
              const cok = await response.json()
              reply(`*${cok.result}*`).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'zodiak')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = arg
              const urlss = 'https://api.vhtear.com/zodiak?query=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              let dat = "*Zodiak " + cok.zodiak + "*\n"
              dat += "\n*Ramalan*: " + cok.ramalan
              dat += "\n*Nomer Keberuntungan*: " + cok.nomorKeberuntungan
              dat += "\n*Motivasi*: " + cok.motivasi
              dat += "\n*Inspirasi*: " + cok.inspirasi
              dat += "\n\n" + autocommand
              await reply(dat)
              limitAdd(serial)
            } else if (getPrefix(txt, 'weton')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const eq = args[0]
              const fc = args[1]
              getZodiak(eq, fc)
                .then((result) => {
                  reply(result)
                  limitAdd(serial)
                })
                .catch((error) => {
                  reply('Perintah salah, silakan gunakan perintah seperi ini .weton arfine 17-01-2004')
                })
            } else if (getPrefix(txt, 'artimimpi')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const top = arg
              const urlss = 'https://api.vhtear.com/artimimpi?query=' + top + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const x = pp.result
              const asu = x.hasil
              reply(asu)
              limitAdd(serial)
            } else if (getPrefix(txt, 'ramalan')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const top = arg.split('|')[0]
              const bottom = arg.split('|')[1]
              const urlss = 'https://api.vhtear.com/primbonjodoh?nama=' + top + '&pasangan=' + bottom + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const x = pp.result
              const asu = x.hasil
              reply('Hasil Ramalan' + asu)
              limitAdd(serial)
            } else if (getPrefix(txt, 'jadian')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const a = arg.split('-')[0]
              const b = arg.split('-')[1]
              const c = arg.split('-')[2]
              const urlss = 'https://api.vhtear.com/harijadian?tgl=' + a + '&bln=' + b + '&thn=' + c + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const x = pp.result
              const asu = x.hasil.replace('Karakteristik', '\nKarakteristik')
              reply(asu)
              limitAdd(serial)
            } else if (getPrefix(txt, 'artinama')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const top = arg
              const urlss = 'https://api.vhtear.com/artinama?nama=' + top + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const x = pp.result
              const a = x.hasil.replace('\n ', " ")
              const b = a.replace('\n ', " ")
              const c = b.replace('\n ', " ")
              const d = c.replace('\n ', " ")
              const e = d.replace('\n ', " ")
              const f = e.replace('\n ', " ")
              const g = f.replace('\n ', " ")
              const h = g.replace('\n ', " ")
              const i = h.replace('\n ', " ")
              const j = i.replace('\n ', " ")
              const asu = j.replace('\n ', " ")
              reply(asu)
              limitAdd(serial)
            } else if (getPrefix(txt, 'lirik')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (args.length == 0) return reply('Kirim perintah *!lirik* judul lagu, contoh *!lirik* aku bukan boneka')
              const lagu = txt.replace('lirik' + " ", "")
              const lirik = await liriklagu(lagu)
              await reply(lirik)
              limitAdd(serial)
            } else if (getPrefix(txt, 'cekresi')) {
              if (isLimit(serial)) return
              if (args.length !== 2) return reply('Maaf, format pesan salah!\nBerikut KURIR yang tersedia:\n\njne\npos\ntiki\nwahana\njnt\nrpx\nsap\nsicepat\npcp\njet\ndse\nfirst\nninja\nlion\nidl\nrex\n\ngunakan format: .cekresi [kurir] [resi]')
              const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
              if (!kurirs.includes(args[0])) return reply(`Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
              reply(`sedang memeriksa data`)
              cekResi(args[0], args[1]).then((result) => {
                reply(result)
                limitAdd(serial)
              })
            } else if (getPrefix(txt, 'cekongkir')) {
              if (args.length === 0) return
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              const c = arg.split('|')[2]
              const urls = 'https://api.vhtear.com/cekongkir?kurir=' + a + '&fromcity=' + b + '&tocity=' + c + '&apikey=' + Premapikey
              const response = await fetch(urls)
              const pp = await response.json()
              const x = pp.result
              const cok = x.data
              let dat = "*CEK ONGKIR*\n\n"
              for (var iu = 0; iu < cok.length; iu++) {
                let no = iu
                dat += "\n" + no + ". *Layanan*: " + cok[iu].layanan
                dat += "\n    *Estimasi*: " + cok[iu].etd
                dat += "\n    *Tarif*: " + cok[iu].tarif + "\n"
              }
              dat += "\n" + x.informasi
              dat += "\n" + x.title
              dat += "\n\n" + autocommand
              reply(dat)
              limitAdd(serial)
            } else if (getPrefix(txt, 'wallpaper')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = arg
              const urlss = 'https://api.vhtear.com/walpaper?query=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = shuffle(pp.result)
              for (let i of cok) {
                await fn.sendFileFromUrl(toId, i["LinkImg"], 'google.jpg', autocommand)
                break
              }
              limitAdd(serial)
            } else if (getComs(txt, 'corona')) {
              let prefix = settings.rname
              let text = "*┌──[ C O R O N A   U P D A T E ]*\n"
              text += "*├   " + prefix + "global  =>  Data COVID-19 Global*\n"
              text += "*├   " + prefix + "nasional =>  Data COVID-19 Nasional*\n"
              text += "*├   " + prefix + "provinsi  =>  Data COVID-19 Provinsi*\n"
              text += "*├   " + prefix + "lokasi =>  Cek status lokasimu*\n"
              text += "*└──[ Bot By: FN ]*"
              reply(text)
            } else if (getComs(txt, 'nasional')) {
              if (isLimit(serial)) return
              const data = fs.readFileSync('./db/data.json')
              const localData = JSON.parse(data)
              let text = "*DATA COVID-19*\n\n"
              text += `*Negara: ${localData.Country}*\n`
              text += `*Hari Ke: ${localData.Day}*\n`
              text += `*Provinsi Terdampak: 34*\n\n`
              text += `*Total ODP: ${localData.TotalODP.toLocaleString()}*\n`
              text += `*Total PDP: ${localData.TotalPDP.toLocaleString()}*\n\n`
              text += `*Total Kasus: ${localData.TotalCases}*\n`
              text += `*Kasus Baru: ${localData.NewCases}*\n\n`
              text += `*Pasien Dirawat: ${localData.ActiveCases}*\n`
              text += `*Dirawat Baru: ${localData.NewActiveCases}*\n\n`
              text += `*Pasien Sembuh: ${localData.TotalRecovered}*\n`
              text += `*Sembuh Baru: ${localData.NewRecovered}*\n\n`
              text += `*Pasien Meninggal: ${localData.TotalDeaths}*\n`
              text += `*Meninggal Baru: ${localData.NewDeaths}*\n\n`
              text += `*Presentase Meninggal: ${localData.PresentaseDeath}*\n\n`
              text += `*Pembaruan Terakhir:*\n`
              text += `*${localData.lastUpdate}*`
              text += "\n\n*Bot By: FN*"
              reply(text)
              limitAdd(serial)
            } else if (getComs(txt, 'lokasi')) {
              if (isLimit(serial)) return
              const lokasipurel = quotedMsg && quotedMsg.type === 'location'
              if (lokasipurel) {
                if (lokasipurel !== undefined) {
                  const zoneStatus = await getAll(quotedMsg.lat, quotedMsg.lng)
                  if (zoneStatus.kode == 200) {
                    let data = ''
                    for (let i = 0; i < zoneStatus.data.length; i++) {
                      const x = zoneStatus.data[i]
                      let zone = ''
                      if (x.zone == 'green') zone = 'Hijau* (Aman) \n'
                      if (x.zone == 'red') zone = 'Merah* (Bahaya) \n'
                      if (x.zone == 'yellow') zone = 'Kuning* (Waspada) \n'
                      data += `${i + 1}. Kel. *${x.region}* Berstatus *Zona ${zone}`
                    }
                    const text = `*CEK LOKASI*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${data}`
                    reply(text)
                    limitAdd(serial)
                  } else {
                    reply('Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
                  }
                }
              } else {
                const text = '*CEK LOKASI COVID-19*\nBerikut cara untuk cek lokasimu: \n1. Kirimkan lokasimu\n2. Balas dengan kata .lokasi, lokasi yang kamu kirim tadi (klik & tahan chat lokasimu lalu pilih balas)\n3. Kamu akan mendapat informasi mengenai lokasi yang kamu kirim.'
                await reply(text)
              }
            } else if (getPrefix(txt, 'provinsi')) {
              if (isLimit(serial)) return
              if (args.length === 0) {
                const urlss = 'https://data.covid19.go.id/public/api/prov.json'
                await fetch(urlss)
                  .then(response => response.json())
                  .then(json => {
                    const data = json.list_data
                    const except = ['doc_count', 'jenis_kelamin', 'kelompok_umur', 'lokasi', 'penambahan']
                    const listProv = data.map(x =>
                      Object.keys(x)
                      .filter(k => !except.includes(k))
                      .reduce((acc, key) => ((acc[key] = x[key]), acc), {})
                    )
                    const result = {
                      last_date: json.last_date,
                      data: listProv
                    }
                    const cok = result.data
                    let dat = `*Update Covid19 ${result.last_date}*\n`
                    for (var a = 0; a < cok.length; a++) {
                      let no = 1
                      let mam = cok[a].key
                      dat += `\n*${a}.*` + " *" + mam + "*"
                    }
                    dat += "\n\n*" + BotName + "*"
                    reply(dat).catch((err) => console.log(err))
                    limitAdd(serial)
                  })
              } else {
                const province = txt.replace('provinsi ', '')
                axios.get('https://indonesia-covid-19.mathdro.id/api/provinsi/').then(({
                  data
                }) => {
                  var founded = false
                  data.data.find(i => {
                    if (i.provinsi.toLowerCase() == province) {
                      founded = true
                      let dat = `*Kasus COVID19 di ${i.provinsi}*\n`
                      dat += `*Positif : ${i.kasusPosi} kasus*\n`
                      dat += `*Sembuh : ${i.kasusSemb} kasus*\n`
                      dat += `*Meninggal : ${i.kasusMeni} kasus*\n\n`
                      dat += `*Tips kesehatan:*\n`
                      dat += `*a. Mencuci tangan dengan benar*\n`
                      dat += `*b. Menggunakan masker*\n`
                      dat += `*c. Menjaga daya tahan tubuh*\n`
                      dat += `*d. Menerapkan physical distancing*`
                      reply(dat)
                      limitAdd(serial)
                    }
                  })
                  if (founded == false) return reply(`Provinsi ${province} tidak valid, gunakan format formal seperti : DKI Jakarta`)
                })
              }
            } else if (getComs(txt, 'global')) {
              const globalData = await getGlobal()
              let text = "*DATA COVID-19 GLOBAL*\n\n"
              text += `*Total Kasus: ${globalData.confirmed}*\n`
              text += `*Total Sembuh: ${globalData.recovered}*\n`
              text += `*Total Meninggal: ${globalData.deaths}*\n\n`
              text += `*Pembaruan Terakhir:*\n`
              text += `*${globalData.lastUpdate}*`
              text += "\n\n*Bot By: FN*"
              reply(text)
              limitAdd(serial)
            } else if (getPrefix(txt, 'check-number')) {
              if (isLimit(serial)) return
              const target = args[0]
              fn.checkNumberStatus(target).then(res => {
                let a = formatTrue(res.isBusiness)
                let b = formatTrue(res.canReceiveMessage)
                let hasil = `*Number Checker*\n➤ Valid : Ya\n➤ Bisnis : ${a}\n➤ Dapat di hubungi : ${b}\n\nwa.me/${target.replace('@c.us', '')}`
                reply(hasil)
                limitAdd(serial)
              }).catch((err) => console.log(err))
            } else if (getPrefix(txt, 'tahta')) {
              if (isLimit(serial)) return
              let text = args[0].toUpperCase()
              if (!text || text.length > 8 || args.length > 2) return reply('Maaf, perintah tidak valid')
              const {
                spawn
              } = require('child_process')
              spawn('convert', ['-size', '512x512', '-background', 'black', 'xc:black', '-pointsize', '90', '-font', './fonts/harta.ttf', '-gravity', 'center', '-tile', './image/rainbow.jpg', '-annotate', '+0+0', 'HARTA\nTAHTA\n' + text, '-wave', '4.5x64', './image/' + id + '.jpg'])
                .on('exit', function () {
                  fn.sendImage(from, `./image/${id}.jpg`, 'harta.jpg', autocommand, id)
                  limitAdd(serial)
                  fs.unlink(`./image/${id}.jpg`).then(() => {})
                }).on('error', (err) => console.log(err))
            } else if (getPrefix(txt, 'harta')) {
              if (isLimit(serial)) return
              let text = args[0].toUpperCase()
              if (!text || text.length > 8 || args.length > 2) return reply('Maaf, perintah tidak valid')
              const {
                spawn
              } = require('child_process')
              spawn('convert', ['-size', '512x512', '-background', 'black', 'xc:black', '-pointsize', '90', '-font', './fonts/harta.ttf', '-gravity', 'center', '-tile', './image/rainbow.jpg', '-annotate', '+0+0', 'HARTA\nTAHTA\n' + text, '-wave', '4.5x64', './image/' + id + '.jpg'])
                .on('exit', function () {
                  sharp(`./image/${id}.jpg`).webp().toBuffer().then(buffer => {
                    sendRawWebpAsSticker(buffer.toString('base64'))
                    limitAdd(serial)
                    fs.unlink(`./image/${id}.jpg`).then(() => {})
                  })
                }).on('error', (err) => console.log(err))
            } else if (getPrefix(txt, 'custom')) {
              if (isLimit(serial)) return
              let text1 = args[0].toUpperCase()
              let text2 = args[1].toUpperCase()
              let text3 = args[2].toUpperCase()
              if (args.length < 2) return reply('hanya bisa custom 3 kata kak!')
              if (args.length > 3) return reply('hanya bisa custom 3 kata kak!')
              if (!text1 || text1.length > 8) return reply('Maaf, perintah tidak valid')
              if (!text2 || text2.length > 8) return reply('Maaf, perintah tidak valid')
              if (!text3 || text3.length > 8) return reply('Maaf, perintah tidak valid')
              const {
                spawn
              } = require('child_process')
              spawn('convert', ['-size', '512x512', '-background', 'black', 'xc:black', '-pointsize', '90', '-font', './fonts/harta.ttf', '-gravity', 'center', '-tile', './image/rainbow.jpg', '-annotate', '+0+0', text1 + '\n' + text2 + '\n' + text3, '-wave', '4.5x64', './image/' + id + '.jpg'])
                .on('exit', function () {
                  sharp(`./image/${id}.jpg`).webp().toBuffer().then(buffer => {
                    sendRawWebpAsSticker(buffer.toString('base64'))
                    limitAdd(serial)
                    fs.unlink(`./image/${id}.jpg`).then(() => {})
                  })
                }).on('error', (err) => console.log(err))
            } else if (getComs(txt, 'me')) {
              if (isLimit(serial)) return
              const pic = await fn.getProfilePicFromServer(serial)
              const status = await fn.getStatus(serial)
              const Me = await fn.getMe()
              if (pic == undefined) {
                var pfp = errorurl
              } else {
                var pfp = pic
              }
              let a = `*Nametag*: @` + serial.replace('@c.us', '') + `\n`
              a += `*Name*: ` + pushname + `\n`
              a += `*Status*: ` + status.status + `\n`
              a += `\n` + autocommand
              await fn.sendFileFromUrlWithMention(toId, pfp, 'mypict.jpg', a, id)
              limitAdd(serial)
            } else if (getComs(txt, 'mypicture')) {
              if (isLimit(serial)) return
              const pic = await fn.getProfilePicFromServer(serial)
              if (pic == undefined) {
                var pfp = errorurl
              } else {
                var pfp = pic
              }
              fn.sendFileFromUrl(toId, pfp, 'mypict.jpg', autocommand, '')
              limitAdd(serial)
            } else if (getPrefix(txt, 'getprofile')) {
              if (isLimit(serial)) return
              if (quotedMsg) {
                const asucok = await fn.getLastSeen(quotedParticipant)
                  .then(async function (res) {
                    return new Promise((resolve) => {
                      console.log(res)
                      let unix_timestamp = res
                      var date = new Date(unix_timestamp * 1000);
                      var hours = date.getHours();
                      var minutes = "0" + date.getMinutes();
                      var seconds = "0" + date.getSeconds();
                      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                      const asucok = formattedTime
                      console.log(asucok)
                      resolve(asucok)
                    })
                  })
                  .catch(async function (error) {
                    console.log(error);
                  })
                const jancok = await fn.getContact(quotedParticipant)
                  .then(async function (response) {
                    return new Promise((resolve) => {
                      const {
                        id,
                        name,
                        shortName,
                        pushname,
                        formattedName
                      } = response
                      const jancok = pushname
                      resolve(jancok)
                    })
                  })
                  .catch(async function (error) {
                    console.log(error);
                  })
                const pic = await fn.getProfilePicFromServer(quotedParticipant)
                console.log(pic)
                const status = await fn.getStatus(quotedParticipant)
                if (pic == undefined) {
                  var pfp = errorurl
                } else {
                  var pfp = pic
                }
                await fn.sendFileFromUrl(toId, pfp, 'mypict.jpg', `Profile Name: ${jancok}\nLastSeen: ${asucok}\nStatus Info: ${status.status}\n\n` + autocommand, '').catch((err) => console.log(err))
                limitAdd(serial)
              } else {
                if (!isGroupMsg) return reply('Maaf, perintah ini hanya dapat dipakai didalam grup!')
                if (mentionedJidList.length === 0) return await reply('Maaf, format pesan salah.')
                if (mentionedJidList.length >= 2) return await reply('Maaf, perintah ini hanya dapat digunakan kepada 1 user.')
                const asucok = await fn.getLastSeen(mentionedJidList[0])
                  .then(async function (res) {
                    return new Promise((resolve) => {
                      console.log(res)
                      let unix_timestamp = res
                      var date = new Date(unix_timestamp * 1000);
                      var hours = date.getHours();
                      var minutes = "0" + date.getMinutes();
                      var seconds = "0" + date.getSeconds();
                      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                      const asucok = formattedTime
                      console.log(asucok)
                      resolve(asucok)
                    })
                  })
                  .catch(async function (error) {
                    console.log(error);
                  })
                const jancok = await fn.getContact(mentionedJidList[0])
                  .then(async function (response) {
                    return new Promise((resolve) => {
                      const {
                        id,
                        name,
                        shortName,
                        pushname,
                        formattedName
                      } = response
                      const jancok = pushname
                      resolve(jancok)
                    })
                  })
                  .catch(async function (error) {
                    console.log(error);
                  })
                const pic = await fn.getProfilePicFromServer(mentionedJidList[0])
                const status = await fn.getStatus(mentionedJidList[0])
                if (pic == undefined) {
                  var pfp = errorurl
                } else {
                  var pfp = pic
                }
                await fn.sendFileFromUrl(toId, pfp, 'mypict.jpg', `Profile Name: ${jancok}\nLastSeen: ${asucok}\nStatus Info: ${status.status}\n\n` + autocommand, '').catch((err) => console.log(err))
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'number')) {
              if (quotedMsg) {
                const jancok = quotedParticipant.replace('@c.us', '')
                reply(jancok)
                limitAdd(serial)
              } else {
                if (!isGroupMsg) return reply('Maaf, perintah ini hanya dapat dipakai didalam grup!')
                if (mentionedJidList.length === 0) return await reply('Maaf, format pesan salah.')
                if (mentionedJidList.length >= 2) return await reply('Maaf, perintah ini hanya dapat digunakan kepada 1 user.')
                const jancok = await fn.getContact(mentionedJidList[0])
                  .then(async function (response) {
                    return new Promise((resolve) => {
                      const {
                        id
                      } = response
                      const jancok = id.replace('@c.us', '')
                      resolve(jancok)
                    })
                  })
                  .catch(async function (error) {
                    console.log(error);
                  })
                reply(jancok)
                limitAdd(serial)
              }
            } else if (getComs(txt, 'gcreator')) {
              if (!isGroupMsg) return reply('Maaf, perintah ini hanya dapat dipakai didalam grup!')
              const groupchat = await fn.getChatById(chatId)
              const {
                user
              } = groupchat.groupMetadata.owner
              fn.sendContact(toId, `${user}@c.us`)
              limitAdd(serial)
            } else if (getComs(txt, 'gid')) {
              if (!isGroupMsg) return reply('Maaf, perintah ini hanya dapat dipakai didalam grup!')
              const groupchat = await fn.getChatById(chatId)
              const {
                user
              } = groupchat.groupMetadata.id
              reply(`${user}@g.us`)
              limitAdd(serial)
            } else if (getPrefix(txt, 'valentine')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              if (!isGroupMsg) return reply('Maaf, perintah ini hanya dapat dipakai didalam grup!')
              if (mentionedJidList.length === 0) return await reply('Maaf, format pesan salah.')
              if (mentionedJidList.length >= 3) return await reply('Maaf, perintah ini hanya dapat digunakan kepada 2 user.')
              const pic = await fn.getProfilePicFromServer(mentionedJidList[0])
              const pic1 = await fn.getProfilePicFromServer(mentionedJidList[1])
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              if (pic == undefined) {
                var pfp = errorurl
              } else {
                var pfp = pic
              }
              if (pic1 == undefined) {
                var pfp = errorurl2
              } else {
                var pfp = pic1
              }
              const c = await shortener(pic)
              const d = await shortener(pic1)
              const urlss = 'https://api.vhtear.com/valentine?t1=' + a + '&t2=' + b + '&l1=' + d + '&l2=' + c + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.imgUrl
              await fn.sendFileFromUrl(toId, cok, 'mypict.jpg', `langgeng ya cok!\n\n` + autocommand, id)
              limitAdd(serial)
            } else if (getPrefix(txt, 'wikipedia')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/wikipedia?query=${query_}&apikey=${Premapikey}`
              const response = await fetch(urls)
              const pp = await response.json()
              const cok = pp.result.Info
              reply(`*${query_}*\n\n${cok}`)
              limitAdd(serial)
            } else if (getComs(txt, 'mlhero')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.vhtear.com/mlherolist?apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.hasil
              let anu = "*List Hero Mobile Legend*\n"
              let nom = 1
              for (var i = 0; i < cok.length; i++) {
                const no = `${nom}`
                anu += "\n" + no + ". " + cok[i].title
                nom += 1
              }
              await reply(anu + '\n\nUntuk detail hero, ketik .detail *nama hero*')
              limitAdd(serial)
            } else if (getPrefix(txt, 'detail')) {
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.vhtear.com/herodetail?query=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              let dat = '*Detail Hero Mobile Legend*\n'
              dat += '\n*Nama:* ' + cok.title
              dat += '\n*Quotes:* ' + cok.quotes
              dat += '\n*Information:* ' + cok.info
              dat += '\n*Attributes:* ' + cok.attributes
              dat += '\n\n' + autocommand
              await fn.sendFileFromUrl(toId, cok.pictHero, 'google.jpg', dat, id)
              limitAdd(serial)
            } else if (getPrefix(txt, 'chord')) {
              if (isLimit(serial)) return

              function foreach(arr, func) {
                for (var i in arr) {
                  func(i, arr[i]);
                }
              }
              var hal = arg
              var uerel = "http://app.chordindonesia.com/?json=get_search_results&exclude=date,modified,attachments,comment_count,comment_status,thumbnail,thumbnail_images,author,excerpt,content,categories,tags,comments,custom_fields&search=" + hal;
              request.get({
                headers: {
                  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'
                },
                url: uerel,
              }, function (error, response, body) {
                let $ = cheerio.load(body);
                var d = JSON.parse(body);
                if (d.count == "0") {
                  reply("Maaf lirik tidak ditemukan");
                } else {
                  var result = [];
                  var y = 0;
                  var nomor = "";
                  foreach(d.posts, function (i, v) {
                    var no = d.posts[i].id;
                    nomor += y++;
                    result += " ID *[" + no + "]*  Judul : " + d.posts[i].title + "\n\n";
                  });
                  var g = result.replace(/&#8211;/g, " - ");
                  reply(`*Hasil pencarian Chord Lagu :*\n${g}\n\nSilahkan pilih lagu, lalu ketik ` + settings.rname + `getchord ID nya`)
                  limitAdd(serial)
                }
              })
            } else if (getPrefix(txt, 'getchord')) {
              if (isLimit(serial)) return
              var aidi = arg
              var chord = "http://app.chordindonesia.com/?json=get_post&id=" + aidi;
              request.get({
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                url: chord
              }, function (error, response, body) {
                let $ = cheerio.load(body);
                var post = JSON.parse(body);
                var html = post.post.content;
                const text = htmlToText.fromString(html, {
                  noLinkBrackets: true,
                  ignoreHref: true,
                  ignoreImage: true
                });
                reply(`${text}`)
                limitAdd(serial)
              });
            } else if (getComs(txt, 'receh')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              var items = ["twitter indonesia", "quotes twitter indonesia", "quotes twitter indonesia galau", "quotes twitter indonesia receh", "quotes twitter indonesia motivasi", "quotes twitter indonesia nyindir", "quotes twitter indonesia bucin", "quotes twitter indonesia aesthetic", "quotes twitter indonesia lucu"]
              var cewe = items[Math.floor(Math.random() * items.length)];
              var urls = `http://api.fdci.se/rep.php?gambar=${items}`
              var response = await fetch(urls)
              var json = await response.json()
              var cewek = json[Math.floor(Math.random() * json.length)];
              await fn.sendFileFromUrl(from, cewek, 'asupan.png', autocommand, id)
              limitAdd(serial)
            } else if (getComs(txt, 'fakta')) {
              if (isLimit(serial)) return
              fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-fakta-unik.txt')
                .then(res => res.text())
                .then(body => {
                  let tod = body.split("\n");
                  let pjr = tod[Math.floor(Math.random() * tod.length)];
                  reply(pjr);
                  limitAdd(serial)
                });
            } else if (getComs(txt, 'pantun')) {
              if (isLimit(serial)) return
              fetch('https://raw.githubusercontent.com/rebahanelite/random/main/pantunwith')
                .then(res => res.text())
                .then(body => {
                  let tod = body.split("\n");
                  let pjr = tod[Math.floor(Math.random() * tod.length)];
                  reply(pjr)
                  limitAdd(serial)
                });
            } else if (getComs(txt, 'gombal')) {
              if (isLimit(serial)) return
              fetch('https://raw.githubusercontent.com/rebahanelite/random/main/gombal.txt')
                .then(res => res.text())
                .then(body => {
                  let tod = body.split("\n");
                  let pjr = tod[Math.floor(Math.random() * tod.length)];
                  reply(pjr)
                  limitAdd(serial)
                });
            } else if (getPrefix(txt, 'kadar') || getPrefix(txt, 'tingkat')) {
              if (isLimit(serial)) return
              if (args.length >= 1 && args[0] === 'kebodohan') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nmasih bisa diperbaiki. semangat ^^`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\nayo kak, kurangin malasnya!!`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\nhmmmm bingung nih :(`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nanjim goblok banget sia`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nebuset tolol, anjing`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nwah kebangetan anjing!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nmati aja tolol! gaguna idup`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'kepintaran') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nmasih bisa diperbaiki. semangat ^^`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\nayo kak, kurangin malasnya!!`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\nhmmmm bingung nih :(`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\npertahankan kak! kalo bisa tingkatkan!`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nkakak kok pinter sih? duh jadi pengen deh sama kk`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\njago banget sih kak! hebat!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nKAKAK MAKANNYA APA SIH GILA!`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'kemalasan') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nmasih bisa diperbaiki. semangat ^^`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\nayo kak, kurangin malasnya!!`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\nhmmmm bingung nih :(`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nanjim pemalas banget sia`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nebuset pemalas, anjing`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nwah kebangetan anjing!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nmati aja tolol! gaguna idup`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'kebijaksanaan') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nhmmm dikit banget :(`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\npasti biasanya suka bikin quotes2 ala anak senja`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\nsuka jadi tempat curhat ya?`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nwah titisannya mario tegang ya?`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nwah jadi gantinya mario tegang sabi nih!`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nfix mario tegang mah lewat!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nmati aja tolol! gaguna idup`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'kenakalan') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nnakal dikit gapapalah ya ^^`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\ndikurangin kak, nanti kebablasan!`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\nsuka bolos pas sekolah ya!!?`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nWAH CIRI CIRI BADBOY / BADGIRL NIH! apa malah BADWARIA?`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\npasti sering bikin doi nangis! kurang ajar!!`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nJANGAN GITU DONG KAK! TOBATLAH!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nFIX INI MAH HOBI HAMILIN ANAK ORANG!`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'kegantengan') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nhmmmm dikit banget, gapapalah dikit :)`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\ngausah sok ganteng, lo muka editan!`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\ngak yakin gw kalo lu ganteng! kaca mana kaca!?`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nmentang2 ganteng jangan jadi playboy dong!`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nudah berapa kali ganti pasangan kak!?`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nfix ini mah artis :(`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nKALO MAIN FILM, PASTI MASUK BOX OFFICE FILMNYA!`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'kecantikan') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nhmmm dikit banget :(`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\ncantik kok kak, jangan insecure ya!`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\njangan sok cantik anjing! jangan kegatelan, muka pas2an doang`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nwah rajin perawatan ya :)`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nheh kak, mau jadi pacarku?`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nKAK, JADI PACARKU YA!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nKAK, AKU GABISA TANPAMU :(`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'gay') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nkorbannya siapa sih ini :(`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\npasti biasanya suka mancing2`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\nsuka jadi anu ya :(`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nnajis lo, minggir sana!`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nanjing gay! gw blokir aja kali ya?`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nANJING!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nNYESEL GW JAWAB, DASAR GAY! MATI LO SANA!`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'cabul') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\npasti baru mau coba2, jangan!!`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\njangan keterusan tolol, kasian anak orang`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\ngini nih, perusak anak orang!`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\ndah berapa hooman yang lo rusak jing?`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nnajis cabul banget, dasar otak selangkangan!`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nanjinglah, no komen gua`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nmati aja tolol! gaguna idup`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'hoki') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nhmmm dikit banget :(`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\npasti biasanya dapet hadiah di ciki ciki yakan :D`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\npasti sering dapet jajan di waktu yang tak terduga`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nsering dijajanin ya?`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\najegile, hokinya gede!`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\nbagi bagi dong hokinya!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nberuntung amat lu idup, jadi ngiri gue! :(`)
                  limitAdd(serial)
                }
              } else if (args.length >= 1 && args[0] === 'bucin') {
                const random = Math.floor(Math.random() * (100 - 1) + 1);
                if (random <= 10) {
                  reply(`hasilnya adalah ${random}%\nbutuh pencerahan!`)
                  limitAdd(serial)
                } else if (random >= 15 && random <= 30) {
                  reply(`hasilnya adalah ${random}%\npasti biasanya baru2 pacaran`)
                  limitAdd(serial)
                } else if (random >= 30 && random <= 50) {
                  reply(`hasilnya adalah ${random}%\nsuka goblok ya?`)
                  limitAdd(serial)
                } else if (random >= 50 && random <= 70) {
                  reply(`hasilnya adalah ${random}%\nanjing bucin lo!`)
                  limitAdd(serial)
                } else if (random >= 70 && random <= 90) {
                  reply(`hasilnya adalah ${random}%\nminggir lo bucin!`)
                  limitAdd(serial)
                } else if (random >= 90 && random <= 99) {
                  reply(`hasilnya adalah ${random}%\ntailah dasar bucin!`)
                  limitAdd(serial)
                } else if (random === 100) {
                  reply(`hasilnya adalah ${random}%\nnajis bucin, putus nangis2 lo!`)
                  limitAdd(serial)
                }
              }
            } else if (getComs(txt, 'decrypt') || getComs(txt, 'toimg') || getComs(txt, 'toimage')) {
              if (isLimit(serial)) return
              if (!quotedMsg) reply('Maaf, perintah harus mereply target!')
              if (!quotedMsgObj.mimetype) return reply('Maaf, hanya dapat mendecrypt sticker non animasi!')
              const mediaData = await decryptMedia(quotedMsg)
              const formated = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
              fn.sendFile(toId, formated, BotName + '.jpg', autocommand, id)
              limitAdd(serial)
            } else if (getPrefix(txt, 'brainly')) {
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.vhtear.com/branly?query='+query+'&apikey='+Premapikey
              const loli = await axios.get(urlss)
              reply(loli.data.result.data)
              limitAdd(serial)
            } else if (getPrefix(txt, 'ssweb')) {
              if (isLimit(serial)) return
              const web = quotedMsg ? quotedMsgObj.body : args[0]
              if (!web) return
              if (!web.match(isUrl)) return reply('Maaf, url tidak valid')
              const browser = await puppeteer.launch({
                headless: true,
                args: [
                  "--no-sandbox",
                  "--disable-setuid-sandbox",
                  "--disable-dev-shm-usage",
                  "--disable-accelerated-2d-canvas",
                  "--disable-gpu"
                ]
              });
              const page = await browser.newPage();
              await page
                .goto(web, {
                  waitUntil: "networkidle2",
                })
                .then(async() => {
                  await page.setViewport({
                    width: 800,
                    height: 1400,
                  });
                  const base64 = await page.screenshot({
                    encoding: "base64"
                  })
                  const dataUrl = `data:image/jpg;base64,${base64}`
                  fn.sendImageWithMention(from, dataUrl, 'hasil.jpg', '@'+serial.replace('@c.us',''), id);
                  limitAdd(serial);
                  browser.close();
                }).catch((err) => {
                  console.log(err)
                  reply(`[GAGAL] url tidak valid!`)
                  browser.close();
                });
            } else if (getComs(txt, 'voicechanger1') || getComs(txt, 'vc1')) {
              if (isLimit(serial)) return
              if (!quotedMsg) reply('Maaf, perintah harus mereply target!')
              if (quotedMsgObj.mimetype == 'audio/ogg; codecs=opus') {
                const filename = `./database/datab.ogg`;
                const mediaData = await decryptMedia(quotedMsg);
                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
                await fs.writeFile(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                  reply('sedang memproses audio')
                })
                await sleep(5000)
                var xsa = new os_spawn();
                xsa.execCommand('python3 pyo.py').then(res => {
                  fn.sendFile(toId, './database/pepek.mp3', BotName + '.mp3', message.id)
                  limitAdd(serial)
                }).catch(err => {
                  console.log("os >>>", err);
                })
              } else if (quotedMsgObj.mimetype == 'audio/mpeg') {
                const filename = `./database/database.mp3`;
                const mediaData = await decryptMedia(quotedMsg);
                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
                await fs.writeFileSync(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                  reply('sedang memproses audio')
                })
                await sleep(5000)
                var xsa = new os_spawn();
                xsa.execCommand('python3 pyd.py').then(res => {
                  fn.sendFile(toId, './database/pepek.mp3', BotName + '.mp3', message.id)
                  limitAdd(serial)
                }).catch(err => {
                  console.log("os >>>", err);
                })
              }
            } else if (getComs(txt, 'voicechanger2') || getComs(txt, 'vc2')) {
              if (isLimit(serial)) return
              if (!quotedMsg) reply('Maaf, perintah harus mereply target!')
              if (quotedMsgObj.mimetype == 'audio/ogg; codecs=opus') {
                const filename = `./database/datab.ogg`;
                const mediaData = await decryptMedia(quotedMsg);
                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
                await fs.writeFile(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                  reply('sedang memproses audio')
                })
                await sleep(5000)
                var xsa = new os_spawn();
                xsa.execCommand('python3 py2.py').then(res => {
                  fn.sendFile(toId, './database/pepek.mp3', BotName + '.mp3', message.id)
                  limitAdd(serial)
                }).catch(err => {
                  console.log("os >>>", err);
                })
              } else if (quotedMsgObj.mimetype == 'audio/mpeg') {
                const filename = `./database/database.mp3`;
                const mediaData = await decryptMedia(quotedMsg);
                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
                await fs.writeFileSync(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                  reply('sedang memproses audio')
                })
                await sleep(5000)
                var xsa = new os_spawn();
                xsa.execCommand('python3 py1.py').then(res => {
                  fn.sendFile(toId, './database/pepek.mp3', BotName + '.mp3', message.id)
                  limitAdd(serial)
                }).catch(err => {
                  console.log("os >>>", err);
                })
              }
            } else if (getComs(txt, 'voicechanger3') || getComs(txt, 'vc3')) {
              if (isLimit(serial)) return
              if (!quotedMsg) reply('Maaf, perintah harus mereply target!')
              if (quotedMsgObj.mimetype == 'audio/ogg; codecs=opus') {
                const filename = `./database/datab.ogg`;
                const mediaData = await decryptMedia(quotedMsg);
                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
                await fs.writeFile(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                  reply('sedang memproses audio')
                })
                await sleep(5000)
                var xsa = new os_spawn();
                xsa.execCommand('python3 py4.py').then(res => {
                  fn.sendFile(toId, './database/pepek.mp3', BotName + '.mp3', message.id)
                  limitAdd(serial)
                }).catch(err => {
                  console.log("os >>>", err);
                })
              } else if (quotedMsgObj.mimetype == 'audio/mpeg') {
                const filename = `./database/database.mp3`;
                const mediaData = await decryptMedia(quotedMsg);
                const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
                await fs.writeFileSync(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                  reply('sedang memproses audio')
                })
                await sleep(5000)
                var xsa = new os_spawn();
                xsa.execCommand('python3 py3.py').then(res => {
                  fn.sendFile(toId, './database/pepek.mp3', BotName + '.mp3', message.id)
                  limitAdd(serial)
                }).catch(err => {
                  console.log("os >>>", err);
                })
              }
            } else if (getPrefix(txt, 'upbacot')) {
              if (isLimit(serial)) return
              if (quotedMsg && quotedMsgObj.type === 'text') {
                const asu = quotedMsgObj.body
                if (asu.includes('whatsapp.com') || asu.includes('instagram.com')) return reply('jangan malah buat iklan kak! mau diblok?')
                if (asu.includes('gimana') || asu.includes('cara') || asu.includes('kontol') || asu.includes('anjing') || asu.includes('babi') || asu.includes('bangsat') || asu.includes('memek') || asu.includes('meki') || asu.includes('gay') || asu.includes('tuhan') || asu.includes('lonte') || asu.includes('gigolo') || asu.includes('open bo') || asu.includes('jembut') || asu.includes('jembot') || asu.includes('kondom') || asu.includes('tempik') || asu.includes('ngewe') || asu.includes('ngeue') || asu.includes('ngentot') || asu.includes('ngentod') || asu.includes('sange')) return reply('jangan ngajarin aku ngetoxic kak! atau mau diblokir sama aku?')
                if (asu.includes('Gimana') || asu.includes('Kontol') || asu.includes('Anjing') || asu.includes('Babi') || asu.includes('Bangsat') || asu.includes('Memek') || asu.includes('Meki') || asu.includes('Gay') || asu.includes('Tuhan') || asu.includes('Lonte') || asu.includes('Gigolo') || asu.includes('Open bo') || asu.includes('Jembut') || asu.includes('Jembot') || asu.includes('Kondom') || asu.includes('Tempik') || asu.includes('Ngewe') || asu.includes('Ngeue') || asu.includes('Ngentot') || asu.includes('Ngentod') || asu.includes('Sange')) return reply('jangan ngajarin aku ngetoxic kak! atau mau diblokir sama aku?')
                x0.bacot.push(asu)
                dumpBacot()
                reply('tersimpan didatabase')
                limitAdd(serial)
              } else {
                const asu = arg
                if (args.length === 0) return reply('coba ketik /upbacot *kalimat*')
                if (asu.includes('chat.whatsapp.com') || asu.includes('instagram.com')) return reply('jangan malah buat iklan kak! mau diblok?')
                if (asu.includes('gimana') || asu.includes('cara') || asu.includes('kontol') || asu.includes('anjing') || asu.includes('babi') || asu.includes('bangsat') || asu.includes('memek') || asu.includes('meki') || asu.includes('gay') || asu.includes('tuhan') || asu.includes('lonte') || asu.includes('gigolo') || asu.includes('open bo') || asu.includes('jembut') || asu.includes('jembot') || asu.includes('kondom') || asu.includes('tempik') || asu.includes('ngewe') || asu.includes('ngeue') || asu.includes('ngentot') || asu.includes('ngentod') || asu.includes('sange')) return reply('jangan ngajarin aku ngetoxic kak! atau mau diblokir sama aku?')
                if (asu.includes('Gimana') || asu.includes('Kontol') || asu.includes('Anjing') || asu.includes('Babi') || asu.includes('Bangsat') || asu.includes('Memek') || asu.includes('Meki') || asu.includes('Gay') || asu.includes('Tuhan') || asu.includes('Lonte') || asu.includes('Gigolo') || asu.includes('Open bo') || asu.includes('Jembut') || asu.includes('Jembot') || asu.includes('Kondom') || asu.includes('Tempik') || asu.includes('Ngewe') || asu.includes('Ngeue') || asu.includes('Ngentot') || asu.includes('Ngentod') || asu.includes('Sange')) return reply('jangan ngajarin aku ngetoxic kak! atau mau diblokir sama aku?')
                x0.bacot.push(asu)
                dumpBacot()
                reply('tersimpan didatabase')
                limitAdd(serial)
              }
            } else if (getComs(txt, 'totext') || getComs(txt, 'ocr')) {
              if (isLimit(serial)) return
              if (isMedia && mimetype === 'image') {
                const filename = `./media/${t}.${mime.extension(mimetype)}`
                const mediaData = await decryptMedia(message);
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                fs.writeFile(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err)
                  }
                  reply('sedang memproses data!');
                })
                const result = await tesseract.recognize(filename, {
                  lang: 'eng+ind+jap+chi+ar',
                })
                reply(result, id)
                limitAdd(serial)
              } else if (mimetype === 'sticker') {
                const filename = `./media/${t}.${mime.extension(mimetype)}`
                const mediaData = await decryptMedia(message);
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                fs.writeFile(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err)
                  }
                  reply('sedang memproses data!');
                })
                const result = await tesseract.recognize(filename, {
                  lang: 'eng+ind+jap+chi+ar',
                })
                reply(result, id)
                limitAdd(serial)
              } else if (quotedMsg) {
                if (quotedMsgObj.type === 'image') {
                  const filename = `./media/${t}.${mime.extension(quotedMsgObj.mimetype)}`
                  const mediaData = await decryptMedia(quotedMsg)
                  const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                  fs.writeFile(filename, mediaData, function (err) {
                    if (err) {
                      return console.log(err)
                    }
                    reply('sedang memproses data!');
                  })
                  const result = await tesseract.recognize(filename, {
                    lang: 'eng+ind+jap+chi+ar',
                  })
                  reply(result, id)
                  limitAdd(serial)
                } else if (quotedMsgObj.type === 'sticker') {
                  const filename = `./media/${t}.${mime.extension(quotedMsgObj.mimetype)}`
                  const mediaData = await decryptMedia(quotedMsg)
                  const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                  fs.writeFile(filename, mediaData, function (err) {
                    if (err) {
                      return console.log(err)
                    }
                    reply('sedang memproses data!');
                  })
                  const result = await tesseract.recognize(filename, {
                    lang: 'eng+ind+jap+chi+ar',
                  })
                  reply(result, id)
                  limitAdd(serial)
                }
              } else {
                reply('hanya bisa digunakan untuk sticker dan gambar!')
              }
            } else if (getComs(txt, 'toaudio')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                if (mimetype === 'video/mp4') {
                  const mediaData = await decryptMedia(message)
                  if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
                  await fs.writeFileSync('./database/x.mp4', mediaData)
                  const spawn = require('child_process').spawn
                  const anjay = await spawn('ffmpeg', ['-y', '-i', './database/x.mp4', '-vn', '-acodec', 'libmp3lame', './database/database.mp3'])
                  anjay.on('close', function () {
                    fn.sendFile(toId, './database/database.mp3', './database/database.mp3', autocommand, id)
                    limitAdd(serial)
                  })
                }
              } else if (quotedMsg) {
                await reply('Memproses data...')
                if (quotedMsgObj.mimetype === 'video/mp4') {
                  const mediaData = await decryptMedia(quotedMsg)
                  if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
                  await fs.writeFileSync('./database/x.mp4', mediaData)
                  const spawn = require('child_process').spawn
                  const anjay = await spawn('ffmpeg', ['-y', '-i', './database/x.mp4', '-vn', '-acodec', 'libmp3lame', './database/database.mp3'])
                  anjay.on('close', function () {
                    fn.sendFile(toId, './database/database.mp3', './database/database.mp3', autocommand, id)
                    limitAdd(serial)
                  })
                }
              } else {
                await reply('Error!')
              }
            } else if (getPrefix(txt, 'math')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const res = arg
              if (typeof Math_js.evaluate(res) !== "number") {
                reply(`"${res}", bukan angka!`)
              } else {
                reply(`*Hasil:*\n\n${res} = ${Math_js.evaluate(res)}`)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'admin')) {
              if (args.length === 0) return
              const bug = body.slice(7)
              if (!bug) return
              if (isGroupMsg) {
                fn.sendText(admin, `*[BUG REPORT]*\nNO PENGIRIM: wa.me/${serial.match(/\d+/g)}\nGroup: ${formattedTitle}\nID: ${from}\n\n${bug}`)
                reply('Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.')
              } else {
                fn.sendText(admin, `*[BUG REPORT]*\nNO PENGIRIM : wa.me/${serial.match(/\d+/g)}\n\n${bug}`)
                reply('Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.')
              }
            } else if (getPrefix(txt, 'komiku')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const asu = arg
              const urlss = 'https://restugbk.herokuapp.com/api/komiku?q=' + asu
              const response = await fetch(urlss)
              const pp = await response.json()
              if (pp.status === 200) {
                let dat = "*Result*\n"
                dat += "\n" + pp.genre
                dat += "\n" + pp.info
                dat += "\n" + pp.sinopsis
                dat += "\n" + pp.link_dl
                dat += "\n\n" + autocommand
                await reply(dat)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'infonime')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const asu = arg
              const urlss = 'https://restugbk.herokuapp.com/api/dewabatch?q=' + asu
              const response = await fetch(urlss)
              const pp = await response.json()
              if (pp.status === 200) {
                let dat = "*Result*\n"
                dat += "\n" + pp.result
                dat += "\n" + pp.sinopsis
                dat += "\n\n" + autocommand
                await fn.sendFileFromUrl(toId, pp.thumb, 'asu.jpg', dat)
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'kusonime')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const asu = arg
              const urlss = 'https://restugbk.herokuapp.com/api/kuso?q=' + asu
              const response = await fetch(urlss)
              const pp = await response.json()
              if (pp.status === 200) {
                let dat = "*Result*\n"
                dat += "\n" + pp.title
                dat += "\n" + pp.info
                dat += "\n" + pp.sinopsis
                dat += "\n" + pp.link_dl
                dat += "\n\n" + autocommand
                await reply(dat)
                limitAdd(serial)
              }
            } else if (getComs(txt, 'compress')) {
              if (isLimit(serial)) return
              if (isMedia) {
                const gambar = await decryptMedia(message)
                await processImg(gambar)
              } else if (quotedMsg && quotedMsg.type == 'image') {
                const compres = await decryptMedia(quotedMsg)
                await processImg(compres)
              } else {
                reply(`Tidak ada gambar!`)
              }
              async function processImg(gambar) {
                let image = await Jimp.read(gambar);
                image.quality(55).write('./media/compressed.jpeg', function (err) {
                  if (err) console.log(err);
                  fn.sendFile(from, './media/compressed.jpeg', 'compressed.jpg', autocommand);
                  limitAdd(serial);
                });
              }
            } else if (getComs(txt, 'wait')) {
              if (isLimit(serial)) return
              if (isMedia) {
                const media = await decryptMedia(message)
                wait(media).then(hasil => {
                  reply(hasil);
                  limitAdd(serial);
                }).catch(err => {
                  reply(err)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                const quoted = await decryptMedia(quotedMsg)
                wait(quoted).then(hasil => {
                  reply(hasil);
                  limitAdd(serial);
                }).catch(err => {
                  reply(err)
                })
              } else {
                reply(`Tidak ada gambar! untuk ${prefix}wait, kirim gambar dengan caption ${prefix}wait`)
              }
            } else if (getComs(txt, 'inspect')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (quotedMsg) {
                tf.engine().startScope();
                const model = await nsfw.load();
                const media = quotedMsg
                const mediaData = await decryptMedia(media)
                const readImage = tf.node.decodeJpeg(mediaData, 3)
                const predictions = await model.classify(readImage)
                tf.dispose(model)
                tf.disposeVariables();
                tf.engine().endScope();
                let hasil
                for (let i of predictions) {
                  hasil += i.className + ' : ' + i.probability.toFixed(2) + '%\n'
                }
                hasil = hasil.replace('undefined', '')
                reply(hasil)
              } else {
                tf.engine().startScope();
                const model = await nsfw.load();
                const media = message
                const mediaData = await decryptMedia(media)
                const readImage = tf.node.decodeJpeg(mediaData, 3)
                const predictions = await model.classify(readImage)
                tf.dispose(model)
                tf.disposeVariables();
                tf.engine().endScope();
                let hasil
                for (let i of predictions) {
                  hasil += i.className + ' : ' + i.probability.toFixed(2) + '%\n'
                }
                hasil = hasil.replace('undefined', '')
                reply(hasil)
              }
            } else if (getComs(txt, 'mesticker')) {
              if (isLimit(serial)) return
              const pic = await fn.getProfilePicFromServer(serial)
              if (pic == undefined) {
                var pfp = errorurl
              } else {
                var pfp = pic
              }
              const urlss = "https://api.vhtear.com/burning_fire?link=" + urlencode(pfp) + "&apikey=" + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result.imgUrl
              await fn.sendStickerfromUrl(toId, cok)
              limitAdd(serial)
            } else if (getPrefix(txt, 'getsticker')) {
              if (isLimit(serial)) return
              if (quotedMsg) {
                const pic = await fn.getProfilePicFromServer(quotedParticipant)
                if (pic == undefined) {
                  var pfp = errorurl
                } else {
                  var pfp = pic
                }
                const urlss = "https://api.vhtear.com/burning_fire?link=" + urlencode(pfp) + "&apikey=" + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result.imgUrl
                await fn.sendStickerfromUrl(toId, cok)
                limitAdd(serial)
              } else {
                if (!isGroupMsg) return reply('Maaf, perintah ini hanya dapat dipakai didalam grup!')
                if (mentionedJidList.length === 0) return await reply('Maaf, format pesan salah.')
                if (mentionedJidList.length >= 2) return await reply('Maaf, perintah ini hanya dapat digunakan kepada 1 user.')
                const pic = await fn.getProfilePicFromServer(mentionedJidList[0])
                if (pic == undefined) {
                  var pfp = errorurl
                } else {
                  var pfp = pic
                }
                const urlss = "https://api.vhtear.com/burning_fire?link=" + urlencode(pfp) + "&apikey=" + Premapikey
                const response = await fetch(urlss)
                const pp = await response.json()
                const cok = pp.result.imgUrl
                await fn.sendStickerfromUrl(toId, cok)
                limitAdd(serial)
              }
            } else if (getComs(txt, 'fire')) {
              if (isLimit(serial)) return
              if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await fn.sendStickerfromUrl(from, Sfire)
                limitAdd(serial)
              } else if (quotedMsg && quotedMsg.type === 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await fn.sendStickerfromUrl(from, Sfire)
                limitAdd(serial)
              }
            } else if (getComs(txt, 'lightning')) {
              if (isLimit(serial)) return
              if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerlight(getUrli)
                const Sfire = imgnya.result.imgUrl
                await fn.sendStickerfromUrl(from, Sfire)
                limitAdd(serial)
              } else if (quotedMsg && quotedMsg.type === 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerlight(getUrli)
                const Sfire = imgnya.result.imgUrl
                await fn.sendStickerfromUrl(from, Sfire)
                limitAdd(serial)
              }
            } else if (getComs(txt, 'loli')) {
              if (isLimit(serial)) return
              const urlss = "https://api.vhtear.com/randomloli&apikey=" + Premapikey
              const loli = await axios.get(urlss)
              fn.sendFileFromUrl(from, loli.data.result.result, 'loli.jpeg', autocommand, id)
              limitAdd(serial)
            } else if (getComs(txt, 'shota')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const imageToBase64 = require('image-to-base64')
              var shouta = ['shota anime', 'anime shota'];
              var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
              var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;
              axios.get(urlshot)
                .then((result) => {
                  var sht = JSON.parse(JSON.stringify(result.data));
                  var shotaak = sht[Math.floor(Math.random() * sht.length)];
                  imageToBase64(shotaak)
                  .then(
                    (response) => {
                      let img = 'data:image/jpeg;base64,' + response
                      fn.sendFile(from, img, "shota.jpg", autocommand, id)
                      limitAdd(serial)
                    }
                  )
                  .catch(
                    (error) => {
                      console.log(error);
                    }
                  )
                }
              )
            } else if (getComs(txt, 'husbu')) {
              if (isLimit(serial)) return
              const diti = fs.readFileSync('./db/husbu.json')
              const ditiJsin = JSON.parse(diti)
              const rindIndix = Math.floor(Math.random() * ditiJsin.length)
              const rindKiy = ditiJsin[rindIndix]
              fn.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
              limitAdd(serial)
            } else if (getPrefix(txt, 'maps')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const mapz = arg
              try {
                const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
                const {
                  gambar
                } = mapz2.data
                const asucokleng = bent("buffer")
                const pictk = await asucokleng(gambar)
                const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                fn.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
                limitAdd(serial)
              } catch (err) {
                console.error(err.message)
                await fn.sendFileFromUrl(from, errorurl, 'error.png', 'error!')
                fn.sendText(ownerNumber, 'Error Maps : ' + err)
              }
            } else if (getComs(txt, 'kpop')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const argus = ['blackpink', 'exo', 'bts']
              fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + randomChoice(argus) + '.txt')
                .then(res => res.text())
                .then(body => {
                  let randomkpop = body.split('\n')
                  let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                  fn.sendFileFromUrl(from, randomkpopx, 'fnbots.jpg', autocommand, id)
                })
                .catch(() => {
                  reply('Error!')
                })
            } else if (getPrefix(txt, 'distance')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              const urlss = 'https://api.vhtear.com/distance?from=' + a + '&to=' + b + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result.data
              reply(ll).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'movie')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg
              const urlss = 'https://arugaz.herokuapp.com/api/sdmovie?film=' + a
              const response = await fetch(urlss)
              const pp = await response.json()
              let ll = 'Title: ' + pp.result.title + '\n'
              ll += 'Rating: ' + pp.result.rating + '\n'
              ll += 'Sinopsis: ' + pp.result.sinopsis + '\n'
              ll += 'Link: ' + pp.result.video
              reply(ll).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getComs(txt, 'random stream18+')) {
              if (isLimit(serial)) return
              const urlss = 'https://arugaz.herokuapp.com/api/indohot'
              const response = await fetch(urlss)
              const pp = await response.json()
              let ll = 'Title: ' + pp.result.judul + '\n'
              ll += 'Genre: ' + pp.result.genre + '\n'
              ll += 'Durasi: ' + pp.result.durasi + '\n'
              ll += 'Link: ' + pp.result.url
              reply(ll).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getComs(txt, 'random puisi')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const urls = 'https://api.vhtear.com/puisi_image&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getComs(txt, 'random cerpen')) {
              if (isLimit(serial)) return
              const urlss = ['https://arugaz.herokuapp.com/api/cerpen', 'https://arugaz.herokuapp.com/api/cersex2']
              const response = await fetch(randomChoice(urlss))
              const pp = await response.json()
              reply(pp.result).catch((err) => console.log(err))
              limitAdd(serial)
            } 
            //---------------text-manipulation---------------//
            if (getPrefix(txt, 'text-reverse')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg
              reply(a.split('').reverse().join('')).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'text-zalgo')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              let text = arg
              let result = '';
              for (let i = 0; i < text.length; i++) {
                result += text[i];
                for (const chars of Object.values(zalgo)) {
                  let count = Math.floor(Math.random() * 5);
                  while (count--) result += chars[Math.floor(Math.random() * chars.length)];
                }
              }
              reply(result)
            } else if (getPrefix(txt, 'text-braille')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg
              reply(letterTrans(a, braille)).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'text-cursive')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg
              reply(letterTrans(a, cursiv)).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'text-emojify')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg
              reply(letterTrans(a, emoju)).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'text-fancy')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg
              reply(letterTrans(a, fancy)).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'text-superscript')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg
              reply(letterTrans(a, suuiper)).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'text-brony-talk')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const a = arg
              reply(wordTrans(a, broni)).catch((err) => console.log(err))
              limitAdd(serial)
            }
            //---------------edit-meme---------------//
            if (getComs(txt, 'distort')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                deepfry(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                deepfry(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                deepfry(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'tobecontinue')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                tobecontinue(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                tobecontinue(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                tobecontinue(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'triggered')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                triggered(mediaData, id).then(res => {
                  sendRawWebpAsSticker(res)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                triggered(mediaData, id).then(res => {
                  sendRawWebpAsSticker(res)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                triggered(datax, id).then(res => {
                  sendRawWebpAsSticker(res)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'thuglife')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                thuglife(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                thuglife(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                thuglife(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getPrefix(txt, 'burn')) {
              if (isLimit(serial)) return
              let query = body.slice(6)
              if (!query) return reply('Maaf, perintah tidak valid')
              burn(query).then(res => {
                fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                limitAdd(serial)
              })
            } else if (getComs(txt, 'wasted')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                wasted(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                wasted(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                wasted(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'wanted')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                wanted(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                wanted(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                wanted(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'rainbow')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                rainbow(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                rainbow(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                rainbow(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'facepalm')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                facepalm(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                facepalm(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                facepalm(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getPrefix(txt, 'fuse')) {
              if (isLimit(serial)) return
              if (!mentionedJidList[0] || !mentionedJidList[1]) return reply('Maaf, perintah tidak valid')
              let datax1 = await fn.getProfilePicFromServer(mentionedJidList[0])
              let datax2 = await fn.getProfilePicFromServer(mentionedJidList[1])
              if (!datax1) datax1 = fs.readFileSync('./image/default-dp.jpeg')
              if (!datax2) datax2 = await fn.getProfilePicFromServer(serial)
              fuse(datax1, datax2).then(res => {
                fn.sendFile(from, res, 'hasil.png', autocommand, id)
                limitAdd(serial)
              })
            }
            if (getPrefix(txt, 'certificate')) {
              if (isLimit(serial)) return
              const name = arg.split('|')[0]
              const reason = arg.split('|')[1]
              const datax = fs.readFileSync('./image/certificate.png')
              const base = await loadImage(datax);
              const canvas = createCanvas(base.width, base.height);
              const ctx = canvas.getContext('2d');
              ctx.drawImage(base, 0, 0);
              ctx.font = '30px Old English Text MT';
              ctx.textBaseline = 'top';
              ctx.textAlign = 'center';
              ctx.fillText(reason, 518, 273);
              ctx.fillText(name, 518, 419);
              ctx.fillText(moments().format('MM/DD/YYYY'), 309, 503);
              const attachment = canvas.toBuffer();
              const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
              return fn.sendFile(toId, formated, 'certificate.jpg', autocommand, id);
              limitAdd(serial)
            } else if (getPrefix(txt, 'danger')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              registerFont('./fonts/Noto-Bold.ttf', {
                family: 'Noto',
                weight: 'bold'
              });
              const text = arg
              const datax = fs.readFileSync('./image/danger.png')
              const base = await loadImage(datax);
              const canvas = createCanvas(base.width, base.height);
              const ctx = canvas.getContext('2d');
              ctx.drawImage(base, 0, 0);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              ctx.font = 'normal bold 60px Noto';
              let fontSize = 60;
              while (ctx.measureText(text).width > 2520) {
                fontSize--;
                ctx.font = `normal bold ${fontSize}px Noto`;
              }
              const lines = await wrapText(ctx, text.toUpperCase(), 840);
              const topMost = 510 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
              for (let i = 0; i < lines.length; i++) {
                const height = topMost + ((fontSize + 20) * i);
                ctx.fillText(lines[i], base.width / 2, height);
              }
              const attachment = canvas.toBuffer();
              const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
              return fn.sendFile(toId, formated, 'danger.jpg', 'fnbots', id);
            } else if (getPrefix(txt, 'caution')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              registerFont('./fonts/Noto-Bold.ttf', {
                family: 'Noto',
                weight: 'bold'
              });
              const text = arg
              const datax = fs.readFileSync('./image/caution.png')
              const base = await loadImage(datax);
              const canvas = createCanvas(base.width, base.height);
              const ctx = canvas.getContext('2d');
              ctx.drawImage(base, 0, 0);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              ctx.font = 'normal bold 60px Noto';
              let fontSize = 60;
              while (ctx.measureText(text).width > 3311) {
                fontSize--;
                ctx.font = `normal bold ${fontSize}px Noto`;
              }
              const lines = await wrapText(ctx, text.toUpperCase(), 895);
              const topMost = 470 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
              for (let i = 0; i < lines.length; i++) {
                const height = topMost + ((fontSize + 20) * i);
                ctx.fillText(lines[i], base.width / 2, height);
              }
              const attachment = canvas.toBuffer();
              const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
              return fn.sendFile(toId, formated, 'danger.jpg', 'fnbots', id);
            } else if (getPrefix(txt, 'license')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              registerFont('./fonts/LicensePlate.ttf', { family: 'License Plate' });
              const text = arg
              const datax = fs.readFileSync('./image/license-plate.png')
              const base = await loadImage(datax);
              const canvas = createCanvas(base.width, base.height);
              const ctx = canvas.getContext('2d');
              ctx.drawImage(base, 0, 0);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = '180px License Plate';
              ctx.fillText(text.toUpperCase(), base.width / 2, base.height / 2, 700);
              const attachment = canvas.toBuffer();
              const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
              return fn.sendFile(toId, formated, 'danger.jpg', 'fnbots', id);
            } else if (getPrefix(txt, 'nowplaying')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const name = arg.split('|')[0]
              const artist = arg.split('|')[1]
              const dataxx = fs.readFileSync('fnbots.jpeg')
              const datax = fs.readFileSync('./image/spotify-now-playing.png')
              const base = await loadImage(datax);
              const data = await loadImage(dataxx);
              const canvas = createCanvas(base.width, base.height);
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, base.width, base.height);
              const height = 504 / data.width;
              ctx.drawImage(data, 66, 132, 504, height * data.height);
              ctx.drawImage(base, 0, 0);
              ctx.textBaseline = 'top';
              ctx.textAlign = 'center';
              ctx.font = 'normal bold 25px Noto';
              ctx.fillStyle = 'white';
              ctx.fillText(name, base.width / 2, 685);
              ctx.fillStyle = '#bdbec2';
              ctx.font = '20px Noto';
              ctx.fillText(artist, base.width / 2, 720);
              ctx.fillText('FNBot\'s Picks', base.width / 2, 65);
              const attachment = canvas.toBuffer();
              const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
              return fn.sendFile(toId, formated, 'certificate.jpg', autocommand, id);
            } else if (getComs(txt, 'blur')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                blur(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                blur(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                blur(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'approve')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                approved(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                approved(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                approved(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'glich')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                glitch(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                glitch(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                glitch(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'ghost')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                ghost(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                ghost(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                ghost(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'mirror')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                mirror(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                mirror(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                mirror(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'reject')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                rejected(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                rejected(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                rejected(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getComs(txt, 'fisheye')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                mataikan(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                mataikan(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                mataikan(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getPrefix(txt, 'subtitle')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const text = arg
                const mediaData = await decryptMedia(message);
                subtitle(mediaData, text, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const text = arg
                const mediaData = await decryptMedia(quotedMsg);
                subtitle(mediaData, text, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                const text = arg
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                subtitle(datax, text, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } else if (getPrefix(txt, 'alert')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              registerFont('./fonts/SF-Pro-Display-Medium.otf', { family: 'SF Pro' });
              const message = arg
              const datax = fs.readFileSync('./image/alert.png')
              const base = await loadImage(datax);
              const canvas = createCanvas(base.width, base.height);
              const ctx = canvas.getContext('2d');
              ctx.drawImage(base, 0, 0);
              ctx.font = '30px SF Pro';
              ctx.fillStyle = '#1f1f1f';
              ctx.textBaseline = 'top';
              let text = await wrapText(ctx, message, 540);
              text = text.length > 3 ? `${text.slice(0, 3).join('\n')}...` : text.join('\n');
              ctx.fillText(text, 48, 178);
              const attachment = canvas.toBuffer();
              const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
              return fn.sendFile(toId, formated, 'danger.jpg', 'fnbots', id);
            } else if (getComs(txt, 'challenge')) {
              if (isLimit(serial)) return
              if (isMedia) {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(message);
                challenge(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else if (quotedMsg && quotedMsg.type == 'image') {
                await reply('Memproses data...')
                const mediaData = await decryptMedia(quotedMsg);
                challenge(mediaData, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              } else {
                let datax = await fn.getProfilePicFromServer(mentionedJidList[0] ? mentionedJidList[0] : serial)
                if (!datax) datax = fs.readFileSync('./image/default-dp.jpeg')
                challenge(datax, id).then(res => {
                  fn.sendFile(from, res, 'hasil.jpg', autocommand, id)
                  limitAdd(serial)
                })
              }
            } 
            //---------------analyze---------------//
            if (getPrefix(txt, 'umurku')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const year = args[0]
              const currentYear = new Date().getFullYear();
              const age = currentYear - parseInt(year)
              if (age < 0) return reply(`Seseorang yang lahir di tahun ${year}, maka akan lahir ${Math.abs(age)} tahun lagi.`);
              reply(`Kamu lahir di tahun ${year}, sepertinya sekarang berumur ${age} tahun.`);
            } else if (getPrefix(txt, 'birthstone')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const months = [
                "januari",
                "februari",
                "maret",
                "april",
                "mei",
                "juni",
                "juli",
                "agustus",
                "september",
                "oktober",
                "november",
                "desember"
              ]
              const stones = [
                {
                  "primary": "Garnet"
                }, {
                  "primary": "Amethyst"
                }, {
                  "primary": "Aquamarine",
                  "alternate": ["Bloodstone"]
                }, {
                  "primary": "Diamond"
                }, {
                  "primary": "Emerald"
                }, {
                  "primary": "Pearl",
                  "alternate": ["Moonstone", "Alexandrite"]
                }, {
                  "primary": "Ruby"
                }, {
                  "primary": "Peridot",
                  "alternate": ["Spinel"]
                }, {
                  "primary": "Sapphire"
                }, {
                  "primary": "Opal",
                  "alternate": ["Tourmaline"]
                }, {
                  "primary": "Topaz",
                  "alternate": ["Citrine"]
                }, {
                  "primary": "Turquoise",
                  "alternate": ["Zircon", "Tanzanite"]
                }
              ]
              const month = args[0]
              const stone = stones[parseInt(month) - 1];
              try {
                const alternate = stone.alternate ? ` Alternatively, you can also use ${list(stone.alternate, 'or')}.` : '';
                return reply(`The Birthstone for ${firstUpperCase(months[month - 1])} is ${stone.primary}.${alternate}`);
              } catch (err) {
                return reply('commands hanya bisa digunakan untuk nomor bulan 1 sampai 12. contoh '+settings.sname+'birthstone 1')
              }
            } else if (getPrefix(txt, 'character-count')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (quotedMsg) {
                const text = quotedMsgObj.body
                return reply(formatNumber(text.length));
              } else {
                const text = arg
                return reply(formatNumber(text.length));
              }
            } else if (getPrefix(txt, 'chinese-zodiac')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const signs = [
                "Monkey",
                "Rooster",
                "Dog",
                "Pig",
                "Rat",
                "Ox",
                "Tiger",
                "Rabbit",
                "Dragon",
                "Snake",
                "Horse",
                "Goat"
              ]
              const year = args[0]
              return reply(`The Chinese Zodiac Sign for ${parseInt(year)} is ${signs[parseInt(year) % signs.length]}.`);
            } else if (getPrefix(txt, 'gender')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const frequest = require('node-superfetch');
              const name = arg
              if (name.length > 20) return reply('tidak bisa lebih dari 20 karakter!')
              try {
                const {
                  body
                } = await frequest
                  .get(`https://api.genderize.io/`)
                  .query({
                    name
                  });
                if (!body.gender) return reply(`I have no idea what gender ${body.name} is.`);
                return reply(`I'm ${Math.round(body.probability * 100)}% sure ${body.name} is a ${body.gender} name.`);
              } catch (err) {
                return reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
              }
            } else if (getPrefix(txt, 'scrabble-score')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const word = arg
              const letters = {
                "a": 1,
                "b": 3,
                "c": 3,
                "d": 2,
                "e": 1,
                "f": 4,
                "g": 2,
                "h": 4,
                "i": 1,
                "j": 8,
                "k": 5,
                "l": 1,
                "m": 3,
                "n": 1,
                "o": 1,
                "p": 3,
                "q": 10,
                "r": 1,
                "s": 1,
                "t": 1,
                "u": 1,
                "v": 4,
                "w": 4,
                "x": 8,
                "y": 4,
                "z": 10
              }
              let score = 0;
              for (const letter of word.split('')) {
                if (!letters[letter]) continue;
                score += letters[letter];
              }
              return reply(formatNumber(score));
            }
            if (getComs(txt, 'sauce')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia)
                const imageLink = await uploadImages(mediaData)
                const results = await saus(imageLink)
                for (let i = 0; i < results.length; i++) {
                  let teks = ''
                  if (results[i].similarity < 89.00) {
                    teks = 'Low similarity. 🤔\n\n'
                  }
                  teks += `*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%`
                  await fn.sendLinkWithAutoPreview(from, results[i].url, teks)
                    .then(() => console.log('Source found!'))
                }
              }
            } else if (getPrefix(txt, 'gplay')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const query = arg
              gplay.search({
                term: query,
                num: 3,
                country: 'id'
              }).then(res => {
                if (!res.length > 0) return reply('Maaf, keyword *' + query + '* tidak ditemukan di playstore')
                let hasil = '*Hasil Pencarian PlayStore*\n\n',
                  counter = 1
                for (let i of res) {
                  if (i.free) {
                    hasil += `*No. ${counter}*\n`
                    hasil += `Nama : ${i.title}\n`
                    hasil += `Score : ${i.scoreText}\n`
                    hasil += `Developer : ${i.developer}\n`
                    hasil += `Deskripsi : \n${i.summary}\n`
                    hasil += `Url : \n${i.url}\n\n`
                  } else {
                    hasil += `*No. ${counter}*\n`
                    hasil += `Nama : ${i.title}\n`
                    hasil += `Score : ${i.scoreText}\n`
                    hasil += `Harga : ${i.priceText}\n`
                    hasil += `Developer : ${i.developer}\n`
                    hasil += `Deskripsi : \n${i.summary}\n`
                    hasil += `Url : \n${i.url}\n\n`
                  }
                  counter++
                }
                reply(hasil)
              }).catch(() => reply('Maaf, keyword *' + query + '* tidak ditemukan di playstore'))
            } else if (getPrefix(txt, 'fspasir')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/sand_writing?text1=${query_}&apikey=${Premapikey}`
              const response = await fetch(urls)
              const json = await response.json()
              await fn.sendFileFromUrl(from, `${json.result.imgUrl}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'fscolor')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg.split('|')[0]
              const query__ = arg.split('|')[1]
              const urls = 'https://api.vhtear.com/watercolour_text?text1=' + query_ + '&text2=' + query__ + '&apikey=' + Premapikey
              const response = await fetch(urls)
              const json = await response.json()
              await fn.sendFileFromUrl(from, `${json.result.imgUrl}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'fsmissing')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (isMedia) {
                if (args.length === 0) return
                const a = arg.split('|')[0]
                const b = arg.split('|')[1]
                const c = arg.split('|')[2]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia)
                const getUrl = await uploadImages(mediaData, false)
                const urls = 'https://api.vhtear.com/missingperson?text1=' + a + '&text2=' + b + '&text3=' + c + '&link=' + getUrl + '&apikey=' + Premapikey
                const response = await fetch(urls)
                const json = await response.json()
                await fn.sendFileFromUrl(from, `${json.result.imgUrl}`, 'image.jpg', autocommand, id)
              } else {
                reply('Maaf, Perintah harus dengan gambar atau membalas gambar')
              }
            } else if (getPrefix(txt, 'jadwalshalat')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const daerah = arg
              const urls = `https://api.vhtear.com/jadwalsholat?query=${daerah}&apikey=${Premapikey}`
              const response = await fetch(urls)
              const ll = await response.json()
              const cok = ll.result
              let resultJadwal = `Jadwal shalat di *${cok.kota}*\n`
              resultJadwal += `*Pada: ${cok.tanggal}*\n\n`
              resultJadwal += `*Subuh: ${cok.Shubuh}*\n`
              resultJadwal += `*Dzuhur: ${cok.Zduhur}*\n`
              resultJadwal += `*Ashar: ${cok.Ashr}*\n`
              resultJadwal += `*Maghrib: ${cok.Magrib}*\n`
              resultJadwal += `*Isya: ${cok.Isya}*`
              await reply(resultJadwal)
              limitAdd(serial)
            } else if (getPrefix(txt, 'tiktokstalk')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/tiktokprofile?query=` + query_ + `&apikey=` + Premapikey
              const response = await fetch(urls)
              const json = await response.json()
              let datax = `username: ${json.result.username} \n`
              datax += `title: ${json.result.title} \n`
              datax += `verified: ${json.result.verified} \n`
              datax += `follow: ${json.result.follow} \n`
              datax += `follower: ${json.result.follower} \n`
              datax += `like_count: ${json.result.like_count} \n`
              datax += `video_post: ${json.result.video_post} \n`
              datax += `url_account: ${json.result.url_account} \n`
              datax += `bio: ${json.result.bio} \n`
              datax += `description: ${json.result.description}`
              await fn.sendFileFromUrl(from, `${json.result.picture}`, 'image.jpg', datax, id)
            } else if (getPrefix(txt, 'twitstalk')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/twittprofile?username=` + query_ + `&apikey=` + Premapikey
              const response = await fetch(urls)
              const json = await response.json()
              let datax = `username: ${json.result.username} \n`
              datax += `title: ${json.result.name} \n`
              datax += `location: ${json.result.location} \n`
              datax += `follow: ${json.result.folowed_count} \n`
              datax += `follower: ${json.result.followers_count} \n`
              datax += `status_count: ${json.result.status_count} \n`
              datax += `favourites_count: ${json.result.favourites_count} \n`
              datax += `media_count: ${json.result.media_count} \n`
              datax += `description: ${json.result.description}`
              await fn.sendFileFromUrl(from, `${json.result.profile_image}`, 'image.jpg', datax, id)
            } else if (getPrefix(txt, 'smuleprofile')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/smuleprofile?query=` + query_ + `&apikey=` + Premapikey
              const response = await fetch(urls)
              const json = await response.json()
              let datax = `username: ${json.result.username} \n`
              datax += `name: ${json.result.full_name} \n`
              datax += `follow: ${json.result.follow} \n`
              datax += `follower: ${json.result.follower} \n`
              datax += `recording: ${json.result.recording} \n`
              datax += `is_vip: ${json.result.is_vip} \n`
              datax += `biography: ${json.result.biography}`
              await fn.sendFileFromUrl(from, `${json.result.picture}`, 'image.jpg', datax, id)
            } else if (getPrefix(txt, 'pinterest')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const query = args[0]
              const urlss = 'https://api.vhtear.com/pinterestdl?link=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result
              if (ll.type == 'gif') {
                const a = async() => {
                  const r = await fetch(ll.fileUrl)
                  if (!r.ok) return reply('link tidak valid')
                  const b = await r.buffer()
                  fn.sendImage(toId, `data:image/gif;base64,${b.toString('base64')}`, 'x.gif', ll.title + '\n\n' + autocommand)
                }
                a()
              } else if (ll.type == 'jpg') {
                await fn.sendFileFromUrl(toId, ll.fileUrl, BotName + '.jpg', ll.title + '\n\n' + autocommand).catch((err) => console.log(err))
              } else {
                await fn.sendFileFromUrl(toId, ll.fileUrl, BotName + '.mp4', ll.title + '\n\n' + autocommand).catch((err) => console.log(err))
              }
              limitAdd(serial)
            } else if (getPrefix(txt, 'blackpink')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = 'https://api.vhtear.com/blackpinkicon?text=' + query_ + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'thunder')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = 'https://api.vhtear.com/thundertext?text=' + query_ + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'silk')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = 'https://api.vhtear.com/silktext?text=' + query_ + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'lovemessage')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = 'https://api.vhtear.com/lovemessagetext?text=' + query_ + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'party')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = 'https://api.vhtear.com/partytext?text=' + query_ + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'googletext')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              const c = arg.split('|')[2]
              const urls = 'https://api.vhtear.com/googletext?text1=' + a + '&text2=' + b + '&text3=' + c + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'glow')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = 'https://api.vhtear.com/glowtext?text=' + query_ + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'glichtext')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              const urls = 'https://api.vhtear.com/glitchtext?text1=' + a + '&text2=' + b + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'pornlogo')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              const urls = 'https://api.vhtear.com/pornlogo?text1=' + a + '&text2=' + b + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'slide')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = 'https://api.vhtear.com/slidingtext?text=' + query_ + '&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.mp4', autocommand, id)
            } else if (getPrefix(txt, 'randomsticker')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const query = arg
              if (query.includes('jilboob') || query.includes('Kontol') || query.includes('Payudara') || query.includes('Pentil') || query.includes('Open BO') || query.includes('VCS') || query.includes('Anal') || query.includes('Ass') || query.includes('Lesbi') || query.includes('NSFW') || query.includes('SEX') || query.includes('Gay') || query.includes('69') || query.includes('Boob') || query.includes('Creampie') || query.includes('Nhentai') || query.includes('Bigtit') || query.includes('JAV') || query.includes('Pussy') || query.includes('Bokep') || query.includes('Tetek') || query.includes('Memek') || query.includes('Meki') || query.includes('Bugil') || query.includes('Bokong') || query.includes('Hentai') || query.includes('Toge') || query.includes('Toket') || query.includes('Colmek') || query.includes('Sange')) return reply('gaboleh nyari yang beginian cil, nanti dimarahin emak!')
              if (query.includes('Jilboob') || query.includes('kontol') || query.includes('payudara') || query.includes('pentil') || query.includes('open bo') || query.includes('vcs') || query.includes('anal') || query.includes('ass') || query.includes('lesbi') || query.includes('nsfw') || query.includes('sex') || query.includes('gay') || query.includes('69') || query.includes('boob') || query.includes('creampie') || query.includes('nhentai') || query.includes('bigtit') || query.includes('jav') || query.includes('pussy') || query.includes('bokep') || query.includes('tetek') || query.includes('memek') || query.includes('meki') || query.includes('bugil') || query.includes('bokong') || query.includes('hentai') || query.includes('toge') || query.includes('toket') || query.includes('colmek') || query.includes('sange')) return reply('gaboleh nyari yang beginian cil, nanti dimarahin emak!')
              const urlss = 'https://api.vhtear.com/wasticker?query=' + query + '&apikey=' + Premapikey
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = shuffle(pp.result.data)
              for (var ia = 1; ia < cok.length; ia++) {
                await fn.sendStickerfromUrl(toId, `${cok[ia]}`)
                if (ia === 1) break;
              }
              limitAdd(serial)
            }
            //--------------i-tech--------------//
            if (getComs(txt, 'animeneko')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.i-tech.id/anim/neko?key=' + apikkk
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result
              fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getComs(txt, 'anime')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.i-tech.id/anim/anime?key=' + apikkk
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result
              fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getComs(txt, 'hug')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.i-tech.id/anim/hug?key=' + apikkk
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result
              await fn.sendFileFromUrl(toId, ll, BotName + '.jpg', autocommand).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getComs(txt, 'waifu')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.i-tech.id/anim/wibu?key=' + apikkk
              const response = await fetch(urlss)
              const pp = await response.json()
              let dat = "\n*Nama*: " + pp.nama
              dat += "\n*Desc*: " + pp.deskripsi
              dat += "\n\n" + autocommand
              await fn.sendFileFromUrl(toId, pp.foto, 'google.jpg', dat, id)
              limitAdd(serial)
            } else if (getPrefix(txt, 'cuaca')) {
              if (isLimit(serial)) return
              if (args.length === 0) return
              const tempat = arg
              const weather = await get.get('https://api.i-tech.id/tools/cuaca?key=' + apikkk + '&kota=' + tempat).json()
              let txt = `Tempat : ${weather.tempat}\n\n`
              txt += `Angin : ${weather.angin}\n`
              txt += `Cuaca : ${weather.cuaca}\n`
              txt += `Deskripsi : ${weather.deskripsi}\n`
              txt += `Kelembapan : ${weather.kelembapan}\n`
              txt += `Suhu : ${weather.suhu}\n`
              txt += `Udara : ${weather.udara}`
              reply(txt)
              limitAdd(serial)
            } else if (getComs(txt, 'random nama cowok')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.i-tech.id/tools/nama?key=' + apikkk + '&gender=male'
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result
              reply(ll).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getComs(txt, 'random nama cewek')) {
              if (isLimit(serial)) return
              const urlss = 'https://api.i-tech.id/tools/nama?key=' + apikkk + '&gender=female'
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result
              reply(ll).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'alay')) {
              if (isLimit(serial)) return
              if (quotedMsg) {
                const query = quotedMsgObj.body
                const urlss = 'https://api.i-tech.id/tools/alay?key=' + apikkk + '&kata=' + query
                const response = await fetch(urlss)
                const pp = await response.json()
                const ll = pp.result
                reply(ll).catch((err) => console.log(err))
                limitAdd(serial)
              } else {
                if (args.length === 0) return
                const query = arg
                const urlss = 'https://api.i-tech.id/tools/alay?key=' + apikkk + '&kata=' + query
                const response = await fetch(urlss)
                const pp = await response.json()
                const ll = pp.result
                reply(ll).catch((err) => console.log(err))
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'cekpln')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.i-tech.id/tagihan/pln?key=' + apikkk + '&no=' + query
              const response = await fetch(urlss)
              const pp = await response.json()
              let text = 'Hasil:\n'
              text += 'Nomor: ' + pp.nomor + '\n'
              text += 'Keterangan: ' + pp.nama + '\n'
              text += 'Jumlah: ' + pp.total + '\n'
              reply(text).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'cekbpjs')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.i-tech.id/tagihan/bpjs?key=' + apikkk + '&no=' + query
              const response = await fetch(urlss)
              const pp = await response.json()
              let text = 'Hasil:\n'
              text += 'Nomor: ' + pp.nomor + '\n'
              text += 'Keterangan: ' + pp.nama + '\n'
              text += 'Jumlah: ' + pp.total + '\n'
              reply(text).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'cekgas')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.i-tech.id/tagihan/gas?key=' + apikkk + '&no=' + query
              const response = await fetch(urlss)
              const pp = await response.json()
              let text = 'Hasil:\n'
              text += 'Nomor: ' + pp.nomor + '\n'
              text += 'Keterangan: ' + pp.nama + '\n'
              text += 'Jumlah: ' + pp.total + '\n'
              reply(text).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'cekindihome')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.i-tech.id/tagihan/indihome?key=' + apikkk + '&no=' + query
              const response = await fetch(urlss)
              const pp = await response.json()
              let text = 'Hasil:\n'
              text += 'Nomor: ' + pp.nomor + '\n'
              text += 'Keterangan: ' + pp.nama + '\n'
              text += 'Jumlah: ' + pp.total + '\n'
              reply(text).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'cekspeedy')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.i-tech.id/tagihan/speedy?key=' + apikkk + '&no=' + query
              const response = await fetch(urlss)
              const pp = await response.json()
              let text = 'Hasil:\n'
              text += 'Nomor: ' + pp.nomor + '\n'
              text += 'Keterangan: ' + pp.nama + '\n'
              text += 'Jumlah: ' + pp.total + '\n'
              reply(text).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'cekhalo')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.i-tech.id/tagihan/halo?key=' + apikkk + '&no=' + query
              const response = await fetch(urlss)
              const pp = await response.json()
              let text = 'Hasil:\n'
              text += 'Nomor: ' + pp.nomor + '\n'
              text += 'Keterangan: ' + pp.nama + '\n'
              text += 'Jumlah: ' + pp.total + '\n'
              reply(text).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'jurnalotaku')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const xox = arg
              const urlss = 'https://api.i-tech.id/anim/otaku?key=' + apikkk + '&type=search&query=' + xox
              const response = await fetch(urlss)
              const pp = await response.json()
              const cok = pp.result
              let anu = "*Result Hasil*\n"
              let nom = 1
              for (var i = 0; i < cok.length; i++) {
                const no = `${nom}`
                anu += "\n" + no + ". " + cok[i].date + "\n    " + cok[i].title + "\n    " + cok[i].link
                nom += 1
              }
              await reply(anu)
              limitAdd(serial)
            } else if (getPrefix(txt, 'hilih')) {
              if (isLimit(serial)) return
              if (quotedMsg) {
                const query = quotedMsgObj.body
                const urlss = 'https://api.i-tech.id/tools/hilih?key=' + apikkk + '&kata=' + query
                const response = await fetch(urlss)
                const pp = await response.json()
                const ll = pp.result
                reply(ll).catch((err) => console.log(err))
                limitAdd(serial)
              } else {
                if (args.length === 0) return
                const query = arg
                const urlss = 'https://api.i-tech.id/tools/hilih?key=' + apikkk + '&kata=' + query
                const response = await fetch(urlss)
                const pp = await response.json()
                const ll = pp.result
                reply(ll).catch((err) => console.log(err))
                limitAdd(serial)
              }
            } else if (getComs(txt, 'tvnow')) {
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.i-tech.id/tools/tvnow?key=' + apikkk
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result
              reply(ll).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'jadwaltv')) {
              if (isLimit(serial)) return
              if (args.length === 0) {
                let tx = 'ANTV\n'
                tx += 'GTV\n'
                tx += 'Indosiar\n'
                tx += 'iNewsTV\n'
                tx += 'KompasTV\n'
                tx += 'MNCTV\n'
                tx += 'METROTV\n'
                tx += 'NETTV\n'
                tx += 'RCTI\n'
                tx += 'SCTV\n'
                tx += 'RTV\n'
                tx += 'Trans7\n'
                tx += 'TransTV'
                reply(tx)
                limitAdd(serial)
              } else {
                const query = arg
                const urlss = 'https://api.i-tech.id/tools/jadwaltv?key=' + apikkk + '&channel=' + query
                const response = await fetch(urlss)
                const pp = await response.json()
                const ll = pp.result
                reply(ll).catch((err) => console.log(err))
                limitAdd(serial)
              }
            } else if (getPrefix(txt, 'namaninja')) {
              if (args.length === 0) return
              if (isLimit(serial)) return
              const query = arg
              const urlss = 'https://api.i-tech.id/tools/ninja?key=' + apikkk + '&kata=' + query
              const response = await fetch(urlss)
              const pp = await response.json()
              const ll = pp.result
              reply(ll).catch((err) => console.log(err))
              limitAdd(serial)
            } else if (getPrefix(txt, 'detect')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (isMedia) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia)
                const getUrl = await uploadImages(mediaData, false)
                const urls = `https://api.i-tech.id/face/detect?key=` + apikkk + `&link=` + getUrl
                const response = await fetch(urls)
                const json = await response.json()
                if (!json.code == '200') return reply(json.pesan)
                else fn.sendFileFromUrl(from, `${json.pictures}`, 'image.jpg', `*Deteksi Wajah by ` + BotName + `*\n*Jenis Kelamin :* ${json.gander}\n*Umur :* ${json.age} Tahun\n*Kacamata :* ${json.glasses}\n*Senyum :* ${json.smile}\n*Marah :* ${json.anger}\n*Takut :* ${json.fear}\n*Senang :* ${json.happiness}\n*Sedih :* ${json.sadness}\n*Biasa aja :* ${json.neutral}\n*Terkejut :* ${json.surprise}\n*Penghinaan :* ${json.contempt}\n*Menjijikan :* ${json.disgust}`, id)
              } else if (isQuotedImage) {
                const mediaData = await decryptMedia(quotedMsgObj)
                const getUrl = await uploadImages(mediaData, false)
                const urls = `https://api.i-tech.id/face/detect?key=` + apikkk + `&link=` + getUrl
                const response = await fetch(urls)
                const json = await response.json()
                if (!json.code == '200') return reply(json.pesan)
                else fn.sendFileFromUrl(from, `${json.pictures}`, 'image.jpg', `*Deteksi Wajah by ` + BotName + `*\n*Jenis Kelamin :* ${json.gander}\n*Umur :* ${json.age} Tahun\n*Kacamata :* ${json.glasses}\n*Senyum :* ${json.smile}\n*Marah :* ${json.anger}\n*Takut :* ${json.fear}\n*Senang :* ${json.happiness}\n*Sedih :* ${json.sadness}\n*Biasa aja :* ${json.neutral}\n*Terkejut :* ${json.surprise}\n*Penghinaan :* ${json.contempt}\n*Menjijikan :* ${json.disgust}`, id)
              } else if (args.length == 1) {
                const getUrl = args[0]
                const urls = `https://api.i-tech.id/face/detect?key=` + apikkk + `&link=` + getUrl
                const response = await fetch(urls)
                const json = await response.json()
                if (!json.code == '200') return reply(json.pesan)
                else fn.sendFileFromUrl(from, `${json.pictures}`, 'image.jpg', `*Deteksi Wajah by ` + BotName + `*\n*Jenis Kelamin :* ${json.gander}\n*Umur :* ${json.age} Tahun\n*Kacamata :* ${json.glasses}\n*Senyum :* ${json.smile}\n*Marah :* ${json.anger}\n*Takut :* ${json.fear}\n*Senang :* ${json.happiness}\n*Sedih :* ${json.sadness}\n*Biasa aja :* ${json.neutral}\n*Terkejut :* ${json.surprise}\n*Penghinaan :* ${json.contempt}\n*Menjijikan :* ${json.disgust}`, id)
              } else {
                return reply('Maaf, Silahkan kirim gambar atau Link gambar')
              }
            }
            if (getPrefix(txt, 'whois')) {
              const x = arg
              const udud = await fn.getGroupMembersId(from)
              let anu = "siapa ya? ini aja apa gimana? @"+randomChoice(udud).replace(/@c.us/, '')
              await fn.sendReplyWithMentions(toId, anu, id)
            } else if (getPrefix(txt, 'lk21dl')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/downloadfilm?judul=${query_}&apikey=${Premapikey}`
              const response = await fetch(urls)
              const json = await response.json()
              const cok = json.result.data
              let dat = "*LK21 Result*"
              for (var ia = 0; ia < cok.length; ia++) {
                let no = ia
                dat += `\n\n*${ia}*). resolusi: ` + cok[ia].resolusi + "\n     urlDownload: " + cok[ia].urlDownload
              }
              dat += "\n\n"+autocommand
              reply(dat)
              limitAdd(serial) 
            } else if (getPrefix(txt, 'infolokasi')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/infoalamat?query=${query_}&apikey=${Premapikey}`
              const response = await fetch(urls)
              const json = await response.json()
              const cok = json.result.data
              let dat = cok+'\n'
              dat += json.result.deskripsi
              reply(dat)
              limitAdd(serial) 
            } else if (getComs(txt, 'newspaper')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              const urls = `https://api.vhtear.com/beritaterbaru&apikey=${Premapikey}`
              const response = await fetch(urls)
              const json = await response.json()
              const cok = json.result.data
              let dat = "*Result*"
              for (var ia = 1; ia < cok.length; ia++) {
                let no = ia
                dat += `\n\n*${ia}*). Title: ` + cok[ia].title + "\n     description: " + cok[ia].description + "\n     content: " + cok[ia].content
              }
              dat += "\n\n"+autocommand
              reply(dat)
              limitAdd(serial) 
            } else if (getPrefix(txt, 'infomotor')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/infomotor?merk=${query_}&apikey=${Premapikey}`
              const response = await fetch(urls)
              const json = await response.json()
              const cok = json.result
              let dat = 'Title: '+cok.title
              dat += '\nHarga: '+cok.harga
              dat += '\nKekurangan: '+cok.kekurangan
              dat += '\nKelebihan: '+cok.kelebihan
              dat += '\nSpesifikasi: '+cok.spesifikasi
              await fn.sendFileFromUrl(toId, cok.image, BotName+'.jpg', dat, id)
              limitAdd(serial) 
            } else if (getPrefix(txt, 'infomobil')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const query_ = arg
              const urls = `https://api.vhtear.com/infomobil?merk=${query_}&apikey=${Premapikey}`
              const response = await fetch(urls)
              const json = await response.json()
              const cok = json.result
              let dat = 'Title: '+cok.title
              dat += '\nHarga: '+cok.harga
              dat += '\nKekurangan: '+cok.kekurangan
              dat += '\nKelebihan: '+cok.kelebihan
              dat += '\nSpesifikasi: '+cok.spesifikasi
              await fn.sendFileFromUrl(toId, cok.image, BotName+'.jpg', dat, id)
              limitAdd(serial) 
            } else if (getPrefix(txt, 'bannerff')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              const urls = 'https://api.vhtear.com/bannerff?title='+a+'&text='+b+'&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'logo-ff')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              const urls = 'https://api.vhtear.com/logoff?hero='+a+'&text='+b+'&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } else if (getPrefix(txt, 'logo-ml')) {
              if (isLimit(serial)) return
              limitAdd(serial)
              if (args.length === 0) return
              const a = arg.split('|')[0]
              const b = arg.split('|')[1]
              const urls = 'https://api.vhtear.com/logoml?hero='+a+'&text='+b+'&apikey=' + Premapikey
              await fn.sendFileFromUrl(from, `${urls}`, 'image.jpg', autocommand, id)
            } 
            if (getPrefix(txt, 'afk')) {
              if (!isGroupMsg) return
              if (isAfkOn) return
              const reason = q ? q : 'olangnya cedang cibuk!!'
              addAfkUser(toId, serial, timen, reason, xg)
              let tx = `┌ ❏ AFK : REGISTERED\n`
              tx += `│ ├ USER : ${pushname}\n`
              tx += `└ └ REASON : ${reason}`
              await reply(tx)
            }
            //--------------i-tech--------------//
            setTimeout(() => {
              counter--;
            }, 1000)
            recentcmd.add(usr);
            setTimeout(() => {
              recentcmd.delete(usr);
              fspamm.delete(usr);
            }, 5000);
            setTimeout(() => {
              sban.delete(usr);
            }, 900000)
            if (suggestWord.length != 0 && settings.autocorrect > 0 && !suggested) {
              textMatch(fn, message, suggestWord, toId)
            }
          } else {
            setTimeout(() => {
              counter = 0;
            }, 15000);
          }
        }
      }
      setTimeout(() => {
        counter--;
      }, 1000)
      recentcmd.add(usr);
      setTimeout(() => {
        recentcmd.delete(usr);
        fspamm.delete(usr);
      }, 5000);
      setTimeout(() => {
        sban.delete(usr);
      }, 900000)
    } else {
      setTimeout(() => {
        counter = 0;
      }, 15000);
    }
    if (isMuted(chatId) && !mtcState && banChat() && !isBanned || isSadmin || master || vip || premium || (isWhiteList(chatId) && !isBanned)) {
      if (!(fromMe)) {
        if (settings.autojoin === true) {
          if (body.match(/(chat.whatsapp.com)/gi)) {
            const log = await fn.inviteInfo(body)
            if (log == "401") return reply('Link group tidak valid, atau bot pernah dikick! jika bot dikick, maka tidak bisa masuk kembali lewat link!')
            let group = await fn.getAllGroups()
            if (group.length > groupLimit) {
              return reply('Maaf, Batas group yang dapat bot tampung sudah penuh')
            } else {
              if (log.size < memberLimit) {
                return reply('Group target tidak memiliki member melebihi ' + memberLimit + '\nBot tidak bisa masuk ke grup untuk trial akses, silakan hubungi creator.')
              } else {
                await fn.joinGroupViaLink(body).then(async() => {
                  await reply('Berhasil join ke group via link!')
                })
              }
            }
          }
        } else {
          if (body.toLowerCase().startsWith(settings.sname + 'join') || body.toLowerCase().startsWith(settings.rname + 'join')) {
            if (args.length === 0) return
            if (isLimit(serial) && !args.length <= 2) return
            const link = args[0]
            if (link.match(/(chat.whatsapp.com)/gi)) {
              const log = await fn.inviteInfo(link)
              if (log == "401") return reply('Link group tidak valid, atau bot pernah dikick! jika bot dikick, maka tidak bisa masuk kembali lewat link!')
              if (isSadmin || master) {
                await fn.joinGroupViaLink(link).then(async() => {
                  if (chat.isAnnounceGrpRestrict == false) fn.sendText(log.id, `Halo warga grup ${log.subject}\nTerimakasih telah mengundang ${BotName} kedalam grup ini. ketik *.rules* untuk mengetahui peraturan bot ini.`)
                })
                await reply('Berhasil join ke group via link!')
                if (isWhite(log.id)) return
                settings.whitelist.push(log.id)
                dumpSet()
                reply(`${log.id}`)
              } else {
                let group = await fn.getAllGroups()
                if (group.length > groupLimit) {
                  return reply('Maaf, Batas group yang dapat bot tampung sudah penuh')
                } else {
                  if (log.size < memberLimit && !master) {
                    return reply('Group target tidak memiliki member melebihi ' + memberLimit + '\nBot tidak bisa masuk ke grup, silakan hubungi creator.')
                  } else {
                    await fn.joinGroupViaLink(link).then(async() => {
                      if (chat.isAnnounceGrpRestrict == false) fn.sendTextWithMentions(log.id, "Halo warga grup " + log.subject + "\n\nTerimakasih telah mengundang " + BotName + " kedalam grup ini\njangan lupa ketik *.rules* untuk mengetahui peraturan penggunaan bot, dan untuk menjaga agar bot tidak keluar otomatis, @" + log.owner.replace(/@c.us/, "") + " atau @" + serial.replace(/@c.us/, "") + " silakan hubungi creator.")
                      await reply('Berhasil join ke group via link!')
                      limitAdd(serial)
                      await fn.sendTextWithMentions(settings.admin, "@" + serial.replace(/@c.us/, "") + " telah mengundang bot kedalam grup " + log.subject)
                      await fn.sendContact(settings.admin, serial)
                    })
                  }
                }
              }
            } else {
              reply('kasih link yang bener dong kak!')
            }
          }
        }
      }
      if (mekimeki === true && settings.memec.includes(serial)) {
        if (isMedia) {
          if (type === 'image') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendFile(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, id)
          } else if (type === 'audio') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendFile(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, id)
          } else if (type === 'video') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendFile(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, id)
          } else if (type === 'voice') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendPtt(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, id)
          } else if (type === 'document') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendFile(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, id)
          } else if (type === 'location') {
            fn.sendLocation(toId, message.lat, message.lng, message.loc)
          } else if (type === 'sticker') {
            let mediaData = await decryptMedia(message)
            sharp(mediaData).resize({
              width: 512,
              height: 512,
              fit: sharp.fit.contain,
              background: {
                r: 0,
                g: 0,
                b: 0,
                alpha: 0
              }
            }).webp().toBuffer().then(buffer => {
              sendRawWebpAsSticker(buffer.toString('base64'))
            })
          } else if (type === 'vcard') {
            fn.sendVcard(toId, body, message.vcardFormattedName)
          }
        } else if (quotedMsg) {
          if (type === 'image') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendFile(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, quotedMsgObj.id)
          } else if (type === 'audio') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendFile(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, quotedMsgObj.id)
          } else if (type === 'video') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendFile(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, quotedMsgObj.id)
          } else if (type === 'voice') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendPtt(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, quotedMsgObj.id)
          } else if (type === 'document') {
            const mediaData = await decryptMedia(message)
            if (Buffer.byteLength(mediaData) >= 10485760) return
            let dataUrl = `data:${mimetype};base64,${mediaData.toString('base64')}`
            fn.sendFile(toId, dataUrl, 'hasilnya' + mimetype.split('/')[1], autocommand, id)
          } else if (type === 'location') {
            fn.sendLocation(toId, message.lat, message.lng, message.loc)
          } else if (type === 'sticker') {
            let mediaData = await decryptMedia(message)
            sharp(mediaData).resize({
              width: 512,
              height: 512,
              fit: sharp.fit.contain,
              background: {
                r: 0,
                g: 0,
                b: 0,
                alpha: 0
              }
            }).webp().toBuffer().then(buffer => {
              fn.sendRawWebpAsSticker(from, buffer.toString('base64'))
            })
          } else if (type === 'vcard') {
            fn.sendVcard(toId, body, message.vcardFormattedName)
          } else {
            if (body.includes('@')) {
              fn.sendTextWithMentions(toId, body)
            } else {
              fn.reply(toId, body, quotedMsgObj.id)
            }
          }
        } else {
          if (body.includes('@')) {
            fn.sendTextWithMentions(toId, body)
          } else {
            reply(body)
          }
        }
      }
      if (settings.chatbot === true) {
        jancokasuceleng()
        addXp(serial)
        if (isCount(serial)) return
        counthit(serial)
        if (x5.chat.hasOwnProperty(txt)) {
          if (x5.chat[txt].includes('@')) {
            let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
            let random = Math.floor(Math.random() * emot.length);
            let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
            fn.sendTextWithMentions(toId, x5.chat[txt] + randomemot)
            limitAdd(serial)
          } else {
            const jawab = Math.floor(Math.random() * 2);
            let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
            let random = Math.floor(Math.random() * emot.length);
            let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
            if (jawab === 0) {
              reply(x5.chat[txt] + randomemot);
              limitAdd(serial)
            } else {
              fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(x5.chat[txt]) + '&lang=id', message.id);
              limitAdd(serial)
            }
          }
        }
        if (x3.contact.hasOwnProperty(txt)) {
          fn.sendContact(toId, `${x3.contact[txt]}@c.us`)
          limitAdd(serial)
        }
        if (x1.image.hasOwnProperty(txt)) {
          fn.sendFile(toId, x1.image[txt], BotName + '.jpg', autocommand, id)
          limitAdd(serial)
        }
        if (x6.sticker.hasOwnProperty(txt)) {
          fn.sendImageAsSticker(toId, x6.sticker[txt])
          limitAdd(serial)
        }
        if (x2.video.hasOwnProperty(txt)) {
          fn.sendPtt(toId, x2.video[txt], x2.video[txt], id)
          limitAdd(serial)
        }
      }
      if ((body == "bct") || (body == "bacot") || (body == settings.sname + "bacot") || (body == settings.rname + "bacot")) {
        jancokasuceleng()
        addXp(serial)
        if (isCount(serial)) return
        counthit(serial)
        reply(randomChoice(x0.bacot))
        limitAdd(serial)
      } else if ((body == "bot") || (body == "hi") || (body == "Bot") || (body == "Hi")) {
        jancokasuceleng()
        addXp(serial)
        if (isCount(serial)) return
        counthit(serial)
        await reply('ada yang bisa dibantu? silakan ketik /commands')
      }
      if (isGroupMsg) {
        if (xe.simi.includes(toId)) {
          if (body.toLowerCase().startsWith(settings.rname) && body.toLowerCase().endsWith('?') || body.toLowerCase().startsWith(settings.sname) && body.toLowerCase().endsWith('?')) {
            if (isLimit(serial)) return
            jancokasuceleng()
            addXp(serial)
            if (isCount(serial)) return
            counthit(serial)
            if (body.toLowerCase().includes("dimana") || body.toLowerCase().includes("dimanakah") || body.toLowerCase().includes("kemana") || body.toLowerCase().includes("kemanakah")) {
              const jawab = Math.floor(Math.random() * 2);
              let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
              let random = Math.floor(Math.random() * emot.length);
              let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
              if (jawab === 0) {
                reply(xb.katadimana[Math.floor(Math.random() * xb.katadimana.length)] + randomemot);
                limitAdd(serial)
              } else {
                fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katadimana[Math.floor(Math.random() * xb.katadimana.length)]) + '&lang=id', message.id);
                limitAdd(serial)
              }
            } else if (body.toLowerCase().includes("kenapa") || body.toLowerCase().includes("kenapakah")) {
              const jawab = Math.floor(Math.random() * 2);
              let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
              let random = Math.floor(Math.random() * emot.length);
              let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
              if (jawab === 0) {
                reply(xb.katakenapa[Math.floor(Math.random() * xb.katakenapa.length)] + randomemot);
                limitAdd(serial)
              } else {
                fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katakenapa[Math.floor(Math.random() * xb.katakenapa.length)]) + '&lang=id', message.id);
                limitAdd(serial)
              }
            } else if (body.toLowerCase().includes("kapan") || body.toLowerCase().includes("kapankah")) {
              const jawab = Math.floor(Math.random() * 2);
              let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "??", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
              let random = Math.floor(Math.random() * emot.length);
              let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
              if (jawab === 0) {
                reply(xb.katakapan[Math.floor(Math.random() * xb.katakapan.length)] + randomemot);
                limitAdd(serial)
              } else {
                fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katakapan[Math.floor(Math.random() * xb.katakapan.length)]) + '&lang=id', message.id);
                limitAdd(serial)
              }
            } else if (body.toLowerCase().includes("gimana") || body.toLowerCase().includes("bagaimana")) {
              const jawab = Math.floor(Math.random() * 2);
              let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
              let random = Math.floor(Math.random() * emot.length);
              let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
              if (jawab === 0) {
                reply(xb.katabagaimana[Math.floor(Math.random() * xb.katabagaimana.length)] + randomemot);
                limitAdd(serial)
              } else {
                fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katabagaimana[Math.floor(Math.random() * xb.katabagaimana.length)]) + '&lang=id', message.id);
                limitAdd(serial)
              }
            } else if (body.toLowerCase().includes("siapa") || body.toLowerCase().includes("siapakah")) {
              const jawab = Math.floor(Math.random() * 2);
              let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "??", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
              let random = Math.floor(Math.random() * emot.length);
              let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
              if (jawab === 0) {
                reply(xb.katasiapa[Math.floor(Math.random() * xb.katasiapa.length)] + randomemot);
                limitAdd(serial)
              } else {
                fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katasiapa[Math.floor(Math.random() * xb.katasiapa.length)]) + '&lang=id', message.id);
                limitAdd(serial)
              }
            } else {
              const jawab = Math.floor(Math.random() * 2);
              let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "??", "🤮🤧", "😷", "🤕", "😽", "😻"];
              let random = Math.floor(Math.random() * emot.length);
              let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
              if (jawab === 0) {
                reply(xb.kataapa[Math.floor(Math.random() * xb.kataapa.length)] + randomemot);
                limitAdd(serial)
              } else {
                fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.kataapa[Math.floor(Math.random() * xb.kataapa.length)]) + '&lang=id', message.id);
                limitAdd(serial)
              }
            }
          }
        }
      } else {
        if (body.toLowerCase().startsWith(settings.rname) && body.toLowerCase().endsWith('?') || body.toLowerCase().startsWith(settings.sname) && body.toLowerCase().endsWith('?')) {
          if (isLimit(serial)) return
          jancokasuceleng()
          addXp(serial)
          if (isCount(serial)) return
          counthit(serial)
          if (body.toLowerCase().includes("dimana") || body.toLowerCase().includes("dimanakah") || body.toLowerCase().includes("kemana") || body.toLowerCase().includes("kemanakah")) {
            const jawab = Math.floor(Math.random() * 2);
            let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
            let random = Math.floor(Math.random() * emot.length);
            let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
            if (jawab === 0) {
              reply(xb.katadimana[Math.floor(Math.random() * xb.katadimana.length)] + randomemot);
              limitAdd(serial)
            } else {
              fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katadimana[Math.floor(Math.random() * xb.katadimana.length)]) + '&lang=id', message.id);
              limitAdd(serial)
            }
          } else if (body.toLowerCase().includes("kenapa") || body.toLowerCase().includes("kenapakah")) {
            const jawab = Math.floor(Math.random() * 2);
            let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
            let random = Math.floor(Math.random() * emot.length);
            let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
            if (jawab === 0) {
              reply(xb.katakenapa[Math.floor(Math.random() * xb.katakenapa.length)] + randomemot);
              limitAdd(serial)
            } else {
              fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katakenapa[Math.floor(Math.random() * xb.katakenapa.length)]) + '&lang=id', message.id);
              limitAdd(serial)
            }
          } else if (body.toLowerCase().includes("kapan") || body.toLowerCase().includes("kapankah")) {
            const jawab = Math.floor(Math.random() * 2);
            let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
            let random = Math.floor(Math.random() * emot.length);
            let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
            if (jawab === 0) {
              reply(xb.katakapan[Math.floor(Math.random() * xb.katakapan.length)] + randomemot);
              limitAdd(serial)
            } else {
              fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katakapan[Math.floor(Math.random() * xb.katakapan.length)]) + '&lang=id', message.id);
              limitAdd(serial)
            }
          } else if (body.toLowerCase().includes("gimana") || body.toLowerCase().includes("bagaimana")) {
            const jawab = Math.floor(Math.random() * 2);
            let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
            let random = Math.floor(Math.random() * emot.length);
            let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
            if (jawab === 0) {
              reply(xb.katabagaimana[Math.floor(Math.random() * xb.katabagaimana.length)] + randomemot);
              limitAdd(serial)
            } else {
              fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katabagaimana[Math.floor(Math.random() * xb.katabagaimana.length)]) + '&lang=id', message.id);
              limitAdd(serial)
            }
          } else if (body.toLowerCase().includes("siapa") || body.toLowerCase().includes("siapakah")) {
            const jawab = Math.floor(Math.random() * 2);
            let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
            let random = Math.floor(Math.random() * emot.length);
            let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
            if (jawab === 0) {
              reply(xb.katasiapa[Math.floor(Math.random() * xb.katasiapa.length)] + randomemot);
              limitAdd(serial)
            } else {
              fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.katasiapa[Math.floor(Math.random() * xb.katasiapa.length)]) + '&lang=id', message.id);
              limitAdd(serial)
            }
          } else {
            const jawab = Math.floor(Math.random() * 2);
            let emot = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮🤧", "😷", "🤕", "😽", "😻"];
            let random = Math.floor(Math.random() * emot.length);
            let randomemot = ulang(emot[random], Math.floor(Math.random() * 5));
            if (jawab === 0) {
              reply(xb.kataapa[Math.floor(Math.random() * xb.kataapa.length)] + randomemot);
              limitAdd(serial)
            } else {
              fn.sendPtt(toId, 'http://localhost:' + sver + '/?text=' + urlencode(xb.kataapa[Math.floor(Math.random() * xb.kataapa.length)]) + '&lang=id', message.id);
              limitAdd(serial)
            }
          }
        }
      }
    }
  } catch (err) {
    console.log('[ERROR]', err.message)
    fn.sendText(message.chatId, "error!")
  }
}
const fnOpt = {
  sessionId: pukimaki,
  useChrome: true,
  headless: true,
  qrRefreshS: 13,
  qrTimeout: 0,
  authTimeout: 0,
  autoRefresh: true,
  blockCrashLogs: true,
  restartOnCrash: fnBots,
  throwErrorOnTosBlock: false,
  killProcessOnBrowserClose: true,
  deleteSessionDataOnLogout: false,
  skipBrokenMethodsCheck: true,
  skipUpdateCheck: true,
  disableSpins: true
}
create(fnOpt)
.then((fn) => fnBots(fn))
.catch(e => {
  console.log('[ERROR]', e.message)
  var xsa = new os_spawn();
  xsa.execCommand(pukimak).catch(err => {
    console.log("os >>>", err);
  })
})