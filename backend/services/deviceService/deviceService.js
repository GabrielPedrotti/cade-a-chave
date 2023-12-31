const { MongoClient } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

async function databaseConnect() {
    await client.connect();
    const database = client.db('cade-a-chave');
    return database.collection('Devices');
}

module.exports = {
    async createDevice(req, res) {
        try {
            const { deviceId, userId } = req.body;

            const collection = await databaseConnect();
            const deviceExists = await collection.findOne({ deviceId });

            if (!parseInt(deviceId)) return res.status(400).json({ message: 'ID do dispositivo inválido' });
            if (deviceExists) {
                return res.status(409).json({ message: 'ID do dispositivo já está em uso!' });
            }

            const response = await collection.insertOne({ deviceId: parseInt(deviceId), userId, ring: false, lastRingAt: null, registeredAt: new Date() });

            return res.status(201).json({ response, message: 'Dispositivo cadastrado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao cadastrar dispositivo' });
        } finally {
            await client.close();
        }
    },

    async getDeviceById(req, res) {
        try {
            const { deviceId } = req.params;

            if (!parseInt(deviceId)) return res.status(400).json({ message: 'ID do dispositivo inválido' });

            const collection = await databaseConnect();
            const device = await collection.findOne({ deviceId: parseInt(deviceId) });

            if (!device) {
                return res.status(404).json({ message: 'Dispositivo não encontrado' });
            }

            return res.status(200).json({ device });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar dispositivo' });
        }
    },

    async getDevicesByUserId(req, res) {
        try {
            const { userId } = req.params;

            if (!userId) return res.status(400).json({ message: 'ID do usuário inválido' });

            const collection = await databaseConnect();
            const devices = await collection.find({ userId }).toArray();

            if (!devices) {
                return res.status(404).json({ message: 'Dispositivos não encontrados' });
            }

            return res.status(200).json({ devices });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar dispositivos' });
        }
    },

    async updateDeviceAlarm(req, res) {
        try {
            const { deviceId, ring } = req.params;

            if (!parseInt(deviceId)) return res.status(400).json({ message: 'ID do dispositivo inválido' });

            const collection = await databaseConnect();
            const device = await collection.findOne({ deviceId: parseInt(deviceId) });

            if (!device) {
                return res.status(404).json({ message: 'Dispositivo não encontrado' });
            }

            const data = { ring: ring === 'true' ? true : false };

            if (data.ring) {
                data.lastRingAt = new Date();
            }

            const response = await collection.updateOne({ deviceId: parseInt(deviceId) }, { $set: data });

            return res.status(200).json({ response, message: `Dispositivo '${deviceId}' atualizado` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar dispositivo' });
        }
    },
}
