import request from '@/http/axios'

export function getTypeValue(code) {
    var data = {
        'locale': this.$i18n.locale,
        'code': code
    }
    return request.post('/dict/findByCode',data);
}
//多参数接口
export function getTypeValues(code) {
    var data = {
        'locale': this.$i18n.locale,
        'code':code
    }
    return request.post('/dict/findByCodes',data);
}
//回显类型名称
export function resolveRoomTypeName(dataArr,code) {
    let ret = ''
    if(dataArr instanceof Array){
        dataArr.forEach( t =>{
            if(t.code === code){
                return ret = t.name;
            }
        })
    }
    return ret;
}

