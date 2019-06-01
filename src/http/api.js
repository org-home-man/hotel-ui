/*
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as dept from './moudules/dept'
import * as role from './moudules/role'
import * as menu from './moudules/menu'
import * as dict from './moudules/dict'
import * as log from './moudules/log'
import * as bizRoom from './moudules/bizRoom'
import * as bizHotl from './moudules/bizHotl'
import * as hotelArea from './moudules/hotelArea'
import * as sysParaConfig from './moudules/sysParaConfig'
import * as hotelRoom from './moudules/hotelRoom'
import * as bizPuchs from './moudules/bizPuchs'
import * as socketMess from './moudules/message'

// 默认全部导出
export default {
    login,
    user,
    dept,
    role,
    menu,
    dict,
    log,
    bizRoom,
    bizHotl,
    sysParaConfig,
    hotelArea,
    hotelRoom,
    bizPuchs,
    socketMess
}
