/**
 * 埋点
 * @type {string}
 */
var logSendTo = '', //记录日志uri
    try_get_id = 10
var device_id,
    pageid = (new Date).getTime(),
    seqid = 0
var _runInApp = false

device_id = genId()
function getUid(size) {
    var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ"
    var id = '', id_pre = size
    while (id_pre--)
        id += chars.substr(Math.floor(Math.random() * 62), 1)
    return id
}
function genId() {
    device_id = getUid(10) + '-' + ((new Date).getTime() - (new Date(2012, 6, 1)).getTime())
    deviceData()
    return device_id
}
function build_query(data) {
    var q = []
    for (var key in data) {
        q.push(key + '=' + encodeURIComponent(data[key]))
    }
    return q.join('&')
}
function deviceData() {
    var user_id = 'unknown'
    mkLog('device', {
        'refer': document.referrer,
        'userid': user_id,
        'w_w': window.screen.width,
        'w_h': window.screen.height
    })

}
function onLeaving(fnc) {
    var _before = window.onbeforeunload
    window.onbeforeunload = function (e) {
        fnc()
        _before && _before()
    }
}
function perVisit() {
    //site_refer site_userid
    var doc = document.documentElement || document.body
    var wname = window.name
    if (!wname) wname = window.name = getUid(6)
    mkLog('pv/in', {
        'refer': document.referrer,
        'url': window.location.href,
        'win': wname,
        'userid': 'unknow',
        'b_w': doc.clientWidth,
        'b_h': doc.clientHeight
    })

    onLeaving(function () {
        mkLog('pv/out', {'pgout': (new Date).getTime()})
    })
}

function mkLog(type, data) {
    //device_id pgid seqid
    data = data || {}
    data._runinapp = _runInApp
    type = type ? type + '/' : ''
    type += '?'
    var logMaxLen = 2000

    var paramCount = 0,
        pLeftLen,
        postUrl


    for (var key in data) {
        var v = data[key]
        if (!v) {
            continue;
        }
        if ('function' == typeof v)  v = v()
        else if ('object' == typeof v && v.length)  v = v.join('+')
        else v = encodeURIComponent(v)
        data[key] = v
        paramCount++
    }

    seqid++

    while (paramCount >= 0) {
        postUrl = build_query({'device_id': device_id, 'pgid': pageid, 'seqid': seqid})

        for (var key in data) {
            var postv = data[key]
            pLeftLen = logMaxLen - postUrl.length
            if (pLeftLen <= 0) break
            if (key.length + postv.length > pLeftLen) {
                var tmpv = postv.substr(0, pLeftLen)
                var tmpi = tmpv.lastIndexOf('+')
                if (tmpi > -1) {
                    data[key] = postv.substr(tmpi + 1)
                    postv = postv.substr(0, tmpi)
                } else {
                    data[key] = postv.substr(pLeftLen)
                    postv = tmpv
                }

            } else {
                delete data[key]
                paramCount--
            }
            postUrl += '&' + key + '=' + postv;

        }
        paramCount--;
        var logWorker = new Image;
        logWorker.src = logSendTo + type + postUrl;
        //console.log(logWorker.src)
    }
}

exports.cr = function (param, data) {
    data = data || {}
    mkLog('cr/' + param, data)
}

perVisit()
