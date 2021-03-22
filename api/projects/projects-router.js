// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();


router.get('/:id', (req, res) => {
    const {id} = req.params;

    Projects.get(id)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            };
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ message: "The post information could not be retrieved" });
        });
});


router.post('/', (req, res) => {
    const project = req.body;

    if( !project.name || !project.description ) {
        res.status(400).json({ message: "Please provide name and description for the project" });
    } else {
        Projects.insert(project)
            .then(p => {
                res.status(201).json({p});
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).json({ message: "There was an error while saving the project to the database" });
            });
    };
});


router.put('/:id', (req, res) => {
    const {id} = req.params;
    const project = req.body;

    Projects.update(id, project)
        .then(p => {
            if(!p) {
                res.status(404).json({ message: "The project with the specified ID does not exist" });
            } else if ( !project.name || !project.description ) {
                res.status(400).json({ message: "Please provide name and description for the project" });
            } else {
                res.status(200).json(project);
            };
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ message: "The project information could not be modified" });
        });
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Projects.remove(id)
        .then(p => {
            if(p) {
                res.status(200).json(p);
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist" });
            };
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ message: "The project could not be removed" });
        });
});


router.get('/:id', (req, res) => {
    const {id} = req.params;

    Projects.getProjectActions(id)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist" });
            };
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ message: "The project information could not be retrieved" });
        });
});

module.exports = router;