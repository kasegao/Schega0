export interface FormPayload {
  type: string
  team: Team
  user: User
  api_app_id: string
  token: string
  trigger_id: string
  view: View
  response_urls?: null[] | null
  is_enterprise_install: boolean
  enterprise?: null
}
export interface Team {
  id: string
  domain: string
}
export interface User {
  id: string
  username: string
  name: string
  team_id: string
}
export interface View {
  id: string
  team_id: string
  type: string
  blocks?: BlocksEntity[] | null
  private_metadata: string
  callback_id: string
  state: State
  hash: string
  title: PlaceholderOrTextOrTitleOrCloseOrSubmit
  clear_on_close: boolean
  notify_on_close: boolean
  close: PlaceholderOrTextOrTitleOrCloseOrSubmit
  submit: PlaceholderOrTextOrTitleOrCloseOrSubmit
  previous_view_id?: null
  root_view_id: string
  app_id: string
  external_id: string
  app_installed_team_id: string
  bot_id: string
}
export interface BlocksEntity {
  type: string
  block_id: string
  text?: Text | null
  accessory?: Accessory | null
  elements?: ElementsEntity[] | null
}
export interface Text {
  type: string
  text: string
  verbatim?: boolean | null
  emoji?: boolean | null
}
export interface Accessory {
  type: string
  action_id: string
  placeholder: PlaceholderOrTextOrTitleOrCloseOrSubmit
  filter: Filter
}
export interface PlaceholderOrTextOrTitleOrCloseOrSubmit {
  type: string
  text: string
  emoji: boolean
}
export interface Filter {
  include?: string[] | null
  exclude_bot_users: boolean
}
export interface ElementsEntity {
  type: string
  action_id: string
  initial_time?: string | null
  placeholder: PlaceholderOrTextOrTitleOrCloseOrSubmit
  initial_option?: OptionsEntityOrInitialOptionOrSelectedOption | null
  options?: OptionsEntityOrInitialOptionOrSelectedOption1[] | null
}
export interface OptionsEntityOrInitialOptionOrSelectedOption {
  text: PlaceholderOrTextOrTitleOrCloseOrSubmit
  value: string
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
  public readonly type: string
  public readonly team: TeamProxy
  public readonly user: UserProxy
  public readonly api_app_id: string
  public readonly token: string
  public readonly trigger_id: string
  public readonly view: ViewProxy
  public readonly response_urls: null[] | null
  public readonly is_enterprise_install: boolean
  public readonly enterprise: null
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
    checkString(d.type, false, field + '.type')
    d.team = TeamProxy.Create(d.team, field + '.team')
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
    checkBoolean(
      d.is_enterprise_install,
      false,
      field + '.is_enterprise_install',
    )
    checkNull(d.enterprise, field + '.enterprise')
    if (d.enterprise === undefined) {
      d.enterprise = null
    }
    return new FormPayloadProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.team = d.team
    this.user = d.user
    this.api_app_id = d.api_app_id
    this.token = d.token
    this.trigger_id = d.trigger_id
    this.view = d.view
    this.response_urls = d.response_urls
    this.is_enterprise_install = d.is_enterprise_install
    this.enterprise = d.enterprise
  }
}

export class TeamProxy {
  public readonly id: string
  public readonly domain: string
  public static Parse(d: string): TeamProxy {
    return TeamProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): TeamProxy {
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
    checkString(d.domain, false, field + '.domain')
    return new TeamProxy(d)
  }
  private constructor(d: any) {
    this.id = d.id
    this.domain = d.domain
  }
}

export class UserProxy {
  public readonly id: string
  public readonly username: string
  public readonly name: string
  public readonly team_id: string
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
    checkString(d.name, false, field + '.name')
    checkString(d.team_id, false, field + '.team_id')
    return new UserProxy(d)
  }
  private constructor(d: any) {
    this.id = d.id
    this.username = d.username
    this.name = d.name
    this.team_id = d.team_id
  }
}

export class ViewProxy {
  public readonly id: string
  public readonly team_id: string
  public readonly type: string
  public readonly blocks: BlocksEntityProxy[] | null
  public readonly private_metadata: string
  public readonly callback_id: string
  public readonly state: StateProxy
  public readonly hash: string
  public readonly title: PlaceholderOrTextOrTitleOrCloseOrSubmitProxy
  public readonly clear_on_close: boolean
  public readonly notify_on_close: boolean
  public readonly close: PlaceholderOrTextOrTitleOrCloseOrSubmitProxy
  public readonly submit: PlaceholderOrTextOrTitleOrCloseOrSubmitProxy
  public readonly previous_view_id: null
  public readonly root_view_id: string
  public readonly app_id: string
  public readonly external_id: string
  public readonly app_installed_team_id: string
  public readonly bot_id: string
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
    checkString(d.id, false, field + '.id')
    checkString(d.team_id, false, field + '.team_id')
    checkString(d.type, false, field + '.type')
    checkArray(d.blocks, field + '.blocks')
    if (d.blocks) {
      for (let i = 0; i < d.blocks.length; i++) {
        d.blocks[i] = BlocksEntityProxy.Create(
          d.blocks[i],
          field + '.blocks' + '[' + i + ']',
        )
      }
    }
    if (d.blocks === undefined) {
      d.blocks = null
    }
    checkString(d.private_metadata, false, field + '.private_metadata')
    checkString(d.callback_id, false, field + '.callback_id')
    d.state = StateProxy.Create(d.state, field + '.state')
    checkString(d.hash, false, field + '.hash')
    d.title = PlaceholderOrTextOrTitleOrCloseOrSubmitProxy.Create(
      d.title,
      field + '.title',
    )
    checkBoolean(d.clear_on_close, false, field + '.clear_on_close')
    checkBoolean(d.notify_on_close, false, field + '.notify_on_close')
    d.close = PlaceholderOrTextOrTitleOrCloseOrSubmitProxy.Create(
      d.close,
      field + '.close',
    )
    d.submit = PlaceholderOrTextOrTitleOrCloseOrSubmitProxy.Create(
      d.submit,
      field + '.submit',
    )
    checkNull(d.previous_view_id, field + '.previous_view_id')
    if (d.previous_view_id === undefined) {
      d.previous_view_id = null
    }
    checkString(d.root_view_id, false, field + '.root_view_id')
    checkString(d.app_id, false, field + '.app_id')
    checkString(d.external_id, false, field + '.external_id')
    checkString(
      d.app_installed_team_id,
      false,
      field + '.app_installed_team_id',
    )
    checkString(d.bot_id, false, field + '.bot_id')
    return new ViewProxy(d)
  }
  private constructor(d: any) {
    this.id = d.id
    this.team_id = d.team_id
    this.type = d.type
    this.blocks = d.blocks
    this.private_metadata = d.private_metadata
    this.callback_id = d.callback_id
    this.state = d.state
    this.hash = d.hash
    this.title = d.title
    this.clear_on_close = d.clear_on_close
    this.notify_on_close = d.notify_on_close
    this.close = d.close
    this.submit = d.submit
    this.previous_view_id = d.previous_view_id
    this.root_view_id = d.root_view_id
    this.app_id = d.app_id
    this.external_id = d.external_id
    this.app_installed_team_id = d.app_installed_team_id
    this.bot_id = d.bot_id
  }
}

export class BlocksEntityProxy {
  public readonly type: string
  public readonly block_id: string
  public readonly text: TextProxy | null
  public readonly accessory: AccessoryProxy | null
  public readonly elements: ElementsEntityProxy[] | null
  public static Parse(d: string): BlocksEntityProxy {
    return BlocksEntityProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): BlocksEntityProxy {
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
    checkString(d.block_id, false, field + '.block_id')
    d.text = TextProxy.Create(d.text, field + '.text')
    if (d.text === undefined) {
      d.text = null
    }
    d.accessory = AccessoryProxy.Create(d.accessory, field + '.accessory')
    if (d.accessory === undefined) {
      d.accessory = null
    }
    checkArray(d.elements, field + '.elements')
    if (d.elements) {
      for (let i = 0; i < d.elements.length; i++) {
        d.elements[i] = ElementsEntityProxy.Create(
          d.elements[i],
          field + '.elements' + '[' + i + ']',
        )
      }
    }
    if (d.elements === undefined) {
      d.elements = null
    }
    return new BlocksEntityProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.block_id = d.block_id
    this.text = d.text
    this.accessory = d.accessory
    this.elements = d.elements
  }
}

export class TextProxy {
  public readonly type: string
  public readonly text: string
  public readonly verbatim: boolean | null
  public readonly emoji: boolean | null
  public static Parse(d: string): TextProxy | null {
    return TextProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): TextProxy | null {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      return null
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, true)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, true)
    }
    checkString(d.type, false, field + '.type')
    checkString(d.text, false, field + '.text')
    checkBoolean(d.verbatim, true, field + '.verbatim')
    if (d.verbatim === undefined) {
      d.verbatim = null
    }
    checkBoolean(d.emoji, true, field + '.emoji')
    if (d.emoji === undefined) {
      d.emoji = null
    }
    return new TextProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.text = d.text
    this.verbatim = d.verbatim
    this.emoji = d.emoji
  }
}

export class AccessoryProxy {
  public readonly type: string
  public readonly action_id: string
  public readonly placeholder: PlaceholderOrTextOrTitleOrCloseOrSubmitProxy
  public readonly filter: FilterProxy
  public static Parse(d: string): AccessoryProxy | null {
    return AccessoryProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): AccessoryProxy | null {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      return null
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, true)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, true)
    }
    checkString(d.type, false, field + '.type')
    checkString(d.action_id, false, field + '.action_id')
    d.placeholder = PlaceholderOrTextOrTitleOrCloseOrSubmitProxy.Create(
      d.placeholder,
      field + '.placeholder',
    )
    d.filter = FilterProxy.Create(d.filter, field + '.filter')
    return new AccessoryProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.action_id = d.action_id
    this.placeholder = d.placeholder
    this.filter = d.filter
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

export class FilterProxy {
  public readonly include: string[] | null
  public readonly exclude_bot_users: boolean
  public static Parse(d: string): FilterProxy {
    return FilterProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): FilterProxy {
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
    checkArray(d.include, field + '.include')
    if (d.include) {
      for (let i = 0; i < d.include.length; i++) {
        checkString(d.include[i], false, field + '.include' + '[' + i + ']')
      }
    }
    if (d.include === undefined) {
      d.include = null
    }
    checkBoolean(d.exclude_bot_users, false, field + '.exclude_bot_users')
    return new FilterProxy(d)
  }
  private constructor(d: any) {
    this.include = d.include
    this.exclude_bot_users = d.exclude_bot_users
  }
}

export class ElementsEntityProxy {
  public readonly type: string
  public readonly action_id: string
  public readonly initial_time: string | null
  public readonly placeholder: PlaceholderOrTextOrTitleOrCloseOrSubmitProxy
  public readonly initial_option: OptionsEntityOrInitialOptionOrSelectedOptionProxy | null
  public readonly options:
    | OptionsEntityOrInitialOptionOrSelectedOption1Proxy[]
    | null
  public static Parse(d: string): ElementsEntityProxy {
    return ElementsEntityProxy.Create(JSON.parse(d))
  }
  public static Create(d: any, field = 'root'): ElementsEntityProxy {
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
    checkString(d.action_id, false, field + '.action_id')
    checkString(d.initial_time, true, field + '.initial_time')
    if (d.initial_time === undefined) {
      d.initial_time = null
    }
    d.placeholder = PlaceholderOrTextOrTitleOrCloseOrSubmitProxy.Create(
      d.placeholder,
      field + '.placeholder',
    )
    d.initial_option = OptionsEntityOrInitialOptionOrSelectedOptionProxy.Create(
      d.initial_option,
      field + '.initial_option',
    )
    if (d.initial_option === undefined) {
      d.initial_option = null
    }
    checkArray(d.options, field + '.options')
    if (d.options) {
      for (let i = 0; i < d.options.length; i++) {
        d.options[i] =
          OptionsEntityOrInitialOptionOrSelectedOption1Proxy.Create(
            d.options[i],
            field + '.options' + '[' + i + ']',
          )
      }
    }
    if (d.options === undefined) {
      d.options = null
    }
    return new ElementsEntityProxy(d)
  }
  private constructor(d: any) {
    this.type = d.type
    this.action_id = d.action_id
    this.initial_time = d.initial_time
    this.placeholder = d.placeholder
    this.initial_option = d.initial_option
    this.options = d.options
  }
}

export class OptionsEntityOrInitialOptionOrSelectedOptionProxy {
  public readonly text: PlaceholderOrTextOrTitleOrCloseOrSubmitProxy
  public readonly value: string
  public static Parse(
    d: string,
  ): OptionsEntityOrInitialOptionOrSelectedOptionProxy | null {
    return OptionsEntityOrInitialOptionOrSelectedOptionProxy.Create(
      JSON.parse(d),
    )
  }
  public static Create(
    d: any,
    field = 'root',
  ): OptionsEntityOrInitialOptionOrSelectedOptionProxy | null {
    if (!field) {
      obj = d
      field = 'root'
    }
    if (d === null || d === undefined) {
      return null
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, true)
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, true)
    }
    d.text = PlaceholderOrTextOrTitleOrCloseOrSubmitProxy.Create(
      d.text,
      field + '.text',
    )
    checkString(d.value, false, field + '.value')
    return new OptionsEntityOrInitialOptionOrSelectedOptionProxy(d)
  }
  private constructor(d: any) {
    this.text = d.text
    this.value = d.value
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
