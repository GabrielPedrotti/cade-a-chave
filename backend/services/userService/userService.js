const { MongoClient } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');

async function databaseConnect() {
    await client.connect();
    const database = client.db('MeuPorquinho');
    return database.collection('UserData');
}

module.exports = {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const collection = await databaseConnect();
            const user = await collection.findOne({ username: { $eq: username } });
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                delete user.password;
                return res.status(200).json({ user: user, message: 'Login efetuado com sucesso' });
            } else {
                return res.status(401).json({ message: 'Usuário ou senha inválidos' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao efetuar login' });
        } finally {
            await client.close();
        }
    },

    async register(req, res) {
        try {
            const { username, firstName, lastName, password, } = req.body;

            const collection = await databaseConnect();
            const userExists = await collection.findOne({ username });

            if (userExists) {
                return res.status(409).json({ message: 'Usuário já cadastrado' });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                await collection.insertOne({ username, firstName, lastName, password: hashedPassword });

                const user = await collection.findOne({ username, password: hashedPassword });
                delete user.password;
                return res.status(201).json({ user: user, message: 'Usuário cadastrado com sucesso' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        } finally {
            await client.close();
        }
    },

    //TODO: Create a function to register a new device

    // async saveFinances(req, res) {
    //     try {
    //         const collection = await databaseConnect();
    //         let { bankBalance, savedMoney, foodCost, houseCost, transportCost } = req.body;
    //         const { username, month } = req.query;

    //         if (!username) {
    //             return res.status(400).json({ message: 'Usuário não informado' });
    //         }

    //         if (!month) {
    //             return res.status(400).json({ message: 'Mês não informado' });
    //         }

    //         const userInfo = await collection.findOne({ username });
    //         const actualMonthFinances = userInfo && userInfo?.finances && userInfo?.finances[month] ? userInfo?.finances[month] : null;

    //         if (actualMonthFinances) {
    //             bankBalance = bankBalance + actualMonthFinances.bankBalance;
    //             savedMoney = savedMoney + actualMonthFinances.savedMoney;
    //             foodCost = foodCost + actualMonthFinances.foodCost;
    //             houseCost = houseCost + actualMonthFinances.houseCost;
    //             transportCost = transportCost + actualMonthFinances.transportCost;
    //         }

    //         await collection.updateOne({ username }, {
    //             $set: {
    //                 [`finances.${month}`]: {
    //                     bankBalance,
    //                     savedMoney,
    //                     foodCost,
    //                     houseCost,
    //                     transportCost
    //                 }
    //             }
    //         });

    //         return res.status(200).json({ message: 'Finanças salvas com sucesso' });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Erro ao salvar finanças' });
    //     } finally {
    //         await client.close();
    //     }
    // },


    // TODO: create function to activate the device


    // TODO: create funcion to verify if the user activated the device


    async getUsers(req, res) {
        try {
            const collection = await databaseConnect();
            const users = await collection.find().toArray();

            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar usuários' });
        } finally {
            await client.close();
        }
    },

    async deleteUser(req, res) {
        try {
            const { username } = req.params;

            const collection = await databaseConnect();
            await collection.deleteOne({ username });

            return res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar usuário' });
        } finally {
            await client.close();
        }
    },

    async changePassword(req, res) {
        try {
            const { username, password } = req.body;

            const collection = await databaseConnect();
            const hashedPassword = await bcrypt.hash(password, 10);
            await collection.updateOne({ username }, { $set: { password: hashedPassword } });

            return res.status(200).json({ message: 'Senha alterada com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao alterar senha' });
        } finally {
            await client.close();
        }
    },

    async changeEmail(req, res) {
        try {
            const { username, email } = req.body;

            const collection = await databaseConnect();

            await collection.updateOne({ username }, { $set: { username: email } }); // username é o e-mail

            return res.status(200).json({ message: 'E-mail alterado com sucesso' });
        }
        catch {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao alterar e-mail' });
        } finally {
            await client.close();
        }
    },
}
