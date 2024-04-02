const mongoose = require('mongoose');

/**
 * Schema definition for grant details.
 * @typedef {Object} GrantDetails
 * @property {Object} id - The ID of the grant.
 * @property {string} granterName - The name of the granter.
 * @property {string} name - The name of the grant.
 * @property {number} grantAmount - The amount of the grant.
 * @property {string} description - The description of the grant.
 */
const GrantSchema = new mongoose.Schema({
    id: {
        type:Object,
        required: true,
        alias: '_id'   
    },
    granterName:{
        type:String,
        required: true 
    },
    name: {
        type:String,
        required: true        
    },
    grantAmount: {
        type:Number,
        required: true        
    },
    description: {
        type:String,
        required: true       
    },
})

module.exports = mongoose.model('grant-details', GrantSchema);
