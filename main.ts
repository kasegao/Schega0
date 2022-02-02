const TIMES = [
  "'10:00",
  "'10:30",
  "'11:00",
  "'11:30",
  "'12:00",
  "'12:30",
  "'13:00",
  "'13:30",
  "'14:00",
  "'14:30",
  "'15:00",
  "'15:30",
  "'16:00",
  "'16:30",
  "'17:00",
  "'17:30",
  "'18:00",
  "'18:30",
  "'19:00",
  "'19:30",
  "'20:00",
  "'20:30",
  "'21:00",
  "'21:30",
  "'22:00",
]
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

type Configs = {
  days: number
  interval: number
  begin: string
  end: string
}

const defaultConfigs: Configs = {
  days: 5,
  interval: 30,
  begin: '08:00',
  end: '20:00',
}

function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
  const range = e.range
  return range.getColumn
}
