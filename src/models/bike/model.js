'use strict';

const bikeModel = (sequelize, DataTypes) => sequelize.define('Bike', {
    make: {type: DataTypes.STRING, required: true},
    model: {type: DataTypes.STRING, required: true},
    color: {type: DataTypes.STRING, required: true},
    price: {type: DataTypes.INTEGER, required: true},
    type: {type: DataTypes.ENUM('road', 'mountain', 'hybrid', 'folding'), required: true},
    //status rare - vintage -etc
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = bikeModel;
