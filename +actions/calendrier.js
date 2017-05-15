const cal = require('calendrier-republicain'),
    toRoman = require('roman-numerals').toRoman;

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function({content, channel}) {
    if (this.isIn(content, 'Quel jour sommes-nous citoyen ?')) {
        const now = new Date();
        this.talk(channel,
            `Nous sommes ${cal.dayOfDecadeName(now)}, le ${cal.dayOfMonth(now)} ${capFirstLetter(cal.monthName(now))} de l'an ${toRoman(cal.year(now))}. Célébrons le mot du jour, "${cal.dayOfYearName(now)}", gloire de l'esprit et merveille de la nature !`);
        return true;
    }
    return false;
};
