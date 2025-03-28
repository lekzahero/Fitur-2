case 'nikparser':
case 'dox':
    if (!isOwner) return poxreply(mess.only.owner);
    if (!q) return poxreply(`</> Anda harus mendapatkan NIK target terlebih dahulu dan lakukan command seperti ini: ${prefix + command} 16070xxxxx\n\n`);

    const { nikParser } = require('nik-parser');
    const ktp = q;
    const nik = nikParser(ktp);

    if (!nik.isValid()) {
        return poxreply("NIK tidak valid. Silakan periksa kembali NIK yang Anda masukkan.");
    }

    const response = `
    📋 **Informasi NIK** 📋
    - **NIK Valid**: ${nik.isValid()}
    - **Provinsi ID**: ${nik.provinceId()}
    - **Nama Provinsi**: ${nik.province()}
    - **Kabupaten ID**: ${nik.kabupatenKotaId()}
    - **Nama Kabupaten**: ${nik.kabupatenKota()}
    - **Kecamatan ID**: ${nik.kecamatanId()}
    - **Nama Kecamatan**: ${nik.kecamatan()}
    - **Kode Pos**: ${nik.kodepos()}
    - **Jenis Kelamin**: ${nik.kelamin()}
    - **Tanggal Lahir**: ${nik.lahir()}
    - **Uniqcode**: ${nik.uniqcode()}
    `;

    m.reply(response);
break
