// Yang pertama kalian harus punya file database dulu
// gw dah punya, ini taro index.js atau start file kalian

// ini kode database, buat file database.js di ./source, nah kalo udah gini ./source/database.js
const DataBase = require("./source/database.js");
const database = new DataBase();
(async () => {
  const loadData = await database.read();
  if (loadData && Object.keys(loadData).length === 0) {
    global.db = {
      users: {},
      groups: {},
      database: {},
      settings: {},
      ...(loadData || {}),
    };
    await database.write(global.db);
  } else {
    global.db = loadData;
  }
  setInterval(async () => {
    if (global.db) await database.write(global.db);
  }, 3500);
})();

// file di atas ini lo taro di tempat start bot lo
// kode di bawah ini adalah kode database.js, foldernya di ./source/database.js
require('../settings');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mongoose = require('mongoose');
let DataBase;

if (/mongo/.test("database.json")) {
	DataBase = class mongoDB {
		constructor(url, options = { useNewUrlParser: true, useUnifiedTopology: true }) {
			this.url = url
			this.data = {}
			this._model = {}
			this.options = options
		}
		
		read = async () => {
			mongoose.connect(this.url, { ...this.options })
			this.connection = mongoose.connection
			try {
				const schema = new mongoose.Schema({
					data: {
						type: Object,
						required: true,
						default: {},
					}
				})
				this._model = mongoose.model('data', schema)
			} catch {
				this._model = mongoose.model('data')
			}
			this.data = await this._model.findOne({})
			if (!this.data) {
				new this._model({ data: {} }).save()
				this.data = await this._model.findOne({})
			} else return this?.data?.data || this?.data
		}
		
		write = async (data) => {
			if (this.data && !this.data.data) return (new this._model({ data })).save()
			this._model.findById(this.data._id, (err, docs) => {
				if (!err) {
					if (!docs.data) docs.data = {}
					docs.data = data
					return docs.save()
				}
			})
		}
	}
} else if (/json/.test("database.json")) {
	DataBase = class dataBase {
		data = {}
		file = path.join(process.cwd(), 'data', "database.json"); // 𝗚𝗔𝗡𝗧𝗜 "𝗗𝗔𝗧𝗔" 𝗝𝗔𝗗𝗜 𝗣𝗨𝗡𝗬𝗔 𝗞𝗔𝗟𝗜𝗔𝗡, 𝗔𝗧𝗔𝗨 𝗚𝗔 𝗦𝗔𝗠𝗔𝗜𝗡 𝗔𝗝𝗔, 𝗡𝗔𝗡𝗧𝗜 𝗞𝗔𝗟𝗜𝗔𝗡 𝗕𝗨𝗔𝗧 𝗙𝗢𝗟𝗗𝗘𝗥 𝗗𝗜 𝗖𝗢𝗡𝗧𝗔𝗜𝗡𝗘𝗥/𝗔𝗪𝗔𝗟 𝗡𝗔𝗠𝗔𝗡𝗬𝗔 "𝗗𝗔𝗧𝗔", 𝗟𝗔𝗟𝗨 𝗕𝗨𝗔𝗧 𝗙𝗜𝗟𝗘 𝗡𝗔𝗠𝗔𝗡𝗬𝗔 𝗗𝗔𝗧𝗔𝗕𝗔𝗦𝗘.𝗝𝗦𝗢𝗡
		
		read = async () => {
			let data;
			if (fs.existsSync(this.file)) {
				data = JSON.parse(fs.readFileSync(this.file))
			} else {
				fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
				data = this.data
			}
			return data
		}
		
		write = async (data) => {
			this.data = !!data ? data : global.db
			let dirname = path.dirname(this.file)
			if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true })
			fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
			return this.file
		}
	}
}

module.exports = DataBase


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});

// kalo udah buat file database.json di folder "data", langsung ke file case.js kalian, lalu taro di function, ini kodenya
let user = global.db.users[m.sender]
			if (typeof user !== 'object') global.db.users[m.sender] = {}
			if (user) {
				if (!('status_deposit' in user)) user.status_deposit = false
				if (!('saldo' in user)) user.saldo = 0
			} else {
				global.db.users[m.sender] = {
					status_deposit: false, 
					saldo: 0
				}
            }

// persiapan nya sudah selesai, sekarang tinggal buat kode case order kuota
case "orkut": {
const merchatIdOrderKuota = "-" // 𝗴𝗮𝗻𝘁𝗶 𝗱𝗲𝗻𝗴𝗮𝗻 𝗽𝘂𝗻𝘆𝗮 𝗸𝗮𝗹𝗶𝗮𝗻
const apiOrderKuota = "-" // 𝗴𝗮𝗻𝘁𝗶 𝗽𝘂𝗻𝘆𝗮 𝗸𝗮𝗹𝗶𝗮𝗻
const UrlQr = "-"  // 𝗚𝗮𝗻𝘁𝗶 𝗱𝗲𝗻𝗴𝗮𝗻 𝗹𝗶𝗻𝗸 𝗾𝗿𝗶𝘀 𝗸𝗮𝗹𝗶𝗮𝗻

const amount  = "10000"; // 𝘂𝗯𝗮𝗵 𝗵𝗮𝗿𝗴𝗮 𝗱𝗶𝘀𝗶𝗻𝗶
const get = await axios.get(`https://api.alwaysriky-dcoderx.my.id/orkut/createpayment?apikey=alwaysriki&amount=${amount}&codeqr=${UrlQr}`)

const teks3 = `
🛑 *INFO PEMBAYARAN ORKUT*

🛍️ *Barang & Produk*: Orkut
💰 *Total Pembayaran*: ${await toIDR(get.data.result.amount)}
📊 *PPN*: Rp.110 - 210 ( Acak )
📆 *Batas Waktu*: 5 Menit
🆔 *ID Pembayaran*: ${get.data.result.transactionId}

📌 *Catatan*: 
1️⃣ QR berlaku hanya untuk 1 kali transfer.
2️⃣ QR akan kedaluwarsa dalam 5 menit.
3️⃣ Setelah transfer, tunggu beberapa saat hingga status diperbarui otomatis.

🛑 Jika ingin membatalkan, ketik *.batalbeli*.
📞 Untuk bantuan, hubungi *.owner*.
`
let msgQr = await conn.sendMessage(m.chat, {
  footer: `© 2025 ${namabot} Botz`,
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.qrImageUrl}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender]
  },
})
db.users[m.sender].status_deposit = true
db.users[m.sender].saweria = {
msg: msgQr, 
chat: m.sender,
idDeposit: get.data.result.transactionId, 
amount: get.data.result.amount.toString(), 
exp: function () {
setTimeout(async () => {
if (db.users[m.sender].status_deposit == true && db.users[m.sender].saweria && db.users[m.sender].saweria.amount == db.users[m.sender].saweria.amount) {
await conn.sendMessage(db.users[m.sender].saweria.chat, {text: "QRIS Pembayaran telah expired!"}, {quoted: db.users[m.sender].saweria.msg})
await conn.sendMessage(db.users[m.sender].saweria.chat, { delete: db.users[m.sender].saweria.msg.key })
db.users[m.sender].status_deposit = false
await clearInterval(db.users[m.sender].saweria.exp)
delete db.users[m.sender].saweria
}
}, 300000)
}
}

await db.users[m.sender].saweria.exp()

while (db.users[m.sender].status_deposit == true && db.users[m.sender].saweria && db.users[m.sender].saweria.amount) {
await sleep(8000)
const resultcek = await axios.get(`https://api.alwaysriky-dcoderx.my.id/orkut/cekstatus?apikey=alwaysriki&merchant=${merchantIdOrderKuota}&keyorkut=${apiOrderKuota}`)
const req = await resultcek.data
if (db.users[m.sender].saweria && req?.amount == db.users[m.sender].saweria.amount) {
db.users[m.sender].status_deposit = false
await clearInterval(db.users[m.sender].saweria.exp)
await conn.sendMessage(db.users[m.sender].saweria.chat, {text: `
✅ *INFO PEMBAYARAN ORKUT*

🛍️ *Barang & Produk*: Orkut
💰 *Total Pembayaran*: ${await toIDR(get.data.result.amount)};
📊 *PPN*: Rp.110 - 210 ( Acak )
📆 *Batas Waktu*: 5 Menit
 🆔 *ID Pembayaran*: ${get.data.result.transactionId};

📌 *Catatan:*
1️⃣ Bot akan memberi data produk anda.
2️⃣ Tunggu 1 - 2 menit karena sedang memproses.
3️⃣ Setelah bot memberi data, mohon ratting store kami .ratting-store bagus.

🛑 Jika ingin membeli sesuatu lagi, ketik *.layanankebutuhan.*
📞 Untuk bantuan, hubungi *.owner.*
`}, {quoted: db.users[m.sender].saweria.msg})
await tesss(m); // 𝗝𝗔𝗟𝗔𝗡𝗜𝗡 𝗙𝗨𝗡𝗖𝗧𝗜𝗢𝗡 𝗙𝗜𝗧𝗨𝗥 𝗞𝗔𝗟𝗜𝗔𝗡
await conn.sendMessage(db.users[m.sender].saweria.chat, { delete: db.users[m.sender].saweria.msg.key })
delete db.users[m.sender].saweria
}
}
}
break
