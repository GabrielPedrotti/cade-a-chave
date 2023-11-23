const express = require('express');
const deviceService = require('../../services/deviceService/deviceService');

const router = express.Router();

router.post('/', deviceService.createDevice);
router.get('/:deviceId', deviceService.getDeviceById);
router.put('/:deviceId/:ring', deviceService.updateDeviceAlarm);

module.exports = router;