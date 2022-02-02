const modal_setting = {
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
          initial_date: Utilities.formatDate(
            new Date(),
            'Asia/Tokyo',
            'yyyy-MM-dd',
          ),
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

// import/export not working on gas
export class View {
  public modal_setting = () => modal_setting
}
