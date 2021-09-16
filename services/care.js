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

      case "CARE_PUBLISH":
        const url = "https://www.depisoenpiso.com/enviar-alojamiento.html?igsid=" + this.user.igsid;
        response = Response.genGenericTemplate('https://www.depisoenpiso.com/new-assets/img/bg-alojamiento.jpg', 'Publica una habitación', '', [{
          "type":"web_url",
          "url": url,
          "title":"Publica ya"
        }])
        break;
      case "CARE_PUBLISH_SEARCHING":
        const url = "https://www.depisoenpiso.com/publicar-anuncio-usuario.html?igsid=" + this.user.igsid;
        response = Response.genGenericTemplate('https://www.depisoenpiso.com/new-assets/img/bg-alojamiento.jpg', 'Publica una habitación', '', [{
          "type":"web_url",
          "url": url,
          "title":"Publica ya"
        }])
        break;
      case "CARE_PUBLISH":
        const url = "https://depisenpis.typeform.com/to/sncMnwmc?igsid=" + this.user.igsid;
        response = Response.genGenericTemplate('https://images.typeform.com/images/MHeBtBKJUm9L/background/large', 'Publica una habitación', '', [{
          "type":"web_url",
          "url":url,
          "title":"Publica ya"
        }])
        break;
      case "care_help":
        let response = await fetch(new URL('https://www.depisoenpiso.com/old_root/php/controllers/test.php'), {
          method: "GET"
        });

        let jsonResponse = await response.json();

        console.log(jsonResponse);
        
        const title = "Publica ya " + jsonResponse;
        const url = "https://depisenpis.typeform.com/to/sncMnwmc?igsid=" + this.user.igsid;
        response = Response.genGenericTemplate('https://images.typeform.com/images/MHeBtBKJUm9L/background/large', 'Publica una habitación', '', [{
          "type":"web_url",
          "url":url,
          "title":title
        }])
      break;
    }

    return response;
  }
};