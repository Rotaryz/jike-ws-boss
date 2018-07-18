import {tabMode} from 'common/js/constants'
import utils from 'common/js/utils'
const platform = utils.getPlatform()

const state = {
  tabMode: tabMode.show,
  platform // 平台信息
}

export default state
