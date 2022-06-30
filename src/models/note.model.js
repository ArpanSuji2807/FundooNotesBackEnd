import { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
{
    Title: {type: String ,required: true},
    Description: {type: String ,required: true},
    Color: {type: String},
    isArchived: {type: Boolean},
    isDeleted: {type:Boolean},
    UserID: {type:String},
},
{
    timestamps: true
}
);
export default model('Note', NoteSchema);