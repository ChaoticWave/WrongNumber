var cipherNames = ["Reduced", "S Exception", "Reverse Reduced", "H Exception",
                   "K/V Exception", "K/S/V Exception", "Septenary", "Chaldean",
                   "Ordinal", "Reverse Ordinal", "Sumerian", "Francis Bacon",
                   "Jewish", "English", "Satanic", "ALW"];
var aVal, bVal, cVal, dVal, eVal, fVal, gVal, hVal, iVal, jVal, kVal, lVal, mVal;
var nVal, oVal, pVal, qVal, rVal, sVal, tVal, uVal, vVal, wVal, xVal, yVal, zVal;
var sumLabel, Nickname;

function cipher(cName) {

    Nickname = cName

    switch (cName) {

        case "Reduced":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 8;
            iVal = 9;
            jVal = 1;
            kVal = 2;
            lVal = 3;
            mVal = 4;
            nVal = 5;
            oVal = 6;
            pVal = 7;
            qVal = 8;
            rVal = 9;
            sVal = 1;
            tVal = 2;
            uVal = 3;
            vVal = 4;
            wVal = 5;
            xVal = 6;
            yVal = 7;
            zVal = 8;
            sumLabel = "reduced_sum";
            break;

        case "S Exception":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 8;
            iVal = 9;
            jVal = 1;
            kVal = 2;
            lVal = 3;
            mVal = 4;
            nVal = 5;
            oVal = 6;
            pVal = 7;
            qVal = 8;
            rVal = 9;
            sVal = 10;
            tVal = 2;
            uVal = 3;
            vVal = 4;
            wVal = 5;
            xVal = 6;
            yVal = 7;
            zVal = 8;
            sumLabel = "s_exception_sum";
            break;

        case "K/V Exception":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 8;
            iVal = 9;
            jVal = 1;
            kVal = 11;
            lVal = 3;
            mVal = 4;
            nVal = 5;
            oVal = 6;
            pVal = 7;
            qVal = 8;
            rVal = 9;
            sVal = 1;
            tVal = 2;
            uVal = 3;
            vVal = 22;
            wVal = 5;
            xVal = 6;
            yVal = 7;
            zVal = 8;
            sumLabel = "kv_exception_sum";
            break;

        case "K/S/V Exception":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 8;
            iVal = 9;
            jVal = 1;
            kVal = 11;
            lVal = 3;
            mVal = 4;
            nVal = 5;
            oVal = 6;
            pVal = 7;
            qVal = 8;
            rVal = 9;
            sVal = 10;
            tVal = 2;
            uVal = 3;
            vVal = 22;
            wVal = 5;
            xVal = 6;
            yVal = 7;
            zVal = 8;
            sumLabel = "ksv_exception_sum";
            break;

        case "Ordinal":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 8;
            iVal = 9;
            jVal = 10;
            kVal = 11;
            lVal = 12;
            mVal = 13;
            nVal = 14;
            oVal = 15;
            pVal = 16;
            qVal = 17;
            rVal = 18;
            sVal = 19;
            tVal = 20;
            uVal = 21;
            vVal = 22;
            wVal = 23;
            xVal = 24;
            yVal = 25;
            zVal = 26;
            sumLabel = "ordinal_sum";
            break;

        case "Sumerian":
            aVal = 6;
            bVal = 12;
            cVal = 18;
            dVal = 24;
            eVal = 30;
            fVal = 36;
            gVal = 42;
            hVal = 48;
            iVal = 54;
            jVal = 60;
            kVal = 66;
            lVal = 72;
            mVal = 78;
            nVal = 84;
            oVal = 90;
            pVal = 96;
            qVal = 102;
            rVal = 108;
            sVal = 114;
            tVal = 120;
            uVal = 126;
            vVal = 132;
            wVal = 138;
            xVal = 144;
            yVal = 150;
            zVal = 156;
            sumLabel = "sumerian_sum";
            break;

        case "Francis Bacon":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 8;
            iVal = 9;
            jVal = 10;
            kVal = 11;
            lVal = 12;
            mVal = 13;
            nVal = 14;
            oVal = 15;
            pVal = 16;
            qVal = 17;
            rVal = 18;
            sVal = 19;
            tVal = 20;
            uVal = 21;
            vVal = 22;
            wVal = 23;
            xVal = 24;
            yVal = 25;
            zVal = 26;
            sumLabel = "francis_bacon_sum";
            break;

        case "Satanic":
            aVal = 36;
            bVal = 37;
            cVal = 38;
            dVal = 39;
            eVal = 40;
            fVal = 41;
            gVal = 42;
            hVal = 43;
            iVal = 44;
            jVal = 45;
            kVal = 46;
            lVal = 47;
            mVal = 48;
            nVal = 49;
            oVal = 50;
            pVal = 51;
            qVal = 52;
            rVal = 53;
            sVal = 54;
            tVal = 55;
            uVal = 56;
            vVal = 57;
            wVal = 58;
            xVal = 59;
            yVal = 60;
            zVal = 61;
            sumLabel = "satanic_sum";
            break;

        case "Jewish":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 8;
            iVal = 9;
            jVal = 600;
            kVal = 10;
            lVal = 20;
            mVal = 30;
            nVal = 40;
            oVal = 50;
            pVal = 60;
            qVal = 70;
            rVal = 80;
            sVal = 90;
            tVal = 100;
            uVal = 200;
            vVal = 700;
            wVal = 900;
            xVal = 300;
            yVal = 400;
            zVal = 500;
            sumLabel = "jewish_sum";
            break;

        case "English":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 8;
            iVal = 9;
            jVal = 10;
            kVal = 20;
            lVal = 30;
            mVal = 40;
            nVal = 50;
            oVal = 60;
            pVal = 70;
            qVal = 80;
            rVal = 90;
            sVal = 100;
            tVal = 200;
            uVal = 300;
            vVal = 400;
            wVal = 500;
            xVal = 600;
            yVal = 700;
            zVal = 800;
            sumLabel = "english_sum";
            break;

        case "Septenary":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 6;
            gVal = 7;
            hVal = 6;
            iVal = 5;
            jVal = 4;
            kVal = 3;
            lVal = 2;
            mVal = 1;
            nVal = 1;
            oVal = 2;
            pVal = 3;
            qVal = 4;
            rVal = 5;
            sVal = 6;
            tVal = 7;
            uVal = 6;
            vVal = 5;
            wVal = 4;
            xVal = 3;
            yVal = 2;
            zVal = 1;
            sumLabel = "septenary_sum";
            break;

        case "Reverse Ordinal":
            aVal = 26;
            bVal = 25;
            cVal = 24;
            dVal = 23;
            eVal = 22;
            fVal = 21;
            gVal = 20;
            hVal = 19;
            iVal = 18;
            jVal = 17;
            kVal = 16;
            lVal = 15;
            mVal = 14;
            nVal = 13;
            oVal = 12;
            pVal = 11;
            qVal = 10;
            rVal = 9;
            sVal = 8;
            tVal = 7;
            uVal = 6;
            vVal = 5;
            wVal = 4;
            xVal = 3;
            yVal = 2;
            zVal = 1;
            sumLabel = "reverse_ordinal_sum";
            break;

        case "Reverse Reduced":
            aVal = 8;
            bVal = 7;
            cVal = 6;
            dVal = 5;
            eVal = 4;
            fVal = 3;
            gVal = 2;
            hVal = 1;
            iVal = 9;
            jVal = 8;
            kVal = 7;
            lVal = 6;
            mVal = 5;
            nVal = 4;
            oVal = 3;
            pVal = 2;
            qVal = 1;
            rVal = 9;
            sVal = 8;
            tVal = 7;
            uVal = 6;
            vVal = 5;
            wVal = 4;
            xVal = 3;
            yVal = 2;
            zVal = 1;
            sumLabel = "reverse_reduced_sum";
            break;

        case "H Exception":
            aVal = 8;
            bVal = 7;
            cVal = 6;
            dVal = 5;
            eVal = 4;
            fVal = 3;
            gVal = 2;
            hVal = 10;
            iVal = 9;
            jVal = 8;
            kVal = 7;
            lVal = 6;
            mVal = 5;
            nVal = 4;
            oVal = 3;
            pVal = 2;
            qVal = 1;
            rVal = 9;
            sVal = 8;
            tVal = 7;
            uVal = 6;
            vVal = 5;
            wVal = 4;
            xVal = 3;
            yVal = 2;
            zVal = 1;
            sumLabel = "h_exception_sum";
            break;

        case "Chaldean":
            aVal = 1;
            bVal = 2;
            cVal = 3;
            dVal = 4;
            eVal = 5;
            fVal = 8;
            gVal = 3;
            hVal = 5;
            iVal = 1;
            jVal = 1;
            kVal = 2;
            lVal = 3;
            mVal = 4;
            nVal = 5;
            oVal = 7;
            pVal = 8;
            qVal = 1;
            rVal = 2;
            sVal = 3;
            tVal = 4;
            uVal = 6;
            vVal = 6;
            wVal = 6;
            xVal = 5;
            yVal = 1;
            zVal = 7;
            sumLabel = "chaldean_sum";
            break;

        case "ALW":
            aVal = 1;
            bVal = 20;
            cVal = 13;
            dVal = 6;
            eVal = 25;
            fVal = 18;
            gVal = 11;
            hVal = 4;
            iVal = 23;
            jVal = 16;
            kVal = 9;
            lVal = 2;
            mVal = 21;
            nVal = 14;
            oVal = 7;
            pVal = 26;
            qVal = 19;
            rVal = 12;
            sVal = 5;
            tVal = 24;
            uVal = 17;
            vVal = 10;
            wVal = 3;
            xVal = 22;
            yVal = 15;
            zVal = 8;
            sumLabel = "alw_sum";
    }
}

function Gematria(impVal) {
    var g, x, z
    var is_cap

    g = 0;

    for (x = 0; x < impVal.length; x++) {

        is_cap = false;
        z = impVal.slice(x, x + 1);

        switch (z) {
            case "A":
                is_cap = true;
            case "a":
                g += aVal;
                break;
            case "B":
                is_cap = true;
            case "b":
                g += bVal;
                break;
            case "C":
                is_cap = true;
            case "c":
                g += cVal;
                break;
            case "D":
                is_cap = true;
            case "d":
                g += dVal;
                break;
            case "E":
                is_cap = true;
            case "e":
                g += eVal;
                break;
            case "F":
                is_cap = true;
            case "f":
                g += fVal;
                break;
            case "G":
                is_cap = true;
            case "g":
                g += gVal;
                break;
            case "H":
                is_cap = true;
            case "h":
                g += hVal;
                break;
            case "I":
                is_cap = true;
            case "i":
                g += iVal;
                break;
            case "J":
                is_cap = true;
            case "j":
                g += jVal;
                break;
            case "K":
                is_cap = true;
            case "k":
                g += kVal;
                break;
            case "L":
                is_cap = true;
            case "l":
                g += lVal;
                break;
            case "M":
                is_cap = true;
            case "m":
                g += mVal;
                break;
            case "N":
                is_cap = true;
            case "n":
                g += nVal;
                break;
            case "O":
                is_cap = true;
            case "o":
                g += oVal;
                break;
            case "P":
                is_cap = true;
            case "p":
                g += pVal;
                break;
            case "Q":
                is_cap = true;
            case "q":
                g += qVal;
                break;
            case "R":
                is_cap = true;
            case "r":
                g += rVal;
                break;
            case "S":
                is_cap = true;
            case "s":
                g += sVal;
                break;
            case "T":
                is_cap = true;
            case "t":
                g += tVal;
                break;
            case "U":
                is_cap = true;
            case "u":
                g += uVal;
                break;
            case "V":
                is_cap = true;
            case "v":
                g += vVal;
                break;
            case "W":
                is_cap = true;
            case "w":
                g += wVal;
                break;
            case "X":
                is_cap = true;
            case "x":
                g += xVal;
                break;
            case "Y":
                is_cap = true;
            case "y":
                g += yVal;
                break;
            case "Z":
                is_cap = true;
            case "z":
                g += zVal;
                break;
        }
        if (is_cap == true) {
            if (Nickname == "Francis Bacon") {
                g += 26;
            }
        }

    }

    return g;

}

function pop_Breakdown(impCipher) {

    var bStr
    var x, z;
    var is_cap;
    var eqAdd, eqSum, eqStr;

    cipher(impCipher)

    bStr = sStr()
    eqAdd = "";
    eqStr = '<font style="font-size: 80%"> = ';
    eqSum = 0;

    for (x = 0; x < bStr.length; x++) {

        is_cap = false;
        eqAdd = 0;
        z = bStr.slice(x, x + 1);

        switch (z) {
            case "A":
                is_cap = true;
            case "a":
                eqAdd = aVal;
                break;
            case "B":
                is_cap = true;
            case "b":
                eqAdd = bVal;
                break;
            case "C":
                is_cap = true;
            case "c":
                eqAdd = cVal;
                break;
            case "D":
                is_cap = true;
            case "d":
                eqAdd = dVal;
                break;
            case "E":
                is_cap = true;
            case "e":
                eqAdd = eVal;
                break;
            case "F":
                is_cap = true;
            case "f":
                eqAdd = fVal;
                break;
            case "G":
                is_cap = true;
            case "g":
                eqAdd = gVal;
                break;
            case "H":
                is_cap = true;
            case "h":
                eqAdd = hVal;
                break;
            case "I":
                is_cap = true;
            case "i":
                eqAdd = iVal;
                break;
            case "J":
                is_cap = true;
            case "j":
                eqAdd = jVal;
                break;
            case "K":
                is_cap = true;
            case "k":
                eqAdd = kVal;
                break;
            case "L":
                is_cap = true;
            case "l":
                eqAdd = lVal;
                break;
            case "M":
                is_cap = true;
            case "m":
                eqAdd = mVal;
                break;
            case "N":
                is_cap = true;
            case "n":
                eqAdd = nVal;
                break;
            case "O":
                is_cap = true;
            case "o":
                eqAdd = oVal;
                break;
            case "P":
                is_cap = true;
            case "p":
                eqAdd = pVal;
                break;
            case "Q":
                is_cap = true;
            case "q":
                eqAdd = qVal;
                break;
            case "R":
                is_cap = true;
            case "r":
                eqAdd = rVal;
                break;
            case "S":
                is_cap = true;
            case "s":
                eqAdd = sVal;
                break;
            case "T":
                is_cap = true;
            case "t":
                eqAdd = tVal;
                break;
            case "U":
                is_cap = true;
            case "u":
                eqAdd = uVal;
                break;
            case "V":
                is_cap = true;
            case "v":
                eqAdd = vVal;
                break;
            case "W":
                is_cap = true;
            case "w":
                eqAdd = wVal;
                break;
            case "X":
                is_cap = true;
            case "x":
                eqAdd = xVal;
                break;
            case "Y":
                is_cap = true;
            case "y":
                eqAdd = yVal;
                break;
            case "Z":
                is_cap = true;
            case "z":
                eqAdd = zVal;
                break;
        }

        if (is_cap == true) {
            if (Nickname == "Francis Bacon") {
                eqAdd += 26;
            }
        }

        if (eqAdd != 0) {
            eqSum += eqAdd;
            eqStr += eqAdd + "+";
        }

    }

    var hStr, hElem;
    hStr = bStr + eqStr.slice(0, eqStr.length - 1) + " = </font>" + eqSum + " (" + Nickname + ")";
    hElem = document.getElementById("BrokenDown");
    hElem.innerHTML = hStr;
}

function pop_Sums() {
    var x, gSum

    for (x = 0; x < cipherNames.length; x++) {
        cipher(cipherNames[x]);
        gSum = document.getElementById(sumLabel);
        gSum.innerHTML = Gematria(sStr());
    }
}

function sStr() {
    var x
    x = document.getElementById("SearchString").value;
    return x;
}