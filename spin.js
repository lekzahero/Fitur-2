case "spin-tes": {
    let hadiah = [
        { nama: "Saldo +Rp10.000", type: "saldo", chance: 0.3 },
        { nama: "Panel Pterodactyl (Premium)", type: "premium", chance: 0.2 },
        { nama: "Script LekzaV1", type: "script", chance: 0.1 },
        { nama: "Saldo +Rp2.000", type: "saldo1", chance: 0.4 },
        { nama: "Zonk! Coba lagi!", type: "zonk", chance: 0.5 }
    ];

    let totalChance = hadiah.reduce((acc, item) => acc + item.chance, 0);
    let random = Math.random() * totalChance;
    let chosen;
    
    for (let item of hadiah) {
        if (random < item.chance) {
            chosen = item;
            break;
        }
        random -= item.chance;
    }

    let animasi = ["⚫🟤🟣🔵", "⬛🟫🟪🟦", "🟥🟠🟨🟢", "🟧🟩⚪🔴"];
    let spinCount = Math.floor(Math.random() * (10 - 7 + 1)) + 7;
    let spinMsg;

    for (let i = 0; i < spinCount; i++) {
        for (const frame of animasi) {
            if (!spinMsg) {
                spinMsg = await conn.sendMessage(m.chat, { text: `🎰 Memutar Spin...\n${frame}` });
            } else {
                await conn.sendMessage(m.chat, { text: `🎰 Memutar Spin...\n${frame}`, edit: spinMsg.key });
            }
            await sleep(600);
        }
    }

    // Setelah animasi selesai, tampilkan hasil spin
    let msg;
    if (chosen.type === "saldo") {
        msg = `🎉 Selamat! Kamu mendapatkan *${chosen.nama}*!`;
    } else if (chosen.type === "premium") {
        msg = `🔥 Kamu mendapatkan *${chosen.nama}*! Sekarang akunmu premium!`;
    } else if (chosen.type === "script") {
        msg = `📜 Selamat! Kamu mendapatkan *${chosen.nama}*!`;
    } else if (chosen.type === "saldo1") {
        msg = `💸 Selamat! Kamu mendapatkan *${chosen.nama}*!`;
    } else if (chosen.type === "zonk") {
        msg = `😢 ${chosen.nama}`;
    }

    await conn.sendMessage(m.chat, { text: msg, edit: spinMsg.key });
}
break;
