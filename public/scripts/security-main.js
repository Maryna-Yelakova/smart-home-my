window.onload = function () {

  controller.model = model;
  controller.view = view;
  controller.view.password.init();
  controller.view.garage.init();
  controller.tabsHandler();
  controller.garageHandler();

  controller.cameraHandler();
  controller.addCameraHandler();
  controller.hideCameraHandler();
  controller.hideShowVideoTagHandler();
  controller.setVideoBtnIdHandler();
  controller.removeCameraHandler();

  controller.generateUniqueNumbers();
  controller.inputPassHandler();
  controller.lockHandler();
  controller.resetHandler();
  controller.setPasswordHandler();
  controller.exitWrongPasswordHandler();
  controller.resetLastValueHandler();
  controller.changePasswordBlockHandler();
  controller.exitCloseGarageHandler();

}
