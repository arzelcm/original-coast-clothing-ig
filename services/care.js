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
  Receive = require("./receive"),
  Survey = require("./survey"),
  fetch = require("node-fetch"),
  { URL, URLSearchParams } = require("url"),
  i18n = require("../i18n.config");

module.exports = class Care {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
    let agentNames = ["Laura", "Stan", "Jorge", "Gary"];
    let randomIndex = Math.floor(Math.random() * agentNames.length);
    this.agentFirstName = agentNames[randomIndex];
  }

  async handlePayload(payload) {
    let response;

    switch (payload) {
      case "CARE_LAST_ROOM":
        let fetchResponse = await fetch(new URL('https://www.depisoenpiso.com/old_root/php/controllers/test.php'), {
          method: "GET"
        });

        let jsonResponse = await fetchResponse.json();

        const firstProperty = jsonResponse;
        response = Response.genGenericTemplate(firstProperty.image, firstProperty.street + ', ' + firstProperty.city, '', [{
          "type": "web_url",
          "url": 'https://www.depisoenpiso.com/alojamiento.html?prop=' + firstProperty.id,
          "title": 'Reserva ya',
          "subtitle": firstProperty.monthly_rent + ' €/mes'
        }])
        break;
      case "CARE_BUSCANDO":
        // TODO: List at least 1 last with photo published property
        const buscandoUrl = "https://www.depisoenpiso.com/publicar-anuncio-usuario.html?igsid=" + this.user.igsid;
        response = Response.genGenericTemplate('https://www.depisoenpiso.com/new-assets/img/bg-alojamiento.jpg', 'Publica una habitación', '', [{
          "type": "web_url",
          "url": buscandoUrl,
          "title": "Publica ya",
          "subtitle": "Únete a la comunidad de más de 50k personas que buscan habitación"
        }])
        break;
      case "CARE_OFRECIENDO":
        const ofreciendoUrl = "https://www.depisoenpiso.com/enviar-alojamiento.html?igsid=" + this.user.igsid;
        response = Response.genGenericTemplate('https://www.depisoenpiso.com/new-assets/img/bg-alojamiento.jpg', 'Publica una habitación', '', [{
          "type": "web_url",
          "url": ofreciendoUrl,
          "title": "Publica ya",
          "subtitle": "Encuentra a alguien de las más de 50k personas que buscan habitación en nuestra comunidad"
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
