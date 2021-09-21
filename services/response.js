/**
 * Copyright 2021-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Instagram For Original Coast Clothing
 *
 */

"use strict";

const i18n = require("../i18n.config");

module.exports = class Response {
  static genQuickReply(text, quickReplies) {
    let response = {
      text: text,
      quick_replies: []
    };

    for (let quickReply of quickReplies) {
      response["quick_replies"].push({
        content_type: "text",
        title: quickReply["title"],
        payload: quickReply["payload"]
      });
    }

    return response;
  }

  static genImage(url) {
    let response = {
      attachment: {
        type: "image",
        payload: {
          url: url
        }
      }
    };

    return response;
  }

  static genText(text) {
    let response = {
      text: text
    };

    return response;
  }

  static genPostbackButton(title, payload) {
    let response = {
      type: "postback",
      title: title,
      payload: payload
    };

    return response;
  }

  static genGenericTemplate(image_url, title, subtitle, buttons) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: title,
              subtitle: subtitle,
              image_url: image_url,
              buttons: buttons
            }
          ]
        }
      }
    };

    return response;
  }

  static genNuxMessage(user) {
    let welcome = this.genText(
      i18n.__("get_started.welcome", {
        userName: user.name
      })
    );

    let guide = this.genText('Veuràs que hi ha un menú a baix de tot (si estàs xatejant des del mòbil). El pots utilitzar sempre que vulguis!');

    let curation = this.genQuickReply('En què et puc ajudar avui? 😊', [
      {
        title: 'Busco',
        payload: "CARE_BUSCANDO"
      },
      {
        title: 'Ofereixo',
        payload: "CARE_OFRECIENDO"
      }, {
        title: 'Última habitación',
        payload: 'CARE_LAST_ROOM'
      }
    ]);

    return [welcome, guide, curation];
  }
};
