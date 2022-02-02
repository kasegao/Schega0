/* eslint-disable @typescript-eslint/no-unused-vars */
import { Main } from './main'
import { Config } from './env'
import { FormPayloadProxy } from './cache'

const config = new Config()
const main = new Main()

const cid_modal_setting = `${config.callback_id}_modal_setting`

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const json = JSON.parse(decodeURIComponent(e.parameter.payload))

  // check token
  if (json.token != config.app_token()) {
    throw new Error('Invalid token')
  }

  if (['shortcut', 'message_action'].includes(json.type)) {
    // check callback_id
    if (json.callback_id != config.callback_id()) {
      throw new Error('Invalid callback_id')
    }
    // return modal
    const url = 'https://slack.com/api/views.open'
    const viewData = {
      trigger_id: json.trigger_id,
      token: config.bot_token(),
      view: JSON.stringify(
        modal_setting(
          Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd'),
        ),
      ),
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
  } else if (json.type === 'block_actions') {
    return ContentService.createTextOutput()
  } else if (json.type === 'view_submission') {
    // check callback_id
    if (json.view.callback_id != cid_modal_setting) {
      throw new Error('Invalid callback_id')
    }
    // insert new sheet
    const sheet_ret = main.newSheet()
    const cache = main.makeCache()
    const payload = FormPayloadProxy.Create(json)
    const cache_data = main.createCacheData(sheet_ret.sheet_name, payload)

    // hook in 90 seconds
    const date = new Date()
    date.setTime(date.getTime() + 1000 * 90)
    const trigger = ScriptApp.newTrigger('sheetTrigger')
      .timeBased()
      .at(date)
      .create()

    // save cache
    const cache_key = trigger.getUniqueId()
    cache.put(cache_key, cache_data, 600)

    // response
    const view = message_reply(sheet_ret.sheet_url)
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: 'application/json',
      payload: view,
    }
    UrlFetchApp.fetch(config.webhook_url(), options)
    return ContentService.createTextOutput()
  }
}

function sheetTrigger(e: GoogleAppsScript.Events.TimeDriven) {
  const cache = main.makeCache()
  const cache_key = e.triggerUid
  const cache_data = cache.get(cache_key)
  main.buildSheet(cache_data)
}

/* view data */
const modal_setting = (initial_date: string) => {
  return {
    callback_id: cid_modal_setting,
    title: {
      type: 'plain_text',
      text: '日程調整',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'Submit',
      emoji: true,
    },
    type: 'modal',
    close: {
      type: 'plain_text',
      text: 'Cancel',
      emoji: true,
    },
    blocks: [
      {
        block_id: 'users',
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '参加者',
        },
        accessory: {
          action_id: 'participants',
          type: 'multi_conversations_select',
          placeholder: {
            type: 'plain_text',
            text: 'participants',
            emoji: true,
          },
          filter: {
            include: ['im'],
            exclude_bot_users: true,
          },
        },
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: '日時設定',
          emoji: true,
        },
      },
      {
        block_id: 'dates',
        type: 'actions',
        elements: [
          {
            action_id: 'dp_start',
            type: 'datepicker',
            initial_date: initial_date,
            placeholder: {
              type: 'plain_text',
              text: 'Select a start date',
              emoji: true,
            },
          },
          {
            action_id: 'sp_days',
            type: 'static_select',
            initial_option: {
              text: {
                type: 'plain_text',
                text: ' 5 d',
                emoji: true,
              },
              value: '5',
            },
            placeholder: {
              type: 'plain_text',
              text: 'Select a number of days',
              emoji: true,
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: ' 1 d',
                  emoji: true,
                },
                value: '1',
              },
              {
                text: {
                  type: 'plain_text',
                  text: ' 2 d',
                  emoji: true,
                },
                value: '2',
              },
              {
                text: {
                  type: 'plain_text',
                  text: ' 3 d',
                  emoji: true,
                },
                value: '3',
              },
              {
                text: {
                  type: 'plain_text',
                  text: ' 4 d',
                  emoji: true,
                },
                value: '4',
              },
              {
                text: {
                  type: 'plain_text',
                  text: ' 5 d',
                  emoji: true,
                },
                value: '5',
              },
              {
                text: {
                  type: 'plain_text',
                  text: ' 6 d',
                  emoji: true,
                },
                value: '6',
              },
              {
                text: {
                  type: 'plain_text',
                  text: ' 7 d',
                  emoji: true,
                },
                value: '7',
              },
              {
                text: {
                  type: 'plain_text',
                  text: ' 8 d',
                  emoji: true,
                },
                value: '8',
              },
              {
                text: {
                  type: 'plain_text',
                  text: ' 9 d',
                  emoji: true,
                },
                value: '9',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '10 d',
                  emoji: true,
                },
                value: '10',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '11 d',
                  emoji: true,
                },
                value: '11',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '12 d',
                  emoji: true,
                },
                value: '12',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '13 d',
                  emoji: true,
                },
                value: '13',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '14 d',
                  emoji: true,
                },
                value: '14',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '15 d',
                  emoji: true,
                },
                value: '15',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '16 d',
                  emoji: true,
                },
                value: '16',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '17 d',
                  emoji: true,
                },
                value: '17',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '18 d',
                  emoji: true,
                },
                value: '18',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '19 d',
                  emoji: true,
                },
                value: '19',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '20 d',
                  emoji: true,
                },
                value: '20',
              },
            ],
          },
        ],
      },
      {
        type: 'actions',
        block_id: 'times',
        elements: [
          {
            action_id: 'tp_begin',
            type: 'timepicker',
            initial_time: '09:00',
            placeholder: {
              type: 'plain_text',
              text: 'Select begin time',
              emoji: true,
            },
          },
          {
            action_id: 'tp_end',
            type: 'timepicker',
            initial_time: '17:00',
            placeholder: {
              type: 'plain_text',
              text: 'Select end time',
              emoji: true,
            },
          },
          {
            action_id: 'sp_intervals',
            type: 'static_select',
            initial_option: {
              text: {
                type: 'plain_text',
                text: '30 m',
                emoji: true,
              },
              value: '30',
            },
            placeholder: {
              type: 'plain_text',
              text: 'Select a number of days',
              emoji: true,
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: '15 m',
                  emoji: true,
                },
                value: '15',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '30 m',
                  emoji: true,
                },
                value: '30',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '60 m',
                  emoji: true,
                },
                value: '60',
              },
            ],
          },
        ],
      },
    ],
  }
}

const message_reply = (sheet_url: string) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `日程調整をお願いします（シートの作成に1分程度かかります）\n<${sheet_url}|${sheet_url}>`,
        },
      },
    ],
  }
}
