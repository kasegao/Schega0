import { Main } from './main'
import { FormPayloadProxy } from './cache'

const main = new Main()

function _testGenCacheData(sheet_name: string) {
  const str_json =
    '{"type":"view_submission","team":{"id":"hoge","domain":"hogesya"},"user":{"id":"fuga","username":"kase.gao","name":"kase.gao","team_id":"hoge"},"api_app_id":"A02","token":"piyo","trigger_id":"123456789.123456789","view":{"id":"V1234567890","team_id":"hoge","type":"modal","blocks":[{"type":"section","block_id":"users","text":{"type":"mrkdwn","text":"参加者","verbatim":false},"accessory":{"type":"multi_conversations_select","action_id":"participants","placeholder":{"type":"plain_text","text":"participants","emoji":true},"filter":{"include":["im"],"exclude_bot_users":true}}},{"type":"section","block_id":"ou=","text":{"type":"plain_text","text":"日時設定","emoji":true}},{"type":"actions","block_id":"dates","elements":[{"type":"datepicker","action_id":"dp_start","placeholder":{"type":"plain_text","text":"Select a start date","emoji":true}},{"type":"static_select","action_id":"sp_days","placeholder":{"type":"plain_text","text":"Select a number of days","emoji":true},"initial_option":{"text":{"type":"plain_text","text":" 5 d","emoji":true},"value":"5"},"options":[{"text":{"type":"plain_text","text":" 1 d","emoji":true},"value":"1"},{"text":{"type":"plain_text","text":" 2 d","emoji":true},"value":"2"},{"text":{"type":"plain_text","text":" 3 d","emoji":true},"value":"3"},{"text":{"type":"plain_text","text":" 4 d","emoji":true},"value":"4"},{"text":{"type":"plain_text","text":" 5 d","emoji":true},"value":"5"},{"text":{"type":"plain_text","text":" 6 d","emoji":true},"value":"6"},{"text":{"type":"plain_text","text":" 7 d","emoji":true},"value":"7"},{"text":{"type":"plain_text","text":" 8 d","emoji":true},"value":"8"},{"text":{"type":"plain_text","text":" 9 d","emoji":true},"value":"9"},{"text":{"type":"plain_text","text":"10 d","emoji":true},"value":"10"},{"text":{"type":"plain_text","text":"11 d","emoji":true},"value":"11"},{"text":{"type":"plain_text","text":"12 d","emoji":true},"value":"12"},{"text":{"type":"plain_text","text":"13 d","emoji":true},"value":"13"},{"text":{"type":"plain_text","text":"14 d","emoji":true},"value":"14"},{"text":{"type":"plain_text","text":"15 d","emoji":true},"value":"15"},{"text":{"type":"plain_text","text":"16 d","emoji":true},"value":"16"},{"text":{"type":"plain_text","text":"17 d","emoji":true},"value":"17"},{"text":{"type":"plain_text","text":"18 d","emoji":true},"value":"18"},{"text":{"type":"plain_text","text":"19 d","emoji":true},"value":"19"},{"text":{"type":"plain_text","text":"20 d","emoji":true},"value":"20"}]}]},{"type":"actions","block_id":"times","elements":[{"type":"timepicker","action_id":"tp_begin","initial_time":"09:00","placeholder":{"type":"plain_text","text":"Select begin time","emoji":true}},{"type":"timepicker","action_id":"tp_end","initial_time":"17:00","placeholder":{"type":"plain_text","text":"Select end time","emoji":true}},{"type":"static_select","action_id":"sp_intervals","placeholder":{"type":"plain_text","text":"Select a number of days","emoji":true},"initial_option":{"text":{"type":"plain_text","text":"30 m","emoji":true},"value":"30"},"options":[{"text":{"type":"plain_text","text":"15 m","emoji":true},"value":"15"},{"text":{"type":"plain_text","text":"30 m","emoji":true},"value":"30"},{"text":{"type":"plain_text","text":"60 m","emoji":true},"value":"60"}]}]}],"private_metadata":"","callback_id":"","state":{"values":{"users":{"participants":{"type":"multi_conversations_select","selected_conversations":["id1","id2","id3"]}},"dates":{"dp_start":{"type":"datepicker","selected_date":"2022-02-08"},"sp_days":{"type":"static_select","selected_option":{"text":{"type":"plain_text","text":" 5 d","emoji":true},"value":"5"}}},"times":{"tp_begin":{"type":"timepicker","selected_time":"09:00"},"tp_end":{"type":"timepicker","selected_time":"17:00"},"sp_intervals":{"type":"static_select","selected_option":{"text":{"type":"plain_text","text":"30 m","emoji":true},"value":"30"}}}}},"hash":"aaa","title":{"type":"plain_text","text":"日程調整","emoji":true},"clear_on_close":false,"notify_on_close":false,"close":{"type":"plain_text","text":"Cancel","emoji":true},"submit":{"type":"plain_text","text":"Submit","emoji":true},"previous_view_id":null,"root_view_id":"V1234567890","app_id":"A02","external_id":"","app_installed_team_id":"hoge","bot_id":"B00"},"response_urls":[],"is_enterprise_install":false,"enterprise":null}'
  const payload = FormPayloadProxy.Parse(str_json)
  const cache_data = main.createCacheData(sheet_name, payload)
  return cache_data
}

function _testIsObject(obj: any) {
  return obj != null && typeof obj === 'object'
}

function _testDeepEqual(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    const val1 = obj1[key]
    const val2 = obj2[key]
    const areObjects = _testIsObject(val1) && _testIsObject(val2)
    if (
      (areObjects && !_testDeepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false
    }
  }
  return true
}

function testGenSheet() {
  const ret = main.newSheet()
  console.log(`NewSheet: ${ret.sheet_url}`)

  const cache_data = _testGenCacheData(ret.sheet_name)
  console.log(`CacheData: ${cache_data}`)

  main.buildSheet(cache_data)
  console.log('build sheet')
}

function testCache() {
  const sheet_name = 'testCache'
  const write_data = _testGenCacheData(sheet_name)

  const cache_key = 'testCache'
  const cache = main.makeCache()
  cache.put(cache_key, write_data, 300)

  const read_data = cache.get(cache_key)
  const check = _testDeepEqual(write_data, read_data)
  console.log(`Check: ${check}`)
}
