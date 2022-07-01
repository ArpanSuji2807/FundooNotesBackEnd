import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

export const AddNote = async (req, res, next) => {
    console.log("Inside controller---->>>>",req.body);
    try {
        const data = await NoteService.AddNote(req.body);
        console.log("Data inside controller--->>>",data);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data:data,
            message: 'Note created successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getAllNotes = async (req, res, next) => {
    try {
        const data = await NoteService.getAllNotes(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data:data,
            message: 'All Notes fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getNote = async (req, res, next) => {
    try {
        const data = await NoteService.getNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data:data,
            message: 'Notes fetched successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            data:data,
            message: 'Could not fetch notes'
        });
    }
};

export const updateNotes = async (req, res, next) => {
    try {
        const data = await NoteService.updateNotes(req.params._id,req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data:data,
            message: 'Notes Updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const deleteNotes = async (req, res, next) => {
    try {
        const data = await NoteService.deleteNotes(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data:[],
            message: 'Notes deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const archiveNotes = async(req,res,next) =>{
    try{
        const data = await NoteService.archiveNotes(req.params._id,req.body.UserID);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data:data,
            message: 'Notes successfully Archived'
        });
    }catch (error) {
        next(error);
    }
}

export const isTrash = async(req,res,next) =>{
    try{
        const data = await NoteService.isTrash(req.params._id,req.body.UserID);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data:data,
            message: 'Notes Moved to Trash'
        });
    }catch (error) {
        next(error);
    }
}