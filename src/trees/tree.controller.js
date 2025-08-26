const Tree = require("./tree.model");
const postATree = async(req,res)=>{
try {
    const newTree= await Tree({...req.body});
    await newTree.save();
    res.status(200).send({message: "Tree post successfully", tree: newTree})
} catch (error) {
    console.error("Error creating tree", error);
    res.status(500).send({message: "Fail to create tree"});

        }
}

// get all tree

const getAllTree = async(req,res)=>{
try {
    const trees= await Tree.find().sort({createdAt: -1});
    res.status(200).send(trees)

} catch (error) {
    console.error("Error fetching trees", error);
    res.status(500).send({message: "Fail to fetch tree"});

        }
}

// single tree endpoint
const getSingleTree = async (req, res) => {
    try {
        const {id} = req.params;
        const tree =  await Tree.findById(id);
        if(!tree){
            res.status(404).send({message: "Tree is not Found!"})
        }
        res.status(200).send(tree)
        
    } catch (error) {
        console.error("Error fetching tree", error);
        res.status(500).send({message: "Failed to fetch tree"})
    }
}

//update tree data
const updateTree = async (req, res) => {
    try {
        const {id} = req.params;
        const updateTree =  await Tree.findByIdAndUpdate(id, req.body, {new: true});
        if(!updateTree) {
            res.status(404).send({message: "Tree is not Found!"})
        }
        res.status(200).send({
            message: "Tree updated successfully",
            tree: updateTree
        })
    } catch (error) {
        console.error("Error updating a tree", error);
        res.status(500).send({message: "Failed to update a tree"})
    }
}

//delete 

const deleteATree = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTree =  await Tree.findByIdAndDelete(id);
        if(!deleteTree) {
            res.status(404).send({message: "Tree is not Found!"})
        }
        res.status(200).send({
            message: "Tree deleted successfully",
            tree: deleteTree
        })
    } catch (error) {
        console.error("Error deleting a tree", error);
        res.status(500).send({message: "Failed to delete a tree"})
    }
}

    module.exports={
    postATree,
    getAllTree,
    getSingleTree,
    updateTree,
    deleteATree
}