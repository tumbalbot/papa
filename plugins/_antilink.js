const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.sendButton(m.chat, `*「 ANTILINK DETECTED 」*\n*Maaf Anda Terdeteksi Mengirim Link, Akan Saya kick!*${isBotAdmin ? '' : '\n\n_Bot Bukan Admin_'}`, author, ['See You', '/bilek'], m)

            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')

    }
    return !0
}
