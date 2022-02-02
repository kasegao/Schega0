export interface FormPayload {
  user: User
  api_app_id: string
  token: string
  trigger_id: string
  view: View
  response_urls?: null[] | null
}
export interface User {
  id: string
  username: string
}
export interface View {
  state: State
}
export interface PlaceholderOrTextOrTitleOrCloseOrSubmit {
  type: string
  text: string
  emoji: boolean
}
export interface OptionsEntityOrInitialOptionOrSelectedOption1 {
  text: PlaceholderOrTextOrTitleOrCloseOrSubmit
  value: string
}
export interface State {
  values: Values
}
export interface Values {
  users: Users
  dates: Dates
  times: Times
}
export interface Users {
  participants: Participants
}
export interface Participants {
  type: string
  selected_conversations?: string[] | null
}
export interface Dates {
  dp_start: DpStart
  sp_days: SpDaysOrSpIntervals
}
export interface DpStart {
  type: string
  selected_date: string
}
export interface SpDaysOrSpIntervals {
  type: string
  selected_option: OptionsEntityOrInitialOptionOrSelectedOption1
}
export interface Times {
  tp_begin: TpBeginOrTpEnd
  tp_end: TpBeginOrTpEnd
  sp_intervals: SpDaysOrSpIntervals
}
export interface TpBeginOrTpEnd {
  type: string
  selected_time: string
}

// Stores the currently-being-typechecked object for error messages.
let obj: any = null
export class FormPayloadProxy {
  public readonly user: UserProxy
  public readonly api_app_id: string
  public readonly token: string
  public readonly trigger_id: string
  public readonly view: ViewProxy
  public readonly response_urls: null[] | null
  public static Parse(d: string): FormPayloadProxy {
    return FormPayloadProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): FormPayloadProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    d.user = UserProxy.Create(d.user, field + '.user')
    checkString(d.api_app_id, false, field + '.api_app_id')
    checkString(d.token, false, field + '.token')
    checkString(d.trigger_id, false, field + '.trigger_id')
    d.view = ViewProxy.Create(d.view, field + '.view')
    checkArray(d.response_urls, field + '.response_urls')
    if (d.response_urls) {
      for (let i = 0; i < d.response_urls.length; i++) {
        checkNull(d.response_urls[i], field + '.response_urls' + '[' + i + ']')
        if (d.response_urls[i] === undefined) {
          d.response_urls[i] = null
        }
      }
    }
    if (d.response_urls === undefined) {
      d.response_urls = null
    }
    return new FormPayloadProxy(d)
  }
  private constructor(d: any) {
    this.user = d.user
    this.api_app_id = d.api_app_id
    this.token = d.token
    this.trigger_id = d.trigger_id
    this.view = d.view
    this.response_urls = d.response_urls
  }
}

export class UserProxy {
  public readonly id: string
  public readonly username: string
  public static Parse(d: string): UserProxy {
    return UserProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): UserProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    checkString(d.id, false, field + '.id')
    checkString(d.username, false, field + '.username')
    return new UserProxy(d)
  }
  private constructor(d: any) {
    this.id = d.id
    this.username = d.username
  }
}

export class ViewProxy {
  public readonly state: StateProxy
  public static Parse(d: string): ViewProxy {
    return ViewProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): ViewProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    d.state = StateProxy.Create(d.state, field + '.state')
    return new ViewProxy(d)
  }
  private constructor(d: any) {
    this.state = d.state
  }
}

export class PlaceholderOrTextOrTitleOrCloseOrSubmitProxy {
  public readonly type: string
  public readonly text: string
  public readonly emoji: boolean
  public static Parse(d: string): PlaceholderOrTextOrTitleOrCloseOrSubmitProxy {
    return PlaceholderOrTextOrTitleOrCloseOrSubmitProxy.Create(JSON.parse(d))
  }
  public static Create(
    d: any,
    field = 'root',
  ): PlaceholderOrTextOrTitleOrCloseOrSubmitProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    checkString(d.type, false, field + '.type')
    checkString(d.text, false, field + '.text')
    checkBoolean(d.emoji, false, field + '.emoji')
    return new PlaceholderOrTextOrTitleOrCloseOrSubmitProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.text = d.text
    this.emoji = d.emoji
  }
}

export class OptionsEntityOrInitialOptionOrSelectedOption1Proxy {
  public readonly text: PlaceholderOrTextOrTitleOrCloseOrSubmitProxy
  public readonly value: string
  public static Parse(
    d: string,
  ): OptionsEntityOrInitialOptionOrSelectedOption1Proxy {
    return OptionsEntityOrInitialOptionOrSelectedOption1Proxy.Create(
      JSON.parse(d),
    )
  }
  public static Create(
    d: any,
    field = 'root',
  ): OptionsEntityOrInitialOptionOrSelectedOption1Proxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    d.text = PlaceholderOrTextOrTitleOrCloseOrSubmitProxy.Create(
      d.text,
      field + '.text',
    )
    checkString(d.value, false, field + '.value')
    return new OptionsEntityOrInitialOptionOrSelectedOption1Proxy(d)
  }
  private constructor(d: any) {
    this.text = d.text
    this.value = d.value
  }
}

export class StateProxy {
  public readonly values: ValuesProxy
  public static Parse(d: string): StateProxy {
    return StateProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): StateProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    d.values = ValuesProxy.Create(d.values, field + '.values')
    return new StateProxy(d)
  }
  private constructor(d: any) {
    this.values = d.values
  }
}

export class ValuesProxy {
  public readonly users: UsersProxy
  public readonly dates: DatesProxy
  public readonly times: TimesProxy
  public static Parse(d: string): ValuesProxy {
    return ValuesProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): ValuesProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    d.users = UsersProxy.Create(d.users, field + '.users')
    d.dates = DatesProxy.Create(d.dates, field + '.dates')
    d.times = TimesProxy.Create(d.times, field + '.times')
    return new ValuesProxy(d)
  }
  private constructor(d: any) {
    this.users = d.users
    this.dates = d.dates
    this.times = d.times
  }
}

export class UsersProxy {
  public readonly participants: ParticipantsProxy
  public static Parse(d: string): UsersProxy {
    return UsersProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): UsersProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    d.participants = ParticipantsProxy.Create(
      d.participants,
      field + '.participants',
    )
    return new UsersProxy(d)
  }
  private constructor(d: any) {
    this.participants = d.participants
  }
}

export class ParticipantsProxy {
  public readonly type: string
  public readonly selected_conversations: string[] | null
  public static Parse(d: string): ParticipantsProxy {
    return ParticipantsProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): ParticipantsProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    checkString(d.type, false, field + '.type')
    checkArray(d.selected_conversations, field + '.selected_conversations')
    if (d.selected_conversations) {
      for (let i = 0; i < d.selected_conversations.length; i++) {
        checkString(
          d.selected_conversations[i],
          false,
          field + '.selected_conversations' + '[' + i + ']',
        )
      }
    }
    if (d.selected_conversations === undefined) {
      d.selected_conversations = null
    }
    return new ParticipantsProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.selected_conversations = d.selected_conversations
  }
}

export class DatesProxy {
  public readonly dp_start: DpStartProxy
  public readonly sp_days: SpDaysOrSpIntervalsProxy
  public static Parse(d: string): DatesProxy {
    return DatesProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): DatesProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    d.dp_start = DpStartProxy.Create(d.dp_start, field + '.dp_start')
    d.sp_days = SpDaysOrSpIntervalsProxy.Create(d.sp_days, field + '.sp_days')
    return new DatesProxy(d)
  }
  private constructor(d: any) {
    this.dp_start = d.dp_start
    this.sp_days = d.sp_days
  }
}

export class DpStartProxy {
  public readonly type: string
  public readonly selected_date: string
  public static Parse(d: string): DpStartProxy {
    return DpStartProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): DpStartProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    checkString(d.type, false, field + '.type')
    checkString(d.selected_date, false, field + '.selected_date')
    return new DpStartProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.selected_date = d.selected_date
  }
}

export class SpDaysOrSpIntervalsProxy {
  public readonly type: string
  public readonly selected_option: OptionsEntityOrInitialOptionOrSelectedOption1Proxy
  public static Parse(d: string): SpDaysOrSpIntervalsProxy {
    return SpDaysOrSpIntervalsProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): SpDaysOrSpIntervalsProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    checkString(d.type, false, field + '.type')
    d.selected_option =
      OptionsEntityOrInitialOptionOrSelectedOption1Proxy.Create(
        d.selected_option,
        field + '.selected_option',
      )
    return new SpDaysOrSpIntervalsProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.selected_option = d.selected_option
  }
}

export class TimesProxy {
  public readonly tp_begin: TpBeginOrTpEndProxy
  public readonly tp_end: TpBeginOrTpEndProxy
  public readonly sp_intervals: SpDaysOrSpIntervalsProxy
  public static Parse(d: string): TimesProxy {
    return TimesProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): TimesProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    d.tp_begin = TpBeginOrTpEndProxy.Create(d.tp_begin, field + '.tp_begin')
    d.tp_end = TpBeginOrTpEndProxy.Create(d.tp_end, field + '.tp_end')
    d.sp_intervals = SpDaysOrSpIntervalsProxy.Create(
      d.sp_intervals,
      field + '.sp_intervals',
    )
    return new TimesProxy(d)
  }
  private constructor(d: any) {
    this.tp_begin = d.tp_begin
    this.tp_end = d.tp_end
    this.sp_intervals = d.sp_intervals
  }
}

export class TpBeginOrTpEndProxy {
  public readonly type: string
  public readonly selected_time: string
  public static Parse(d: string): TpBeginOrTpEndProxy {
    return TpBeginOrTpEndProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): TpBeginOrTpEndProxy {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d)
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false)
    }
    checkString(d.type, false, field + '.type')
    checkString(d.selected_time, false, field + '.selected_time')
    return new TpBeginOrTpEndProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.selected_time = d.selected_time
  }
}

function throwNull2NonNull(field: string, d: any): never {
  return errorHelper(field, d, 'non-nullable object', false)
}
function throwNotObject(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, 'object', nullable)
}
function throwIsArray(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, 'object', nullable)
}
function checkArray(d: any, field: string): void {
  if (!Array.isArray(d) && d !== null && d !== undefined) {
    errorHelper(field, d, 'array', true)
  }
}
function checkBoolean(d: any, nullable: boolean, field: string): void {
  if (
    typeof d !== 'boolean' &&
    (!nullable || (nullable && d !== null && d !== undefined))
  ) {
    errorHelper(field, d, 'boolean', nullable)
  }
}
function checkString(d: any, nullable: boolean, field: string): void {
  if (
    typeof d !== 'string' &&
    (!nullable || (nullable && d !== null && d !== undefined))
  ) {
    errorHelper(field, d, 'string', nullable)
  }
}
function checkNull(d: any, field: string): void {
  if (d !== null && d !== undefined) {
    errorHelper(field, d, 'null or undefined', false)
  }
}
function errorHelper(
  field: string,
  d: any,
  type: string,
  nullable: boolean,
): never {
  if (nullable) {
    type += ', null, or undefined'
  }
  throw new TypeError(
    'Expected ' +
      type +
      ' at ' +
      field +
      ' but found:\n' +
      JSON.stringify(d) +
      '\n\nFull object:\n' +
      JSON.stringify(obj),
  )
}
