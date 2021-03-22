// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();

router.get(`/:id`, (req, res) => {
    const {id} = req.params;

    Post.findById(id)
        .then(action => {
            if(action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: "The action with the specified ID does not exist" });
            };
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ message: "The action information could not be retrieved" });
        });
});


router.post('/', (req, res) => {
    const action = req.body;

    if( !action.title || !action.contents ) {
        res.status(400).json({ message: "Please provide title and contents for the action" });
    } else {
        Actions.insert(action)
            .then(p => {
                res.status(201).json({p});
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).json({ message: "There was an error while saving the action to the database" });
            });
    }
});


router.put('/:id', (req, res) => {
    const {id} = req.params;
    const action = req.body;

    Actions.update(id, action)
        .then(p => {
            if(!p) {
                res.status(404).json({ message: "The action with the specified ID does not exist" });
            } else if ( !action.title || !action.contents ) {
                res.status(400).json({ message: "Please provide title and contents for the action" });
            } else {
                res.status(200).json(action);
            };
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ message: "The action information could not be modified" });
        });
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Actions.remove(id)
        .then(p => {
            if(p) {
                res.status(200).json(p);
            } else {
                res.status(404).json({ message: "The action with the specified ID does not exist" });
            };
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ message: "The action could not be removed" });
        });
});

module.exports = router;