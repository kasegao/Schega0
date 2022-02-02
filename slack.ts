import { Main } from './main'
import { Config } from './env'
import { View } from './view'
import { FormPayloadProxy } from './cache'

const config = new Config()
const main = new Main()
const view = new View()

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const json = JSON.parse(decodeURIComponent(e.parameter.payload))

  // check token
  if (json.token != config.app_token()) {
    throw new Error('Invalid token')
  }

  if (['shortcut', 'message_action'].includes(json.type)) {
    // return modal
    const url = 'https://slack.com/api/views.open'
    const viewData = {
      trigger_id: json.trigger_id,
      token: config.bot_token(),
      view: JSON.stringify(view.modal_setting()),
    }
    const header = {
      Authorization: 'Bearer ' + config.bot_token(),
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      headers: header,
      payload: viewData,
    }
    UrlFetchApp.fetch(url, options)
    return ContentService.createTextOutput()
  } else if (json.type === 'view_submission') {
    // insert new sheet
    const sheet_ret = main.newSheet()
    const cache = main.makeCache()
    const payload = FormPayloadProxy.Create(json)
    const cache_data = main.createCacheData(sheet_ret.sheet_name, payload)

    // hook in 1 minute
    const date = new Date()
    date.setTime(date.getTime() + 1000 * 60)
    const trigger = ScriptApp.newTrigger('buildSheet')
      .timeBased()
      .at(date)
      .create()

    // save cache
    const cache_key = trigger.getUniqueId()
    cache.put(cache_key, cache_data, 600)

    // response
    const response = {
      text: `日程調整をお願いします（シートの作成に1分程度かかります）\n${sheet_ret.sheet_url}`,
      response_type: 'in_channel',
    }
    return ContentService.createTextOutput(
      JSON.stringify(response),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}
