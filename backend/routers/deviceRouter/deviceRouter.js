const express = require('express');
const deviceService = require('../../services/deviceService/deviceService');

const router = express.Router();

router.post('/', deviceService.createDevice);
router.get('/deviceId/:deviceId', deviceService.getDeviceById);
router.get('/userId/:userId', deviceService.getDevicesByUserId);
router.put('/:deviceId/:ring', deviceService.updateDeviceAlarm);

module.exports = router;