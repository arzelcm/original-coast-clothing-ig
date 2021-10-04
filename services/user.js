/**
 * Copyright 2021-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

"use strict";

module.exports = class User {
  constructor(igsid) {
    this.igsid = igsid;
    this.name = "";
    this.profilePic = "";
    this.lang = "es";
    this.firstMessage = true;
  }
  setProfile(profile, lang = "es") {
    this.name = profile.name;
    this.profilePic = profile.profilePic;
    this.lang = lang;
  }
};
