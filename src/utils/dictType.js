import request from '@/http/axios'

export function getTypeValue(code) {
    var data = {
        'locale': this.$i18n.locale
    }
    return request.post('/dict/findByCode/'+code,data);
}
