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

// Imports dependencies
const Response = require("./response"),
  Survey = require("./survey"),
  fetch = require("node-fetch"),
  i18n = require("../i18n.config");

module.exports = class Care {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
    let agentNames = ["Laura", "Stan", "Jorge", "Gary"];
    let randomIndex = Math.floor(Math.random() * agentNames.length);
    this.agentFirstName = agentNames[randomIndex];
  }

  handlePayload(payload) {
    let response;

    switch (payload) {
      case "CARE_LAST_ROOM":
        response = Response.genGenericTemplate("https://www.depisoenpiso.com/old_root/uploads/6149ae1de7234.jpg", 'Habitación privada en Barcelona', '420 €/mes', [{
          "type": "web_url",
          "url": 'https://www.depisoenpiso.com/alojamiento.html?prop=6149ae586be31',
          "title": 'Reserva ya'
        }])
        break;
      case "CARE_BUSCANDO":

        /*response = Response.genGenericTemplate('https://www.depisoenpiso.com/new-assets/img/bg-alojamiento.jpg', 'Publica un anuncio', '', [{
          "type": "web_url",
          "url": buscandoUrl,
          "title": "Publica ya"
        }])*/

        const buscandoUrl = "https://www.depisoenpiso.com/publicar-anuncio-usuario.html?igsid=" + this.user.igsid;
        response = Response.genQuickReply(
          i18n.__("searching.question"),
          [
            {
              "type": "web_url",
              "url": ofreciendoUrl,
              title: i18n.__("searching.options.see")
            },
            {
              title: i18n.__("searching.options.publish"),
              payload: "CARE_BILLING"
            }
          ]
        );
        break;
      case "CARE_OFRECIENDO":
        var ofreciendoUrl = "https://www.depisoenpiso.com/enviar-alojamiento.html?igsid=" + this.user.igsid;
        response = Response.genGenericTemplate('https://www.depisoenpiso.com/new-assets/img/bg-alojamiento.jpg', 'Publica una habitación', '', [{
          "type": "web_url",
          "url": ofreciendoUrl,
          "title": "Publica ya"
        }])
        break;
      case "CARE_OTHERS":
        response = Response.genQuickReply(
          i18n.__("others.text"),
          [
            {
              title: i18n.__("others.options.joke.title"),
              payload: "CARE_JOKE"
            },
            {
              title: i18n.__("others.options.human_contact.title"),
              payload: "CARE_CONTACT"
            }
          ]
        );
        break;
      case "CARE_JOKE":
        let randomIndex = Math.floor(Math.random() * i18n.__("others.options.joke.jokes.amount")); 
        response = Response.genText(i18n.__("others.options.joke.jokes." + randomIndex));
        break;
      case "CARE_CONTACT":
        response = Response.genGenericTemplate('', i18n.__("others.options.human_contact.title"), i18n.__("others.options.human_contact.template.text"), [{
          "type": "web_url",
          "url": 'https://api.whatsapp.com/send?phone=34695757430',
          "title": i18n.__("others.options.human_contact.template.button")
        }])
        break;
      case "CARE_HELP":
        response = Response.genQuickReply(
          i18n.__("care.prompt", {
            userName: this.user.name
          }),
          [
            {
              title: i18n.__("care.order"),
              payload: "CARE_ORDER"
            },
            {
              title: i18n.__("care.billing"),
              payload: "CARE_BILLING"
            },
            {
              title: i18n.__("care.other"),
              payload: "CARE_OTHER"
            }
          ]
        );
        break;
      case "CARE_ORDER":
        response = [
          Response.genText(
            i18n.__("care.issue", {
              userName: this.user.name,
              agentFirstName: this.agentFirstName,
              topic: i18n.__("care.order")
            })
          ),
          Response.genText(i18n.__("care.end")),
          Survey.genAgentRating(this.agentFirstName)
        ];
        break;

      case "CARE_BILLING":
        response = [
          Response.genText(
            i18n.__("care.issue", {
              userName: this.user.name,
              agentFirstName: this.agentFirstName,
              topic: i18n.__("care.billing")
            })
          ),
          Response.genText(i18n.__("care.end")),
          Survey.genAgentRating(this.agentFirstName)
        ];
        break;

      case "CARE_SALES":
        response = [
          Response.genText(
            i18n.__("care.style", {
              userName: this.user.name,
              agentFirstName: this.agentFirstName
            })
          ),
          Response.genText(i18n.__("care.end")),
          Survey.genAgentRating(this.agentFirstName)
        ];
        break;

      case "CARE_OTHER":
        response = [
          Response.genText(
            i18n.__("care.default", {
              userName: this.user.name,
              agentFirstName: this.agentFirstName
            })
          ),
          Response.genText(i18n.__("care.end")),
          Survey.genAgentRating(this.agentFirstName)
        ];
        break;
    }

    return response;
  }
};
