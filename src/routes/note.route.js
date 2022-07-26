import express, { Router } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as noteController from '../controllers/note.controller';
import { NoteValidator } from '../validators/note.validator';
import * as redis from '../middlewares/reddis.middleware'

const router = express.Router();

//route to Create Note
router.post('',NoteValidator,userAuth, noteController.AddNote);

//route to get all notes
router.get('',userAuth,redis.redisNote,noteController.getAllNotes);

//route to get a single note
router.get('/:_id',userAuth,noteController.getNote);

//route to update notes
router.put('/:_id',userAuth,noteController.updateNotes);

//route to delete a single notes
router.delete('/:_id',userAuth,noteController.deleteNotes);

//router to archive notes
router.put('/:_id/isArchive',userAuth,noteController.archiveNotes);

//router to isDelete
router.put('/:_id/isDelete',userAuth,noteController.isTrash); 

export default router;