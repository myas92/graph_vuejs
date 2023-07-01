const express = require('express');
const router = express.Router();
const { 
    createRelation,
    getRelations,
    deleteRelationshipById } = require('../controller/relation.controller')

router.post('/', createRelation)
router.get('/', getRelations)
router.delete('/:elementId', deleteRelationshipById)


module.exports = router;