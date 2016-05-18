/**
 * 简易html模板
 * @example
 * html:
 *  <div id='TPL'>
 *  <% var data = this.data;%>
 *  <% if(data.a == 0) %>
 *      <span>
 *      <%=data.a%>
 *      </span>
 *  <% } else { %>
 *       <div>
 *           <%=data.b%>
 *       </div>
 *  <% } %>
 *  </div>
 *
 *  js:
 *  var htmlStr = parse(document.getElementById('TPL').innerHTML, {a : 0, b : 12});
 *
 */
var cache = {};
function parse(str, data){
    if (!cache[str] ){
        var tpl = document.getElementById(str).innerHTML
        tpl = tpl
            .replace(/[\r\t\n]/g, " ")
            .split("<\?").join("\t")
            .replace(/((^|\?>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)\?>/g, "',$1,'")
            .split("\t").join("');")
            .split("\?>").join("p.push('")
            .split("\r").join("\\'")
        try{
            cache[str] = new Function("",
                "var p=[];p.push('" + tpl + "');return p.join('');");
        }catch(e){
            if (console){
                console.log(e)
                console.log(tpl)
            }
        }

    }
    var fn = cache[str]
    if (data){
        try{
            return fn.apply( data )
        }catch(e){
            if (console){
                console.log(e)
                console.log(data)
            }
        }
    }else
        return fn();
}
