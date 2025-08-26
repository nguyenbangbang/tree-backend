const express = require('express');
const Tree = require('./tree.model');
const { postATree, getAllTree, getSingleTree, updateTree, deleteATree } = require('./tree.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router =  express.Router();


//post a tree
router.post("/create-tree",verifyAdminToken, postATree)

// get all trees
router.get("/",getAllTree)

// single tree endpoint 

router.get("/:id",getSingleTree)

//update tree endpoint 
 router.put("/edit/:id",verifyAdminToken,updateTree)

//delete 
router.delete("/:id",verifyAdminToken, deleteATree)


module.exports = router;