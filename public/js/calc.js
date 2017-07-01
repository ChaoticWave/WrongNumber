let tArea, gArea, tBox, breakCipher, pArr, o_Quotes, o_Eq, o_Lett, o_Reduce, mSel;
let mArr = [];
const sHistory = [];
let cipherGroup = [];
const cipherNames = ["Full Reduction", "Single Reduction", "Full Reduction KV", "Single Reduction KV",
                     "Reverse Full Reduction", "Reverse Single Reduction", "Reverse Full Reduction EP", "Reverse Single Reduction EP",
                     "English Ordinal", "Reverse Ordinal", "Francis Bacon", "English Extended", "Franc Baconis", "Sumerian", "Reverse Sumerian",
                     "Jewish Reduced", "Jewish Ordinal", "Jewish", "Septenary", "Chaldean",
                     "Satanic", "ALW Kabbalah", "KFW Kabbalah", "LCH Kabbalah",
                     "Primes", "Trigonal"];
const ciphersOn = [true, false, false, false,
                   true, false, false, false,
                   true, true, false, false, false, false,
                   false, false, false, false, false,
                   false, false, false, false, false,
                   false, false];
let gemArr = [];
let per_Row = 6;
let num_Calc = "Off";
let break_on = false;
let cipher_Cat = "Custom";

function Start_Up(impPhrase = "", impCiphers = "") {
    let x, cipherArr;

    tArea = document.getElementById("MatchSpot");
    tArea.innerHTML = "Ready";
    o_Reduce = true;
    o_Quotes = false;
    o_Eq = true;
    o_Lett = false;

    if (impCiphers !== "") {
        cipherArr = impCiphers.split("-");
        for (x = 0; x < ciphersOn.length; x++) {
            if (cipherArr.indexOf(String(x)) > -1) {
                ciphersOn[x] = true
            } else {
                ciphersOn[x] = false
            }
        }
    }

    Build_Ciphers();
    List_Options();
    Open_Ciphers();

    if (impPhrase !== "") {
        document.getElementById("SearchField").value = replaceAll(impPhrase, "_", " ");
        Populate_Sums()
    }
}

function BuildLink() {
    let cStr, pStr, x;

    pStr = sStr("termAdd");
    cStr = "";
    for (x = 0; x < ciphersOn.length; x++) {
        if (ciphersOn[x] == true) {
            if (cStr == "" && cStr !== "0") {
                cStr = String(x)
            } else {
                cStr += "-" + String(x)
            }
        }
    }

    window.prompt('Ctrl+C (or Cmd+C) to copy link to Clipboard -OR- right-click and click "Copy"', "http://www.gematrinator.com/calculator/index.php?Phrase=" +
        pStr +
        "&Ciphers=" +
        cStr)
}

function set_Ciphers(impBool = false, impCiphers = "") {
    let cBox, aCipher;
    let impArr, x;

    if (impBool === false) {
        cipher_Cat = "Custom"
    }
    if (impCiphers == "") {
        for (x = 0; x < cipherNames.length; x++) {
            aCipher = new cipher(cipherNames[x]);
            cBox = document.getElementById(aCipher.modName + "_Box");
            ciphersOn[x] = cBox.checked
        }
    } else {
        impArr = impCiphers.split("-");
        for (x = 0; x < cipherNames.length; x++) {
            aCipher = new cipher(cipherNames[x]);
            if (impCiphers.indexOf(x) > -1) {
                ciphersOn[x] = true
            } else {
                ciphersOn[x] = false
            }
        }
    }
    Build_Ciphers();
    cBox = document.getElementById("Cipher_Drop");
    cBox.value = cipher_Cat
}

function set_Cipher_Cat() {
    let cArr, x, cBox;
    const catBox = document.getElementById("Cipher_Drop");
    cipher_Cat = catBox.value;

    switch (cipher_Cat) {
        case "Custom":
            break;
        case "Reduced/Ordinal/Reverse":
            cArr = ["Full Reduction", "Reverse Full Reduction", "English Ordinal", "Reverse Ordinal"];
            break;
        case "Gematrinator's Picks":
            cArr = ["Full Reduction", "Reverse Full Reduction", "English Ordinal", "Francis Bacon",
                    "Reverse Ordinal", "Septenary", "English Extended", "Jewish", "ALW Kabbalah", "Satanic", "Sumerian"];
            break;
        case "Small Numbers":
            cArr = ["Full Reduction", "Single Reduction", "Reverse Full Reduction", "Septenary",
                    "Chaldean", "Jewish Reduced", "Reverse Single Reduction"];
            break;
        case "Medium Numbers":
            cArr = ["English Ordinal", "Reverse Ordinal", "Francis Bacon", "Jewish Ordinal", "ALW Kabbalah",
                    "KFW Kabbalah", "LCH Kabbalah"];
            break;
        case "Big Numbers":
            cArr = ["Sumerian", "Reverse Sumerian", "English Extended", "Franc Baconis", "Satanic", "Jewish", "Primes", "Trigonal"];
            break;
        case "Exceptions":
            cArr = ["Reverse Single Reduction EP", "Reverse Full Reduction EP", "Full Reduction KV", "Single Reduction KV"];
            break;
        case "All":
            cArr = [];
            cArr = cipherNames;
            break;
    }

    for (x = 0; x < cipherNames.length; x++) {
        if (cArr.indexOf(cipherNames[x]) > -1) {
            ciphersOn[x] = true
        } else {
            ciphersOn[x] = false
        }
    }

    Build_Ciphers();
    Open_Ciphers()
}

function Build_Ciphers() {
    cipherGroup = [];
    for (x = 0; x < cipherNames.length; x++) {
        if (ciphersOn[x] == true) {
            cipherGroup[cipherGroup.length] = new cipher(cipherNames[x])
        }
        if (ciphersOn[x] == false && breakCipher == cipherNames[x].Nickname) {
            break_on = false
        }
    }
    Gematria_Table()
}

function Get_Matches() {
    let cVal;

    mSel = "Matches";
    if (cipherGroup.length < 13) {
        tArea.innerHTML = "Loading...";

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cVal = xhttp.responseText;
                mArr = cVal.split("-");
                Match_Table2()
            }
        };

        if (NumberArray() == true) {
            xhttp.open("GET", "numbermatch.php?search=" + SearchNumbers(), true);
            xhttp.send();
        } else {
            xhttp.open("GET", "getmatch.php?search=" + SearchString(), true);
            xhttp.send();
        }
    } else {
        tArea.innerHTML = '<font style="font-size: 150%; color: RGB(223, 0, 0)">Select 12 or fewer ciphers</font>'
    }
}

function Match_Table() {
    let ms, x, y, aCipher, gemSum, cs, isBold, isSame;

    ms = '<table class="MTable"><tr><td>';

    for (x = 0; x < mArr.length - 1; x++) {

        if (x % 25 == 0) {
            ms += '<tr><td class="MPhrase"><font style="color: orange;">Word or Phrase</font></td>';
            for (z = 0; z < cipherGroup.length; z++) {
                ms += '<td class="CipherHead" style="color: rgb(' + cipherGroup[z].RGB.join() + ')">';
                ms += cipherGroup[z].Nickname;
                ms += "</td>"
            }
            ms += "</tr>"
        }

        ms += '<tr><td class="MPhrase">' + mArr[x] + '</td>';

        for (y = 0; y < cipherGroup.length; y++) {

            aCipher = cipherGroup[y];
            gemSum = aCipher.Gematria(mArr[x]);
            cs = aCipher.modName;

            if (gemArr[y] == gemSum || pArr.indexOf(gemSum) > -1) {
                isSame = true
            } else {
                isSame = false
            }
            if (gemArr.indexOf(gemSum) > -1) {
                isBold = true
            } else {
                isBold = false
            }

            ms += '<td class="MSum';
            if (isSame == true) {
                ms += ' MSumFull'
            } else if (isBold == true) {
                ms += ' MSumPart'
            }
            ms += '">';

            if (isSame == true) {
                ms += '<font style="color: RGB(' + aCipher.RGB.join() + '")>'
            }
            ms += gemSum;
            if (isSame == true) {
                ms += '</font>'
            }
            ms += '</td>'
        }
        ms += '</tr>'
    }

    ms += '</table>';
    return ms
}

function Match_Table2() {
    tArea = document.getElementById("MatchSpot");
    if (mArr.length > 0) {
        tArea.innerHTML = Match_Table()
    } else {
        tArea.innerHTML = '<font style="color: RGB(223, 0, 0)">You must first click "Match" to build this table</font>'
    }
    List_Options("Matches")
}

function Open_Ciphers() {
    const cats = ["Pythagorean", "Alphabetic Order", "Jewish", "Kabbalah", "Mathematical", "Other", "Exception"];
    const c_cats = ["Custom", "Reduced/Ordinal/Reverse", "Gematrinator's Picks", "Small Numbers", "Medium Numbers",
                    "Big Numbers", "Experimental", "All"];
    let ts = "";
    let x, y, mName, cbVar, cx;
    tArea = document.getElementById("MatchSpot");

    ts = '<table><tr><td colspan="' + cats.length + '">';
    ts += 'Select Group: <select id="Cipher_Drop" onchange="set_Cipher_Cat()">';
    for (x = 0; x < c_cats.length; x++) {
        cx = c_cats[x];
        ts += '<option value="' + cx + '"';
        if (cx == cipher_Cat) {
            ts += ' selected="selected"'
        }
        ts += '>' + cx + '</option>'
    }

    ts += '</select></td></tr>';
    for (x = 0; x < cats.length; x++) {
        ts += '<td valign="top" style="padding: 3px">';
        ts += '<font style="color: orange"><B><U>' + cats[x] + ':</U></B></font>';
        for (y = 0; y < cipherNames.length; y++) {
            aCipher = new cipher(cipherNames[y]);
            mName = aCipher.modName;
            if (ciphersOn[y] == true) {
                cbVar = "checked"
            } else {
                cbVar = "unchecked"
            }
            if (aCipher.category == cats[x]) {
                ts += '<BR><input type="checkbox" id="' + mName + '_Box" onclick="set_Ciphers()" value="' + mName + '" ';
                ts += cbVar + '><font style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.Nickname + '</input>'
            }
        }
        ts += '</td>'
    }

    tArea.innerHTML = ts;
    List_Options("Ciphers")
}

function opt_Ciphers() {
    let cs = "";
    cs += 'Ciphers per Row: ';
    cs += '<select style="width: 50px" id="Row_Drop" onchange="Set_Rows()">';
    for (x = 2; x < 9; x++) {
        cs += '<option value="' + x + '"';
        if (x == per_Row) {
            cs += ' selected="selected"'
        }
        cs += '>' + x + '</option>'
    }
    cs += '</select>';
    return cs
}

function opt_NumCalc() {
    let ns = "";
    const nArr = ["Off", "Full", "Reduce"];
    const nArr2 = [" ", " (123 = 123)", " (123 = 1+2+3 = 6)"];
    ns += 'Number Calculation: ';
    ns += '<select id="Num_Calc" onchange="Set_NumCalc()">';
    for (x = 0; x < nArr.length; x++) {
        if (nArr[x] == num_Calc) {
            ns += '<option value="' + nArr[x] + '" selected="selected">' + nArr[x] + nArr2[x] + '</option>'
        } else {
            ns += '<option value="' + nArr[x] + '">' + nArr[x] + nArr2[x] + '</option>'
        }
    }
    ns += '</select>';
    return ns
}

function List_Options(impSel) {
    const oArea = document.getElementById("OptionsSpot");
    let oStr = '<table id="OptionsTable"><tr>';
    const links = ["Open_History2", "Get_Matches", "Open_Ciphers", "Open_Options", "Open_Help"];
    const oNames = ["History", "Matches", "Ciphers", "Options", "Help"];
    let cellClass;

    if (mSel !== "") {
        mSel = impSel
    }
    for (x = 0; x < oNames.length; x++) {
        if (mSel == oNames[x]) {
            cellClass = "mSel"
        } else {
            cellClass = "noSel"
        }
        oStr += '<td class="' + cellClass + '"><a href="javascript:' + links[x] + '()"><B>' + oNames[x] + '</B></a></td>'
    }
    oStr += "</tr></table>";
    oArea.innerHTML = oStr
}

function Open_Options() {
    const or = "";
    let os = "", x, oQ = "", oE = "", oL = "";
    tArea = document.getElementById("MatchSpot");

    if (o_Reduce == true) {
        oR = " checked"
    }
    if (o_Quotes == true) {
        oQ = " checked"
    }
    if (o_Eq == true) {
        oE = " checked"
    }
    if (o_Lett == true) {
        oL = " checked"
    }

    os += '<table><tr><td style="width: 400px; text-align: right">';
    os += 'Show Reduction <input type="checkbox" id="o_RBox" value="Show Reductions" onclick="click_Opt()"' + oR + '></input><BR>';
    os += opt_Ciphers() + '<p>';
    os += opt_NumCalc() + '<p>';

    os += '<font style="color: orange; font-size: 90%"><U>Breakdown:</U></font><BR>';
    os += 'Show Quotes <input type="checkbox" id="o_QBox" value="Show Quotes" onclick="click_Opt()"' + oQ + '></input><BR>';
    os += 'Show Equation <input type="checkbox" id="o_EBox" value="Show Equation" onclick="click_Opt()"' + oE + '></input><BR>';
    os += 'Show Letters <input type="checkbox" id="o_LBox" value="Show Letters" onclick="click_Opt()"' + oL + '></input>';

    os += '</td></tr></table>';

    tArea.innerHTML = os;
    List_Options("Options")
}

function click_Opt() {
    let QBox, EBox, LBox;
    RBox = document.getElementById("o_RBox");
    QBox = document.getElementById("o_QBox");
    EBox = document.getElementById("o_EBox");
    LBox = document.getElementById("o_LBox");
    if (RBox.checked == true) {
        o_Reduce = true
    } else {
        o_Reduce = false
    }
    if (QBox.checked == true) {
        o_Quotes = true
    } else {
        o_Quotes = false
    }
    if (EBox.checked == true) {
        o_Eq = true
    } else {
        o_Eq = false
    }
    if (LBox.checked == true) {
        o_Lett = true
    } else {
        o_Lett = false
    }
    Populate_Sums();
    Populate_Breakdown()
}

function Open_History() {
    let ms, x, y, aCipher, gemSum;
    tArea = document.getElementById("MatchSpot");

    ms = '<table class="MTable">';

    for (x = 0; x < sHistory.length; x++) {

        if (x % 25 == 0) {
            ms += '<tr><td class="MPhrase"><font style="color: orange;">Word or Phrase</font></td>';
            for (z = 0; z < cipherGroup.length; z++) {
                ms += '<td class="CipherHead" style="color: RGB(' + cipherGroup[z].RGB.join() + ')">';
                ms += cipherGroup[z].Nickname;
                ms += "</td>"
            }
            ms += "</tr>"
        }

        ms += '<tr><td class="MPhrase">' + sHistory[x] + '</td>';

        for (y = 0; y < cipherGroup.length; y++) {

            aCipher = cipherGroup[y];
            gemSum = '<font style="font-size: 115%"><B>' + aCipher.Gematria(sHistory[x]) + '</B></font>';

            ms += '<td><font style="color: RGB(' + aCipher.RGB.join() + '")>' + gemSum + '</font></td>'
        }
        ms += '</tr>'
    }

    ms += '</table>';
    tArea.innerHTML = ms;
    List_Options("History")
}

function Open_History2() {
    tArea = document.getElementById("MatchSpot");
    if (sHistory.length > 0) {
        Open_History()
    } else {
        tArea.innerHTML =
            '<font style="color: RGB(223, 0, 0)">Press Enter/Return in the text field or view a breakdown to add a phrase to the History table</font>'
    }
}

function Open_Help() {
    let ts = "";
    let helpArr;
    tArea = document.getElementById("MatchSpot");

    mSel = "Help";
    helpArr = ['Enter a word, phrase, or series of numbers in the Search field up top.',
               'Below each gematric value is the number in Reduced form. Reductions stop at Master Numbers 11, 22, and 33',
               'To view the breakdown of a phrase, click the cipher name. You may also mouse over other numbers to preview a different Breakdown',
               'Hit Enter/Return or view a different Breakdown to add a phrase to your "History" table',
               'Click "Match" to view a list of stored words and phrases whose gematric values match those currently displayed',
               'Click "Ciphers" to view the full list of ciphers and turn each one on or off',
               'Click "Options" to toggle Reductions, re-format the table, turn Number Calculation on, or change the Breakdown format',
               'The table can be customized by clicking the "Move Cipher" buttons under the Breakdown',
               'View the chart for any current cipher by clicking the link under the "Move" buttons in the Breakdown'];

    ts += '<table style="width: 600px"><tr><td>';
    for (x = 0; x < helpArr.length; x++) {
        ts += '<div class="HelpItem">';
        ts += '- ' + helpArr[x] + '</div>'
    }
    ts += '</td></tr></table>';

    List_Options("Help");
    tArea.innerHTML = ts
}

function GemHeadStr(impNum) {
    let x, aCipher, gs = "";
    const exDir = "up";

    for (x = impNum; x < (impNum + per_Row) && x < cipherGroup.length; x++) {
        aCipher = cipherGroup[x];
        gs += '<td class="Gem_Head" style="color: RGB(' + aCipher.RGB.join() + ')">';
        gs += '<a onmouseover="javascript:Populate_Breakdown(';
        gs += "'" + aCipher.Nickname + "', false)";
        gs += '" onmouseout="Populate_Breakdown()" href="javascript:Populate_Breakdown(';
        gs += "'" + aCipher.Nickname + "', true";
        gs += ')">' + aCipher.Nickname + '</a>';
        gs += "</td>"
    }

    return gs
}

function GemSumStr(impNum) {
    let x, aCipher, gs = "";

    for (x = impNum; x < (impNum + per_Row) && x < cipherGroup.length; x++) {
        aCipher = cipherGroup[x];
        gs += '<td id="' + aCipher.modName + '_Sum" class="Gem_Sum" style="color: RGB(' + aCipher.RGB.join() + ')">';
        gs += "</td>"
    }

    return gs
}

function Gematria_Table() {
    let gts, aCipher, gemSum;
    let z = 0;
    gArea = document.getElementById("GematriaSpot");

    gts = '<table class="GTable">';

    for (z = 0; z < cipherGroup.length; z += Number(per_Row)) {

        gts += '<tr>';
        gts += GemHeadStr(z);
        gts += '</tr><tr>';
        gts += GemSumStr(z);
        gts += '</tr>'

    }

    gts += '</table>';

    gArea.innerHTML = gts;
    Populate_Sums();
    if (ciphersOn[cipherNames.indexOf(breakCipher)] == false) {
        document.getElementById("BreakdownSpot").innerHTML = ""
    }
}

function Populate_Sums() {
    let x, y;
    let tCell, tStr;

    gemArr = [];
    for (x = 0; x < cipherGroup.length; x++) {
        aCipher = cipherGroup[x];

        if (Number(Phrase()) > 0 && Phrase() !== "Infinity") {
            gemArr[x] = Phrase()
        } else {
            gemArr[x] = aCipher.Gematria(String(Phrase()))
        }

        tCell = document.getElementById(aCipher.modName + "_Sum");

        if (Number(gemArr[x]) === gemArr[x] && gemArr[x] > 0 && gemArr[x] < 10000000) {
            tStr = '<a href="javascript:Open_Properties(' + gemArr[x] + ')" onmouseover="javascript:Populate_Breakdown(';
            tStr += "'" + aCipher.Nickname + "', false";
            tStr += ')" onmouseout="Populate_Breakdown()">' + gemArr[x] + '</a>';
            if (o_Reduce == true) {
                tStr += '<font style="font-size: 50%"><BR>' + ReducedNum(gemArr[x]) + '</font>'
            }
        } else {
            tStr = gemArr[x]
        }

        tCell.innerHTML = tStr;

        if (break_on == true) {
            Populate_Breakdown(breakCipher)
        }

    }
}

function Populate_Breakdown(impCipher = breakCipher, switchC = true) {
    let x;

    if (ciphersOn[cipherNames.indexOf(impCipher)] == true) {
        for (x = 0; x < cipherGroup.length; x++) {
            if (impCipher == cipherGroup[x].Nickname) {
                cipherGroup[x].Breakdown(Phrase());
                if (breakCipher !== cipherGroup[x].Nickname) {
                    newHistory();
                    if (switchC == true || breakCipher === undefined) {
                        breakCipher = cipherGroup[x].Nickname
                    }
                }
                break;
            }
        }
        break_on = true
    }
}

function Open_Properties(impNum) {
    if (impNum > 0 && impNum < 10000000) {
        window.open("numberProperties.php?Number=" + impNum, "Properties of " + impNum, "height=480,width=750")
    }
}

function SearchString() {
    let x, aCipher;
    let ss = "";
    pArr = [];

    for (x = 0; x < cipherGroup.length; x++) {
        aCipher = cipherGroup[x];
        if (ss !== "") {
            ss += "-"
        }
        ss += aCipher.modName + "-";
        ss += gemArr[x]
    }

    return ss
}

function SearchNumbers() {
    let ss = "-";

    for (x = 0; x < cipherGroup.length; x++) {
        aCipher = cipherGroup[x];
        ss += aCipher.modName + "-"
    }
    ss = pArr.join("-") + ss;
    return ss.slice(0, ss.length - 1)
}

class cipher {
    constructor(impName) {
        this.Nickname = impName;
        this.modName = replaceAll(impName, " ", "_");

        switch (impName) {
            case "Full Reduction":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 1;
                this.kVal = 2;
                this.lVal = 3;
                this.mVal = 4;
                this.nVal = 5;
                this.oVal = 6;
                this.pVal = 7;
                this.qVal = 8;
                this.rVal = 9;
                this.sVal = 1;
                this.tVal = 2;
                this.uVal = 3;
                this.vVal = 4;
                this.wVal = 5;
                this.xVal = 6;
                this.yVal = 7;
                this.zVal = 8;
                this.RGB = [68, 114, 196];
                this.hRGB = [0, 130, 256];
                this.category = "Pythagorean";
                break;
            case "Single Reduction":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 1;
                this.kVal = 2;
                this.lVal = 3;
                this.mVal = 4;
                this.nVal = 5;
                this.oVal = 6;
                this.pVal = 7;
                this.qVal = 8;
                this.rVal = 9;
                this.sVal = 10;
                this.tVal = 2;
                this.uVal = 3;
                this.vVal = 4;
                this.wVal = 5;
                this.xVal = 6;
                this.yVal = 7;
                this.zVal = 8;
                this.RGB = [142, 169, 219];
                this.hRGB = [142, 200, 255];
                this.category = "Pythagorean";
                break;
            case "Reverse Full Reduction":
                this.aVal = 8;
                this.bVal = 7;
                this.cVal = 6;
                this.dVal = 5;
                this.eVal = 4;
                this.fVal = 3;
                this.gVal = 2;
                this.hVal = 1;
                this.iVal = 9;
                this.jVal = 8;
                this.kVal = 7;
                this.lVal = 6;
                this.mVal = 5;
                this.nVal = 4;
                this.oVal = 3;
                this.pVal = 2;
                this.qVal = 1;
                this.rVal = 9;
                this.sVal = 8;
                this.tVal = 7;
                this.uVal = 6;
                this.vVal = 5;
                this.wVal = 4;
                this.xVal = 3;
                this.yVal = 2;
                this.zVal = 1;
                this.RGB = [100, 226, 226];
                this.hRGB = [100, 255, 255];
                this.category = "Pythagorean";
                break;
            case "English Ordinal":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 10;
                this.kVal = 11;
                this.lVal = 12;
                this.mVal = 13;
                this.nVal = 14;
                this.oVal = 15;
                this.pVal = 16;
                this.qVal = 17;
                this.rVal = 18;
                this.sVal = 19;
                this.tVal = 20;
                this.uVal = 21;
                this.vVal = 22;
                this.wVal = 23;
                this.xVal = 24;
                this.yVal = 25;
                this.zVal = 26;
                this.RGB = [0, 153, 0];
                this.hRGB = [0, 200, 0];
                this.category = "Alphabetic Order";
                break;
            case "Reverse Ordinal":
                this.aVal = 26;
                this.bVal = 25;
                this.cVal = 24;
                this.dVal = 23;
                this.eVal = 22;
                this.fVal = 21;
                this.gVal = 20;
                this.hVal = 19;
                this.iVal = 18;
                this.jVal = 17;
                this.kVal = 16;
                this.lVal = 15;
                this.mVal = 14;
                this.nVal = 13;
                this.oVal = 12;
                this.pVal = 11;
                this.qVal = 10;
                this.rVal = 9;
                this.sVal = 8;
                this.tVal = 7;
                this.uVal = 6;
                this.vVal = 5;
                this.wVal = 4;
                this.xVal = 3;
                this.yVal = 2;
                this.zVal = 1;
                this.RGB = [80, 225, 20];
                this.hRGB = [105, 244, 40];
                this.category = "Alphabetic Order";
                break;
            case "English Extended":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 10;
                this.kVal = 20;
                this.lVal = 30;
                this.mVal = 40;
                this.nVal = 50;
                this.oVal = 60;
                this.pVal = 70;
                this.qVal = 80;
                this.rVal = 90;
                this.sVal = 100;
                this.tVal = 200;
                this.uVal = 300;
                this.vVal = 400;
                this.wVal = 500;
                this.xVal = 600;
                this.yVal = 700;
                this.zVal = 800;
                this.RGB = [255, 255, 0];
                this.hRGB = [220, 220, 155];
                this.category = "Alphabetic Order";
                break;
            case "Reverse Extended":
                this.aVal = 800;
                this.bVal = 700;
                this.cVal = 600;
                this.dVal = 500;
                this.eVal = 400;
                this.fVal = 300;
                this.gVal = 200;
                this.hVal = 100;
                this.iVal = 90;
                this.jVal = 80;
                this.kVal = 70;
                this.lVal = 60;
                this.mVal = 50;
                this.nVal = 40;
                this.oVal = 30;
                this.pVal = 20;
                this.qVal = 10;
                this.rVal = 9;
                this.sVal = 8;
                this.tVal = 7;
                this.uVal = 6;
                this.vVal = 5;
                this.wVal = 4;
                this.xVal = 3;
                this.yVal = 2;
                this.zVal = 1;
                this.RGB = [255, 255, 0];
                this.hRGB = [220, 220, 155];
                this.category = "Alphabetic Order";
                break;
            case "Jewish":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 600;
                this.kVal = 10;
                this.lVal = 20;
                this.mVal = 30;
                this.nVal = 40;
                this.oVal = 50;
                this.pVal = 60;
                this.qVal = 70;
                this.rVal = 80;
                this.sVal = 90;
                this.tVal = 100;
                this.uVal = 200;
                this.vVal = 700;
                this.wVal = 900;
                this.xVal = 300;
                this.yVal = 400;
                this.zVal = 500;
                this.RGB = [153, 102, 255];
                this.hRGB = [170, 135, 255];
                this.category = "Jewish";
                break;
            case "Jewish Reverse":
                this.aVal = 27;
                this.bVal = 26;
                this.cVal = 25;
                this.dVal = 24;
                this.eVal = 23;
                this.fVal = 22;
                this.gVal = 21;
                this.hVal = 20;
                this.iVal = 19;
                this.jVal = 4;
                this.kVal = 18;
                this.lVal = 17;
                this.mVal = 16;
                this.nVal = 15;
                this.oVal = 14;
                this.pVal = 13;
                this.qVal = 12;
                this.rVal = 11;
                this.sVal = 10;
                this.tVal = 9;
                this.uVal = 8;
                this.vVal = 3;
                this.wVal = 1;
                this.xVal = 7;
                this.yVal = 6;
                this.zVal = 5;
                this.RGB = [153, 102, 255];
                this.hRGB = [170, 135, 255];
                this.category = "Jewish";
                break;
            case "Francis Bacon":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 10;
                this.kVal = 11;
                this.lVal = 12;
                this.mVal = 13;
                this.nVal = 14;
                this.oVal = 15;
                this.pVal = 16;
                this.qVal = 17;
                this.rVal = 18;
                this.sVal = 19;
                this.tVal = 20;
                this.uVal = 21;
                this.vVal = 22;
                this.wVal = 23;
                this.xVal = 24;
                this.yVal = 25;
                this.zVal = 26;
                this.RGB = [150, 244, 2];
                this.hRGB = [165, 255, 45];
                this.category = "Alphabetic Order";
                break;
            case "Franc Baconis":
                this.aVal = 2;
                this.bVal = 4;
                this.cVal = 6;
                this.dVal = 8;
                this.eVal = 10;
                this.fVal = 12;
                this.gVal = 14;
                this.hVal = 16;
                this.iVal = 18;
                this.jVal = 20;
                this.kVal = 22;
                this.lVal = 24;
                this.mVal = 26;
                this.nVal = 28;
                this.oVal = 30;
                this.pVal = 32;
                this.qVal = 34;
                this.rVal = 36;
                this.sVal = 38;
                this.tVal = 40;
                this.uVal = 42;
                this.vVal = 44;
                this.wVal = 46;
                this.xVal = 48;
                this.yVal = 50;
                this.zVal = 52;
                this.RGB = [93, 156, 88];
                this.hRGB = [165, 255, 45];
                this.category = "Alphabetic Order";
                break;
            case "ALW Kabbalah":
                this.aVal = 1;
                this.bVal = 20;
                this.cVal = 13;
                this.dVal = 6;
                this.eVal = 25;
                this.fVal = 18;
                this.gVal = 11;
                this.hVal = 4;
                this.iVal = 23;
                this.jVal = 16;
                this.kVal = 9;
                this.lVal = 2;
                this.mVal = 21;
                this.nVal = 14;
                this.oVal = 7;
                this.pVal = 26;
                this.qVal = 19;
                this.rVal = 12;
                this.sVal = 5;
                this.tVal = 24;
                this.uVal = 17;
                this.vVal = 10;
                this.wVal = 3;
                this.xVal = 22;
                this.yVal = 15;
                this.zVal = 8;
                this.RGB = [255, 64, 0];
                this.hRGB = [255, 94, 0];
                this.category = "Kabbalah";
                break;
            case "KFW Kabbalah":
                this.aVal = 9;
                this.bVal = 20;
                this.cVal = 13;
                this.dVal = 6;
                this.eVal = 17;
                this.fVal = 2;
                this.gVal = 19;
                this.hVal = 12;
                this.iVal = 23;
                this.jVal = 16;
                this.kVal = 1;
                this.lVal = 18;
                this.mVal = 5;
                this.nVal = 22;
                this.oVal = 15;
                this.pVal = 26;
                this.qVal = 11;
                this.rVal = 4;
                this.sVal = 21;
                this.tVal = 8;
                this.uVal = 25;
                this.vVal = 10;
                this.wVal = 3;
                this.xVal = 14;
                this.yVal = 7;
                this.zVal = 24;
                this.RGB = [255, 64, 0];
                this.hRGB = [255, 94, 0];
                this.category = "Kabbalah";
                break;
            case "LCH Kabbalah":
                this.aVal = 5;
                this.bVal = 20;
                this.cVal = 2;
                this.dVal = 23;
                this.eVal = 13;
                this.fVal = 12;
                this.gVal = 11;
                this.hVal = 3;
                this.iVal = 0;
                this.jVal = 7;
                this.kVal = 17;
                this.lVal = 1;
                this.mVal = 21;
                this.nVal = 24;
                this.oVal = 10;
                this.pVal = 4;
                this.qVal = 16;
                this.rVal = 14;
                this.sVal = 15;
                this.tVal = 9;
                this.uVal = 25;
                this.vVal = 22;
                this.wVal = 8;
                this.xVal = 6;
                this.yVal = 18;
                this.zVal = 19;
                this.RGB = [255, 64, 0];
                this.hRGB = [255, 94, 0];
                this.category = "Kabbalah";
                break;
            case "Sumerian":
                this.aVal = 6;
                this.bVal = 12;
                this.cVal = 18;
                this.dVal = 24;
                this.eVal = 30;
                this.fVal = 36;
                this.gVal = 42;
                this.hVal = 48;
                this.iVal = 54;
                this.jVal = 60;
                this.kVal = 66;
                this.lVal = 72;
                this.mVal = 78;
                this.nVal = 84;
                this.oVal = 90;
                this.pVal = 96;
                this.qVal = 102;
                this.rVal = 108;
                this.sVal = 114;
                this.tVal = 120;
                this.uVal = 126;
                this.vVal = 132;
                this.wVal = 138;
                this.xVal = 144;
                this.yVal = 150;
                this.zVal = 156;
                this.RGB = [169, 208, 142];
                this.hRGB = [180, 235, 142];
                this.category = "Alphabetic Order";
                break;
            case "Reverse Sumerian":
                this.aVal = 156;
                this.bVal = 150;
                this.cVal = 144;
                this.dVal = 138;
                this.eVal = 132;
                this.fVal = 126;
                this.gVal = 120;
                this.hVal = 114;
                this.iVal = 108;
                this.jVal = 102;
                this.kVal = 96;
                this.lVal = 90;
                this.mVal = 84;
                this.nVal = 78;
                this.oVal = 72;
                this.pVal = 66;
                this.qVal = 60;
                this.rVal = 54;
                this.sVal = 48;
                this.tVal = 42;
                this.uVal = 36;
                this.vVal = 30;
                this.wVal = 24;
                this.xVal = 18;
                this.yVal = 12;
                this.zVal = 6;
                this.RGB = [220, 208, 148];
                this.hRGB = [180, 174, 142];
                this.category = "Alphabetic Order";
                break;
            case "Satanic":
                this.aVal = 36;
                this.bVal = 37;
                this.cVal = 38;
                this.dVal = 39;
                this.eVal = 40;
                this.fVal = 41;
                this.gVal = 42;
                this.hVal = 43;
                this.iVal = 44;
                this.jVal = 45;
                this.kVal = 46;
                this.lVal = 47;
                this.mVal = 48;
                this.nVal = 49;
                this.oVal = 50;
                this.pVal = 51;
                this.qVal = 52;
                this.rVal = 53;
                this.sVal = 54;
                this.tVal = 55;
                this.uVal = 56;
                this.vVal = 57;
                this.wVal = 58;
                this.xVal = 59;
                this.yVal = 60;
                this.zVal = 61;
                this.RGB = [255, 0, 0];
                this.hRGB = [235, 0, 110];
                this.category = "Alphabetic Order";
                break;
            case "Reverse Satanic":
                this.aVal = 61;
                this.bVal = 60;
                this.cVal = 59;
                this.dVal = 58;
                this.eVal = 57;
                this.fVal = 56;
                this.gVal = 55;
                this.hVal = 54;
                this.iVal = 53;
                this.jVal = 52;
                this.kVal = 51;
                this.lVal = 50;
                this.mVal = 49;
                this.nVal = 48;
                this.oVal = 47;
                this.pVal = 46;
                this.qVal = 45;
                this.rVal = 44;
                this.sVal = 43;
                this.tVal = 42;
                this.uVal = 41;
                this.vVal = 40;
                this.wVal = 39;
                this.xVal = 38;
                this.yVal = 37;
                this.zVal = 36;
                this.RGB = [255, 0, 0];
                this.hRGB = [235, 0, 110];
                this.category = "Alphabetic Order";
                break;
            case "Septenary":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 6;
                this.iVal = 5;
                this.jVal = 4;
                this.kVal = 3;
                this.lVal = 2;
                this.mVal = 1;
                this.nVal = 1;
                this.oVal = 2;
                this.pVal = 3;
                this.qVal = 4;
                this.rVal = 5;
                this.sVal = 6;
                this.tVal = 7;
                this.uVal = 6;
                this.vVal = 5;
                this.wVal = 4;
                this.xVal = 3;
                this.yVal = 2;
                this.zVal = 1;
                this.RGB = [255, 153, 0];
                this.hRGB = [255, 200, 0];
                this.category = "Other";
                break;
            case "Chaldean":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 8;
                this.gVal = 3;
                this.hVal = 5;
                this.iVal = 1;
                this.jVal = 1;
                this.kVal = 2;
                this.lVal = 3;
                this.mVal = 4;
                this.nVal = 5;
                this.oVal = 7;
                this.pVal = 8;
                this.qVal = 1;
                this.rVal = 2;
                this.sVal = 3;
                this.tVal = 4;
                this.uVal = 6;
                this.vVal = 6;
                this.wVal = 6;
                this.xVal = 5;
                this.yVal = 1;
                this.zVal = 7;
                this.RGB = [166, 166, 18];
                this.hRGB = [193, 193, 22];
                this.category = "Other";
                break;
            case "Jewish Reduced":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 6;
                this.kVal = 1;
                this.lVal = 2;
                this.mVal = 3;
                this.nVal = 4;
                this.oVal = 5;
                this.pVal = 6;
                this.qVal = 7;
                this.rVal = 8;
                this.sVal = 9;
                this.tVal = 1;
                this.uVal = 2;
                this.vVal = 7;
                this.wVal = 9;
                this.xVal = 3;
                this.yVal = 4;
                this.zVal = 5;
                this.RGB = [153, 102, 255];
                this.hRGB = [170, 135, 255];
                this.category = "Jewish";
                break;
            case "Jewish Ordinal":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 24;
                this.kVal = 10;
                this.lVal = 11;
                this.mVal = 12;
                this.nVal = 13;
                this.oVal = 14;
                this.pVal = 15;
                this.qVal = 16;
                this.rVal = 17;
                this.sVal = 18;
                this.tVal = 19;
                this.uVal = 20;
                this.vVal = 25;
                this.wVal = 27;
                this.xVal = 21;
                this.yVal = 22;
                this.zVal = 23;
                this.RGB = [153, 102, 255];
                this.hRGB = [170, 135, 255];
                this.category = "Jewish";
                break;
            case "Full Reduction KV":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 1;
                this.kVal = 11;
                this.lVal = 3;
                this.mVal = 4;
                this.nVal = 5;
                this.oVal = 6;
                this.pVal = 7;
                this.qVal = 8;
                this.rVal = 9;
                this.sVal = 1;
                this.tVal = 2;
                this.uVal = 3;
                this.vVal = 22;
                this.wVal = 5;
                this.xVal = 6;
                this.yVal = 7;
                this.zVal = 8;
                this.RGB = [0, 176, 240];
                this.hRGB = [0, 220, 200];
                this.category = "Exception";
                break;
            case "Single Reduction KV":
                this.aVal = 1;
                this.bVal = 2;
                this.cVal = 3;
                this.dVal = 4;
                this.eVal = 5;
                this.fVal = 6;
                this.gVal = 7;
                this.hVal = 8;
                this.iVal = 9;
                this.jVal = 1;
                this.kVal = 11;
                this.lVal = 3;
                this.mVal = 4;
                this.nVal = 5;
                this.oVal = 6;
                this.pVal = 7;
                this.qVal = 8;
                this.rVal = 9;
                this.sVal = 10;
                this.tVal = 2;
                this.uVal = 3;
                this.vVal = 22;
                this.wVal = 5;
                this.xVal = 6;
                this.yVal = 7;
                this.zVal = 8;
                this.RGB = [0, 176, 240];
                this.hRGB = [0, 220, 200];
                this.category = "Exception";
                break;
            case "Reverse Single Reduction":
                this.aVal = 8;
                this.bVal = 7;
                this.cVal = 6;
                this.dVal = 5;
                this.eVal = 4;
                this.fVal = 3;
                this.gVal = 2;
                this.hVal = 10;
                this.iVal = 9;
                this.jVal = 8;
                this.kVal = 7;
                this.lVal = 6;
                this.mVal = 5;
                this.nVal = 4;
                this.oVal = 3;
                this.pVal = 2;
                this.qVal = 1;
                this.rVal = 9;
                this.sVal = 8;
                this.tVal = 7;
                this.uVal = 6;
                this.vVal = 5;
                this.wVal = 4;
                this.xVal = 3;
                this.yVal = 2;
                this.zVal = 1;
                this.RGB = [80, 199, 199];
                this.hRGB = [100, 225, 225];
                this.category = "Pythagorean";
                break;
            case "Reverse Full Reduction EP":
                this.aVal = 8;
                this.bVal = 7;
                this.cVal = 6;
                this.dVal = 5;
                this.eVal = 22;
                this.fVal = 3;
                this.gVal = 2;
                this.hVal = 1;
                this.iVal = 9;
                this.jVal = 8;
                this.kVal = 7;
                this.lVal = 6;
                this.mVal = 5;
                this.nVal = 4;
                this.oVal = 3;
                this.pVal = 11;
                this.qVal = 1;
                this.rVal = 9;
                this.sVal = 8;
                this.tVal = 7;
                this.uVal = 6;
                this.vVal = 5;
                this.wVal = 4;
                this.xVal = 3;
                this.yVal = 2;
                this.zVal = 1;
                this.RGB = [110, 226, 156];
                this.hRGB = [130, 236, 177];
                this.category = "Exception";
                break;
            case "Reverse Single Reduction EP":
                this.aVal = 8;
                this.bVal = 7;
                this.cVal = 6;
                this.dVal = 5;
                this.eVal = 22;
                this.fVal = 3;
                this.gVal = 2;
                this.hVal = 10;
                this.iVal = 9;
                this.jVal = 8;
                this.kVal = 7;
                this.lVal = 6;
                this.mVal = 5;
                this.nVal = 4;
                this.oVal = 3;
                this.pVal = 11;
                this.qVal = 1;
                this.rVal = 9;
                this.sVal = 8;
                this.tVal = 7;
                this.uVal = 6;
                this.vVal = 5;
                this.wVal = 4;
                this.xVal = 3;
                this.yVal = 2;
                this.zVal = 1;
                this.RGB = [110, 226, 156];
                this.hRGB = [130, 236, 177];
                this.category = "Exception";
                break;
            case "Primes":
                this.aVal = 2;
                this.bVal = 3;
                this.cVal = 5;
                this.dVal = 7;
                this.eVal = 11;
                this.fVal = 13;
                this.gVal = 17;
                this.hVal = 19;
                this.iVal = 23;
                this.jVal = 29;
                this.kVal = 31;
                this.lVal = 37;
                this.mVal = 41;
                this.nVal = 43;
                this.oVal = 47;
                this.pVal = 53;
                this.qVal = 59;
                this.rVal = 61;
                this.sVal = 67;
                this.tVal = 71;
                this.uVal = 73;
                this.vVal = 79;
                this.wVal = 83;
                this.xVal = 89;
                this.yVal = 97;
                this.zVal = 101;
                this.RGB = [255, 204, 111];
                this.hRGB = [255, 210, 166];
                this.category = "Mathematical";
                break;
            case "Trigonal":
                this.aVal = 1;
                this.bVal = 3;
                this.cVal = 6;
                this.dVal = 10;
                this.eVal = 15;
                this.fVal = 21;
                this.gVal = 28;
                this.hVal = 36;
                this.iVal = 45;
                this.jVal = 55;
                this.kVal = 66;
                this.lVal = 78;
                this.mVal = 91;
                this.nVal = 105;
                this.oVal = 120;
                this.pVal = 136;
                this.qVal = 153;
                this.rVal = 171;
                this.sVal = 190;
                this.tVal = 210;
                this.uVal = 231;
                this.vVal = 253;
                this.wVal = 276;
                this.xVal = 300;
                this.yVal = 325;
                this.zVal = 351;
                this.RGB = [231, 180, 113];
                this.hRGB = [240, 191, 131];
                this.category = "Mathematical";
                break;
            case "Squares":
                this.aVal = 1;
                this.bVal = 4;
                this.cVal = 9;
                this.dVal = 16;
                this.eVal = 25;
                this.fVal = 36;
                this.gVal = 49;
                this.hVal = 64;
                this.iVal = 81;
                this.jVal = 100;
                this.kVal = 121;
                this.lVal = 144;
                this.mVal = 169;
                this.nVal = 1;
                this.oVal = 4;
                this.pVal = 9;
                this.qVal = 16;
                this.rVal = 25;
                this.sVal = 36;
                this.tVal = 49;
                this.uVal = 64;
                this.vVal = 81;
                this.wVal = 100;
                this.xVal = 121;
                this.yVal = 144;
                this.zVal = 169;
                this.RGB = [228, 216, 96];
                this.hRGB = [240, 191, 131];
                this.category = "Mathematical";
                break;
            case "Every Seven":
                this.aVal = 1;
                this.bVal = 16;
                this.cVal = 5;
                this.dVal = 20;
                this.eVal = 9;
                this.fVal = 24;
                this.gVal = 13;
                this.hVal = 2;
                this.iVal = 17;
                this.jVal = 6;
                this.kVal = 21;
                this.lVal = 10;
                this.mVal = 25;
                this.nVal = 14;
                this.oVal = 3;
                this.pVal = 18;
                this.qVal = 7;
                this.rVal = 22;
                this.sVal = 11;
                this.tVal = 26;
                this.uVal = 15;
                this.vVal = 4;
                this.wVal = 19;
                this.xVal = 8;
                this.yVal = 23;
                this.zVal = 12;
                this.RGB = [255, 64, 0];
                this.hRGB = [255, 94, 0];
                this.category = "Kabbalah"
        }
    }

    Gematria(impVal) {
        let g, x, z;
        let is_Cap, tempCur;
        let cur_Num = String("");

        g = 0;

        for (x = 0; x < impVal.length; x++) {

            is_Cap = false;
            z = impVal.slice(x, x + 1);

            if (isCap(z)) {
                is_Cap = true
            }
            z = z.toLowerCase();

            if (z == "&" && this.Nickname == "Jewish Ordinal") {
                g += 26
            }

            if (isLetter(z)) {
                g += this[(z) + "Val"];
                if (is_Cap == true && this.Nickname == "Francis Bacon") {
                    g += 26
                }
                if (is_Cap == true && this.Nickname == "Franc Baconis") {
                    g -= 1
                }
            }

            if (Number(z) > -1 && z !== " ") {
                switch (num_Calc) {
                    case "Full":
                        tempCur = Number(cur_Num);
                        g -= tempCur;
                        cur_Num += String(z);
                        g += Number(cur_Num);
                        break;
                    case "Reduce":
                        g += Number(z);
                        break;
                }
            } else {
                if (cur_Num.length > 0) {
                    cur_Num = String("")
                }
            }

        }

        return g
    }

    Breakdown(impVal) {
        var x, z, w, p, tDig, is_Cap, eqAdd, tempEq, tempPh;
        const wArr = [];
        let lastChar = "";
        let eqStr = "";
        const BreakSpot = document.getElementById("BreakdownSpot");
        var eqAdd = 0;
        let thisAdd = 0;
        let isStart = false;
        let letterCount = 0;
        const charCount = 0;

        for (x = 0; x < impVal.length; x++) {
            z = impVal.slice(x, x + 1);
            if (isLetter(z) || (z == "&" && this.Nickname == "Jewish Ordinal")) {
                letterCount++;
                if (lastChar == "letter") {
                    wArr[wArr.length - 1] += z
                } else {
                    wArr[wArr.length] = z;
                    lastChar = "letter"
                }
            } else if (Number(z) > -1 && z !== " ") {
                if (lastChar == "number") {
                    wArr[wArr.length - 1] += String(z)
                } else {
                    wArr[wArr.length] = String(z);
                    lastChar = "number"
                }
            } else {
                lastChar = ""
            }
        }

        for (w = 0; w < wArr.length; w++) {

            if (Number(wArr[w]) > -1) {
                switch (num_Calc) {
                    case "Full":
                        isStart = true;
                        if (w > 0) {
                            eqStr = eqStr.slice(0, eqStr.length - 1) + " + "
                        }

                        eqAdd += Number(wArr[w]);
                        for (p = 0; p < wArr[w].length; p++) {
                            eqStr += String(wArr[w].slice(p, p + 1));
                            if (p == wArr[w].length - 1) {
                                eqStr += "+"
                            }
                        }
                        break;
                    case "Reduce":
                        isStart = true;
                        if (w > 0) {
                            eqStr = eqStr.slice(0, eqStr.length - 1) + " + "
                        }
                        for (p = 0; p < wArr[w].length; p++) {
                            eqAdd += Number(wArr[w].slice(p, p + 1));
                            eqStr += String(wArr[w].slice(p, p + 1)) + "+"
                        }
                        break;
                }
            } else {
                if (isStart == true) {
                    eqStr = eqStr.slice(0, eqStr.length - 1) + " + "
                }
                for (p = 0; p < wArr[w].length; p++) {
                    is_Cap = false;
                    tDig = wArr[w].slice(p, p + 1);
                    if (isCap(tDig)) {
                        is_Cap = true
                    }
                    if (tDig == "&" && this.Nickname == "Jewish Ordinal") {
                        thisAdd = 26
                    } else {
                        tDig = tDig.toLowerCase();
                        thisAdd = this[(tDig) + "Val"]
                    }
                    if (is_Cap == true && this.Nickname == "Francis Bacon") {
                        thisAdd += 26
                    }
                    if (is_Cap == true && this.Nickname == "Franc Baconis") {
                        thisAdd -= 1
                    }
                    eqAdd += thisAdd;
                    if (o_Lett == true) {
                        eqStr += '(' + wArr[w].slice(p, p + 1) + ')' + String(thisAdd) + '+'
                    } else {
                        eqStr += String(thisAdd) + "+"
                    }
                }
                isStart = true
            }
        }

        eqStr = eqStr.slice(0, eqStr.length - 1);
        tempEq = eqStr;
        if (o_Quotes == true) {
            tempPh = '"' + Phrase() + '"'
        } else {
            tempPh = Phrase()
        }

        eqStr = tempPh + '<font class="BreakEq"> = ';
        if (o_Eq == true) {
            eqStr += tempEq + ' = '
        }
        eqStr += '</font>' + eqAdd + ' <font style="font-size: 80%; color: RGB(' + this.RGB.join() + ');">(' + this.Nickname + ')</font>';
        eqStr += '<div class="CountDiv">(';
        if (letterCount == 1) {
            eqStr += letterCount + ' letter, '
        } else {
            eqStr += letterCount + ' letters, '
        }
        if (wArr.length == 1) {
            eqStr += wArr.length + ' word)</div>'
        } else {
            eqStr += wArr.length + ' words)</div>'
        }
        eqStr += '<P><center><button class="MoveCipher" onclick="slide_Cipher(';
        eqStr += "'up'";
        eqStr += ')">Move cipher Left/Up</button>&nbsp;<button class="MoveCipher" onclick="slide_Cipher(';
        eqStr += "'down'";
        eqStr += ')">Move cipher Right/Down</button><BR>';
        eqStr +=
            '<font style="font-size: 66%; color: #ffffff">View Chart: </font><font style="color: #00ffff"><a href="javascript:Open_Chart()">' +
            this.Nickname +
            '</a><font>';
        eqStr += '</center>';
        BreakSpot.innerHTML = eqStr
    }
}

function slide_Cipher(impDir) {
    const x = cipherNames.indexOf(breakCipher);
    let z;

    switch (impDir.toLowerCase()) {
        case "up":
            for (z = x - 1; z > -1; z--) {
                if (ciphersOn[z] == true) {
                    cipherNames.splice(z, 0, cipherNames[x]);
                    cipherNames.splice(x + 1, 1);
                    ciphersOn.splice(z, 0, true);
                    ciphersOn.splice(x + 1, 1);
                    break;
                }
            }
            break;
        case "down":
            for (z = x + 1; z < cipherNames.length; z++) {
                if (ciphersOn[z] == true) {
                    cipherNames.splice(z + 1, 0, cipherNames[x]);
                    cipherNames.splice(x, 1);
                    ciphersOn.splice(z + 1, 0, true);
                    ciphersOn.splice(x, 1);
                    break;
                }
            }
            break;
    }

    Build_Ciphers()
}

function Set_Rows() {
    const rDrop = document.getElementById("Row_Drop");
    per_Row = Number(rDrop.value);
    Gematria_Table()
}

function Set_NumCalc() {
    const nCalc = document.getElementById("Num_Calc");
    num_Calc = nCalc.value;
    Populate_Sums()
}

function replaceAll(sS, fS, rS) {
    return sS.replace(new RegExp(fS, 'g'), rS);
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function isCap(str) {
    return str.length === 1 && str.match(/[A-Z]/);
}

function Phrase() {
    tBox = document.getElementById("SearchField");
    return tBox.value
}

function NumberArray() {
    let x, isNum;

    pArr = Phrase().split(" ");
    isNum = true;
    for (x = 0; x < pArr.length; x++) {
        if (isNaN(pArr[x])) {
            isNum = false;
            break;
        } else {
            pArr[x] = Number(pArr[x])
        }
    }
    return isNum
}

function newHistory(impOpt = false) {
    let hSpot, isNew;
    let x, y;
    const impVal = Phrase();

    isNew = false;

    if (impVal !== "") {

        if (Number(Phrase()) > 0) {

        } else {
            hSpot = sHistory.indexOf(impVal);

            if (hSpot > -1) {
                sHistory.splice(hSpot, 1)
            } else {
                isNew = true
            }

            if (sHistory.length > 100) {
                sHistory.pop()
            }

            sHistory.unshift(impVal)
        }
    }

    if (isNew == true) {
        AddTerm()
    }
    ;
    if (mSel == "History" || impOpt == true) {
        Open_History()
    }
}

function AddTerm() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ;
        }
    };
    xhttp.open("POST", "AddSearchTerm.php?Phrase=" + sStr("termAdd"), true);
    xhttp.send();
}

function sStr(retType) {

    const sString = Phrase();
    let Qunique, Qphrase, QhistAdd, lastSpace, x, z, isChar, Hphrase;
    Qunique = "";
    Qphrase = "";
    QhistAdd = "";
    lastSpace = false, Hphrase = "";
    const patt = new RegExp(/^[a-z]+$/i);

    for (x = 0; x <= sString.length; x++) {
        z = sString.slice(x, x + 1);

        isChar = patt.test(z);
        if (isChar == true) {
            Qphrase += z;
            Hphrase += z;
            QhistAdd += z;
            lastSpace = false;
        } else if (z == " ") {
            if (lastSpace == false) {
                Qphrase += "_";
                Hphrase = " ";
                QhistAdd += " ";
                lastSpace == true;
            }
        }
    }
    if (retType !== "histAdd") {
        return Qphrase
    } else {
        return Hphrase
    }
}

function Open_Chart() {
    window.open("http://www.gematrinator.com/images/ciphers/" + replaceAll(breakCipher, "/", "") + ".png", breakCipher +
        ' Cipher Chart', "height=250,width=640")
}

function ReducedNum(impNum) {
    var x, s;
    var cn = 0;
    var x, cn;

    while (impNum > 9 && impNum !== 11 && impNum !== 22 && impNum !== 33) {
        cn = 0;
        for (x = 0; x < String(impNum).length; x++) {
            s = Number(String(impNum).slice(x, x + 1));
            cn += s
        }
        impNum = cn
    }

    return impNum
}