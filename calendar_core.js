/**
 * 业务：日历中一版有42个格子 6行7列。 1号根据星期放在第一行或第二行。如果1号为星期天。一号放在第二行
 * 要点：算出日历第一个格子的日期
 */

var  d = new Date();
d.setDate(1); //设置为1号
var n = 1 - d.getDay(); //求出日历的第一个格子的日子对应的偏移索引。
if (n == 1) { //如果1号正好对应星期日，因为星期日为0，所以这里要特殊处理以下
    n = -6;
}
d.setDate(n); //日历第一个格子的日期
for (var i = 0; i < 42; i++) {
    var oDiv = document.createElement('div');
    oDiv.innerHTML = d.getDate();
    document.body.appendChild(oDiv);
    d.setDate(1 + d.getDate());
}
