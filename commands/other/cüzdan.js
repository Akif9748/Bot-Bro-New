const Discord = require("discord.js");
const client = new Discord.Client();
var WAValidator = require("wallet-address-validator");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Hangi coin için cüzdan sorgusu yapmak istiyorsunuz?")
        .setDescription(
          `Auroracoin/AUR: **auroracoin** yada **AUR**
Bankex/BKX: **bankex** yada **BKX**
BeaverCoin/BVC: **beavercoin** yada **BVC**
Biocoin/BIO: **biocoin** yada **BIO**
Bitcoin/BTC: **bitcoin** yada **BTC**
BitcoinCash/BCH: **bitcoincash** yada **BCH**
BitcoinGold/BTG: **bitcoingold** yada **BTG**
BitcoinPrivate/BTCP: **bitcoinprivate** yada **BTCP**
BitcoinZ/BTCZ: **bitcoinz** yada **BTCZ**
Callisto/CLO: **callisto** yada **CLO**
Dash: **dash** yada **DASH**
Decred/DCR: **decred** yada **DCR**
Digibyte/DGB: **digibyte** yada **DGB**
Dogecoin/DOGE: **dogecoin** yada **DOGE**
Ethereum/ETH: **ethereum** yada **ETH**
EthereumClassic/ETH: **ethereumclassic** yada **ETC**
EthereumZero/ETZ: **etherzero** yada **ETZ**
Freicoin/FRC: **freicoin** yada **FRC**
Garlicoin/GRLC: **garlicoin** yada **GRLC**
Hush/HUSH: **hush** yada **HUSH**
Komodo/KMD: **komodo** yada **KMD**
Litecoin/LTC: **litecoin** yada **LTC**
Megacoin/MEC: **megacoin** yada **MEC**
Monero/XMR: **monero** yada **XMR**
Namecoin/NMC: **namecoin** yada **NMC**
Nano/NANO: **nano** yada **NANO**
NEO/NEO: **NEO** yada **NEO**
NeoGas/GAS: **neogas** yada **GAS**
Peercoin/PPCoin/PPC: **peercoin** yada **PPC**
Primecoin/XPM: **primecoin** yada **XPM**
Protoshares/PTS: **protoshares** yada **PTS**
Qtum/QTUM: **qtum** yada **QTUM**
Raiblocks/XRB: **raiblocks** yada **XRB**
Ripple/XRP: **ripple** yada **XRP**
Snowgem/SNG: **snowgem** yada **SNG**
Vertcoin/VTC: **vertcoin** yada **VTC**
Votecoin/VTC: **votecoin** yada **VOT**
Zcash/ZEC: **zcash** yada **ZEC**
Zclassic/ZCL: **zclassic** yada **ZCL**
ZenCash/ZEN: **zencash** yada **ZEN**
`)
        .setColor("#FFC301")
    );
  let coin = args[0];
  let wallet = args[1];
  if (message.author.bot) return;

  var valid = WAValidator.validate(wallet, coin);
  if (valid == true) {
    message.reply("**" + wallet + "** geçerli bir **" + coin + "** adresi.");
  } else {
    message.reply(
      "**" + wallet + "** geçersiz bir **" + coin + "** adresi."
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "cüzdan",
  description: 'Bot hakkında bilgiler verir.',
  usage: 'botbilgi'
};