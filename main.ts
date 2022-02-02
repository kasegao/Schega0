import { CacheDataProxy, FormPayload, FormPayloadProxy } from './cache'
import { BOT_TOKEN, SS_KEY } from './env'

const TOP_CONTENTS = [
  ['予定が埋まっているセルを塗りつぶしてください（セルの左端が開始時刻）'],
  ['埋まっている'],
  ['怪しい'],
  ['参加者'],
  ['日数'],
]

type Cell = {
  row: number
  col: number
}
const CELL_MEMBERS: Cell = {
  row: 4,
  col: 2,
}
const CELL_DAYS: Cell = {
  row: CELL_MEMBERS.row + 1,
  col: CELL_MEMBERS.col,
}
const CELL_ORIGIN: Cell = {
  row: 8,
  col: 1,
}

// insert new sheet
function newSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet_name = genRandomStr(12)
  const sheet = spreadsheet.insertSheet(sheet_name)
  const msgRange = sheet.getRange(1, 1)
  msgRange.setValue('現在シート作成中です。最大で3分程度かかります。')
  msgRange.setFontSize(24)
  msgRange.setFontWeight('bold')

  const ss_url = spreadsheet.getUrl()
  const sheet_id = sheet.getSheetId()
  const sheet_url = Utilities.formatString('%s#gid=%s', ss_url, sheet_id)

  return sheet_url
}

function genRandomStr(length: number) {
  const SOURCE = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += SOURCE[Math.floor(Math.random() * SOURCE.length)]
  }
  return result
}

// create sheet contents
function buildSheet() {
  // get input data
  const cache_key = 'hoge'
  const cache = getCacheData(cache_key)
  const result = cache.result

  // get sheet
  const spreadsheet = SpreadsheetApp.openById(SS_KEY)
  const sheet = spreadsheet.getSheetByName(cache.sheet_name)
  if (sheet == null) return

  // rename sheet
  const user_name = getUserName(result.user_id)
  sheet.setName(
    Utilities.formatString(
      '%s-%s_%s',
      user_name,
      Utilities.formatDate(new Date(), 'Asia/Tokyo', 'MM/dd'),
      genRandomStr(6),
    ),
  )

  const times = getTimes(result.time_begin, result.time_end, result.interval)
  const members = result.participants
    .map((v) => (v == result.user_id ? user_name : getUserName(v)))
    .filter(String)
}

type CacheData = {
  sheet_name: string
  result: ModalResult
}

function getCacheData(cache_key: string) {
  // TODO: get from cache
  const str_json =
    '{"sheet_name":"xxxxxx","result":{"type":"view_submission","team":{"id":"hoge","domain":"hogesya"},"user":{"id":"fuga","username":"kase.gao","name":"kase.gao","team_id":"hoge"},"api_app_id":"A02","token":"piyo","trigger_id":"123456789.123456789","view":{"id":"V1234567890","team_id":"hoge","type":"modal","blocks":[{"type":"section","block_id":"users","text":{"type":"mrkdwn","text":"参加者","verbatim":false},"accessory":{"type":"multi_conversations_select","action_id":"participants","placeholder":{"type":"plain_text","text":"participants","emoji":true},"filter":{"include":["im"],"exclude_bot_users":true}}},{"type":"section","block_id":"ou=","text":{"type":"plain_text","text":"日時設定","emoji":true}},{"type":"actions","block_id":"dates","elements":[{"type":"datepicker","action_id":"dp_start","placeholder":{"type":"plain_text","text":"Select a start date","emoji":true}},{"type":"static_select","action_id":"sp_days","placeholder":{"type":"plain_text","text":"Select a number of days","emoji":true},"initial_option":{"text":{"type":"plain_text","text":" 5 d","emoji":true},"value":"5"},"options":[{"text":{"type":"plain_text","text":" 1 d","emoji":true},"value":"1"},{"text":{"type":"plain_text","text":" 2 d","emoji":true},"value":"2"},{"text":{"type":"plain_text","text":" 3 d","emoji":true},"value":"3"},{"text":{"type":"plain_text","text":" 4 d","emoji":true},"value":"4"},{"text":{"type":"plain_text","text":" 5 d","emoji":true},"value":"5"},{"text":{"type":"plain_text","text":" 6 d","emoji":true},"value":"6"},{"text":{"type":"plain_text","text":" 7 d","emoji":true},"value":"7"},{"text":{"type":"plain_text","text":" 8 d","emoji":true},"value":"8"},{"text":{"type":"plain_text","text":" 9 d","emoji":true},"value":"9"},{"text":{"type":"plain_text","text":"10 d","emoji":true},"value":"10"},{"text":{"type":"plain_text","text":"11 d","emoji":true},"value":"11"},{"text":{"type":"plain_text","text":"12 d","emoji":true},"value":"12"},{"text":{"type":"plain_text","text":"13 d","emoji":true},"value":"13"},{"text":{"type":"plain_text","text":"14 d","emoji":true},"value":"14"},{"text":{"type":"plain_text","text":"15 d","emoji":true},"value":"15"},{"text":{"type":"plain_text","text":"16 d","emoji":true},"value":"16"},{"text":{"type":"plain_text","text":"17 d","emoji":true},"value":"17"},{"text":{"type":"plain_text","text":"18 d","emoji":true},"value":"18"},{"text":{"type":"plain_text","text":"19 d","emoji":true},"value":"19"},{"text":{"type":"plain_text","text":"20 d","emoji":true},"value":"20"}]}]},{"type":"actions","block_id":"times","elements":[{"type":"timepicker","action_id":"tp_begin","initial_time":"09:00","placeholder":{"type":"plain_text","text":"Select begin time","emoji":true}},{"type":"timepicker","action_id":"tp_end","initial_time":"17:00","placeholder":{"type":"plain_text","text":"Select end time","emoji":true}},{"type":"static_select","action_id":"sp_intervals","placeholder":{"type":"plain_text","text":"Select a number of days","emoji":true},"initial_option":{"text":{"type":"plain_text","text":"30 m","emoji":true},"value":"30"},"options":[{"text":{"type":"plain_text","text":"15 m","emoji":true},"value":"15"},{"text":{"type":"plain_text","text":"30 m","emoji":true},"value":"30"},{"text":{"type":"plain_text","text":"60 m","emoji":true},"value":"60"}]}]}],"private_metadata":"","callback_id":"","state":{"values":{"users":{"participants":{"type":"multi_conversations_select","selected_conversations":["id1","id2","id3"]}},"dates":{"dp_start":{"type":"datepicker","selected_date":"2022-02-08"},"sp_days":{"type":"static_select","selected_option":{"text":{"type":"plain_text","text":" 5 d","emoji":true},"value":"5"}}},"times":{"tp_begin":{"type":"timepicker","selected_time":"09:00"},"tp_end":{"type":"timepicker","selected_time":"17:00"},"sp_intervals":{"type":"static_select","selected_option":{"text":{"type":"plain_text","text":"30 m","emoji":true},"value":"30"}}}}},"hash":"aaa","title":{"type":"plain_text","text":"日程調整","emoji":true},"clear_on_close":false,"notify_on_close":false,"close":{"type":"plain_text","text":"Cancel","emoji":true},"submit":{"type":"plain_text","text":"Submit","emoji":true},"previous_view_id":null,"root_view_id":"V1234567890","app_id":"A02","external_id":"","app_installed_team_id":"hoge","bot_id":"B00"},"response_urls":[],"is_enterprise_install":false,"enterprise":null}}'
  const cache = CacheDataProxy.Parse(str_json)
  const data: CacheData = {
    sheet_name: cache.sheet_name,
    result: intoModalResult(cache.result),
  }
  return data
}

type ModalResult = {
  user_id: string
  participants: string[]
  day_begin: string
  len_days: number
  time_begin: string
  time_end: string
  interval: number // minute
}

function intoModalResult(payload: FormPayload) {
  const user_id = payload.user.id
  const values = payload.view.state.values
  const conversations = values.users.participants.selected_conversations
  const participants = conversations == null ? [user_id] : conversations
  if (!participants.includes(user_id)) participants.push(user_id)

  const result: ModalResult = {
    user_id: payload.user.id,
    participants: participants,
    day_begin: values.dates.dp_start.selected_date,
    len_days: parseInt(values.dates.sp_days.selected_option.value),
    time_begin: values.times.tp_begin.selected_time,
    time_end: values.times.tp_end.selected_time,
    interval: parseInt(values.times.sp_intervals.selected_option.value),
  }
  return result
}

function time2minute(time: string) {
  const times = time.split(':')
  const hour = parseInt(times[0])
  const minute = parseInt(times[1])
  return hour * 60 + minute
}

function minute2time(minute: number) {
  const hour = Math.floor(minute / 60)
  const min = minute % 60
  return `'${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`
}

function getTimes(time_begin: string, time_end: string, interval: number) {
  const begin = time2minute(time_begin)
  const end = time2minute(time_end)
  const length = Math.ceil((end - begin) / interval)
  const initial = Math.floor(begin / interval) * interval
  console.log(`begin: ${begin}\tend: ${end}\tinterval: ${interval}`)
  const times = Array(...new Array(length)).map(function (_, i) {
    return minute2time(initial + i * interval)
  })
  return times
}

function getUserName(user_id: string) {
  try {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      payload: {
        token: BOT_TOKEN,
        user: user_id,
      },
    }

    const url = 'https://slack.com/api/users.info'
    const response = UrlFetchApp.fetch(url, options)
    const userinfo = JSON.parse(response.getContentText('UTF-8'))
    if (!userinfo.ok) {
      return ''
    }
    return userinfo.user.profile.display_name as string
  } catch (e) {
    return ''
  }
}

function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
  const range = e.range
  return range.getColumn
}

const cache = getCacheData('')
const result = cache.result
console.log(result)

const times = getTimes(result.time_begin, result.time_end, result.interval)
console.log(times)
