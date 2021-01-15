/**
 * https://twitter.com/miharasan/status/1348567822377521154
 */

const str = {};
Array.from("ABCDEFGHIJ").forEach((v, i) => str[v] = i);
const ev1 = Array.from("FDCAJH");
const ev2 = Array.from("IBCFEH");
const ev3 = Array.from("FBAECIIJEGIH");
const hCand = [1, 5, 6];
var cnt = 0;

/**
 * FDCAJH * IBCFEH = FBAECIIJEGIH
 * に対応する数値を探索する
 */
function main() {

    // パターンを組みつつ検証
    let ptn = [];
    const func = (unselected, selected) => {
        if (unselected.length == 0) {
            // パターンが組めたので検証
            return evaulate(selected);
        } else if (selected.length === 8 && hCand.indexOf(selected[7]) < 0) {
            // Hの候補は1,5,6なのでそれ以外は無視
            return false;
        } else {
            let hit = unselected.find(v => {
                let other = unselected.filter(vv => vv != v);
                return func(other, [...selected, v]);
            });
            return hit != undefined;
        }
    };
    func([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], []);
}

/**
 * 検証しログ出力
 */
function evaulate(mapping) {
    const ev1dec = parseInt(ev1.map(v => mapping[str[v]]).join(''));
    const ev2dec = parseInt(ev2.map(v => mapping[str[v]]).join(''));
    const ev3dec = parseInt(ev3.map(v => mapping[str[v]]).join(''));

    cnt++;
    if ((cnt % 10000) === 0) {
        console.log(`${cnt}`);
    }

    if ((ev1dec * ev2dec) === ev3dec) {
        console.log(`---------------------------------`);
        console.log(`${cnt}`);
        console.log(`${ev1dec} * ${ev2dec} = ${ev3dec}`);
        console.log(`${mapping}`);
        return true;
    } else {
        return false;
    }
}

// 実行
const startTime = Date.now();
main();
console.log(Date.now() - startTime);