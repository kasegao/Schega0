import { FormPayload } from './cache'
import { Config } from './env'

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
const CELL_MEMB_EDIT: Cell = {
  row: 4,
  col: 2,
}
const CELL_DAYS_EDIT: Cell = {
  row: CELL_MEMB_EDIT.row + 1,
  col: CELL_MEMB_EDIT.col,
}
const CELL_FRM_ORIGIN: Cell = {
  row: 8,
  col: 1,
}
const TRANSPOSE = (a: string[][]) => a[0].map((_, c) => a.map((r) => r[c]))
const config = new Config()

// insert new sheet
type NewSheetReturn = {
  sheet_name: string
  sheet_url: string
}

export function newSheet() {
  const spreadsheet = SpreadsheetApp.openById(config.ss_key())
  const sheet_name = genRandomStr(12)
  const sheet = spreadsheet.insertSheet(sheet_name)
  const msgRange = sheet.getRange(1, 1)
  msgRange.setValue('現在シート作成中です。最大で3分程度かかります。')
  msgRange.setFontSize(24)
  msgRange.setFontWeight('bold')

  const ss_url = spreadsheet.getUrl()
  const sheet_id = sheet.getSheetId()
  const sheet_url = `${ss_url}#gid=${sheet_id}`

  const ret: NewSheetReturn = {
    sheet_name: sheet_name,
    sheet_url: sheet_url,
  }
  return ret
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
export function buildSheet(cache_data: CacheData) {
  // get input data
  const result = cache_data.result

  // get sheet
  const spreadsheet = SpreadsheetApp.openById(config.ss_key())
  const sheet = spreadsheet.getSheetByName(cache_data.sheet_name)
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

  // get options
  const times = getTimes(result.time_begin, result.time_end, result.interval)
  const members = result.participants
    .map((v) => (v == result.user_id ? user_name : getUserName(v)))
    .filter(String)

  // build frames
  initSheet(sheet, times.length)
  generateFrames(sheet, members, times, result.len_days)
}

type CacheData = {
  sheet_name: string
  result: ModalResult
}

export function createCacheData(sheet_name: string, payload: FormPayload) {
  const data: CacheData = {
    sheet_name: sheet_name,
    result: fromPayload(payload),
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

function fromPayload(payload: FormPayload) {
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
        token: config.bot_token(),
        user: user_id,
      },
    }

    const url = 'https://slack.com/api/users.info'
    const response = UrlFetchApp.fetch(url, options)
    const userinfo = JSON.parse(response.getContentText('UTF-8'))
    if (!userinfo.ok) {
      return ''
    }
    const profile = userinfo.user.profile
    const display_name = profile.display_name
    const real_name = profile.real_name
    const user_name = display_name || real_name || user_id
    return user_name as string
  } catch (e) {
    return ''
  }
}

function initSheet(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  len_times: number,
) {
  sheet.clear()

  const numColumns = sheet.getMaxColumns()
  if (numColumns < 2 + len_times) {
    sheet.insertColumnsAfter(numColumns - 1, 2 + len_times - numColumns)
  }
  sheet.setColumnWidth(1, 160)
  sheet.setColumnWidth(2 + len_times, 300)
  sheet.setColumnWidths(2, len_times, 46)
}

function generateFrames(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  members: string[],
  times: string[],
  len_days: number,
) {
  const rowNames2d = [members]
  setConsts(sheet, len_days)
  sheet.setFrozenRows(3)
  setMembers(sheet, rowNames2d[0])

  const colNames = TRANSPOSE(rowNames2d)
  for (let i = 0; i < len_days; i++) {
    const row = CELL_FRM_ORIGIN.row + i * (colNames.length + 1 + 2)
    setFrame(sheet, row, colNames.length + 1, times.length)
    setTitles(sheet, row, i, times)
    setColNames(sheet, row + 1, colNames)
  }
  const today = new Date()
  sheet
    .getRange(CELL_FRM_ORIGIN.row, CELL_FRM_ORIGIN.col)
    .setValue(Utilities.formatDate(today, 'Asia/Tokyo', 'MM/dd'))
}

function setConsts(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  len_days: number,
) {
  const constRange = sheet.getRange(
    1,
    1,
    TOP_CONTENTS.length,
    TOP_CONTENTS[0].length,
  )
  constRange.setValues(TOP_CONTENTS)
  constRange.setFontSize(12)
  constRange.setVerticalAlignment('top')
  sheet.getRange(2, 2, 1, 2).setBackground('#ea4335')
  sheet.getRange(3, 2, 1, 2).setBackground('#fbbc04')
  const boldRanges = sheet.getRangeList(['A1', 'A4:A5'])
  boldRanges.setFontWeight('bold')

  const daysCell = sheet.getRange(CELL_DAYS_EDIT.row, CELL_DAYS_EDIT.col)
  daysCell.setValue(len_days)
  const daysRule = SpreadsheetApp.newDataValidation()
    .requireNumberBetween(1, 20)
    .setAllowInvalid(false)
    .setHelpText('Number must be between 1 and 20.')
    .build()
  daysCell.setDataValidation(daysRule)
}

function getMembers(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  return sheet
    .getRange(CELL_MEMB_EDIT.row, CELL_MEMB_EDIT.col)
    .getValue()
    .split('\n')
}

function setMembers(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  members: string[],
) {
  sheet
    .getRange(CELL_MEMB_EDIT.row, CELL_MEMB_EDIT.col)
    .setValue(members.join('\n'))
}

// start_row: 1-indexed
function setFrame(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  start_row: number,
  num_rows: number,
  len_times: number,
) {
  const numColumns = len_times + 2
  const frame = sheet.getRange(start_row, 1, num_rows, numColumns)
  const solidRanges = sheet.getRangeList([
    sheet.getRange(start_row, 1, num_rows, 1).getA1Notation(),
    sheet.getRange(start_row, 1, 1, numColumns).getA1Notation(),
    sheet.getRange(start_row, numColumns, num_rows, 1).getA1Notation(),
  ])
  // range.setBorder(top, left, bottom, right, vertical, horizontal, color, style)
  frame.setBorder(
    false,
    false,
    false,
    false,
    true,
    true,
    null,
    SpreadsheetApp.BorderStyle.DASHED,
  )
  solidRanges.setBorder(
    true,
    true,
    true,
    true,
    null,
    null,
    null,
    SpreadsheetApp.BorderStyle.SOLID,
  )
  frame.setBorder(
    true,
    true,
    true,
    true,
    null,
    null,
    null,
    SpreadsheetApp.BorderStyle.SOLID_THICK,
  )
}

// row: 1-indexed
function setTitles(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  row: number,
  add_date: number,
  times: string[],
) {
  const titles = [[`=A${CELL_FRM_ORIGIN.row} + ${add_date}`]]
  Array.prototype.push.apply(titles[0], times)
  const numColumns = titles[0].push('備考')
  const titleRange = sheet.getRange(row, 1, 1, numColumns)
  titleRange.setHorizontalAlignment('center')
  titleRange.setVerticalAlignment('middle')
  const boldRanges = sheet.getRangeList([
    sheet.getRange(row, 1).getA1Notation(),
    sheet.getRange(row, numColumns).getA1Notation(),
  ])
  boldRanges.setFontWeight('bold')
  boldRanges.setFontSize(12)
  titleRange.setValues(titles)
}

// row: 1-indexed
function setColNames(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  start_row: number,
  col_names: string[][],
) {
  sheet.getRange(start_row, 1, col_names.length, 1).setValues(col_names)
}

function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
  const range = e.range
  return range.getColumn
}

export function makeCache() {
  const cache = CacheService.getScriptCache()
  return {
    get: function (key: string) {
      const str_json = cache.get(key) ?? '{}'
      const cache_data: CacheData = JSON.parse(str_json)
      return cache_data
    },
    put: function (key: string, value: CacheData, sec: number) {
      cache.put(key, JSON.stringify(value), sec == null ? 600 : sec)
      return value
    },
  }
}

// import/export not working on gas
export class Main {
  public newSheet = () => newSheet()
  public createCacheData = (sheet_name: string, payload: FormPayload) =>
    createCacheData(sheet_name, payload)
  public fromPayload = (payload: FormPayload) => fromPayload(payload)
  public buildSheet = (cache_data: CacheData) => buildSheet(cache_data)
  public makeCache = () => makeCache()
}
