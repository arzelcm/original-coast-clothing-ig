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

    let guide = this.genText(i18n.__("get_started.guidance"));

    let curation = this.genQuickReply(i18n.__("languages.question"), [
      {
        title: i18n.__("languages.catalan"),
        payload: "CARE_CATALAN"
      },
      {
        title: i18n.__("languages.spanish"),
        payload: "CARE_SPANISH"
      }
    ]);
    user.firstMessage = false;

    return [welcome, guide, curation];
  }

  static genCommonMenu() {
    let menu = this.genQuickReply(i18n.__("get_started.help"), [
      {
        title: i18n.__("searching.title"),
        payload: "CARE_BUSCANDO"
      },
      {
        title: i18n.__("ofering.title"),
        payload: "CARE_OFRECIENDO"
      },
      {
        title: i18n.__("others.title"),
        payload: "CARE_OTHERS"
      }
      // TODO: "Others" field
    ]);

    return menu;
  }
};
