// 'use strict';
//
// const customersModel = (sequelize, DataTypes) =>
//     sequelize.define(
//         'Customers', { //ACTUAL DB <Table> name!
//             nameFirst: {type: DataTypes.STRING, required: true},
//             nameLast: {type: DataTypes.STRING, required: false},
//             budget: {type: DataTypes.INTEGER, required: true}
//         });
//
// module.exports = customersModel;
// // Static method to find a customer with their associated bike models
//
// customersModel.findBikesOwnedByCustomer = async function (customerId) {
//     try {
//         const customer = await customersModel.findOne({
//             where: { id: customerId },
//             include: [{ model: sequelize.models.Bike }] // Include the Bike association
//         });
//         if (!customer) {
//             throw new Error('Customer not found');
//         }
//         // Extract bike models owned by the customer
//         const bikesOwned = customer.Bikes.map(bike => bike.toJSON());
//         return bikesOwned;
//     } catch (error) {
//         throw new Error('Error finding bikes owned by customer: ' + error.message);
//     }
// };


'use strict';

module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define(
        'Customers', {
            nameFirst: { type: DataTypes.STRING, allowNull: false },
            nameLast: { type: DataTypes.STRING, allowNull: true },
            budget: { type: DataTypes.INTEGER, allowNull: false }
        });

    Customers.associate = (models) => {
        // Define associations with other models if needed
        Customers.hasMany(models.Bike, { foreignKey: 'customerId' });
    };

    Customers.findBikesOwnedByCustomer = async function (customerId) {
        try {
            const customer = await Customers.findByPk(customerId, {
                include: [{ model: models.Bike }] // Include the Bike association
            });
            if (!customer) {
                throw new Error('Customer not found');
            }
            // Extract bike models owned by the customer
            const bikesOwned = customer.Bikes.map(bike => bike.toJSON());
            return bikesOwned;
        } catch (error) {
            throw new Error('Error finding bikes owned by customer: ' + error.message);
        }
    };

    return Customers;
};
