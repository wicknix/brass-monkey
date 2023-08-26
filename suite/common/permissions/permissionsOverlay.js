/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*-
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function openCookieViewer(viewerType)
{
  const wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                       .getService(Components.interfaces.nsIWindowMediator);
  var enumerator = wm.getEnumerator("mozilla:cookieviewer");
  while (enumerator.hasMoreElements()) {
    var viewer = enumerator.getNext();
    if (viewer.arguments[0] == viewerType) {
      viewer.focus();
      return;
    }
  }
  window.openDialog("chrome://communicator/content/permissions/cookieViewer.xul",
                    "_blank", "chrome,resizable", viewerType);
}

function showPermissionsManager(viewerType, host) {
  var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                     .getService(Components.interfaces.nsIWindowMediator);
  var existingWindow = wm.getMostRecentWindow("permissions-" + viewerType);
  if (existingWindow) {
    existingWindow.setHost(host);
    existingWindow.focus();
  }
  else {
    var params = { blockVisible: (viewerType == "image"),
                   sessionVisible: false,
                   allowVisible: true,
                   prefilledHost: host,
                   permissionType: viewerType };
    window.openDialog("chrome://communicator/content/permissions/permissionsManager.xul", "_blank",
                      "chrome,resizable=yes", params);
  }
}

function viewPopups(host) {
  showPermissionsManager("popup", host);
}

function viewImages() {
  showPermissionsManager("image", "");
}

function viewInstalls() {
  showPermissionsManager("install", "");
}

function viewOfflineData() {
  showPermissionsManager("offline-app", "");
}

function viewNotifications() {
  showPermissionsManager("desktop-notification", "");
}

function viewCookies() {
  openCookieViewer("cookieManager");
}  

